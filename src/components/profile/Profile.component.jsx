import React from 'react';
import classNames from 'classnames';

export default ({
  id,
  displayName,
  tagline,
  photoURL,
  occupation,
  selectedProfileId,
  handleProfileClick,
  handleViewProfile
}) => {
  const isSelected = id === selectedProfileId;
  return (
    <div className={classNames('profile', { 'selected-profile': isSelected })} onClick={handleProfileClick(id)}>
      <img className="profile-img" src={photoURL} alt="profile" />
      <h3>
        {displayName} - {occupation}
      </h3>
      <p>{tagline}</p>
      {isSelected && <button onClick={handleViewProfile}>View Profile</button>}
    </div>
  );
};
