import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, upadteQuantity } from '../Redux/action';
import { calcTotal } from '../utils/total';
import { updateCartQuantity } from '../Redux/apiCall';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";


const CartScreen = () => {
  const cartItems = useSelector((state) => state.carts.carts);
  const dispatch = useDispatch();
  const totalPrice = calcTotal(cartItems);
  const [authToken, setToken] = useState();

  const retrieveToken = async () => {
    try {
      const authToken = await SecureStore.getItemAsync("authToken");
      if (authToken) {
        setToken(authToken);
      }
    } catch (error) {
      console.log(error);
    }
    // console.log(authToken)
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      const quantity = Number(newQuantity);

      const response = await updateCartQuantity(dispatch, authToken, productId, newQuantity);
      dispatch(upadteQuantity({ productId, newQuantity: quantity }));
      console.log("Quantity updated successfully:", response);
    } catch (error) {
      console.log(error)
    }
  }

  const handleIncrement = (productId, currentQuantity) => {
    dispatch(increment({ payload: productId }));
    const newQuantity = currentQuantity + 1;
    handleUpdateQuantity(productId, newQuantity);
  };
  const handleDecrement = (productId, currentQuantity) => {
    dispatch(decrement(productId));
    const newQuantity = currentQuantity - 1;
    handleUpdateQuantity(productId, newQuantity);
  };

  useEffect(() => {
    retrieveToken();
  }, [authToken])
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Text style={styles.cartTitle}>Shopping Cart</Text>
      <Text style={styles.totalPrice}>Total Price: ${totalPrice}</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.picture }} style={styles.image} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>Price: ${item.price * item.quantity}</Text>
              <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
              <TouchableOpacity onPress={() => dispatch(increment({payload:item._id}))}>
              {/* handleIncrement(item._id, item.quantity) */}
                <Text style={styles.actionButton}>Increase Quantity</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => dispatch(decrement(item._id))}>
              {/* handleDecrement(item._id, item.quantity) */}
                <Text style={styles.actionButton}>decrease Quantity</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
           <TouchableOpacity onPress={() => navigation.navigate("ShopScreen")} style={styles.addToCartButton}>
        <Text style={styles.buttonText}>Checkout</Text>
      </TouchableOpacity>
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
    marginTop: 22,
  },
  cartItem: {
    marginVertical: 10,
    padding: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    marginBottom: 5,
  },
  itemQuantity: {
    fontSize: 16,
    marginBottom: 10,
  },
  actionButton: {
    color: 'green',
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
});

export default CartScreen;
