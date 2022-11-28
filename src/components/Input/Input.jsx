import React, { Fragment } from 'react';

const Input = (props) => {
    console.log(props)
    const { values , placeholder ,title , type ,htmlFor} = props;
    const classes = props.inputClassName + " form-control";
    
    return (
        <Fragment>
            <label htmlFor= {htmlFor} className = "form-label">{title}</label>
            <input type= {type} onChange ={(e) => props.onChangeHandler(e.target.value)}    value ={values} className = {classes} placeholder = {placeholder} id = "exampleFormControlInput1" />
        </Fragment>
    )
};
export default Input;