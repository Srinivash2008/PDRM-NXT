import React, { useState } from 'react';
import { Button, TextField, IconButton, InputAdornment, Alert, Box } from '@mui/material';
import { Visibility, VisibilityOff, Person, Lock } from '@mui/icons-material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { login } from '../../../StoreRedux/actions/AuthActions';

const validationSchema = Yup.object({
  usermail: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().required('Password is required')
});

const JWTLogin = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (values, { setSubmitting, setErrors }) => {
    const { usermail, password } = values;
    dispatch(login({ userMail: usermail, userPassword: password }));
  };

  return (
    <Formik
      initialValues={{ usermail: '', password: '', submit: null }}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {/* Email Field */}
          <TextField
            margin="normal"
            fullWidth
            id="usermail"
            name="usermail"
            label="Email Address"
            value={values.usermail}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.usermail && Boolean(errors.usermail)}
            helperText={touched.usermail && errors.usermail}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            autoComplete="email"
          />

          {/* Password Field */}
          <TextField
            margin="normal"
            fullWidth
            id="password"
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={() => setShowPassword((show) => !show)}
                    tabIndex={-1}
                    size="large"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="outlined"
            autoComplete="current-password"
          />

          {errors.submit && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errors.submit}
            </Alert>
          )}

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: '#2b4fc4',
              fontWeight: 500,
            }}
            disabled={isSubmitting}
          >
            Log In
          </Button>
        </Box>
      )}
    </Formik>
  );
};

export default JWTLogin;
