// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   Pressable,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import {DataStore} from '@aws-amplify/datastore';
// import {ChatRoom, Message} from '../../models';
// import {Auth} from 'aws-amplify';
// import Feather from 'react-native-vector-icons/Feather';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import EmojiSelector from "react-native-emoji-selector";
// // import * as ImagePicker from "expo-image-picker";

// const MessageInput = ({ chatRoom }) => {
//   const [message, setMessage] = useState("");
//   const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
//   const [image, setImage] = useState<string | null>(null);
//   const [progress, setProgress] = useState(0);
//   const [recording, setRecording] = useState<Audio.Recording | null>(null);
//   const [soundURI, setSoundURI] = useState<string | null>(null);

//   // useEffect(() => {
//   //   (async () => {
//   //     if (Platform.OS !== "web") {
//   //       const libraryResponse =
//   //         await ImagePicker.requestMediaLibraryPermissionsAsync();
//   //       const photoResponse = await ImagePicker.requestCameraPermissionsAsync();
//   //       await Audio.requestPermissionsAsync();

//   //       if (
//   //         libraryResponse.status !== "granted" ||
//   //         photoResponse.status !== "granted"
//   //       ) {
//   //         alert("Sorry, we need camera roll permissions to make this work!");
//   //       }
//   //     }
//   //   })();
//   // }, []);

//   const sendMessage = async () => {
//     // send message
//     const user = await Auth.currentAuthenticatedUser();
//     const newMessage = await DataStore.save(
//       new Message({
//         content: message,
//         userID: user.attributes.sub,
//         chatroomID: chatRoom.id,
//       })
//     );

//     updateLastMessage(newMessage);

//     resetFields();
//   };

//   const updateLastMessage = async (newMessage) => {
//     DataStore.save(
//       ChatRoom.copyOf(chatRoom, (updatedChatRoom) => {
//         updatedChatRoom.LastMessage = newMessage;
//       })
//     );
//   };

//   const onPlusClicked = () => {
//     console.warn("On plus clicked");
//   };

//   // const onPress = () => {
//   //   if (image) {
//   //     sendImage();
//   //   } else if (soundURI) {
//   //     sendAudio();
//   //   } else if (message) {
//   //     sendMessage();
//   //   } else {
//   //     onPlusClicked();
//   //   }
//   // };

//   // const resetFields = () => {
//   //   setMessage("");
//   //   setIsEmojiPickerOpen(false);
//   //   setImage(null);
//   //   setProgress(0);
//   //   setSoundURI(null);
//   // };

//   // Image picker
//   // const pickImage = async () => {
//   //   const result = await ImagePicker.launchImageLibraryAsync({
//   //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
//   //     allowsEditing: true,
//   //     aspect: [4, 3],
//   //     quality: 0.5,
//   //   });

//   //   if (!result.cancelled) {
//   //     setImage(result.uri);
//   //   }
//   // };

//   // const takePhoto = async () => {
//   //   const result = await ImagePicker.launchCameraAsync({
//   //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
//   //     aspect: [4, 3],
//   //   });

//   //   if (!result.cancelled) {
//   //     setImage(result.uri);
//   //   }
//   // };

//   // const progressCallback = (progress) => {
//   //   setProgress(progress.loaded / progress.total);
//   // };

//   // const sendImage = async () => {
//   //   if (!image) {
//   //     return;
//   //   }
//   //   const blob = await getBlob(image);
//   //   const { key } = await Storage.put(`${uuidv4()}.png`, blob, {
//   //     progressCallback,
//   //   });

//   //   // send message
//   //   const user = await Auth.currentAuthenticatedUser();
//   //   const newMessage = await DataStore.save(
//   //     new Message({
//   //       content: message,
//   //       image: key,
//   //       userID: user.attributes.sub,
//   //       chatroomID: chatRoom.id,
//   //     })
//   //   );

//   //   updateLastMessage(newMessage);

//   //   resetFields();
//   // };

//   // const getBlob = async (uri: string) => {
//   //   const respone = await fetch(uri);
//   //   const blob = await respone.blob();
//   //   return blob;
//   // };

