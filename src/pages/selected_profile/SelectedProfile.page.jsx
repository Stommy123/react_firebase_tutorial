import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { database } from '../../firebase';
import { GlobalContext } from '../../context';
import { SectionWrapper, ProfileContent, Comments } from '../../components';

const SelectedProfile = _ => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [comments, setComments] = useState([]);
  const { globalState } = useContext(GlobalContext);
  const { profileId } = useParams()

  const { currentUserProfile = {} } = globalState;
  const ref = `/comments/${profileId}`;


  const handleNewComment = comment => {
    const commentRef = database.ref(ref).push();
    const createdAt = new Date().toDateString();
    const newComment = { comment, author: currentUserProfile.displayName, createdAt, id: commentRef.key };
    commentRef.set(newComment);
  };

  const fetchAndSubscribeToContent = useCallback(_ => {
    // fetch profile
    database.ref(`/profiles/${profileId}`).once("value", snapshot => {
      const selectedProfile = snapshot.val() || {};
      setSelectedProfile(selectedProfile);
    });

    // subscribe to comments for that profile
    database.ref(ref).on("value", snapshot => {
      const comments = snapshot.val() || {};
      setComments(Object.values(comments));
    });

  }, [profileId, ref]);

  useEffect(_ => void fetchAndSubscribeToContent(), [fetchAndSubscribeToContent])

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

export default SelectedProfile;
