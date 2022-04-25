import {View, Text, SafeAreaView, Pressable} from 'react-native';
import React from 'react';
import { Auth } from 'aws-amplify';
import Button from '../../components/Button';

const MenuScreen = () => {
  const onLogOut = () => {
    Auth.signOut();
  }

  return (
    <SafeAreaView>
      <Pressable onPress={onLogOut}>
        <Button text="Sign Out" onPress={onLogOut}/>
      </Pressable>
    </SafeAreaView>
  );
};

export default MenuScreen;
