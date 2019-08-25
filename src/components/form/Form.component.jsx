import React, { useReducer, useEffect, useCallback } from 'react';
import { FormGroup } from '..';

const Form = ({ schema: { id, fields = [], formHeading, submitText } = {}, handleSubmit }) => {
  const getInitialState = _ =>
    fields.reduce((acc, field) => {
      acc[field.id] = String();
      return acc;
    }, {});
  const formReducer = (state, payload) => ({ ...state, ...payload });
  const [state, setState] = useReducer(formReducer, {});
  const handleInputChange = ({ id, value }) => setState({ [id]: value });
  const handleUpload = _ => console.log('backend image storage still in progress!');
  const onSubmit = e => {
    e.preventDefault();
    handleSubmit(state);
    setState(getInitialState());
  };
  const setInitialState = _ => {
    setState(getInitialState);
  };
  const mountEffect = useCallback(setInitialState, []);
  useEffect(
    _ => {
      mountEffect();
    },
    [mountEffect]
  );
  return (
    <form onSubmit={onSubmit} id={id}>
      <h1 className="display-4 m-b-2">{formHeading}</h1>
      {fields.map(field => (
        <FormGroup
          key={field.id}
          {...field}
          onUpload={handleUpload}
          onChange={handleInputChange}
          value={state[field.id]}
        />
      ))}
      <button className="btn btn-primary" type="submit">
        {submitText}
      </button>
    </form>
  );
};

export default Form;
