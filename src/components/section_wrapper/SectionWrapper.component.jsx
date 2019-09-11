import React from 'react';
import classNames from 'classnames';

export default ({ className, children }) => (
  <div className={classNames('main-content', className)}>{children}</div>
);
