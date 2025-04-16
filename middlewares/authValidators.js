import validator from 'validator';

export const signupValidation = (req, res, next) => {
  const { username, email, password } = req.body;
  const errors = [];

  const trimmedUsername = username?.trim() || '';
  const trimmedEmail = email?.trim() || '';
  const trimmedPassword = password?.trim() || '';

  if (validator.isEmpty(trimmedUsername)) {
    errors.push({ error: 'Username is required' });
  } else if (!validator.isLength(trimmedUsername, { min: 3 })) {
    errors.push({ error: 'Username must be at least 3 characters' });
  }

  if (validator.isEmpty(trimmedEmail)) {
    errors.push({ error: 'Email is required' });
  } else if (!validator.isEmail(trimmedEmail)) {
    errors.push({ error: 'Invalid email address' });
  }

  if (validator.isEmpty(trimmedPassword)) {
    errors.push({ error: 'Password is required' });
  } else if (!validator.isLength(trimmedPassword, { min: 6 })) {
    errors.push({ error: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    return res.status(400).send({
      error: 'Register failed',
      details: errors
    });
  }

  req.user = {
    username: trimmedUsername,
    password: trimmedPassword,
    email: validator.normalizeEmail(trimmedEmail)
  };

  next();
};

export const loginValidation = (req, res, next) => {
  const { username, password } = req.body;
  const errors = [];

  const trimmedUsername = username?.trim() || '';
  const trimmedPassword = password?.trim() || '';

  
  if (validator.isEmpty(trimmedUsername)) {
    errors.push({ error: 'Username is required' });
  }

  if (validator.isEmpty(trimmedPassword)) {
    errors.push({ error: 'Password is required' });
  } 

  if (errors.length > 0) {
    return res.status(400).send({
      error: 'Login failed',
      details: errors
    });
  }

  req.user = {
    username: trimmedUsername,
    password: trimmedPassword
  };

  next();
};