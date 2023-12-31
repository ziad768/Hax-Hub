import React, { useEffect, useState } from "react";
import ChatBox from "./ChatBox";
import MessageInput from "./MessageInput";
import Api from "../../Api";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const { user:currentUser } = useSelector((state) => state.user);
  const { userId, adminId, serviceId } = useParams();
  console.log({ userId, adminId, serviceId });
  useEffect(() => {
    // Fetch initial messages when the component mounts
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await Api.get(
        `/messages/${userId}/${adminId}/${serviceId}/`
      );
      console.log(response.data);
      setMessages(response.data.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const addMessage = async (message) => {
    try {
      console.log(message);
      let data = { message };
      console.log(data);
      const response = await Api.post(
        `/messages/${userId}/${adminId}/${serviceId}/`,
        data
      );
      console.log(response);
      console.log(message);
      let admin = currentUser?.role === "Admin";
      // let admin = currentUser?.role === "User";
     
      let add = admin ? { adminMessage: message } : { userMessage: message };
      setMessages([...messages, add]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className=" bg">
      <div className="container py-3">
        <h1 className="">Chat to Admin</h1>
        <ChatBox messages={messages} />
        <MessageInput addMessage={addMessage} />
      </div>
    </div>
  );
};

export default ChatApp;
