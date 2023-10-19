// import React from "react";
// import { View, Text, Image, StyleSheet, FlatList } from "react-native";
// import { Ionicons, AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
// import data from "../assets/Data/data";
// import { useNavigation } from '@react-navigation/native';

// const Vegetable = () => {

//     const navigation = useNavigation()
//     return (
//         <View style={styles.container}>
//             <View style={styles.header}>
//                 <Ionicons name="arrow-back" size={24} color="green" />
//                 <Text style={styles.headerText}>Vegetable</Text>
//                 <View style={styles.iconContainer}>
//                     <Feather name="search" size={24} color="black" style={styles.icon} />
//                     <AntDesign name="sharealt" size={24} color="black" style={styles.icon} />
//                 </View>
//             </View>
//             <View style={styles.header2}>
//                 <AntDesign name="filter" size={24} color="black" />
//                 <Text> filter</Text>
//                 <View style={styles.iconContainer}>
//                     <MaterialCommunityIcons name="sort-reverse-variant" size={24} color="black" />
//                     <Text>Sort</Text>
//                 </View>
//             </View>
//             <FlatList
//                 numColumns={2}
//                 data={data}
//                 keyExtractor={(item) => item._id}
//                 renderItem={({ item }) => (
//                     <View style={styles.cardContainer}>
//                         <View style={styles.card} key={item._id}>
//                             <Image
//                                 style={styles.image}
//                                 source={item.Image}
//                             />
//                             <Text style={styles.text1} onPress={()=>navigation.navigate('Choi',{item: item,})}>{item.title}</Text>
                          
                          



//                             <Text style={styles.text}>$ {item.price}</Text>
//                         </View>
//                     </View>
//                 )}
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         marginTop: 50,
//         backgroundColor: 'white',
//         width: '100%',
//         height: "100%",
      
//     },
//     header: {
//         flexDirection: "row",
//         alignItems: "center",
//         paddingHorizontal: 20,
//         marginTop: -50,
//         marginBottom: 10,
//         padding:43
//     },
//     headerText: {
//         marginLeft: 20,
//         fontSize: 33,
//         fontWeight:'bold'
//     },
//     iconContainer: {
//         flexDirection: "row",
//         marginLeft: "auto",
//     },
//     icon: {
//         marginHorizontal: 10,
//     },
//     header2: {
//         flexDirection: "row",
//         alignItems: "center",
//         paddingHorizontal: 20,
//         marginTop:-34,
        
//     },
//     cardContainer: {
//         flex: 1,
//         flexDirection: "row",
//     },
//     card: {
//         marginTop: 9,
//         marginBottom: 80,
//         backgroundColor: "white",
//         width: 120,
//         height: 200,
//         marginHorizontal: 12,
//         borderRadius: 15,
//     },
//     text: {
//         marginLeft: 30,
//         fontSize: 18,
//         fontWeight: "bold",
//     },
//     text1: {
//         marginLeft: 30,
//         fontSize: 18,
//     },
// });

// export default Vegetable;



import React from 'react';
import { StyleSheet, View, FlatList, Image, Text } from 'react-native';
import { Ionicons, Feather, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import data from "../assets/Data/data";

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
    <View style={styles.container}>
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
            <Text style={styles.title}onPress={()=>navigation.navigate('Choi',{item: item,})}>{item.title}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        )}
      />
    </View>
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










