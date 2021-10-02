import React from 'react';
// import Avatar1 from '../../assets/img/avatar-1.png'


const Modal = () => {
    return (
    <div>
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                </div>
                <div className="input-field form-group">
                    <label>Select your avatar:</label>
                    <select>
                        <option value="&#128511;">&#128511;</option>
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
            </div>
        </div>
    </div>
    )
    }

export default Modal
