import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
// import Landing from '../Sreens/Landing'
import SignUp from '../Sreens/signUp'
import { AntDesign } from '@expo/vector-icons';
import SignIn from '../Sreens/signIn'
import Main from '../Sreens/Main'
import Cart from '../Sreens/Cart';
import HomeTabNavigator from './HomeTabNavigator'
import CartScreen from '../Sreens/CartScreen';
import Login from '../Sreens/Login';
import ProductScreen from '../Sreens/ProductScreen'
import CategoryScreen from '../Sreens/Vegetable'








const Stack = createStackNavigator()

const Router = () => {
    return (
        <NavigationContainer>
            < Stack.Navigator>
            <Stack.Screen
                    name={"Login"}
                    component={Login}
                    options={{
                        headerShown: false
                    }}
                />
                
                  <Stack.Screen
                    name={'HomeTabNavigator'}
                    component={HomeTabNavigator}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name={"sign up"}
                    component={SignUp}
                    options={{
                        headerShown: false

                    }}
                />
                <Stack.Screen
                    name={"CategoryScreen"}
                    component={CategoryScreen}
                />
              

                <Stack.Screen
                    name={"main"}
                    component={Main}
                    options={{
                        headerShown: false
                    }}
                />
                
                <Stack.Screen
                    name={"CartScreen"}
                    component={CartScreen}
                    options={{
                        headerShown: true
                    }}
                />
                     <Stack.Screen
                    name={"Cart"}
                    component={Cart}
                    options={{
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router
