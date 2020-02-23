import React from "react";

export default function LoadingModal(props) {
    return (
        <div className="modal is-active" >
            <div className = "modal-background" >  </div>
            <div className="modal-content" style={{color : "#C3073F"}}>
                <div>
                    <i className="fas fa-compact-disc fa-7x fa-spin"></i>
                    <br/><br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={{color: "white"}}>Loading...</span>
                </div>
            </div>
        </div>
    )
}