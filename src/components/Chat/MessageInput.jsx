import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const MessageInput = ({ addMessage }) => {
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() !== '') {
      addMessage(input);
      setInput('');
    }
  };

  return (
    <div className='d-flex justify-content-between container flex-wrap'>
      <div className='col-sm-10 col-12 p-2'> <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Type your message..."
      className='form-control '
    /></div>
      <button className='btn btn-success col-sm-2 col-12' onClick={sendMessage}>Send</button>
    </div>
  );
};

export default MessageInput;
