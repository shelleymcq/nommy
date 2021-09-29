import React from 'react';

// replace img src url with image data

const Card = ({ restaurantName, image, restaurantTag, distance, link }) => {
    return (
        <div className="card"> 
            <img className="card-img-top" src="https://picsum.photos/200/200" alt={restaurantName} />
            <div className="card-body">
                <h5 className="card-title">{restaurantName}</h5>
                <p className="card-text restaurant-tag">{restaurantTag}</p>
                <p>{distance}</p>
                <a href={link} target="_blank" rel="noopener noreferer" className="btn btn-primary">Restaurant Website</a>
            </div>
        </div>
    )
};

export default Card;