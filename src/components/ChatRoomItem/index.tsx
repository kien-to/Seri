import React, { useEffect, useState } from 'react';
import { Text, Image, View, Pressable, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { Auth, DataStore } from 'aws-amplify';
import { ChatRoomUser, Message, User } from '../../models';

export default function ChatRoomItem({ chatRoom }) {
  const [user, setUser] = useState<User|null>(null); // the display user
  const [lastMessage, setLastMessage] = useState<Message|undefined>();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = (await DataStore.query(ChatRoomUser))
        .filter(chatRoomUser => chatRoomUser.chatroom.id === chatRoom.id)
        .map(chatRoomUser => chatRoomUser.user);

        // console.log(fetchedUsers)
        // setUser(fetchedUsers[0]);

      const authUser = await Auth.currentAuthenticatedUser();
      //console.log(authUser);
      setUser(fetchedUsers.find(user => user.id !== authUser.attributes.sub) || null);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    console.log(chatRoom)
    if (!chatRoom.chatRoomLastMessageId) { return }
    // console.log(chatRoom.chatRoomLastMessageId)
    DataStore.query(Message, chatRoom.chatRoomLastMessageId).then(setLastMessage);
  }, [])

  const onPress = () => {
    navigation.navigate('ChatRoom', { id: chatRoom.id });
  }

  if (!user) {
    return <ActivityIndicator />
  }

  console.log(lastMessage);

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image source={{ uri: user?.imageUri}} style={styles.image} />
      {/* <Text>ChatRoom</Text> */}
      {!!chatRoom.newMessages && <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>{chatRoom.newMessages}</Text>
      </View>}

      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.text}>{lastMessage?.createdAt}</Text>
        </View>
        <Text numberOfLines={1} style={styles.text}>{lastMessage?.content}</Text>
      </View>
    </Pressable>
  );
}