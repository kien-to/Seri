import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import styles from './styles';
import Button from '../../components/Button';
import {Picker} from '@react-native-picker/picker';
import QuantitySelector from '../../components/QuantitySelector';
import ImageCarousel from '../../components/ImageCarousel';
import {Auth, DataStore} from 'aws-amplify';
import {Product, CartProduct} from '../../models';

const ProductScreen = () => {
  const [product, setProduct] = useState<Product | undefined>(undefined);

  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined,
  );
  const [quantity, setQuantity] = useState(1);

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (!route.params?.id) {
      return;
    }
    //console.log(route.params);
    DataStore.query(Product, route.params.id).then(setProduct);
  });

  useEffect(() => {
    if (product?.options) {
      setSelectedOption(product.options[0]);
    }
  }, [product]);

  const onAddToCart = async () => {
    const userData = await Auth.currentAuthenticatedUser();

    if(!product || !userData) {
      return;
    }

    const newCartProduct = new CartProduct({
      userSub: userData.attributes.sub,
      quantity,
      option: selectedOption || null,
      productId: product.id,
      product,
    });

    await DataStore.save(newCartProduct);
    navigation.navigate('Cart');
  };

  if (!product) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView style={styles.root}>
      <Text style={styles.title}>{product.title}</Text>

      {/* Image Carousel */}
      <ImageCarousel images={product.images} />
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
        from ${product.price.toFixed(2)}
        {product.oldPrice && (
          <Text style={styles.oldPrice}> ${product.oldPrice.toFixed(2)}</Text>
        )}
      </Text>

      {/* Description */}
      <Text style={styles.description}>{product.description}</Text>

      {/* Quantity selector */}
      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

      {/* Button */}
      <Button
        text={'Add to Cart'}
        onPress={onAddToCart}
        containerStyles={{
          backgroundColor: '#e3c905',
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
