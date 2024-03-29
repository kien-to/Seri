import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useNavigation,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {
  ColorSchemeName,
  View,
  Text,
  Image,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import ChatScreen from '../screens/ChatScreen';
import UsersScreen from '../screens/UsersScreen/index';

const HomeHeader = props => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width,
        padding: 10,
        alignItems: 'center',
      }}>
      <Pressable onPress={() => navigation.navigate('UsersScreen')}>
        <Image
          source={{
            uri: 'https://cdn.nba.com/headshots/nba/latest/1040x760/201566.png',
          }}
          style={{width: 30, height: 30, borderRadius: 30}}
        />
      </Pressable>
      <Text
        style={{
          flex: 1,
          textAlign: 'center',
          marginLeft: 50,
          fontWeight: 'bold',
        }}>
        Notifications
      </Text>
      <Feather
        name="camera"
        size={24}
        color="black"
        style={{marginHorizontal: 10}}
      />
      <Feather
        name="edit-2"
        size={24}
        color="black"
        style={{marginHorizontal: 10}}
      />
    </View>
  );
};

const ChatRoomHeader = props => {
  const {width} = useWindowDimensions();
  // console.log(props);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width - 25,
        marginLeft: 25,
        padding: 10,
        alignItems: 'center',
      }}>
      <Image
        source={{
          uri: 'https://cdn.nba.com/headshots/nba/latest/1040x760/201566.png',
        }}
        style={{width: 30, height: 30, borderRadius: 30}}
      />
      <Text style={{flex: 1, marginLeft: 10, fontWeight: 'bold'}}>
        {props.children}
      </Text>
      <Feather
        name="camera"
        size={24}
        color="black"
        style={{marginHorizontal: 10}}
      />
      <Feather
        name="edit-2"
        size={24}
        color="black"
        style={{marginHorizontal: 10}}
      />
    </View>
  );
};

const Stack = createStackNavigator();

const ChatStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={ChatScreen}
      options={{headerTitle: HomeHeader}}
    />
    <Stack.Screen
      name="ChatRoom"
      component={ChatRoomScreen}
      options={{
        headerTitle: ChatRoomHeader,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="UsersScreen"
      component={UsersScreen}
      options={{
        title: 'Users',
      }}
    />
    {/* <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} /> */}
  </Stack.Navigator>
);

export default ChatStack;
