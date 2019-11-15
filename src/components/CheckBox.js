import React from 'react';

export const CheckBox = props => {
    return (
        <li className="list-group-item">
            <div className="form-check">
            <input 
                className="form-check-input" 
                onChange={props.handleLesson}
                type="checkbox"
                checked={props.isChecked}
                value={props.name}
            /> 
            <label className="form-check-label">{props.name}</label>
            </div>
        </li>
    )
}

export default CheckBox;