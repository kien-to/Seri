import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName, View, Text, Image, useWindowDimensions } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import ChatRoomScreen from '../screens/ChatRoomScreen';
import ChatScreen from '../screens/ChatScreen';

const HomeHeader = (props) => {
    const { width } = useWindowDimensions();
  
    return (
      <View style={{ 
        flexDirection: 'row',
        justifyContent: 'space-between', 
        width,
        padding: 10,
        alignItems: 'center',
      }}>
        <Image 
          source={{ uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg'}}
          style={{ width: 30, height: 30, borderRadius: 30}}
        />
        <Text style={{flex: 1, textAlign: 'center', marginLeft: 50, fontWeight: 'bold'}}>Signal</Text>
        <Feather name="camera" size={24} color="black" style={{ marginHorizontal: 10}} />
        <Feather name="edit-2" size={24} color="black" style={{ marginHorizontal: 10}} />
      </View>
    )
  };

const ChatRoomHeader = (props) => {
    const { width } = useWindowDimensions();
    console.log(props);
  
    return (
      <View style={{ 
        flexDirection: 'row',
        justifyContent: 'space-between', 
        width: width - 25,
        marginLeft: 25,
        padding: 10,
        alignItems: 'center',
      }}>
        <Image 
          source={{ uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg'}}
          style={{ width: 30, height: 30, borderRadius: 30}}
        />
        <Text style={{flex: 1, marginLeft: 10, fontWeight: 'bold'}}>{props.children}</Text>
        <Feather name="camera" size={24} color="black" style={{ marginHorizontal: 10}} />
        <Feather name="edit-2" size={24} color="black" style={{ marginHorizontal: 10}} />
      </View>
    )
  }

const Stack = createStackNavigator();

const ChatStack = () => (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={ChatScreen} 
        options={{ headerTitle: HomeHeader }} 
      />
      <Stack.Screen 
        name="ChatRoom" 
        component={ChatRoomScreen}         
        options={{ 
          headerTitle: ChatRoomHeader, 
          headerBackTitleVisible: false,
        }} 
      />
      {/* <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} /> */}
    </Stack.Navigator>
)

export default ChatStack