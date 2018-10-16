import React from 'react';
import { Message } from './message'
export const ChatWindow = (props) => {
    return (
        <div className="col-md-12">
            <div className="jumbotron">
                <div className="form-inline">
                    <div className="form-group mx-sm-3 mb-2">
                        <label for="inputPassword2" className="sr-only">Password</label>
                        <input type="text" className="form-control" id="message" placeholder="Enter a message" />
                    </div>
                    <button type="submit" className="btn btn-danger mb-2" onClick={() => {

                        let value = document.getElementById("message").value;
                        if (!value) {
                            value = "bye"
                        }
                        props.sendMessage(value);
                    }}>Send Message</button>
                </div>
                <hr className="my-4" />
                <div className="scroll-area">
                    {
                        props.messages.map((message) => {
                            return <Message message={message} />
                        })
                    }
                </div>
                <hr className="my-4" />

            </div>
        </div>
    );
}