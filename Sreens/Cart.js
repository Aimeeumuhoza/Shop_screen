import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { Ionicons, Feather, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { addToCart } from '../Redux/action';
import { useDispatch } from 'react-redux';
import { increment , decrement} from '../Redux/action';
import * as SecureStore from 'expo-secure-store';
import { addProductTocart } from '../Redux/apiCall';

const API_BASE_URL = 'https://grocery-9znl.onrender.com/api/v1';

const Cart = ({ route }) => {
  const { item } = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [authToken, setToken] = useState(); 
  const [quantity ,setQuantity] = useState(1)


  const addProduct = async () => {
    try{
      // addProductTocart(item,dispatch,authToken)
      addProductTocart(item, quantity, dispatch, authToken);
      dispatch(addToCart(item))
      navigation.navigate('CartScreen', item);
    }catch(error){
      console.log(error)
    }
  }
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
  
  useEffect(()=>{
    retrieveToken();
  },[authToken])
  
// console.log(item)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="green" onPress={() => navigation.goBack()} />
        <View style={styles.iconContainer}>
          <Feather name="search" size={24} color="green" style={styles.icon} />
          <AntDesign name="sharealt" size={24} color="green" style={styles.icon} />
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.picture }} style={styles.image} />
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>$ {item.price}</Text>
      </View>
      <View style={styles.description}>
      <Text style={{fontFamily:'NotoSansOsmanya'}} >{item.description}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignContent: 'space-between' }}>
        <Text style={styles.label}>How many do you want?</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity  onPress={() => dispatch(decrement(item._id))} style={styles.quantityButton}>
            <MaterialCommunityIcons name="minus" size={18} color="green" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={() => dispatch(increment({ payload: item._id }))} style={styles.quantityButton}>
            <MaterialCommunityIcons name="plus" size={18} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.addToCart}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={addProduct}
        >
          <Text style={styles.addToCartText}>Add To Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    marginTop: 40,
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    flexDirection: 'row',
    marginEnd: 20,

  },
  imageContainer: {
    marginTop: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 180,
    borderRadius: 75,
  },
  icon: {
    marginHorizontal: 10,
  },
  card: {
    marginTop:32,
    marginVertical: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    // color:'blue'
  },
  price: {
    fontSize: 18,
    color: '#4CAF50',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 34
  },
  quantityButton: {
    backgroundColor: '#E0E0E0',
    padding: 3,
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 20,
  },
  addToCart: {
marginTop:-36,

  },
  addToCartButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '100%',
    marginTop: 100

  },
  addToCartText: {
    color: 'white',
    fontSize: 18,
    alignContent: 'center',
    justifyContent: 'center',
    marginLeft: 89
  },
});
