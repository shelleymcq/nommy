// BRING IN REACT, USESTATE, AND REACT-ROUTER-DOM MODULES
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// BRING IN MUTATION FOR LOGGING IN A USER
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
// CUSTON STYLESHEET
import './Login.css';
// BRING IN AUTHENTICATION SERVICES FUNCTIONS
import Auth from '../utils/auth';

const Login = (props) => {
  // SET STATE FOR FORM INPUT FIELDS
  const [formState, setFormState] = useState({ email: '', password: '' });
  // USE MUTATION HOOK FOR LOGGING IN A USER AND GIVING THEM A TOKEN
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // UPON FORM INPUT CHANGES, UPDATE STATE FOR FORM DATA TO USER'S INPUTS
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // HANDLE LOGIN FORM SUBMISSION
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // LOGIN A USER GIVEN USER'S FORM INPUTS & GIVE A TOKEN
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      // SAVE USER TOKEN INFO TO LOCAL STORAGE
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // CLEAR LOGIN FORM VALUES
    setFormState({
      email: '',
      password: '',
    });
  };

  // LOGIN FORM
  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-black text-light p-2">Login</h4>
          <div className="card-body">
            {data ? (
              <div className='loginPopup'>
                <p>
                  Success! You may now head{' '}
                  <Link className='loginLink'to="/">back to the homepage.</Link>
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <br />
                <button
                  className="btn btn-lg btn-primary btn-block outline-delete"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
