import React, { useState, useEffect, useCallback, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { database } from '../../firebase';
import { ProfileContext } from '../../context';
import { SectionWrapper, ProfileContent, Comments } from '../../components';

const SelectedProfile = ({ match = {}, history }) => {
  const [comments, setComments] = useState([]);
  const {
    profile: { displayName, selectedProfile = {} }
  } = useContext(ProfileContext);
  const { profileId } = match.params || {};
  const ref = `/comments/${profileId}`;
  const subscribeToComments = _ => {
    if (!selectedProfile.uid) return history.push('/profiles');
    database.ref(ref).on('value', snapshot => {
      const comments = snapshot.val() || {};
      setComments(Object.values(comments));
    });
  };
  const handleNewComment = comment => {
    const commentRef = database.ref(ref).push();
    const timestamp = new Date().toDateString();
    const newComment = { comment, author: displayName, createdAt: timestamp, id: commentRef.key };
    commentRef.set(newComment);
  };
  const mountEffect = useCallback(subscribeToComments, []);
  useEffect(
    _ => {
      mountEffect();
    },
    [mountEffect]
  );
  return (
    <SectionWrapper>
      <ProfileContent {...selectedProfile} />
      <div className="comments-container">
        <h3>Comments</h3>
        <Comments comments={comments} handleSubmit={handleNewComment} />
      </div>
    </SectionWrapper>
  );
};

export default withRouter(SelectedProfile);
