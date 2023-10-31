import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  
} from 'react-native'; 
import CountryPicker from 'react-native-country-picker-modal';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('screen');

export default function Payment() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [country, setCountry] = React.useState('');
  const [selected, setSelected] = useState('');

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <AntDesign name="arrowleft" size={24} color="green" />
      </TouchableOpacity>
      <View style={styles.getstarted}>
        <Text style={styles.title}>Add Card</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.emailContainer}>
          <MaterialCommunityIcons
            name="credit-card-outline"
            size={24}
            color="green"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            onChangeText={(value) => setCardNumber(value)}
          />
        </View>
        <View style={styles.inputRow}>
          <View style={styles.inputHalf}>
            <TextInput
              style={styles.input}
              placeholder="MM/YY"
              onChangeText={(value) => setExpiryDate(value)}
            />
          </View>
          <View style={styles.inputHalf}>
            <TextInput
              style={styles.input}
              placeholder="CVV"
              onChangeText={(value) => setCVV(value)}
            />
          </View>
        </View>
        <View style={styles.emailContainer}>
         <CountryPicker
            {...{
              onSelect: (country) => setCountry(country),
              countryCode: country?.cca2 || 'US',
            }}
            withFilter
            withFlag
            withCallingCode
            withCurrency
            withAlphaFilter
            withEmoji
            withModal
            visible={false}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 2,
    padding: 23
},

inputContainer: {
    width: '100%',
    marginTop:38,


},
icon: {
    left: 7
},
input: {
    height: 50,
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
},
emailContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  borderColor: 'gray',
  marginBottom: 15,
},

button: {
    height: 50,
    width: width - 40,
    backgroundColor: 'green',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
},
buttonText: {
    color: 'white',
    fontWeight: 'bold',
},
signInText: {
    marginTop: 20,
    color: 'blue',
    textDecorationLine: 'none',
},

item: {
    padding: 12
},
getstarted: {
    justifyContent: "left",
    alignItems: "left",
    marginTop: 3
},
title: {
    fontSize: 20,
    fontWeight: "bold"
},
footer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30
},

  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputHalf: {
    flex: 1,
    marginHorizontal: 5,
  },
});

// export default function Payment() {
//   const [cardNumber, setCardNumber] = useState('');
//   const [expiryDate, setExpiryDate] = useState('');
//   const [cvv, setCVV] = useState('');
//   const [selectedCountry, setSelectedCountry] = useState('');



//   return (
//     <View style={styles.container}>
//       {/* ... (your existing code) ... */}
//       <View style={styles.emailContainer}>
//         <MaterialCommunityIcons
//           name="credit-card-outline"
//           size={24}
//           color="green"
//           style={styles.icon}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Card Number"
//           onChangeText={(value) => setCardNumber(value)}
//         />
//       </View>
//       <View style={styles.inputRow}>
//         <View style={styles.inputHalf}>
//           <TextInput
//             style={styles.input}
//             placeholder="MM/YY"
//             onChangeText={(value) => setExpiryDate(value)}
//           />
//         </View>
//         <View style={styles.inputHalf}>
//           <TextInput
//             style={styles.input}
//             placeholder="CVV"
//             onChangeText={(value) => setCVV(value)}
//           />
//         </View>
//       </View>
//       {/* <View style={styles.emailContainer}>
//         <MaterialCommunityIcons name="earth" size={24} color="green" style={styles.icon} />
//         <Picker
//           selectedValue={selectedCountry}
//           style={{ height: 50, width: '100%', color: 'gray' }}
//           onValueChange={(itemValue) => setSelectedCountry(itemValue)}
//         >
//           <Picker.Item label="Select Country" value="" />
//           {countries.map((country, index) => (
//             <Picker.Item key={index} label={country} value={country} />
//           ))}
//         </Picker>
//       </View> */}
//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>Save</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     paddingHorizontal: 20,
//     marginTop: 2,
//     padding: 23
//   },

//   inputContainer: {
//     width: '100%',
//     marginTop: 38,


//   },
//   icon: {
//     left: 7
//   },
//   input: {
//     height: 50,
//     width: '100%',
//     marginBottom: 10,
//     paddingHorizontal: 10,
//     borderBottomWidth: 1,
//     borderColor: 'gray',
//   },
//   emailContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderColor: 'gray',
//     marginBottom: 15,
//   },

//   button: {
//     height: 50,
//     width: width - 40,
//     backgroundColor: 'green',
//     borderRadius: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   signInText: {
//     marginTop: 20,
//     color: 'blue',
//     textDecorationLine: 'none',
//   },

//   item: {
//     padding: 12
//   },
//   getstarted: {
//     justifyContent: "left",
//     alignItems: "left",
//     marginTop: 3
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold"
//   },
//   footer: {
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 30
//   },

//   inputRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   inputHalf: {
//     flex: 1,
//     marginHorizontal: 5,
//   },
// });