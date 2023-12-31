import React from 'react';
import SendMessage from './SendMessage';
import ReceiveMessage from './ReceiveMessage';

const ChatBox = ({ messages }) => {
  console.log(messages);
  return (
    <div className='my-4'>
      <div style={{ border: '1px solid #ccc',height:'66vh', backgroundColor:'#fff' ,borderRadius:'20px', overflowY: 'scroll' }}>
        {messages.map((message, index) => (
          message.adminMessage? <SendMessage message={message.adminMessage} key={index} />:<ReceiveMessage message={message.userMessage} key={index} />
        ))}
      </div>
    </div>
  );
};


export default ChatBox;
