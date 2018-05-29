import React from 'react'
import PropTypes from 'prop-types'
import "../App.css";

const AddMessage = (props) => {
  let input
  console.log(props)

  return (
    <section id="new-message">
      <input id="new-message-input"
        onKeyPress={(e) => {
        if (e.key === 'Enter') {
          props.addMessage({author: 'Me', message: input.value})
          input.value = ''
        }
      }}
        type="text"
        ref={(node) => {
        input = node
      }}
      />
    </section>
  )
}

AddMessage.propTypes = {
  addMessage: PropTypes.func.isRequired
}

export default AddMessage