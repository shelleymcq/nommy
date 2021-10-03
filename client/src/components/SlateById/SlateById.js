// Node Modules
import React from 'react';
import { useQuery } from '@apollo/client';
// Utilities
import { QUERY_SLATE } from '../../utils/queries';
import { useParams } from 'react-router-dom'
// Components
import RestaurantCards from '../RestaurantCards/RestaurantCards'
// Styling


const SlateById = () => {
    const { id } = useParams();
    // console.log('params slate id: ', id)
    const { loading, data, error } = useQuery(QUERY_SLATE, {
        variables: { id },
      });
    const returnedSlate = data?.slate || [];
    const restaurants = returnedSlate.restaurants;
    // console.log("restaurants:", restaurants)
  
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
      <div>{restaurants ? 
      <div>
        <RestaurantCards restaurants={restaurants} />
      </div>
      : null}</div>
      
    </main>
  );
};

export default SlateById;
