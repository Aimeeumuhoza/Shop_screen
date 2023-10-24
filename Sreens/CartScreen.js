import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { Ionicons, Feather, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { increment } from '../Redux/action';
import { calcTotal, itemTotal } from '../utils/total';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const cart = useSelector((state) => state.carts)
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch()

  const price = calcTotal(cart.carts)
  
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  // useEffect(() => {
  //   if (item) {
  //     setCartItems([...cartItems, item]);
  //   }
  // }, [item]);

  console.log("ibib",cart.carts)
  console.log(price)

  return (
    <View style={styles.container}>
      <Text>Price{price}</Text>
      <Text style={styles.title}>Cart Items</Text>
      <FlatList
        data={cart.carts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.cartItem} key={index}>
            <Image source={item.Image} style={styles.image} />
            <View>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemPrice}>${item.price * item.quantity}</Text>
            </View>
            <View>
              <Text>Delete</Text>
              <View style={{flexDirection:"row",}}> 
                <TouchableOpacity  style={[styles.quantityButton]}>
                  <MaterialCommunityIcons name="minus" size={18} color="green" style={{gap:3}}/>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => dispatch(increment(item.id))} style={styles.quantityButton}>
                  <MaterialCommunityIcons name="plus" size={18} color="black" />
                </TouchableOpacity>
              </View>
            </View>
           
          </View>
        )}
      />
       <TouchableOpacity
          style={styles.addToCartButton}
         
        >
          <Text style={styles.addToCartText}>Checkout</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: '#4CAF50',
  },
  image: {
    width: 60,
    height: 60
  },
  addToCartButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '100%',
    marginTop: 100,
    alignContent:'center',
    justifyContent:'center'

  },
});

export default CartScreen;
