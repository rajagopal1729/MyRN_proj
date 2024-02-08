import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Dimensions, Image, StyleSheet } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import axios from 'axios';

const { width } = Dimensions.get('window');

const ProductDetailsScreen = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const fetchProductDetail = async () => {
    await axios.get(`https://dummyjson.com/products/${productId}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error(error));
    };
    fetchProductDetail();
  }, [productId]);

  const renderCarouselItem = ({ item }) => (
    <Image source={{ uri: item }} style={styles.carouselImage} />
  );

  if (!product) return <Text>Loading...</Text>;

  return (
    <ScrollView>
      <Carousel
        data={product.images}
        renderItem={renderCarouselItem}
        sliderWidth={width}
        itemWidth={width}
        onSnapToItem={(index) => setActiveSlide(index)}
        style={{borderColor:'#666', borderWidth:2, borderRadius:5}}
      />
      <Pagination
        dotsLength={product.images.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.paginationDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
      <View style={styles.productDetails}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{product.title}</Text>
          <Text style={{ fontSize: 16, marginVertical: 5 }}>Price: ${product.price}</Text>
          <Text style={{ fontSize: 16, marginVertical: 5 }}>Discount Percentage: ${product.discountPercentage}</Text>
          <Text style={{ fontSize: 16, marginVertical: 5 }}>Rating: ${product.rating}</Text>
          <Text style={{ fontSize: 16, marginVertical: 5 }}>Stock: ${product.stock}</Text>
          <Text style={{ fontSize: 16, marginVertical: 5 }}>${product.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  carouselImage: {
    width: width,
    height: 300,
  },
  paginationContainer: {
    backgroundColor: 'transparent',
    paddingVertical: 8,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
  },
  productDetails: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 10,
  },
});

export default ProductDetailsScreen;
