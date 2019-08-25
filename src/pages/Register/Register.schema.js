export const schema = {
  id: 'registerForm',
  formHeading: 'Sign Up',
  submitText: 'Sign Up',
  fields: [
    {
      label: 'Full Name',
      type: 'text',
      id: 'name',
      placeholder: 'full name',
      required: true,
      widget: 'input'
    },
    {
      label: 'Display Name',
      type: 'text',
      id: 'displayName',
      placeholder: 'Display Name',
      required: true,
      widget: 'input'
    },
    {
      label: 'Tag Line',
      type: 'text',
      id: 'tagline',
      placeholder: 'Tag Line',
      required: true,
      widget: 'input'
    },
    {
      label: 'Occupation',
      type: 'text',
      id: 'occupation',
      placeholder: 'Occupation',
      required: true,
      widget: 'input'
    },
    {
      label: 'Email',
      type: 'email',
      id: 'email',
      placeholder: 'name@email.com',
      required: true,
      widget: 'input'
    },
    {
      label: 'Password',
      type: 'password',
      id: 'password',
      required: true,
      widget: 'input'
    },
    {
      label: 'Confirm Password',
      type: 'password',
      id: 'passwordConfirmation',
      required: true,
      widget: 'input'
    }
  ]
};
