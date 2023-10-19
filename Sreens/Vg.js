import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { Ionicons, AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import data from "../assets/Data/data";

const Vg = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="arrow-back" size={24} color="green" />
                <Text style={styles.headerText}>Vegetable</Text>
                <View style={styles.iconContainer}>
                    <Feather name="search" size={24} color="black" style={styles.icon} />
                    <AntDesign name="sharealt" size={24} color="black" style={styles.icon} />
                </View>
            </View>
            <View style={styles.header2}>
                <AntDesign name="filter" size={24} color="black" />
                <Text> filter</Text>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name="sort-reverse-variant" size={24} color="black" />
                    <Text>Sort</Text>
                </View>
            </View>
            <FlatList
                numColumns={2}
                data={data}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.cardContainer}>
                        <View style={styles.card} key={item._id}>
                            <Image
                                style={styles.image}
                                source={item.Image}
                            />
                            <Text style={styles.text1}>{item.title}</Text>
                            <Text style={styles.text}>$ {item.price}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        backgroundColor: 'white',
        width: '100%',
        height: "100%",
      
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        marginTop: -50,
        marginBottom: 10,
        padding:43
    },
    headerText: {
        marginLeft: 20,
        fontSize: 33,
        fontWeight:'bold'
    },
    iconContainer: {
        flexDirection: "row",
        marginLeft: "auto",
    },
    icon: {
        marginHorizontal: 10,
    },
    header2: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        marginTop:-34,
        
    },
    cardContainer: {
        flex: 1,
        flexDirection: "row",
    },
    card: {
        marginTop: 9,
        marginBottom: 80,
        backgroundColor: "white",
        width: 120,
        height: 200,
        marginHorizontal: 12,
        borderRadius: 15,
    },
    // image: {
    //     width: 100,
    //     height: 100,
    //     top: -30,
    //     marginHorizontal: 40,
    //     alignSelf: 'center',
    // },
    text: {
        marginLeft: 30,
        fontSize: 18,
        fontWeight: "bold",
    },
    text1: {
        marginLeft: 30,
        fontSize: 18,
    },
});

export default Vg;
