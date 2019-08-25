import React from 'react';

const ProfileContent = ({ displayName, photoURL, tagline, occupation }) => (
  <>
    <img className="my-profile-img" src={photoURL} alt="avatar" />
    <h2>{displayName}</h2>

    <p>
      <strong>Tagline: </strong> {tagline}
    </p>
    <p>
      <strong>Occupation: </strong> {occupation}
    </p>
  </>
);

export default ProfileContent;
