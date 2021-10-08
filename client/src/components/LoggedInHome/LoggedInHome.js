// Node Modules
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
// Utilities
import { QUERY_MY_RANDOM_RESTAURANT } from '../../utils/queries';
import { API_SEARCH } from '../../utils/mutations';
import Auth from '../../utils/auth';
// Components
import RestaurantCards from '../RestaurantCards/RestaurantCards'
// Styling
import './LoggedInHome.css';

const LoggedInHome = (props) => {
  const { loading, data } = useQuery(QUERY_MY_RANDOM_RESTAURANT);
  const myRestaurant = data?.myRandomRestaurant || [];
  // console.log("myRestaurant:", myRestaurant)
  // const [category, setCategory] = useState("")
  // const [mySuggestions, setMySuggestions] = useState([])
  const [mySuggestions, setMySuggestions] = useState([])
  const [apiSearch] = useMutation(API_SEARCH);

  // const suggestionsResponse = useQuery(QUERY_SUGGESTIONS, { variables: { category: myRestaurant ? myRestaurant.category : "Mexican"}});
  // const mySuggestions = suggestionsResponse.data?.suggestions || [];
  // console.log("suggested restaurants:", mySuggestions)

  // useEffect(()=>{
  //   console.log("the component did mount")
  //   if(myRestaurant){
  //     setCategory(myRestaurant.category)
  //   }
  //   // myRestaurant ? setCategory(myRestaurant.category) : setCategory('trending')
  //   // console.log("my category:", category)
  // },[myRestaurant])
  // console.log("my category:", category)

  // useEffect(() => {

  //   if(!category){
  //     // window.location.reload()
  //     setCategory("trending")
  //     return
  //   }

  //   apiSearch({
  //     variables: { 
  //       searchInput: category || Auth.getProfile().data.zipcode, 
  //       zipcode: Auth.getProfile().data.zipcode
  //     }
  //   }).then((apiResponse)=>{
  //     console.log("apiREsponse:", apiResponse.data.apiSearch);
  //     setMySuggestions(apiResponse.data.apiSearch)
  //   }).catch(err => console.log(err))
  // }, [category] );

  window.onload = async () => {
    await apiSearch({
      variables: { 
        searchInput: myRestaurant.category || "trending", 
        zipcode: Auth.getProfile().data.zipcode
      }
    }).then((apiResponse) =>
      setMySuggestions(apiResponse.data.apiSearch)
    )
  }
 
  if (loading) {
    <>
        <h1>Loading restaurant data...</h1>
    </>
  }
 
  return (
    <main>
      <div>{myRestaurant ?
          <>
          <div className="header">
            <h2 className="center">{myRestaurant.name ? `Because you liked ${myRestaurant.name}, check out these restaurants.` : `Check out these trending restaurants.`}</h2>
          </div>
          <RestaurantCards restaurants={mySuggestions} />
          </>
          : 
          <div className="header">
            <h2 className="center">You don't have any saved restaurants yet.</h2>
            <h4 className="center">Start your search by adding a new slate to your profile.</h4>
          </div>
          }
      </div>
    </main>
  );
};

export default LoggedInHome;
