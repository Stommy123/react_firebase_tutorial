import React, { useReducer, useMemo } from 'react';

export default ({ schema: { id, fields = [], formHeading, submitText } = {}, handleSubmit }) => {
  const getInitialState = _ =>
    fields.reduce((acc, field) => {
      acc[field.id] = String();
      return acc;
    }, {});
  const initialState = useMemo(getInitialState, []);
  const formReducer = (state, payload) => ({ ...state, ...payload });
  const [state, setState] = useReducer(formReducer, initialState);
  const handleInputChange = id => e => {
    setState({ [id]: e.target.value });
  };
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
            value={state[id] || String()}
          />
        </div>
      ))}
      <button className="btn btn-primary" type="submit">
        {submitText}
      </button>
    </form>
  );
};
