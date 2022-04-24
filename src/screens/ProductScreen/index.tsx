import {View, Text, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native'
import styles from './styles';
import product from '../../data/product';
import Button from '../../components/Button';
import {Picker} from '@react-native-picker/picker';
import QuantitySelector from '../../components/QuantitySelector';
import ImageCarousel from '../../components/ImageCarousel';

const ProductScreen = () => {
  const [selectedOption, setSelectedOption] = useState(
    product.options ? product.options[0] : null,
  );
  const [quantity, setQuantity] = useState(1);

  const route = useRoute();
  console.log(route.params);

  return (
    <ScrollView style={styles.root}>
      <Text style={styles.title}>{product.title}</Text>

      {/* Image Carousel */}
      <ImageCarousel images={product.images}/>
      {/* Option Selector */}
      <Picker
        selectedValue={selectedOption}
        onvalueChange={itemValue => setSelectedOption(itemValue)}>
        {product.options.map(option => (
          <Picker.Item label={option} value="java" />
        ))}
      </Picker>

      {/* Price */}
      <Text style={styles.price}>
        {' '}
        from ${product.price}
        {product.oldPrice && (
          <Text style={styles.oldPrice}> ${product.oldPrice}</Text>
        )}
      </Text>

      {/* Description */}
      <Text style={styles.description}>{product.description}</Text>

      {/* Quantity selector */}
      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

      {/* Button */}
      <Button
        text={'Add to Cart'}
        onPress={() => {
          console.warn('Add to cart');
        }}
        containerStyles = {{
            backgroundColor: '#e3c905'
        }}
      />
      <Button
        text={'Buy now'}
        onPress={() => {
          console.warn('Add to cart');
        }}
      />
    </ScrollView>
  );
};

export default ProductScreen;
