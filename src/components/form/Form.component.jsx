import React, { useReducer, useMemo } from 'react';

export default ({ schema: { id, fields = [], formHeading, submitText } = {}, handleSubmit }) => {

  const initialState = useMemo(
    _ =>
      fields.reduce((acc, field) => {
        acc[field.id] = field.default || '';
        return acc;
      }, {}),
    [fields]
  );

  const [state, setState] = useReducer((state, payload) => ({ ...state, ...payload }), initialState);

  const handleInputChange = id => e => setState({ [id]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    handleSubmit(state);
    setState(initialState);
  };

  return (
    <form onSubmit={onSubmit} id={id} className="form-wrapper">
      <h1 className="display-4 m-b-2">{formHeading}</h1>
      {fields.map(({ id, label, type }) => (
        <div className="form-group" key={id}>
          <input
            id={id}
            type={type}
            placeholder={label}
            onChange={handleInputChange(id)}
            value={state[id] || ''}
          />
        </div>
      ))}
      <button className="btn btn-primary" type="submit">
        {submitText}
      </button>
    </form>
  );
};
