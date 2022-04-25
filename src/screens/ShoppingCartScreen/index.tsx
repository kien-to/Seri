import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
// import products from '../../data/cart';
import CartProductItem from '../../components/CartProductItem';
import Button from '../../components/Button';
import {CartProduct, Product} from '../../models';
import {DataStore} from 'aws-amplify';

const ShoppingCartScreen = () => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCartProducts = async () => {
      //Query only my cart items
      DataStore.query(CartProduct).then(setCartProducts);
    };
    fetchCartProducts();
  }, []);

  useEffect(() => {
    if (cartProducts.filter(cp => !cp.product).length === 0) {
      return;
    }

    const fetchProducts = async () => {
      const products = await Promise.all(
        cartProducts.map(cartProduct =>
          DataStore.query(Product, cartProduct.productId),
        ),
      );
      
      setCartProducts(currentCartProducts =>
        currentCartProducts.map(cartProduct => ({
          ...cartProduct,
          product: products.find(p => (p?.id || 0) === cartProduct.productId),
        })),
      );
    };

    fetchProducts();
  }, [cartProducts]);

  console.log(cartProducts);

  const totalPrice = cartProducts.reduce(
    (summedPrice, product) =>
      summedPrice + (product?.product?.price || 0) * product.quantity,
    0,
  );

  const onCheckout = () => {
    navigation.navigate('Address');
  };

  if (cartProducts.filter(cp => !cp.product).length !== 0) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.page}>
      {/* Render Product Component */}
      <FlatList
        data={cartProducts}
        renderItem={({item}) => (
          <CartProductItem
            cartItem={item}
            // Render Quantity selector
          />
        )}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View>
            <Text style={{fontSize: 18}}>
              Subtotal ({cartProducts.length} items):{' '}
              <Text style={{color: '#e47911', fontWeight: 'bold'}}>
                ${totalPrice.toFixed(2)}
              </Text>
            </Text>
            <Button
              text="Proceed to checkout"
              onPress={onCheckout}
              containerStyles={{
                backgroundColor: '#f7e300',
                borderColor: '#c7b702',
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
});

export default ShoppingCartScreen;
