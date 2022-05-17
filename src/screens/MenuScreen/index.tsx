import * as React from 'react';
import { Image, FlatList } from 'react-native';
import { Text, View } from '../../components/Themed';
import {DataStore} from 'aws-amplify';
import {Product} from '../../models'
import styles from './styles';
import categories from '../../data/categories';
import HomeCategory from '../../components/HomeCategory';
import { useEffect, useState } from 'react';

const MenuScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    DataStore.query(Product).then(setProducts);
  }, []);
  
  return (
    <View style={styles.container}>
        {/* List of categories */}
        <FlatList
            data={products}
            renderItem={({item}) => <HomeCategory product={item} />}
        />
    </View>
  );
}

export default MenuScreen;