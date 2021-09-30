import React from 'react'
import './Friend.css'


export default function Friend(props) { 
    return (
        <div className="card">
            <div className="card-body">
                <img className="card-img" src={props.img} alt="Avatar" />
                <h2 className="card-name">{props.name}</h2>
                {/* <p className="card-description">{props.description}</p> */}
                <div className="button">
                    <button onClick={ () =>alert ('❤️❤️❤️') } className="card-btn btn btn-outline-info ">❤️</button>
                    <button onClick={ () =>alert ('follow-me') }className="card-btn btn btn-outline-info">Follow</button>
                </div>
            </div>

        </div>
    )
}
