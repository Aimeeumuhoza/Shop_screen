
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";

const CategoryScreen = ({ route }) => {
  const { category } = route.params;

  const [groceries, setGroceries] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = 'https://grocery-9znl.onrender.com/api/v1';
  const TOKEN='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM4YWUxYzE4ZTU1YTc4NDA0MzUxNmQiLCJpYXQiOjE2OTgzMjg3MzQsImV4cCI6MTY5ODMzOTUzNH0.GyYY9_FnZtWACW80ZN5nPNs1l59XY9ofrTzkqgzKPpI'; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/grocery/bycategory/${category}`,
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`
            },
          }
        );
        setGroceries(response.data.data);
      } catch (error) {
        console.error('Error fetching groceries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading..</Text>
      ) : (
        <FlatList
          data={groceries}
          keyExtractor={(item) => item._id}
          numColumns={2} 
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.categoryItem} onPress={() => navigation.navigate('Cart', { item: item })}>
              <Image style={styles.image} source={{ uri: item.picture }} />
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.price}>${item.price}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  categoryItem: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 8, // Adjust the horizontal margin for proper spacing between items
    flex: 1, // Ensure equal spacing between items in the row
    minWidth: '48%', // Set minimum width for each item to ensure two items in a row
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  price: {
    fontSize: 16,
    color: '#4CAF50',
  },
});

export default CategoryScreen;



