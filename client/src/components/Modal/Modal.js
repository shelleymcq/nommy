import React from 'react';
// import Avatar1 from '../../assets/img/avatar-1.png'


const Modal = () => {
    return (
    <div>
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                </div>
                <div className="title">
                    <h1>Choose your avatar</h1>
                </div>
                <div className="body">
                </div>
                <select className="dropdown-menu btn">
                    <option className="dropdown-item" value="" disabled selected>0</option>
                    <option value="1">&#128511;</option>
                    <option value="2">{'\u2728'}</option>
                    <option value="3">&#x1F920;</option>
                    <option value="4">&#x1F913;</option>
                    <option value="5">&#x1F9D0;</option>
                    <option value="6">&#x1F974;</option>
                    <option value="7">&#x1F60E;</option>
                    <option value="8">&#x1F525;</option>
                    <option value="9">&#x1F643;</option>
                    <option value="10">&#x1F4AF;</option>
                </select>
                <div className="footer">
                    <button className="btn btn-block btn-primary">Select</button>
                </div>
            </div>
        </div>
    </div>
    )
    }

export default Modal
