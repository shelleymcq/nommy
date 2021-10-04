// Node Modules
import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
// Utilities
import Auth from '../../utils/auth';
import { QUERY_SLATE } from '../../utils/queries';
import { REMOVE_SLATE } from '../../utils/mutations'
import { useParams, useHistory } from 'react-router-dom'
// Components
import RestaurantCards from '../RestaurantCards/RestaurantCards'
// Styling


const SlateById = () => {
    const { id } = useParams();
    // console.log('params slate id: ', id)
    const { loading, data } = useQuery(QUERY_SLATE, {
        variables: { id },
      });
    const returnedSlate = data?.slate || [];
    const restaurants = returnedSlate.restaurants;
    // console.log("restaurants:", restaurants)

    const [removeSlate, { error }] = useMutation(REMOVE_SLATE);

    const history = useHistory();

    const redirect = () => {
        history.push(`/profile`);
        history.go(0)
    }

    const handleEditSlate = (slateId) => {
      alert(`you clicked edit slate for ${slateId}`)
    }

    const handleDeleteSlate = (slateId) => {
      console.log("you clicked the delete button")
      console.log('slateId to delete:', slateId)
    
      // // GRAB USER TOKEN IF USER LOGGED IN
      // const token = Auth.loggedIn() ? Auth.getToken() : null;

      // // IF USER NOT LOGGED IN, DON'T CONTINUE
      // if (!token) {
      //   return false;
      // }

      // USE MUTATION TO REMOVE THE SLATE BY SLATE ID
      try {
        removeSlate({
            variables: { _id: slateId }
        });

        redirect();
      } catch (error) {
        console.error(error);
      }
    }
  
  if (loading) {
    <>
        <h1>Loading...</h1>
    </>
  }

  return (
    <main>
      <div className="slate-header">
        <h2 className="center">{returnedSlate.name}</h2>
      </div>
      <div>
        {Auth.getProfile().data.username === returnedSlate.slateCreator ? 
          <>
          <Button
            className='btn-block btn-danger'
            onClick={() => handleDeleteSlate(returnedSlate._id)}
          >
            <i class="fas fa-trash"></i>
          </Button>
          <Button
            className='btn-block btn-danger'
            onClick={() => handleEditSlate(returnedSlate._id)}
          >
            <i class="fas fa-pen"></i>
          </Button>
          </>
          :
          null
          }
      </div>
      <div>{restaurants ? 
      <div>
        <RestaurantCards restaurants={restaurants} />
      </div>
      : null}</div>
      
    </main>
  );
};

export default SlateById;
