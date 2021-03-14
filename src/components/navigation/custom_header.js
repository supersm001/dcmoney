import React,{useState, useEffect, navigation, useMemo, useContext, useReducer} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer'
import AsyncStorage from '@react-native-community/async-storage';
import {useTheme, Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch} from 'react-native-paper'

import {GetLoggedInUserDetails, StoreToken, VerifyToken} from '../../services/api/users/userapi'

import {EnterOtp, Login} from '../../screens/user/login'
import Register_User from '../../screens/user/user_registration'
import {UserDashboard} from '../../screens/user/dashboard'
import {UserProfile} from '../../screens/user/user_profile'
//import {SelectCustomerForBill, SelectProductForBill, CreateBill} from '../../screens/user/create_bill'
import {CreateBill} from '../../screens/user/create_new_bill'
import {CreateCustomer} from '../../screens/user/create_customer'
import {CreateProduct} from '../../screens/user/create_product'
import {UserViewCustomer} from '../../screens/user/view_user_customer'
import {UserViewProduct} from '../../screens/user/view_user_product'
import {UserViewPayment} from '../../screens/user/view_user_bill'
import {UserSpecficEmiDetails} from '../../screens/user/view_emi_product'
import {UserSpecficInvoiceDetails} from '../../screens/user/view_invoice'

import {SplashScreen} from '../../screens/splash/splash'
import {Authcontext} from '../../components/context'

import {AdminDashboard} from '../../screens/admin/dashboard'
import {AdminViewBill} from '../../screens/admin/bill'
import {AdminViewUser} from '../../screens/admin/user'
import {AdminViewInvoice} from '../../screens/admin/invoice'
import {AdminViewEmiInvoice} from '../../screens/admin/emi_invoice'
import {AdminSpecficEmiDetails} from '../../screens/admin/view_emi_product'
import {AdminSpecficInvoiceDetails} from '../../screens/admin/view_invoice'

const AuthStackScreen = () => {
    const AuthStack = createStackNavigator();
    return(
        <NavigationContainer>
            <AuthStack.Navigator>
                <AuthStack.Screen name='Login' component={Login} options={{title:'Login'}} />
                <AuthStack.Screen name='EnterOtp' component={EnterOtp} options={{title:'Verification'}} />
                <AuthStack.Screen name='Register_User' component={Register_User} options={{title : "User Registration"}} />
                {/* <AuthStack.Screen name='UserDashboard' component={UserDashboard} options={{title : "Dashboard"}} /> */}
            </AuthStack.Navigator>
        </NavigationContainer>
    )
}

