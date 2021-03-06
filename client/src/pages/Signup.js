// BRING IN REACT, USESTATE, AND REACT-ROUTER-DOM MODULES
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// CUSTOM STYLESHEET
import './Login.css'
// BRING IN MUTATION FOR SIGNING UP (ADDING) A USER
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
// BRING IN AUTHENTICATION SERVICES FUNCTIONS
import Auth from '../utils/auth';

const Signup = () => {
  // SET STATE FOR FORM INPUT FIELDS
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    avatar: '',
  });

  // USE MUTATION HOOK FOR ADDING A USER AND GIVING THEM A TOKEN
  const [addUser, { error, data }] = useMutation(ADD_USER);

  // UPON FORM INPUT CHANGES, SET STATE FOR FORM DATA TO THE USER'S INPUTS
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // HANDLE SIGN-UP FORM SUBMISSION
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // ADD USER TO DATA BASE GIVEN USER'S FORM INPUTS & GIVE A TOKEN
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      // SAVE USER TOKEN INFO TO LOCAL STORAGE
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  // SIGN-UP FORM
  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-black text-light p-2">Sign Up</h4>
          <div className="card-body">
            {data ? (
              <div className='loginPopup'>
                <p>
                  Success! You may now head{' '}
                  <Link className='loginLink' to="/">back to the homepage.</Link>
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
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
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Your Zipcode"
                  name="zipcode"
                  type="zipcode"
                  value={formState.zipcode}
                  onChange={handleChange}
                />
                <div className="input-field form-group">
                    <select
                      className="form-input"
                      name="avatar"
                      type="text"
                      value={formState.avatar}
                      onChange={handleChange}
                    >
                        <option>Select an avatar:</option>
                        <option value="&#x2728;">&#x2728;</option>
                        <option value="&#x1F920;">&#x1F920;</option>
                        <option value="&#x1F913;">&#x1F913;</option>
                        <option value="&#x1F9D0;">&#x1F9D0;</option>
                        <option value="&#x1F974;">&#x1F974;</option>
                        <option value="&#x1F60E;">&#x1F60E;</option>
                        <option value="&#x1F525;">&#x1F525;</option>
                        <option value="&#x1F643;">&#x1F643;</option>
                        <option value="&#x1F4AF;">&#x1F4AF;</option>
                    </select>                    
                </div>
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

export default Signup;