//   // async function startRecording() {
//   //   try {
//   //     await Audio.setAudioModeAsync({
//   //       allowsRecordingIOS: true,
//   //       playsInSilentModeIOS: true,
//   //     });

//   //     console.log("Starting recording..");
//   //     const { recording } = await Audio.Recording.createAsync(
//   //       Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
//   //     );
//   //     setRecording(recording);
//   //     console.log("Recording started");
//   //   } catch (err) {
//   //     console.error("Failed to start recording", err);
//   //   }
//   // }

//   // async function stopRecording() {
//   //   console.log("Stopping recording..");
//   //   if (!recording) {
//   //     return;
//   //   }

//   //   setRecording(null);
//   //   await recording.stopAndUnloadAsync();
//   //   await Audio.setAudioModeAsync({
//   //     allowsRecordingIOS: false,
//   //   });

//   //   const uri = recording.getURI();
//   //   console.log("Recording stopped and stored at", uri);
//   //   if (!uri) {
//   //     return;
//   //   }
//   //   setSoundURI(uri);
//   // }

//   // const sendAudio = async () => {
//   //   if (!soundURI) {
//   //     return;
//   //   }
//   //   const uriParts = soundURI.split(".");
//   //   const extenstion = uriParts[uriParts.length - 1];
//   //   const blob = await getBlob(soundURI);
//   //   const { key } = await Storage.put(`${uuidv4()}.${extenstion}`, blob, {
//   //     progressCallback,
//   //   });

//   //   // send message
//   //   const user = await Auth.currentAuthenticatedUser();
//   //   const newMessage = await DataStore.save(
//   //     new Message({
//   //       content: message,
//   //       audio: key,
//   //       userID: user.attributes.sub,
//   //       chatroomID: chatRoom.id,
//   //     })
//   //   );

//   //   updateLastMessage(newMessage);

//   //   resetFields();
//   // };

//   return (
//     <KeyboardAvoidingView
//       style={[styles.root, { height: isEmojiPickerOpen ? "50%" : "auto" }]}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       keyboardVerticalOffset={100}
//     >
//       {image && (
//         <View style={styles.sendImageContainer}>
//           <Image
//             source={{ uri: image }}
//             style={{ width: 100, height: 100, borderRadius: 10 }}
//           />

//           <View
//             style={{
//               flex: 1,
//               justifyContent: "flex-start",
//               alignSelf: "flex-end",
//             }}
//           >
//             <View
//               style={{
//                 height: 5,
//                 borderRadius: 5,
//                 backgroundColor: "#3777f0",
//                 width: `${progress * 100}%`,
//               }}
//             />
//           </View>

//           <Pressable onPress={() => setImage(null)}>
//             <AntDesign
//               name="close"
//               size={24}
//               color="black"
//               style={{ margin: 5 }}
//             />
//           </Pressable>
//         </View>
//       )}

//       {/* {soundURI && <AudioPlayer soundURI={soundURI} />} */}

//       <View style={styles.row}>
//         <View style={styles.inputContainer}>
//           <Pressable
//             onPress={() =>
//               setIsEmojiPickerOpen((currentValue) => !currentValue)
//             }
//           >
//             <SimpleLineIcons
//               name="emotsmile"
//               size={24}
//               color="#595959"
//               style={styles.icon}
//             />
//           </Pressable>

//           <TextInput
//             style={styles.input}
//             value={message}
//             onChangeText={setMessage}
//             placeholder="Signal message..."
//           />

//           <Pressable onPress={pickImage}>
//             <Feather
//               name="image"
//               size={24}
//               color="#595959"
//               style={styles.icon}
//             />
//           </Pressable>

//           <Pressable onPress={takePhoto}>
//             <Feather
//               name="camera"
//               size={24}
//               color="#595959"
//               style={styles.icon}
//             />
//           </Pressable>

//           <Pressable onPressIn={startRecording} onPressOut={stopRecording}>
//             <MaterialCommunityIcons
//               name={recording ? "microphone" : "microphone-outline"}
//               size={24}
//               color={recording ? "red" : "#595959"}
//               style={styles.icon}
//             />
//           </Pressable>
//         </View>

