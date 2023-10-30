import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { removeFromCart, increment, decrement } from '../Redux/action';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const ShopScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [token, setToken] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        const authToken = await SecureStore.getItemAsync("authToken");
        if (authToken) {
          setToken(authToken);
          fetchData(authToken);
        }
      } catch (error) {
        console.log(error);
      }
    };

    retrieveToken();
  }, []);

  const fetchData = async (token) => {
    try {
      const response = await axios.get('https://grocery-9znl.onrender.com/api/v1/cart', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCartItems(response.data.data.items);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.grocery.price * item.count, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.cartTitle}>Shopping Cart</Text>
      <Text style={styles.totalPrice}>Total Price: ${totalPrice}</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image style={styles.image} source={{ uri: item.grocery.picture }} />
            <View style={{}}>
            <Text style={styles.itemName}>{item.grocery.name}</Text>
            <Text style={styles.itemDetail}>Price: ${item.grocery.price * item.count}</Text>
            <View style={styles.quantity}>
              <TouchableOpacity onPress={() => dispatch(increment(item.grocery))}>
                <Text style={styles.actionButton}>+</Text>
              </TouchableOpacity>
              <Text style={styles.itemDetail}>Quantity: {item.count}</Text>
              <TouchableOpacity onPress={() => dispatch(decrement(item.grocery._id))}>
                <Text style={styles.actionButton}>-</Text>
              </TouchableOpacity>
            </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  cartTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  quantity:{
    marginTop:23,
    flexDirection:'row',
    justifyContent:'flex-end',
    right: 30
  },
  cartItem: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDetail: {
    fontSize: 16,
    marginBottom: 5,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'right',
  },
  actionButton: {
    color: 'black',
    fontSize: 24,
    marginHorizontal: 10,
  },
});

export default ShopScreen;
