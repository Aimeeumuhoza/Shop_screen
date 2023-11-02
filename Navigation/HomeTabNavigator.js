import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Main from "../Sreens/Main"
import { FontAwesome, Zocial, MaterialCommunityIcons } from '@expo/vector-icons';
import SignIn from '../Sreens/signIn';
import SignUp from '../Sreens/signUp';
import Login from '../Sreens/Login';
import Cart from '../Sreens/Cart';
import ShopScreen from "../Sreens/n"
import UserProfile from "../Sreens/Profile"
import OnGoing from '../Sreens/Ongoing';
import StatsPage from '../Sreens/statistics/indexx';

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
                name="ShopScreen"
                component={ShopScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Zocial name="cart" size={24} color={color} />
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="My Order"
                component={OnGoing}
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
                name="Statistics"
                component={StatsPage}
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