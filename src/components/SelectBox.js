import React from 'react';

export const SelectBox = props => {
    return (
        <select 
            value={props.value} 
            onChange={props.handleClassroom} 
            className="form-control"
        >
            {props.options.map(option => {
                return <option value={option.id} key={option.id}>{option.name}</option>
            })}
        </select>
    )
}

export default SelectBox;