const UserDashboardScreen = ({navigation}) => {

    var user_name =<View style={{paddingLeft:40, paddingTop:10}}><ActivityIndicator size="small" color="gray"/></View>;
    var shop_name;
    LoggedDetails();

    async function LoggedDetails() {
        await GetLoggedInUserDetails();
        user_name = await (await AsyncStorage.getItem('userName')).split('"')[1];
        shop_name = await (await AsyncStorage.getItem('userShop')).split('"')[1];
    }

    
    const { SignOut } = useContext(Authcontext)
    
    const Tabs = createBottomTabNavigator();
    const Drawers = createDrawerNavigator();

    const HomeStack = createStackNavigator();
    const ProfileStack = createStackNavigator();


    const HomeStackScreen = (props) =>{
        return(
            <HomeStack.Navigator>
                <HomeStack.Screen name='UserDashboard' component={UserDashboard}
                options={{
                    headerTitle: 'Dashboard',
                    headerRight: () => ( <Icon name="menu" onPress={() => props.navigation.openDrawer()} containerStyle={{marginRight:10}} iconStyle={{color:'#2288dc', fontSize:25}} />),
                }}
                />
            </HomeStack.Navigator>
        )
    }

    const ProfileStackScreen = (props) =>{
        return(
            <ProfileStack.Navigator>
                <ProfileStack.Screen name='UserProfile' component={UserProfile} 
                options={{
                    headerTitle: 'Profile',
                    headerRight: () => ( <Icon onPress={() => props.navigation.openDrawer()} name="menu" containerStyle={{marginRight:10}} iconStyle={{color:'#2288dc', fontSize:25}} />),
                }}
                />
            </ProfileStack.Navigator>
        )
    }

    const BillStackScreen = (props) =>{
        return(
            <ProfileStack.Navigator initialRouteName='CreateBill'>
                
          
                {/* <ProfileStack.Screen name='SelectProductForBill' component={SelectProductForBill} 
                    options={{
                        headerTitle: 'Selct Product',
                        headerRight: () => ( <Icon onPress={() => props.navigation.openDrawer()} name="menu" containerStyle={{marginRight:10}} iconStyle={{color:'#2288dc', fontSize:25}} />),
                        headerLeft: () => ( <Icon onPress={() => props.navigation.navigate('UserViewPayment') } name="arrow-back" containerStyle={{marginLeft:10}} iconStyle={{color:'#2288dc', fontSize:25}} />),
                    }}
                />
                <ProfileStack.Screen name='SelectCustomerForBill' component={SelectCustomerForBill} 
                    options={{
                        headerTitle: 'Select Customer',
                        headerRight: () => ( <Icon onPress={() => props.navigation.openDrawer()} name="menu" containerStyle={{marginRight:10}} iconStyle={{color:'#2288dc', fontSize:25}} />),
                        headerLeft: () => ( <Icon onPress={() => props.navigation.navigate('SelectProductForBill') } name="arrow-back" containerStyle={{marginLeft:10}} iconStyle={{color:'#2288dc', fontSize:25}} />),
                    }}
                /> */}

                <ProfileStack.Screen name='CreateBill' component={CreateBill} 
                    options={{
                        headerTitle: 'Create New Bill',
                        headerRight: () => ( <Icon onPress={() => props.navigation.openDrawer()} name="menu" containerStyle={{marginRight:10}} iconStyle={{color:'#2288dc', fontSize:25}} />),
                        headerLeft: () => ( <Icon onPress={() => props.navigation.goBack() } name="arrow-back" containerStyle={{marginLeft:10}} iconStyle={{color:'#2288dc', fontSize:25}} />),
                    }}
                />
                
          
            </ProfileStack.Navigator>
        )
    }

    const PaymentBillStackScreen = (props) =>{
        return(
            <ProfileStack.Navigator>
                
                <ProfileStack.Screen name='UserViewPayment' component={UserViewPayment} 
                    options={{
                        headerTitle: 'Payment Record',
                        headerRight: () => ( <Icon onPress={() => props.navigation.openDrawer()} name="menu" containerStyle={{marginRight:10}} iconStyle={{color:'#2288dc', fontSize:25}} />),
                        headerLeft: () => ( <Icon onPress={() => props.navigation.navigate('UserDashboard') } name="arrow-back" containerStyle={{marginLeft:10}} iconStyle={{color:'#2288dc', fontSize:25}} />),
                    }}
                />

                <ProfileStack.Screen name='UserSpecficEmiDetails' component={UserSpecficEmiDetails} 
                    options={{
                        headerTitle: 'Specific Details',
                        headerRight: () => ( <Icon onPress={() => props.navigation.openDrawer()} name="menu" containerStyle={{marginRight:10}} iconStyle={{color:'#2288dc', fontSize:25}} />),
                        //headerLeft: () => ( <Icon onPress={() => props.navigation.navigate('UserViewPayment') } name="arrow-back" containerStyle={{marginLeft:10}} iconStyle={{color:'#2288dc', fontSize:25}} />),
                    }}
                />

                <ProfileStack.Screen name='UserSpecficInvoiceDetails' component={UserSpecficInvoiceDetails} 
                    options={{
                        headerTitle: 'Invoice',
                        headerRight: () => ( <Icon onPress={() => props.navigation.openDrawer()} name="menu" containerStyle={{marginRight:10}} iconStyle={{color:'#2288dc', fontSize:25}} />),
                        //headerLeft: () => ( <Icon onPress={() => props.navigation.navigate('UserViewPayment') } name="arrow-back" containerStyle={{marginLeft:10}} iconStyle={{color:'#2288dc', fontSize:25}} />),
                    }}
                />
       
            </ProfileStack.Navigator>
        )
    }


    const ProductStackScreen = (props) =>{
        return(
            <ProfileStack.Navigator>
                <ProfileStack.Screen name='CreateProduct' component={CreateProduct} 
                options={{
                    headerTitle: 'Create Product',
                    headerRight: () => ( <Icon onPress={() => props.navigation.openDrawer()} name="menu" containerStyle={{marginRight:10}} iconStyle={{color:'#2288dc', fontSize:25}} />),
                    headerLeft: () => ( <Icon onPress={() => props.navigation.goBack() } name="arrow-back" containerStyle={{marginLeft:10}} iconStyle={{color:'#2288dc', fontSize:25}} />),
                }}
                />
            </ProfileStack.Navigator>
        )
    }

    const ViewProductStackScreen = (props) =>{
        return(
            <ProfileStack.Navigator>
                <ProfileStack.Screen name='ViewProduct' component={UserViewProduct} 
                options={{
                    headerTitle: 'View Products',
                    headerRight: () => ( <Icon onPress={() => props.navigation.openDrawer()} name="menu" containerStyle={{marginRight:10}} iconStyle={{color:'#2288dc', fontSize:25}} />),
                    headerLeft: () => ( <Icon onPress={() => props.navigation.navigate('UserDashboard') } name="arrow-back" containerStyle={{marginLeft:10}} iconStyle={{color:'#2288dc', fontSize:25}} />),
                }}
                />
            </ProfileStack.Navigator>
        )
    }

    const CustomerStackScreen = (props) =>{
        return(
            <ProfileStack.Navigator>
                <ProfileStack.Screen name='CreateCustomer' component={CreateCustomer} 
                options={{
                    headerTitle: 'Create Customer',
                    headerRight: () => ( <Icon onPress={() => props.navigation.openDrawer()} name="menu" containerStyle={{marginRight:10}} iconStyle={{color:'#2288dc', fontSize:25}} />),
                    headerLeft: () => ( <Icon onPress={() => props.navigation.goBack() } name="arrow-back" containerStyle={{marginLeft:10}} iconStyle={{color:'#2288dc', fontSize:25}} />),
                }}
                />
            </ProfileStack.Navigator>
        )
    }


    const ViewCustomerStackScreen = (props) =>{
        return(
            <ProfileStack.Navigator>
                <ProfileStack.Screen name='ViewCustomer' component={UserViewCustomer} 
                options={{
                    headerTitle: 'View Customer',
                    headerRight: () => ( <Icon onPress={() => props.navigation.openDrawer()} name="menu" containerStyle={{marginRight:10}} iconStyle={{color:'#2288dc', fontSize:25}} />),
                    headerLeft: () => ( <Icon onPress={() => props.navigation.navigate('UserDashboard') } name="arrow-back" containerStyle={{marginLeft:10}} iconStyle={{color:'#2288dc', fontSize:25}} />),
                }}
                />
            </ProfileStack.Navigator>
        )
    }

    

    const TabsScreen = () =>{
        return(
        <Tabs.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color}) => {
                        let iconName;
                        if (route.name === 'Home') {
                            iconName = focused ? 'home' : 'home';
                        } 
                        else if (route.name === 'Profile') {
                            iconName = focused ? 'user-alt' : 'user-alt';
                        }
                        return <FontAwesome5 name={iconName} size={15} color={color} />;
                    },
                })}
        
                tabBarOptions={{
                    activeTintColor: '#2288dc',
                    inactiveTintColor: 'gray',
                }}
            
            >
                <Tabs.Screen name='Home' component={HomeStackScreen} />
                <Tabs.Screen name='Profile' component={ProfileStackScreen}/>
            </Tabs.Navigator>
        )
    }

    const CustomDrawerNavigator = (props) => {
        return(
            <View style={{flex:1}}>
                <DrawerContentScrollView {...props}>
                    <View style={styles.drawerContent}>

                        <View style={styles.userInfoSection}>
                            <View style={{flexDirection:'row', marginTop:15}}>
                                <Avatar.Image 
                                    source={{ uri:'https://serviceonway.com/serviceonway/files/images/user1.png'}}
                                    size={60}
                                />
                                <View style={{marginLeft:10}}>
                                    <Title style={styles.title}>{user_name}</Title>
                                    <Caption style={styles.caption}>{shop_name}</Caption>
                                </View>
                            </View>

                            {/* <View style={styles.row}>
                                <View style={styles.section}>
                                    <Paragraph style={[styles.paragraph, styles.caption]}>5</Paragraph>
                                    <Caption style={styles.caption}>Customer</Caption>
                                </View>
                                <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>10</Paragraph>
                                    <Caption style={styles.caption}>Product</Caption>
                                </View>
                            </View> */}
                        </View> 

                        {/************************** User Info Close **************************/}

                        <Drawer.Section style={styles.drawerSection}>
                            <DrawerItem
                                label='Home'
                                icon={({focused, color, size}) => (
                                    <FontAwesome5 
                                        name='home'
                                        color={color}
                                        size={size}
                                    />
                                )}
                                onPress={()=>{props.navigation.navigate('UserDashboard')}}
                            />

                            <DrawerItem
                                label='Payment'
                                icon={({focused, color, size}) => (
                                    <FontAwesome5 
                                        name='clipboard-list'
                                        color={color}
                                        size={size}
                                    />
                                )}
                                onPress={()=>{props.navigation.navigate('UserViewPayment')}}
                            />

                            <DrawerItem
                                label='Create Bill'
                                icon={({focused, color, size}) => (
                                    <FontAwesome5 
                                        name='receipt'
                                        color={color}
                                        size={size}
                                    />
                                )}
                                onPress={()=>{props.navigation.navigate('CreateBill')}}
                            />

                            {/* <DrawerItem
                                label='Create Product'
                                icon={({focused, color, size}) => (
                                    <FontAwesome5 
                                        name='mobile-alt'
                                        color={color}
                                        size={size}
                                    />
                                )}
                                onPress={()=>{props.navigation.navigate('CreateProduct')}}
                            /> */}

                            {/* <DrawerItem
                                label='Product'
                                icon={({focused, color, size}) => (
                                    <FontAwesome5 
                                        name='mobile-alt'
                                        color={color}
                                        size={size}
                                    />
                                )}
                                onPress={()=>{props.navigation.navigate('ViewProduct')}}
                            /> */}

                            {/* <DrawerItem
                                label='Create Customer'
                                icon={({focused, color, size}) => (
                                    <FontAwesome5 
                                        name='user-plus'
                                        color={color}
                                        size={size}
                                    />
                                )}
                                onPress={()=>{props.navigation.navigate('CreateCustomer')}}
                            /> */}

                            {/* <DrawerItem
                                label='Customer'
                                icon={({focused, color, size}) => (
                                    <FontAwesome5 
                                        name='user-plus'
                                        color={color}
                                        size={size}
                                    />
                                )}
                                onPress={()=>{props.navigation.navigate('ViewCustomer')}}
                            /> */}

                            

                        </Drawer.Section>

                    </View>    
                </DrawerContentScrollView> 


                <Drawer.Section style={styles.bottomDrawerSection}>
                    <DrawerItem
                        label='Sign Out'
                        icon={({focused, color, size}) => (
                            <FontAwesome5 
                                name='sign-out-alt'
                                color={color}
                                size={size}
                            />
                        )}
                        onPress={() => {SignOut()}}
                    />
                </Drawer.Section>
                

            </View>
        )
    }

    return(
        <NavigationContainer>
             <Drawers.Navigator drawerContent={props => <CustomDrawerNavigator {...props} />}>
                <Drawers.Screen name='UserDashboard' component={TabsScreen}/>
                <Drawers.Screen name='UserViewPayment' component={PaymentBillStackScreen}/>
                <Drawers.Screen name='CreateBill' component={BillStackScreen}/>
                <Drawers.Screen name='CreateProduct' component={ProductStackScreen}/>
                <Drawers.Screen name='ViewProduct' component={ViewProductStackScreen}/>
                <Drawers.Screen name='CreateCustomer' component={CustomerStackScreen}/>
                <Drawers.Screen name='ViewCustomer' component={ViewCustomerStackScreen}/>

            </Drawers.Navigator>
        </NavigationContainer>

    )

    const StatiDrawer= () =>{
        return(
            <NavigationContainer>
                <Drawers.Navigator>
                    <Drawers.Screen name='Home' component={TabsScreen}
                        options={{
                            title:'Home',
                            drawerIcon:({focused}) => <FontAwesome5 
                                size={20}
                                color={focused ? '#2288dc' : 'gray'}
                                name='home'
                            />
                        }} 
                    />
                    <Drawers.Screen name='Create_Bill' component={BillStackScreen} 
                        options={{
                            title:'Create Bill',
                            drawerIcon:({focused}) => <FontAwesome5 
                                size={20}
                                color={focused ? '#2288dc' : 'gray'}
                                name='receipt'
                            />
                        }} 
                    />
                    <Drawers.Screen name='Create_Product' component={ProductStackScreen} 
                        options={{
                            title:'Create Product',
                            drawerIcon:({focused}) => <FontAwesome5 
                                size={20}
                                color={focused ? '#2288dc' : 'gray'}
                                name='mobile-alt'
                            />
                        }} 
                    />
                    <Drawers.Screen name='Create_Customer' component={CustomerStackScreen}  
                        options={{
                            title:'Create Customer',
                            drawerIcon:({focused}) => <FontAwesome5 
                                size={20}
                                color={focused ? '#2288dc' : 'gray'}
                                name='user-plus'
                            />
                        }} 
                    />

                    <Drawers.Screen name='LogOutStackScreen' component={LogOutStackScreen}  
                        options={{
                            title:'Sign Out',
                            drawerIcon:({focused}) => <FontAwesome5 
                                size={20}
                                color={focused ? '#2288dc' : 'gray'}
                                name='sign-out-alt'
                            />
                        }} 
                    />

    
                </Drawers.Navigator>
            </NavigationContainer>

        )
    }

}

