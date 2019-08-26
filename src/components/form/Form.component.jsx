import React, { useReducer, useMemo } from 'react';

const Form = ({ schema: { id, fields = [], formHeading, submitText } = {}, handleSubmit }) => {
  const getInitialState = _ =>
    fields.reduce((acc, field) => {
      acc[field.id] = String();
      return acc;
    }, {});
  const initialState = useMemo(getInitialState, []);
  const formReducer = (state, payload) => ({ ...state, ...payload });
  const [state, setState] = useReducer(formReducer, initialState);
  const handleInputChange = id => e => {
    console.log('initial state', state);
    console.log('id', id);
    console.log('wtf', e.target.value);
    setState({ [id]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();
    handleSubmit(state);
    setState(initialState);
  };
  console.log('current state', state);
  return (
    <form onSubmit={onSubmit} id={id}>
      <h1 className="display-4 m-b-2">{formHeading}</h1>
      {fields.map(({ id, label, type, value }) => (
        <div className="form-group" key={id}>
          <label>{label}</label>
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

export default Form;
