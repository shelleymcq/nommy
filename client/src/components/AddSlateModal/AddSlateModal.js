import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_SLATE } from '../../utils/mutations';

// import Auth from '../utils/auth';

const AddSlateModal = () => {
  const [slateName, setSlateName] = useState({ name: '' });
  const [addSlate, { error, data }] = useMutation(ADD_SLATE);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setSlateName({
      ...slateName,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addSlate({
        variables: { ...slateName },
      }); 
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setSlateName({
      name: '',
    });
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">New Slate Name</h4>
          <div className="card-body">
            {/* {data ? (
              <p>
                Success! Slate Created{' '}
                <Link to="/slate" props={data}></Link>
              </p>
            ) : ( */}
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="slate name"
                  name="name"
                  type="text"
                  value={addSlate.name}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-primary"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Add Slate
                </button>
              </form>
            {/* )} */}

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

export default AddSlateModal;
