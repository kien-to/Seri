import {Image, Text, View} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import QuantitySelector from '../QuantitySelector';

interface CartProductItemProps {
  cartItem: {
    id: string;
    quantity: number;
    option?: string;
    item: {
      id: string;
      title: string;
      image: string;
      avgRating: number;
      ratings: number;
      price: number;
      oldPrice?: number;
    };
  };
}

const CartProductItem = ({cartItem}: CartProductItemProps) => {
  console.log(cartItem)

  const {quantity: quantityProp, product} = cartItem;
  const [quantity, setQuantity] = useState(quantityProp);

  return (
    <View style={styles.root}>
      <Image style={styles.image} source={{uri: product.image}} />

      <View style={styles.rightContainer}>
        <Text style={styles.title} numberOfLines={3}>
          {product.title}
        </Text>
        {/* Ratings */}
        <View style={styles.ratingsContainer}>
          {[0, 0, 0, 0, 0].map((e, i) => (
            <FontAwesome
              key={`${product.id}-${i}`}
              style={styles.star}
              name={i < Math.floor(product.avgRating) ? 'star' : 'star-o'}
              size={18}
              color={'#e47911'}
            />
          ))}
          <Text>{product.ratings}</Text>
        </View>
        <Text style={styles.price}>
          {' '}
          from ${product.price.toFixed(2)}
          {product.oldPrice && (
            <Text style={styles.oldPrice}> ${product.oldPrice.toFixed(2)}</Text>
          )}
        </Text>
      </View>
      <View style={styles.quantityContainer}>
        <QuantitySelector
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </View>
    </View>
  );
};

export default CartProductItem;
