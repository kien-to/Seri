import * as React from 'react';
import { Image, FlatList, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from '../Themed';

import styles from './styles';
interface HomeCategoryProps {
    product: {
        id: string;
        description: string;
        title: string;
        image: string;
        images: string;
        avgRating: number;
        ratings: number;
        price: number;
        oldPrice?: number;
      };
}

const HomeCategory = (props: HomeCategoryProps) => {
    const { product } = props;
    console.log(product);
    const navigation = useNavigation();

    const onMoviePress = () => {
        navigation.navigate('ProductDetails', { id: product.id })
    }

    return (
        <>
            <Text style={styles.title}>{product.description}</Text>
            <FlatList
                data={product.images}
                renderItem={({item}) => (
                    <Pressable onPress={() => onMoviePress()}>
                        <Image style={styles.image} source={{ uri: item }} />
                    </Pressable>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </>
    );
}

export default HomeCategory;