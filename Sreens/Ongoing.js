import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from "@react-navigation/native";

const OnGoing = () => {
    const [cartItems, setCartItems] = useState([]);
    const [token, setToken] = useState("");

    useEffect(() => {
        const retrieveToken = async () => {
            try {
                const authToken = await SecureStore.getItemAsync("authToken");
                if (authToken) {
                    setToken(authToken);
                    fetchData(authToken);
                }
            } catch (error) {
                console.log(error);
            }
        };

        retrieveToken();
    }, []);

    const fetchData = async (token) => {
        try {
            const response = await axios.get('https://grocery-9znl.onrender.com/api/v1/cart/ongoingorders', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCartItems(response.data.data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const confirmDelivery = async (orderId) => {
        try {
            const response = await axios.post(`https://grocery-9znl.onrender.com/api/v1/cart/confirmdelivery/${orderId}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);

        } catch (error) {
            console.error('Error confirming delivery:', error);

        }
    };
    const navigation = useNavigation();
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.cartTitle}>On Going</Text>
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.cartItem}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={styles.itemName}>location</Text>
                            <Text style={styles.itemName}>location</Text>
                            <Text style={styles.itemName}>Price:</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={styles.itemDetails}> {item.transactionId}</Text>
                            <Text style={styles.itemDetail}>{item.deliveryAddress}</Text>
                            <Text style={styles.itemDetail}> ${item.totalAmount}</Text>
                        </View>
                        <TouchableOpacity style={styles.addToCartButton} onPress={() => confirmDelivery(item._id)}>

                            <Text  onPress={() => navigation.navigate("OrderHistory")}>Complete</Text>
                        </TouchableOpacity>

                    </View>
                )}
            />
              {/* <TouchableOpacity style={styles.addToCartButton} onPress={() => confirmDelivery(item._id)}>

<Text  onPress={() => navigation.navigate("OrderHistory")}>Complete</Text>
</TouchableOpacity> */}

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
    },
    cartTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    quantity: {
        flex: 1,
        justifyContent: "space-between",
        flexDirection: 'row',
        marginLeft: 280,
        marginRight: 2,
    },
    cartItem: {
        marginVertical: 10,
        padding: 3,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
        justifyContent: 'center'
    },
    addToCartButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        flexDirection: "row"

    },
    itemDetail: {
        fontSize: 12,
        marginBottom: 5,
        flexDirection: "row"
    },
    itemDetails: {
        fontSize: 12,
        marginBottom: 5,
        flexDirection: "row"
    },
    actionButton: {
        color: 'black',
        fontSize: 24,
        marginHorizontal: 10,
    },
});


export default OnGoing;
