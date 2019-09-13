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
    },	
    {	
      label: 'Display Name',	
      type: 'text',	
      id: 'displayName',	
      placeholder: 'Display Name',	
      required: true,	
    },	
    {	
      label: 'Tag Line',	
      type: 'text',	
      id: 'tagline',	
      placeholder: 'Tag Line',	
      required: true,	
    },	
    {	
      label: 'Occupation',	
      type: 'text',	
      id: 'occupation',	
      placeholder: 'Occupation',	
      required: true,	
    },	
    {	
      label: 'Email',	
      type: 'email',	
      id: 'email',	
      placeholder: 'name@email.com',	
      required: true,	
    },	
    {	
      label: 'Password',	
      type: 'password',	
      id: 'password',	
      required: true,	
    },	
    {	
      label: 'Confirm Password',	
      type: 'password',	
      id: 'passwordConfirmation',	
      required: true,	
    }	
  ]	
};