const AdminDashboardScreen = ({navigation}) => {

    var user_name =<View style={{paddingLeft:40, paddingTop:10}}><ActivityIndicator size="small" color="gray"/></View>;
    LoggedDetails();

    async function LoggedDetails() {
        await GetLoggedInUserDetails();
        user_name = await (await AsyncStorage.getItem('userName')).split('"')[1];
    }
    
    const { SignOut } = useContext(Authcontext)
    
    const Tabs = createBottomTabNavigator();
    const Drawers = createDrawerNavigator();

    const HomeStack = createStackNavigator();
    const ProfileStack = createStackNavigator();


    const AdminHomeStackScreen = (props) =>{
        return(
            <HomeStack.Navigator>
                <HomeStack.Screen name='AdminDashboard' component={AdminDashboard}
                options={{
                    headerTitle: 'Dashboard',
                    headerRight: () => ( <Icon name="menu" onPress={() => props.navigation.openDrawer()} containerStyle={{marginRight:10}} iconStyle={{color:'#2288dc', fontSize:25}} />),
                }}
                />
            </HomeStack.Navigator>
        )
    }

    const AdminViewBillScreen = (props) =>{
        return(
            <HomeStack.Navigator>
                <HomeStack.Screen name='AdminViewBill' component={AdminViewBill}
                    options={{
                        headerTitle: "Bill's Details",
                        headerRight: () => ( <Icon name="menu" onPress={() => props.navigation.openDrawer()} containerStyle={{marginRight:10}} iconStyle={{color:'#2288dc', fontSize:25}} />),
                        headerLeft: () => ( <Icon onPress={() => props.navigation.goBack() } name="arrow-back" containerStyle={{marginLeft:10}} iconStyle={{color:'#2288dc', fontSize:25}} />)
                    }}
                />

                <ProfileStack.Screen name='AdminSpecficEmiDetails' component={AdminSpecficEmiDetails} 
                    options={{
                        headerTitle: 'Specific Details',
                        headerRight: () => ( <Icon onPress={() => props.navigation.openDrawer()} name="menu" containerStyle={{marginRight:10}} iconStyle={{color:'#2288dc', fontSize:25}} />),
                        //headerLeft: () => ( <Icon onPress={() => props.navigation.navigate('UserViewPayment') } name="arrow-back" containerStyle={{marginLeft:10}} iconStyle={{color:'#2288dc', fontSize:25}} />),
                    }}
                />

                <ProfileStack.Screen name='AdminSpecficInvoiceDetails' component={AdminSpecficInvoiceDetails} 
                    options={{
                        headerTitle: 'Invoice',
                        headerRight: () => ( <Icon onPress={() => props.navigation.openDrawer()} name="menu" containerStyle={{marginRight:10}} iconStyle={{color:'#2288dc', fontSize:25}} />),
                        //headerLeft: () => ( <Icon onPress={() => props.navigation.navigate('UserViewPayment') } name="arrow-back" containerStyle={{marginLeft:10}} iconStyle={{color:'#2288dc', fontSize:25}} />),
                    }}
                />

            </HomeStack.Navigator>
        )
    }

    const AdminViewUserScreen = (props) =>{
        return(
            <HomeStack.Navigator>
                <HomeStack.Screen name='AdminViewUser' component={AdminViewUser}
                options={{
                    headerTitle: "User's Details",
                    headerRight: () => ( <Icon name="menu" onPress={() => props.navigation.openDrawer()} containerStyle={{marginRight:10}} iconStyle={{color:'#2288dc', fontSize:25}} />),
                    headerLeft: () => ( <Icon onPress={() => props.navigation.goBack() } name="arrow-back" containerStyle={{marginLeft:10}} iconStyle={{color:'#2288dc', fontSize:25}} />)
                }}
                />
            </HomeStack.Navigator>
        )
    }

    const AdminViewInvoiceScreen = (props) =>{
        return(
            <HomeStack.Navigator>
                <HomeStack.Screen name='AdminViewInvoice' component={AdminViewInvoice}
                options={{
                    headerTitle: 'Invoice Details',
                    headerRight: () => ( <Icon name="menu" onPress={() => props.navigation.openDrawer()} containerStyle={{marginRight:10}} iconStyle={{color:'#2288dc', fontSize:25}} />),
                }}
                />
            </HomeStack.Navigator>
        )
    }

    const AdminViewEmiInvoiceScreen = (props) =>{
        return(
            <HomeStack.Navigator>
                <HomeStack.Screen name='AdminViewEmiInvoice' component={AdminViewEmiInvoice}
                options={{
                    headerTitle: 'EMI Invoice Details',
                    headerRight: () => ( <Icon name="menu" onPress={() => props.navigation.openDrawer()} containerStyle={{marginRight:10}} iconStyle={{color:'#2288dc', fontSize:25}} />),
                }}
                />
            </HomeStack.Navigator>
        )
    }

    const AdminCustomDrawerNavigator = (props) => {
        return(
            <View style={{flex:1}}>
                <DrawerContentScrollView {...props}>
                    <View style={styles.drawerContent}>

                        <View style={styles.userInfoSection}>
                            <View style={{flexDirection:'row', marginTop:15}}>
                                <Avatar.Image 
                                    source={{ uri:'https://www.serviceonway.com/serviceonway/files/images/admin.png'}}
                                    size={60}
                                    style={{backgroundColor:'white'}}
                                />
                                <View style={{marginLeft:10}}>
                                    <Title style={styles.title}>ADMIN</Title>
                                    <Caption style={styles.caption}>{user_name}</Caption>
                                </View>
                            </View>

                        </View> 

                        {/************************** User Info Close **************************/}

                        <Drawer.Section style={styles.drawerSection}>
                            <DrawerItem
                                label='Home'
                                icon={({focused, color, size}) => (
                                    <FontAwesome5 
                                        name='home'
                                        color={color}
                                        size={size}
                                    />
                                )}
                                onPress={()=>{props.navigation.navigate('AdminDashboard')}}
                            />

                            <DrawerItem
                                label='User'
                                icon={({focused, color, size}) => (
                                    <FontAwesome5 
                                        name='users'
                                        color={color}
                                        size={size}
                                    />
                                )}
                                onPress={()=>{props.navigation.navigate('AdminViewUser')}}
                            />

                            <DrawerItem
                                label='Bill'
                                icon={({focused, color, size}) => (
                                    <FontAwesome5 
                                        name='file-invoice'
                                        color={color}
                                        size={30}
                                    />
                                )}
                                onPress={()=>{props.navigation.navigate('AdminViewBill')}}
                            />

                            {/* <DrawerItem
                                label='Inoive'
                                icon={({focused, color, size}) => (
                                    <FontAwesome5 
                                        name='clipboard-list'
                                        color={color}
                                        size={size}
                                    />
                                )}
                                onPress={()=>{props.navigation.navigate('AdminViewInvoice')}}
                            />

                            <DrawerItem
                                label='Emi Invoice'
                                icon={({focused, color, size}) => (
                                    <FontAwesome5 
                                        name='receipt'
                                        color={color}
                                        size={size}
                                    />
                                )}
                                onPress={()=>{props.navigation.navigate('AdminViewEmiInvoice')}}
                            /> */}

                        </Drawer.Section>

                    </View>    
                </DrawerContentScrollView> 


                <Drawer.Section style={styles.bottomDrawerSection}>
                    <DrawerItem
                        label='Sign Out'
                        icon={({focused, color, size}) => (
                            <FontAwesome5 
                                name='sign-out-alt'
                                color={color}
                                size={size}
                            />
                        )}
                        onPress={() => {SignOut()}}
                    />
                </Drawer.Section>
                

            </View>
        )
    }


    return(
        <NavigationContainer>
             <Drawers.Navigator drawerContent={props => <AdminCustomDrawerNavigator {...props} />}>
                <Drawers.Screen name='AdminDashboard' component={AdminHomeStackScreen}/>
                <Drawers.Screen name='AdminViewBill' component={AdminViewBillScreen}/>
                <Drawers.Screen name='AdminViewUser' component={AdminViewUserScreen}/>
                <Drawers.Screen name='AdminViewInvoice' component={AdminViewInvoiceScreen}/>
                <Drawers.Screen name='AdminViewEmiInvoice' component={AdminViewEmiInvoiceScreen}/>
            </Drawers.Navigator>
        </NavigationContainer>

    )

}


