import React, { Component } from 'react';
import './App.css';
import { Navbar } from './components/navabar'
import { UsersList } from './components/usersList'
import { ChatWindow } from './components/ChatWindow'
import io from 'socket.io-client'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: undefined,
      userToBotMessage: [],
      botToUserMessage: [],
      messages: []
    }
  }

  componentDidMount() {
    const socket = io("http://localhost:5000/");
    this.setState({
      socket: socket
    });
    socket.on('botToUserMessage', (data) => {
      console.log(data);
      this.setState({
        messages: [...this.state.messages, data]
      })
    });
  }


  sendMessage = (message) => {
    console.log(message)
    this.state.socket.emit("userToBotMessage", message);
    this.setState({
      messages: [...this.state.messages, message]
    })
  }
  
  render() {
    return (
      <div className="App container">
        <Navbar />
        <div className="row">
          {/* <UsersList /> */}
          <ChatWindow sendMessage={this.sendMessage} messages={this.state.messages} />
        </div>
      </div>
    );
  }
}

export default App;
