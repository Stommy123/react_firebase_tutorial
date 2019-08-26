import React from 'react';
import Loader from 'react-loader-spinner';

export default ({ loading }) =>
  loading && (
    <div className="loader-container">
      <Loader type="Oval" color="#00BFFF" height={100} width={100} />
    </div>
  );
