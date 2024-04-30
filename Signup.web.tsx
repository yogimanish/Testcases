import React, { Component, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Container, Typography, Avatar, Grid } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

interface SignUpState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmpassword: string;
  errors: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmpassword: string;
  };
}

class SignUpForm extends Component<{}, SignUpState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmpassword: '',
      errors: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmpassword: '',
      },
    };
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      errors: { ...this.state.errors, [name]: '' },
    } as Pick<SignUpState, keyof SignUpState>);
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.validateForm()) {
      console.log('Form submitted:', this.state);
      this.setState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmpassword: '',
        errors: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmpassword: '',
        },
      });
    } else {
      console.log('Form has errors. Please fix them.');
    }
  };

  validateForm = () => {
    const { firstName, lastName, email, password, confirmpassword } = this.state;
    const errors: Partial<SignUpState['errors']> = {};
    if (!firstName) {
      errors.firstName = 'First name is required';
    }
    if (!lastName) {
      errors.lastName = 'Last name is required';
    }
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email address is invalid';
    }
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
    if (password !== confirmpassword) {
      errors.confirmpassword = 'Passwords do not match';
    }

    this.setState({ errors:errors as any });
    return Object.keys(errors).length === 0;
  };

  render() {
    const { errors } = this.state;
    return (
      <Container maxWidth="sm">
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <Avatar style={{ backgroundColor: '#FF0066' }}>
              <LockOutlined />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography variant="h4" align="center" gutterBottom>
              Sign Up
            </Typography>
          </Grid>
          <Grid item>
            <form onSubmit={this.handleSubmit}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
              <TextField
                fullWidth
                type="text"
                label="Email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                fullWidth
                type="password"
                label="Password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password}
              />
              <TextField
                fullWidth
                type="password"
                label="Confirm Password"
                name="confirmpassword"
                value={this.state.confirmpassword}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
                error={!!errors.confirmpassword}
                helperText={errors.confirmpassword}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: '1rem' }}
                data-testid="signup-button"
              >
                Sign Up
              </Button>
            </form>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default SignUpForm;
