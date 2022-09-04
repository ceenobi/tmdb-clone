const registerOptions = {
  username: {
    required: 'username is required',
    minLength: {
      value: 4,
      message: 'username must have at least 4 characters',
    },
  },
  email: {
    required: 'Email is required',
    pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 6,
      message: 'Password must have at least 6 characters',
    },
  },
}

export default registerOptions
