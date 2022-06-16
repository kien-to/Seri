import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';

const QuantitySelector = ({quantity, setQuantity}) => {
  const onMinus = () => {
      setQuantity(Math.max(quantity-1,0));
  };

  const onPlus = () => {
      setQuantity(quantity+1);
  };

  return (
    <View style={styles.root}>
      <Pressable onPress={onMinus} style={styles.button}>
        <Text style={styles.buttonText}>-</Text>
      </Pressable>

      <Text style={styles.quantity}>{quantity}</Text>

      <Pressable onPress={onPlus} style={styles.button}>
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      justifyContent: 'space-between',
      borderColor: '#d1d1d1',
      width: 100,

  },
  button: {
      width: 25,
      height: 25,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#d1d1d1'
  },
  buttonText: {},
  quantity: {
      color: '#007eb9'
  },
});

export default QuantitySelector;
