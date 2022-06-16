import {View, Text, TextInput, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import MenuScreen from '../screens/MenuScreen';
import BottomTabNav from './bottomTabNav';
import ProductScreen from '../screens/ProductScreen';
import {Header} from 'react-native/Libraries/NewAppScreen';
import Feather from 'react-native-vector-icons/Feather';
// import MovieDetailsScreen from '../screens/MovieDetailsScreen';

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

const ProductStack = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <Stack.Navigator
      screenOptions={{
        header: () => (
          <HeaderComponent
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        ),
      }}>
      <Stack.Screen name="HomeScreen" options={{title: 'Home'}}>
        {() => <MenuScreen/>}
      </Stack.Screen>
      <Stack.Screen component={ProductScreen} name="ProductDetails" />
    </Stack.Navigator>
  );
};

export default ProductStack;
