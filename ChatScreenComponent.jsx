// ChatScreenComponent.jsx

import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

const ChatScreenComponent = () => {
  const [messages, setMessages] = useState([]);


    setMessages([
      {
        _id: 1,
        text: 'Hello, welcome!',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native'
        }
      }
    ]);
  // Initialize messages only once
//   useEffect(() => {
  
//   }, []);

  // Handle sending messages
  const onSend = useCallback((newMessages = []) => {
    setMessages(prevMessages =>
      GiftedChat.append(prevMessages, newMessages)
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{
        _id: 1,
      }}
    />
  );
};

export default ChatScreenComponent;