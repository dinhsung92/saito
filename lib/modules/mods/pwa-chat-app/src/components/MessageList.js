import React from 'react'
import Message from './Message'

const MessageList = ({ messages }) => {
  console.log(messages)

  return (
  <section id="messages-list">
    <ul>
    {messages.map(message => (
      <Message
      key={message.id}
      {...message}
      />
    ))}
    </ul>
  </section>
)}

export default MessageList