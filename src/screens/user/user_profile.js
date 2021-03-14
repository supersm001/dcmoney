import React, {useState, useEffect} from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, ScrollView, Text, Switch} from 'react-native';
import {GetLoggedInUserDetails, UpdateLoggedUserDetails} from '../../services/api/users/userapi'
import {Avatar, Title, Caption} from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import { concat } from 'react-native-reanimated';
import {Button, Input} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const UserProfile = () => {

    useEffect(()=>{
        getFunction();    
    },[])

    const [name,setName] =useState('');
    const [contact,setContact] =useState();
    const [shop,setShop] =useState();
    const [gst,setGst] =useState();
    const [emiType,setEmiType] =useState(false);
    const [address,setAddress] =useState();
    

    const [shopErrStyle,setShopErrStyle] =useState(false);
    const [gstErrStyle, setGstErrStyle] = useState(false);
    const [addressErrStyle, setAddressErrStyle] = useState(false);
    

    const shopInput = React.createRef();
    const addressInput = React.createRef();
    
    async function getFunction(){
        var resp = await GetLoggedInUserDetails();
        setName(resp.user_name);
        setContact(resp.contact);
        setShop(resp.shop_name);
        setGst(resp.gst_number)
        setAddress(resp.address);
        if(resp.emi_type == '1'){
            setEmiType(true);
        }
    }

    const UpdateDetails = async () =>{
        if(shop == ''){
            setShopErrStyle(true);
            shopInput.current.shake();
            shopInput.current.focus();
        }
        else if(address == ''){
            addressInput.current.shake();
            addressInput.current.focus();
            setAddressErrStyle(true)
            setShopErrStyle(false);
        } 
        else{
            setAddressErrStyle(false)
            setShopErrStyle(false);
            var resp = await UpdateLoggedUserDetails(shop, gst, address); 
            getFunction();
        }
    }


    return(
        <ScrollView>
        <View style={styles.LoginView}>
            <View style={styles.userInfoSection}>
                <View style={{alignItems:'center'}}>
                    <Avatar.Image style={{marginTop:5}} source={{ uri:'https://serviceonway.com/serviceonway/files/images/user1.png'}} size={200}/>
                </View>
                <View style={{marginTop:50}}></View>
                <View style={{alignItems:"center"}}>
    
                    <View style={{backgroundColor:'white', width:'200%', padding:10, borderColor:'white', borderWidth:1}}>
                        <Text style={{marginLeft:15, color:'gray'}} >NAME</Text>
                        <Input value = {name} disabled style={{color:'black', textTransform:'capitalize'}} />

                        <Text style={{marginLeft:15, color:'gray'}} >CONTACT</Text>
                        <Input value = {contact} disabled style={{color:'black'}} />

                        <Text style={{marginLeft:15, color:'gray'}} >SHOP NAME</Text>
                        <Input 
                            ref={shopInput}
                            value = {shop} 
                            onChangeText = {(shop) => setShop(shop)}
                            style={{color:'black'}} 
                            maxLength={50}
                            inputContainerStyle={[shopErrStyle ? styles.inputErr : {}, {marginTop:-10} ]}
                            rightIcon={ <MaterialCommunityIcons name='pencil' size={25} color='gray'/>}
                        />

                        <Text style={{marginLeft:15, color:'gray'}} >GST</Text>
                        <Input
                            value = {gst}
                            onChangeText = {(gst) => setGst(gst)}
                            style={{color:'black'}} 
                            maxLength={15}
                            inputContainerStyle={[gstErrStyle ? styles.inputErr : {}, {marginTop:-10} ]}
                            rightIcon={ <MaterialCommunityIcons name='pencil' size={25} color='gray'/>}
                        />

                        <Text style={{marginLeft:15, color:'gray'}} >ADDRESS</Text>
                        <Input 
                            ref={addressInput}
                            value = {address} 
                            onChangeText = {(address) => setAddress(address)}
                            maxLength={100}
                            style={{color:'black', textTransform:'capitalize'}}
                            inputContainerStyle={[addressErrStyle ? styles.inputErr : {}, {marginTop:-10} ]}
                            rightIcon={ <MaterialCommunityIcons name='pencil' size={25} color='gray'/>}
                        />

                        <View style={{flexDirection:'row', justifyContent:'space-between', padding:15}}>
                            <Text>EMI</Text>
                            <Switch style={{ width:100, transform:[{ scale:1.3}]}} value={emiType} />
                        </View>


                    <Button onPress={UpdateDetails} title='Update' buttonStyle={{marginTop:20, padding:10}} />
                    </View>
                </View>
            
            </View>
        </View>

        </ScrollView>
)
}

const styles = StyleSheet.create({
    LoginView: {
        backgroundColor:'white',
        flex:1,
        padding:20,
        alignItems: 'center'
    },

    userInfoSection: {
      padding: 20,
      marginBottom:10,
    },
    title: {
      fontSize: 15,
      fontWeight: 'bold',
      textTransform:"uppercase"
    },
    caption: {
      fontSize: 15,
      marginTop:5,
      textTransform:"capitalize"
    },
    inputFocused: {
        borderBottomColor: '#2288dc',
        borderBottomWidth:2
     },
    inputErr: {
        borderBottomColor: 'red',
    },

  });