import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Pressable, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
 
import styles from './styles';

const MessageInput = () => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    // send message
    console.warn("sending: ", message);

    setMessage('');
  }

  const onPlusClicked = () => {
    console.warn("On plus clicked");
  }

  const onPress = () => {
    if (message) {
      sendMessage();
    } else {
      onPlusClicked();
    }
  }

  return (
    <KeyboardAvoidingView 
      style={styles.root} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <View style={styles.inputContainer}>
        <SimpleLineIcons name="emotsmile" size={24} color="#595959" style={styles.icon} />
        
        <TextInput 
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Signal message..."
        />
        
        <Feather name="camera" size={24} color="#595959" style={styles.icon} />
        <MaterialCommunityIcons name="microphone-outline" size={24} color="#595959" style={styles.icon} />
      </View>
      <Pressable onPress={onPress} style={styles.buttonContainer}>
        {message ? <Ionicons name="send" size={18} color="white" /> : <AntDesign name="plus" size={24} color="white" />}
      </Pressable>
    </KeyboardAvoidingView>
  )
}

export default MessageInput
