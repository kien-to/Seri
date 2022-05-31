// import React, { useState, useEffect } from 'react';

// import { Text, Image, Pressable, View, StyleSheet, FlatList } from 'react-native';
// import { Auth, DataStore } from 'aws-amplify';
// import { ChatRoom, ChatRoomUser } from '../src/models';
// import ChatRoomItem from '../components/ChatRoomItem';


// export default function TabOneScreen() {
//   const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

//   useEffect(() => {
//     const fetchChatRooms = async () => {
//       const userData = await Auth.currentAuthenticatedUser();

//       const chatRooms = (await DataStore.query(ChatRoomUser))
//         .filter(chatRoomUser => chatRoomUser.user.id === userData.attributes.sub)
//         .map(chatRoomUser => chatRoomUser.chatroom);

//       setChatRooms(chatRooms);
//     };
//     fetchChatRooms();
//   }, []);

//   const logOut = () => {
//     Auth.signOut();
//   }

//   return (
//     <View style={styles.page}>
//        <FlatList 
//         data={chatRooms}
//         renderItem={({ item }) => <ChatRoomItem chatRoom={item} />}
//         showsVerticalScrollIndicator={false}
//       />
//       {/* <Pressable onPress={logOut} style={{backgroundColor: 'red', height: 50, margin: 10, borderRadius: 50, alignItems: 'center', justifyContent: 'center'}}>
//         <Text>Logout</Text>
//       </Pressable> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   page: {
//     backgroundColor: 'white',
//     flex: 1
//   }
// });

import * as React from 'react';

import { Text, Image, View, StyleSheet, FlatList } from 'react-native';
import ChatRoomItem from '../../components/ChatRoomItem';

import chatRoomsData from '../../data/ChatRooms';

export default function ChatScreen() {
  return (
    <View style={styles.page}>
       <FlatList 
        data={chatRoomsData}
        renderItem={({ item }) => <ChatRoomItem chatRoom={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
    
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1
  }
});