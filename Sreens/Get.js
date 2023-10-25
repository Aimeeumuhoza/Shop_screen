// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image } from 'react-native';
// import axios from 'axios';

// const API_BASE_URL = 'https://grocery-9znl.onrender.com/api/v1';
// const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM3ZjAzNGI3OTMyNjUyOWM1YzRlMTEiLCJpYXQiOjE2OTgxNjk3MzQsImV4cCI6MTY5ODE4MDUzNH0.Qt36I9sv52VT_Kfj-sUuNOhAEssYoiqx529MLbrWPYY';

// const CategoriesComponent = () => {
//     const [categories, setCategories] = useState([]);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState("");

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setLoading(true)
//                 const response = await axios.get(`${API_BASE_URL}/category`, {
//                     headers: {
//                         Authorization: `Bearer ${TOKEN}`
//                     }
//                 });
//                 setCategories(response.data.data);
//                 setLoading
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//                 setError('Error fetching categories. Please try again later.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);
// console.log(categories)
//     const renderItem = ({ item }) => (
//         <View style={styles.categoryItem}>
//             <Image source={{ uri: item.picture }} style={styles.categoryImage} />
//             <Text style={styles.categoryName}>{item.name}</Text>
//         </View>
//     );

//     return (
//         <View style={styles.container}>
//             {loading ? 
//             <ActivityIndicator size="large" color="#0000ff" />
//             : <FlatList
//                 numColumns={3}
//                 data={categories}
//                 renderItem={renderItem}
//                 keyExtractor={(item) => item._id}
//                 style={styles.flatList}
//             />
//     }
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 20,
//         // backgroundColor: 'black'
//     },
//     flatList: {
//         width: '100%'
//     },
//     categoryItem: {
//         backgroundColor: '#F5F5F5',
//         borderRadius: 8,
//         padding: 15,
//         marginVertical: 10,
//         width: '90%',
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     categoryName: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#008C25',
//         marginLeft: 15,
//     },
//     categoryImage: {
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//     },
//     errorText: {
//         color: 'red',
//         fontSize: 16,
//         marginTop: 20,
//     },
// });

// export default CategoriesComponent;

// const CategoriesComponent = () => {
//     // const navigation = useNavigation()
//     const [categories, setCategories] = useState([])
    
//     const getCategories = async () => {
//         try {
//             const res = await axios.get(`${API_BASE_URL}/category`, {
//             headers: {
//               Authorization: `Bearer ${TOKEN}`
//                                     }
//              })
//             setCategories(res.data);
//         } catch (error) {
//             console.log({ "error": error });
//         }
//     }  
//     useEffect(() => {
//         getCategories()
//     }, [])
//     console.log(categories);
    
    
//     return (
//         <View style={styles.container}>
//             <FlatList
//                 numColumns={2}
//                 data={categories}
//                 keyExtractor={(item, index) => item._id}
//                 renderItem={({ item }) => (
//                     <View style={styles.cardContainer}>
//                         <View>
//                             <View style={styles.card} key={item._id}>
//                                 <Image
//                                     style={styles.image}
//                                     source={{ uri: item.picture }}
//                                 />
//                                 <Text style={styles.text1}>{item.name}</Text>
                               
                              
//                             </View>
//                         </View>
//                     </View>
//                 )}
//             />
//              <Text style={styles.text1}>hhh</Text>
//         </View>
//     )
// }
// export default CategoriesComponent;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 10,
//         backgroundColor: 'blue',
//     },
//     cardContainer: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         margin: 10,
//     },
//     card: {
//         width: 150,
//         height: 200,
//         borderRadius: 10,
//         backgroundColor: 'white',
//         elevation: 3,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     image: {
//         width: 100,
//         height: 100,
//         resizeMode: 'cover',
//         borderRadius: 50,
//         marginBottom: 10,
//     },
//     text1: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#333',
//     },
// });

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-web';
import { useNavigation } from "@react-navigation/native";

const API_BASE_URL = 'https://grocery-9znl.onrender.com/api/v1';
 const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM3ZjAzNGI3OTMyNjUyOWM1YzRlMTEiLCJpYXQiOjE2OTgyMjQwNDcsImV4cCI6MTY5ODIzNDg0N30.yxjkmE9gpG7lKFiGTOvZXDYjLxUSCEUntCXVor3NwS0';

const CategoriesComponent = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const getCategories = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/category`,{
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
             } );
            setCategories(res.data.data);
        } catch (error) {
            console.log('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);
console.log(categories)
const navigation = useNavigation()
return (
    <View style={styles.container}>
        {loading ? (
            <Text>Loading...</Text>
        ) : (
            <View style={styles.categoriesContainer}>
                {categories.map((item) => (
                    <TouchableOpacity
                        key={item._id}
                        style={styles.categoryItem}
                        onPress={() => navigation.navigate('CategoryScreen', { category: item._id })}
                    >
                        <Image
                            style={styles.image}
                            source={{ uri: item.picture }}
                        />
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        )}
    </View>
);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    categoriesContainer: {
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
    },
    categoryItem: {
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 10,
        alignItems: 'center', 
        width: '25%',
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 50,
        marginBottom: 10,
    },
});

export default CategoriesComponent;
