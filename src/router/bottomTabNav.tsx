import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import HomeScreen from '../screens/HomeScreen';
import Entypo from 'react-native-vector-icons/Entypo';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import HomeStack from './LiveStack';
import ChatStack from './ChatStack';
import ShoppingCartStack from './ShoppingCartStack';
import ProductStack from './ProductStack';
import LogOutScreen from '../screens/LogOutScreen';
// import ChatRoomScreen from '../screens/ChatRoomScreen';
// import LiveStack from './LiveStack';

const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBarOptions={{
        // showLabel: false,
        inactiveTintColor: '#000000',
        activeTintColor: '#E50914',
      }}>
      <Tab.Screen
        component={ProductStack}
        name="Home"
        options={{
          tabBarIcon: ({color, size}) => (
            <Entypo name="home" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        component={ShoppingCartStack}
        name="Cart"
        options={{
          tabBarIcon: ({color, size}) => (
            <Entypo name="shopping-cart" color={color} size={25} />
          ),
        }}
      />
      {/* <Tab.Screen
        component={LiveStack}
        name="Sell"
        options={{
          tabBarIcon: ({color, size}) => (
            <Entypo name="camera" color={color} size={25} />
          ),
        }}
      /> */}
      <Tab.Screen
        component={ChatStack}
        name="Notification"
        options={{
          tabBarIcon: ({color, size}) => (
            <Entypo name="message" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        component={LogOutScreen}
        name="Menu"
        options={{
          tabBarIcon: ({color, size}) => (
            <Entypo name="menu" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
