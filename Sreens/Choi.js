import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { Ionicons, Feather, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const Choi = ({ route }) => {
  const { item } = route.params;
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

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
        <Image source={item.Image} style={styles.image} />
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>$ {item.price}</Text>
      </View>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.label}>How many do you want?</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={handleDecrement} style={styles.quantityButton}>
          <MaterialCommunityIcons name="minus" size={24} color="green" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity onPress={handleIncrement} style={styles.quantityButton}>
          <MaterialCommunityIcons name="plus" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.addToCart}>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Add To Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Choi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    marginTop: 40,
    alignContent:'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    flexDirection: 'row',
    marginEnd: 20,

  },
  imageContainer: {
    marginTop: 20,
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
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
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
  },
  quantityButton: {
    backgroundColor: '#E0E0E0',
    padding: 10,
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 20,
  },
  addToCart: {
  
   
  },
  addToCartButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width:'100%',
    marginTop:78
    
  },
  addToCartText: {
    color: 'white',
    fontSize: 18,
    alignContent:'center',
    justifyContent:'center',
    marginLeft:89
  },
});
