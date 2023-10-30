import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Main from "../Sreens/Main"
import { FontAwesome, Zocial, MaterialCommunityIcons } from '@expo/vector-icons';
import SignIn from '../Sreens/signIn';
import SignUp from '../Sreens/signUp';
import Login from '../Sreens/Login';
import Cart from '../Sreens/Cart';
import ShopScreen from "../Sreens/n"
import CategoryScreen from "../Sreens/Vegetable"
import CartScreen from "../Sreens/CartScreen"
import UserProfile from "../Sreens/Profile"
import Payment from "../Sreens/Payment"

const Tab = createBottomTabNavigator()
const HomeTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: 'green',
            }}
        >
            <Tab.Screen name="main"
                component={Main}
                options={{
                    tabBarIcon: ({ color }) => (

                        <FontAwesome name="shopping-basket" size={24} color={color} />

                    ),
                    headerShown: false
                }}

                title="Home"
            />
            <Tab.Screen
                name="CategoryScreen"
                component={CategoryScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Zocial name="cart" size={24} color={color} />
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="ShopScreen"
                component={ShopScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="shopping-bag" size={24} color={color} />
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen 
                name="UserProfile"
                component={UserProfile}
                options={{
                    tabBarIcon:({color})=>(
                        <MaterialCommunityIcons name="account" size={24} color={color} />
                    ),
                    headerShown:false
                }}
            />
            <Tab.Screen 
                name="Payment"
                component={Payment}
                options={{
                    tabBarIcon:({color})=>(
                        <MaterialCommunityIcons name="account" size={24} color={color} />
                    ),
                    headerShown:false
                }}
            />
        </Tab.Navigator>
    )
}

export default HomeTabNavigator