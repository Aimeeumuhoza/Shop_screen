import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const API_BASE_URL = 'https://grocery-9znl.onrender.com/api/v1';

const CategoriesComponent = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/category`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Error fetching categories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#008C25" />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {categories.map(category => (
        <View key={category.id} style={styles.categoryItem}>
          <Text style={styles.categoryName}>{category.name}</Text>
        </View>
      ))}
    </View>
  );
};
export default CategoriesComponent;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  categoryItem: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    width: '80%',
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#008C25',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 20,
  },
});


