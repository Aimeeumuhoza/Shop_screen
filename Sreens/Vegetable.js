
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const CategoryScreen = ({ route }) => {
 const { category } = route.params;
 
  const [groceries, setGroceries] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = 'https://grocery-9znl.onrender.com/api/v1';
  //  const CATEGORY_ID = '65357d57f12138d1ae5c9590'; 
  const TOKEN='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM3ZjAzNGI3OTMyNjUyOWM1YzRlMTEiLCJpYXQiOjE2OTgyMjk1NDMsImV4cCI6MTY5ODI0MDM0M30.dAXFI16doU2nhwFaz2xOMTNudC2xUdH1o4D5LIu9Ghc';
  
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
  }, []); // Empty dependency array ensures that the effect runs once after the initial render

  
  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={groceries}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.categoryItem}>
              <Image style={styles.image} source={{ uri: item.picture }} />
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.price}>${item.price}</Text>
            </View>
          )}
        />
      )}
      <Text>HH</Text>
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
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: '#4CAF50',
  },
});

export default CategoryScreen;