//         <Pressable onPress={onPress} style={styles.buttonContainer}>
//           {message || image || soundURI ? (
//             <Ionicons name="send" size={18} color="white" />
//           ) : (
//             <AntDesign name="plus" size={24} color="white" />
//           )}
//         </Pressable>
//       </View>

//       {isEmojiPickerOpen && (
//         <EmojiSelector
//           onEmojiSelected={(emoji) =>
//             setMessage((currentMessage) => currentMessage + emoji)
//           }
//           columns={8}
//         />
//       )}
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   root: {
//     padding: 10,
//   },
//   row: {
//     flexDirection: "row",
//   },
//   inputContainer: {
//     backgroundColor: "#f2f2f2",
//     flex: 1,
//     marginRight: 10,
//     borderRadius: 25,
//     borderWidth: 1,
//     borderColor: "#dedede",
//     alignItems: "center",
//     flexDirection: "row",
//     padding: 5,
//   },
//   input: {
//     flex: 1,
//     marginHorizontal: 5,
//   },
//   icon: {
//     marginHorizontal: 5,
//   },
//   buttonContainer: {
//     width: 40,
//     height: 40,
//     backgroundColor: "#3777f0",
//     borderRadius: 25,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 35,
//   },

//   sendImageContainer: {
//     flexDirection: "row",
//     marginVertical: 10,
//     alignSelf: "stretch",
//     justifyContent: "space-between",
//     borderWidth: 1,
//     borderColor: "lightgray",
//     borderRadius: 10,
//   },
// });

// export default MessageInput;

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {DataStore} from '@aws-amplify/datastore';
import {ChatRoom, Message} from '../../models';
import {Auth} from 'aws-amplify';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import ImagePicker from 'react-native-image-picker';
// import EmojiSelector from "react-native-emoji-selector";

const MessageInput = ({chatRoom}) => {
  const [message, setMessage] = useState('');

    useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const libraryResponse =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        const photoResponse = await ImagePicker.requestCameraPermissionsAsync();
        await Audio.requestPermissionsAsync();

        if (
          libraryResponse.status !== "granted" ||
          photoResponse.status !== "granted"
        ) {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const sendMessage = async () => {
    // send message
    const user = await Auth.currentAuthenticatedUser();
    const newMessage = await DataStore.save(
      new Message({
        content: message,
        userID: user.attributes.sub,
        chatroomID: chatRoom.id,
      }),
    );

    
    updateLastMessage(newMessage);

    setMessage('');
  };

  const updateLastMessage = async (newMessage: Message | null | undefined) => {
    console.log(newMessage);
    DataStore.save(
      ChatRoom.copyOf(chatRoom, updatedChatRoom => {
        updatedChatRoom.LastMessage = newMessage;
      }),
    );
  };

  const onPlusClicked = () => {
    console.warn('Cannot send empty message');
  };

  const onPress = () => {
    if (message) {
      sendMessage();
    } else {
      onPlusClicked();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}>
      <View style={styles.inputContainer}>
        <SimpleLineIcons
          name="emotsmile"
          size={24}
          color="#595959"
          style={styles.icon}
        />

        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Signal message..."
        />

        <Feather name="camera" size={24} color="#595959" style={styles.icon} />
        <MaterialCommunityIcons
          name="microphone-outline"
          size={24}
          color="#595959"
          style={styles.icon}
        />
      </View>
      <Pressable onPress={onPress} style={styles.buttonContainer}>
        {message ? (
          <Ionicons name="send" size={18} color="white" />
        ) : (
          <AntDesign name="plus" size={24} color="white" />
        )}
      </Pressable>

    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    padding: 10,
  },
  inputContainer: {
    backgroundColor: '#f2f2f2',
    flex: 1,
    marginRight: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#dedede',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
  },
  input: {
    flex: 1,
    marginHorizontal: 5,
  },
  icon: {
    marginHorizontal: 5,
  },
  buttonContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#3777f0',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 35,
  },
});

export default MessageInput;