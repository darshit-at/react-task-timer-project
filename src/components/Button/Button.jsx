import React from 'react';
import './Button.css';

const Button = (props) => {
   
    return (
        <button disabled ={props.disable} type = {props.type} onClick = {props.onClick} className = { "btn btn-success " + props.classes } >{props.children}</button>
    )
};
export default Button;