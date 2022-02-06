import React, { useState } from 'react';


const ChatBox = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setInput('');
    setMessages([...messages, e.target[0].value]);
  }

  const onChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  }

  return (
    <div className="main-container">
      <div className="chat-box">
      {
        messages && messages.map((ele, index) => {
          return (
            <div className="message" key={index}>
              {ele}
            </div>
          )
        })
      }
      </div>
      <form className="send-container" onSubmit={handleOnSubmit}>
        enter message:
        <input type="text" className="message-input" value={input} onChange={onChange}/>
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  )
}

export default ChatBox;