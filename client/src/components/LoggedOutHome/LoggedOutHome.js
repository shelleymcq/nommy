// Node Modules
import React from 'react';
import { useQuery } from '@apollo/client';
// Utilities
import { QUERY_RANDOM_SLATE } from '../../utils/queries';
// Components
import RestaurantCards from '../RestaurantCards/RestaurantCards'
// Styling
import './LoggedOutHome.css';

const LoggedOutHome = () => {
  const { data } = useQuery(QUERY_RANDOM_SLATE);
  const randomSlate = data?.randomSlate || [];

  return (
    <main>
      <div className="slate-header">
        <h1 className="center">Your home for restaurant inspiration!</h1>
        <h2 className="center">{randomSlate.name}</h2>
        <h4>Slate created by {randomSlate.slateCreator}</h4>
      </div>
      <div>{randomSlate.restaurants ? 
      <div>
        <RestaurantCards restaurants={randomSlate.restaurants} />
      </div>
      // return(
      //   {restaurantsArray}
      //   <ul>
      //     <li>{randomSlate.restaurants[0].name}</li>
        
      //   </ul>
      // )
      
      : null}</div>
      
    </main>
  );
};

export default LoggedOutHome;
