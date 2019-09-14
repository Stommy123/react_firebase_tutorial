import React, { useState, useEffect, useCallback, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { database } from '../../firebase';
import { GlobalContext } from '../../context';
import { SectionWrapper, ProfileContent, Comments } from '../../components';

const SelectedProfile = ({ match = {} }) => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [comments, setComments] = useState([]);
  const { globalState } = useContext(GlobalContext);
  const { currentUserProfile = {} } = globalState;
  const { profileId } = match.params || {};
  const ref = `/comments/${profileId}`;
  const subscribeToComments = _ => {
    database.ref(ref).on('value', snapshot => {
      const comments = snapshot.val() || {};
      console.log('comments', comments);
      setComments(Object.values(comments));
    });
  };
  const fetchSelectedProfile = _ => {
    database
      .ref('/profiles')
      .orderByChild('uid')
      .equalTo(profileId)
      .once('value', snapshot => {
        const selectedProfile = snapshot.val();
        setSelectedProfile(Object.values(selectedProfile)[0] || {});
      });
  };
  const fetchAndSubscribeToContent = _ => {
    fetchSelectedProfile();
    subscribeToComments();
  };
  const handleNewComment = comment => {
    const commentRef = database.ref(ref).push();
    const createdAt = new Date().toDateString();
    const newComment = { comment, author: currentUserProfile.displayName, createdAt, id: commentRef.key };
    commentRef.set(newComment);
  };
  const mountEffect = useCallback(fetchAndSubscribeToContent, []);
  useEffect(
    _ => {
      mountEffect();
    },
    [mountEffect]
  );
  return (
    <SectionWrapper>
      {selectedProfile && <ProfileContent {...selectedProfile} />}
      <div className="comments-container">
        <h3>Comments</h3>
        <Comments comments={comments} handleSubmit={handleNewComment} />
      </div>
    </SectionWrapper>
  );
};

export default withRouter(SelectedProfile);
