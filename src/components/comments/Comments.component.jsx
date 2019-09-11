import React, { useState } from 'react';

export default ({ comments = [], handleSubmit }) => {
  const [comment, setComment] = useState(String());
  const handleSubmitComment = e => {
    e.preventDefault();
    handleSubmit(comment);
    setComment(String());
  };
  return (
    <div className="comments">
      <hr />
      {comments.map(({ id, comment, author }) => (
        <div key={id} className="comment">
          {comment} - <strong>{author}</strong>
          <hr />
        </div>
      ))}
      <form className="comments-form" onSubmit={handleSubmitComment}>
        <textarea onChange={e => setComment(e.target.value)} value={comment} />
        <button type="submit">Post Comment!</button>
      </form>
    </div>
  );
};

