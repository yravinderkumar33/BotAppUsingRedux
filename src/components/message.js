import React from 'react'
export const Message = (props) => {
    return (
        // <div className="card">
        //     <div className="card-body">
        //         <blockquote className="blockquote text-justify">
        //         <img src="data:image/jpeg;base64,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" className="rounded float-left" alt="..." />
        //             <p> {props.message}.</p>
        //         </blockquote>
        //     </div>
        //     <div className="card-footer text-left">
        //         2 days ago
        //      </div>
        // </div>
        <div className="message">
            <img src="https://cdn3.iconfinder.com/data/icons/user-icon-3-1/100/user_3_Artboard_1-512.png" alt="Avatar" width="50" height="50" class="img-circle"/>
            <p>{props.message}</p>
            <span className="time-left">11:00</span>
        </div>

    );
}





