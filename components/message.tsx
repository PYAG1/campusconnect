// components/MessageBubble.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MessageBubble = ({ message, isUser }:{message:any,isUser:any}) => {
  return (
    <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.botBubble]}>
      <Text style={{color:isUser? "white":"black"}}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  userBubble: {
    backgroundColor: 'rgb(239 68 68)',
    alignSelf: 'flex-end',
    fontWeight:700
  },
  botBubble: {
    backgroundColor: '#E5E5EA',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: 'black',
  },
});

export default MessageBubble;