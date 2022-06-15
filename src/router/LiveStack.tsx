import {View, Text, TextInput, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import BottomTabNav from './bottomTabNav';
import ProductScreen from '../screens/ProductScreen/index';
import {Header} from 'react-native/Libraries/NewAppScreen';
import Feather from 'react-native-vector-icons/Feather';
import LiveScreen from '../screens/LiveScreen';
import PlayScreen from '../screens/PlayScreen';
import PushScreen from '../screens/PushScreen';

const Stack = createStackNavigator();

interface headerComponentProps {
  searchValue: string;
  setSearchValue: () => void;
}

const HeaderComponent = ({
  searchValue,
  setSearchValue,
}: headerComponentProps) => {
  return (
    <SafeAreaView style={{backgroundColor: '#E50914'}}>
      <View
        style={{
          margin: 10,
          padding: 5,
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Feather name="search" size={20} />
        <TextInput
          style={{height: 40, marginLeft: 10}}
          placeholder="Search ..."
          value={searchValue}
          onChangeText={setSearchValue}
        />
      </View>
    </SafeAreaView>
  );
};

const LiveStack = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
        <Stack.Screen
          name="Home"
          component={LiveScreen}
          options={{ title: "iShow" }}
        />
        <Stack.Screen name="Play" component={PlayScreen} />
        <Stack.Screen name="Push" component={PushScreen} />
      </Stack.Navigator>
  );
};

export default LiveStack;
