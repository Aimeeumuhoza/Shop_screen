import React from 'react';
import { StyleSheet, View, FlatList, Image, Text, ScrollView } from 'react-native';
import { Ionicons, Feather, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import data from "../assets/Data/data";
import { useNavigation } from '@react-navigation/native';

const { Vegetable, fruits } = data;

const CategoryScreen = ({ route, navigation }) => {
   
  const { category } = route.params;
  let data;
  if (category === 'Vegetable') {
    data = Vegetable;
  } else {
    data = fruits;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="green" onPress={() => navigation.goBack()} />
        <Text style={styles.headerText}>{category}</Text>
        <View style={styles.iconContainer}>
          <Feather name="search" size={24} color="black" style={styles.icon} />
          <AntDesign name="sharealt" size={24} color="black" style={styles.icon} />
        </View>
      </View>
      <FlatList
        numColumns={2}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer} key={item.id}>
            <Image style={styles.image} source={item.Image} />
            <Text style={styles.title}onPress={()=>navigation.navigate('Cart',{item: item,})}>{item.title}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    marginTop:33
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 10,
  },
  itemContainer: {
   padding:9,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    width:'50%'
  },
  image: {
    width: '100%',
    height: 150,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    color: '#4CAF50',
  },
});

export default CategoryScreen;