export const CustomeHeader = () =>{

    const initialLoginState = {
        isLoading: true,
        userType: null,
        userToken: null,
    };

    const loginReducer =(prevState, action) => {
        switch(action.type){
            case 'RETRIEVE_TOKEN':return{
                ...prevState,
                userType: action.Utype,
                userToken: action.token,
                isLoading: false
            };
            case 'LOGIN':return{
                ...prevState,
                userType: action.Utype,
                userToken: action.token,
                isLoading: false
            };
            case 'LOGOUT':return{
                ...prevState,
                userType: null,
                userToken: null,
                isLoading: false
            };
            case 'REGISTER':return{
                ...prevState,
                userType: action.Utype,
                userToken: action.token,
                isLoading: false
            };
        }
    }

    const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

    const authContext = useMemo(() => ({
        SignIn : async() =>{
            var tokres = await StoreToken();
            if(tokres == 'stored'){
                const userToken = await AsyncStorage.getItem('userToken')
                const userType = await AsyncStorage.getItem('userType')
                dispatch({type:'LOGIN', token:userToken, Utype:userType});
            }else
                dispatch({type:'LOGIN'});
        },

        SignUp : async() =>{
            var tokres = await StoreToken();
            if(tokres == 'stored'){
                const userToken = await AsyncStorage.getItem('userToken')
                const userType = await AsyncStorage.getItem('userType')
                dispatch({type:'REGISTER', token:userToken, Utype:userType});
            }else
                dispatch({type:'REGISTER'});
            
        },

        SignOut: async() =>{
            try {
                await AsyncStorage.removeItem('userToken')
              } catch (e) {
                console.log('SignIn UseMemo Error ', e);
              }
            dispatch({type:'LOGOUT'});
        },
    }),[])  

    useEffect(() => {
        setTimeout( async()=>{
            let userToken;
            let userType;
            try {
                userToken = await AsyncStorage.getItem('userToken');
                userType = await AsyncStorage.getItem('userType');
              } catch (e) {
                console.log('SignIn UseMemo Error ', e);
              }

            var tokres = await VerifyToken(userToken);
            if(tokres == 'authorized')
                dispatch({type:'REGISTER', token:userToken, Utype:userType});
            else
                dispatch({type:'REGISTER'});
        },100)
    },[])

    if(loginState.isLoading){
        return <SplashScreen/>
    }
    return(
            <Authcontext.Provider value={authContext} >
                {
                    loginState.userToken ? loginState.userType === 'user' ? <UserDashboardScreen/> : <AdminDashboardScreen/> : <AuthStackScreen/> 
                }
            </Authcontext.Provider>
        )

}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 12,
      marginTop:-5
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 20,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });