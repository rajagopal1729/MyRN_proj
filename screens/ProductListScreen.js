import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity,Image } from 'react-native';
import axios from 'axios';

const ProductListScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      setProducts(((response.data.products)));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

/*   const handleProductPress = (productId) => {
    navigation.navigate('ProductDetails', { productId });
  }; */

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}>
          <View style={{ flexDirection: 'row', padding: 10, borderColor:'#000', borderRadius:10, borderWidth:1 }}>
            <Image source={{ uri: item.thumbnail }} style={{ width: 100, height: 100 }} />
            <View style={{ flex: 1, paddingLeft: 10 }}>
              <Text>{item.title}</Text>
              <Text>{item.description}</Text>
            </View>
          </View>
        </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default ProductListScreen;
