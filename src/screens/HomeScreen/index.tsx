import {View, StyleSheet, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ProductItem from '../../components/ProductItem';
import {DataStore} from 'aws-amplify';
import {Product} from '../../models'
// import products from '../../data/products';

const HomeScreen = ({searchValue}: {searchValue: string}) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    DataStore.query(Product).then(setProducts);
  }, []);

  return (
    <View style={styles.page}>
      <FlatList 
        data={products}
        renderItem={({item}) => <ProductItem item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 10,
  },
});

export default HomeScreen;
