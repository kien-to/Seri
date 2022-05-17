import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './styles';

const blue = '#3777f0';
const grey = 'lightgrey';

const myID = 'u1';

const Message = ({ message }) => {

  const isMe = message.user.id === myID;

  return (
    <View style={[styles.container, isMe ? styles.rightContainer : styles.leftContainer]}>
      <Text style={{ color: isMe ? 'black' : 'white'}}>{message.content}</Text>
    </View>
  )
}

export default Message;