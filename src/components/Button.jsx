import React from "react";

export default function Button(props) {

    return(
        <div style={{display: 'inline-block'}}>
            <i id={props.id} onClick={(event) => props.clickButton(event)}
               className={props.class}></i>
            <br/>
            <b>{props.title}</b>
        </div>
    )

}