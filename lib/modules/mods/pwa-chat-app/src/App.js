import React, { Component } from 'react';
import { observer, PropTypes } from 'mobx-react'
//import WebSocket from 'ws';
import logo from './logo.svg';
import './App.css';

//import PWAChatApp from '../index.js'

import Sidebar from './components/Sidebar'
import MessageList from './components/MessageList'
import AddMessage from './components/AddMessage'

const propTypes = {
  store: PropTypes.object
};

class App extends Component {
  constructor(){
    super()
    this.state = {
      messages: [{author: "BearGuy", message:"Welcome to Saito!"}]
    }

    this.nothingFunction = this.nothingFunction.bind(this)
    this.addMessage = this.addMessage.bind(this)
    this.getMessages = this.getMessages.bind(this)
  }

  addMessage(message) {
    console.log(message)
    this.setState(state => ({
      messages: [...state.messages, message] //state.messages.push(message)
    }));
    console.log(this.state)
 }

  getMessages() {
    return this.state.messages
  }

  nothingFunction() {
    return null
  }

  render() {
    return (
      <div id="container">
        {/* <aside id="sidebar">Users</aside> */}
        {/* <Sidebar /> */}
        <section id="main">
          <section id="messages-list">Messages list</section>
          <section id="new-message">New message</section>
          <MessageList messages={this.getMessages()}/>
          <AddMessage addMessage={this.addMessage}/>
        </section>
      </div>
    );
  }
}

export default App;
