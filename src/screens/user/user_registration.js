import React, {useState, navigation, useContext} from 'react';
import { StyleSheet, ScrollView, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Text } from 'react-native-elements';
import { CreateUser } from '../../services/api/users/userapi'
import {Authcontext} from '../../components/context'

const Register_User = ({navigation, route}) => {

    const{SignUp} = useContext(Authcontext);

    const [contact, setContact] = useState(route.params.cont);
    const [contactErr, setContactErr] = useState('');
    const [contactFocus, setContactFocus] = useState(false);
    const [contactErrStyle, setContactErrStyle] = useState(false);
    const contactinput = React.createRef();


    const [user, setUser] = useState('');
    const [userErr, setUserErr] = useState('');
    const [userFocus, setUserFocus] = useState(false);
    const [userErrStyle, setUserErrStyle] = useState(false);
    const userinput = React.createRef();
    

    const [shop, setShop] = useState('');
    const [shopErr, setShopErr] = useState('');
    const [shopFocus, setShopFocus] = useState(false);
    const [shopErrStyle, setShopErrStyle] = useState(false);
    const shopinput = React.createRef();
    

    const [address, setAddress] = useState('');
    const [addressErr, setAddressErr] = useState('');
    const [addressFocus, setAddressFocus] = useState(false);
    const [addressErrStyle, setAddressErrStyle] = useState(false);
    const addressinput = React.createRef();
    
    const [Gst, setGst] = useState('');
    const [GstErr, setGstErr] = useState('');
    const [GstFocus, setGstFocus] = useState(false);
    const [GstErrStyle, setGstErrStyle] = useState(false);
    const Gstinput = React.createRef();
    
    async function SEND_OTP(){
        if(contact != route.params.cont){
            setContactErr('enter a valid contact number');
            setContactErrStyle(true);
            contactinput.current.shake();
            contactinput.current.focus();
        }

        else if(user == ''){
            setContactErrStyle(false);
            setContactErr('');

            setUserErr('please enter user name');
            setUserErrStyle(true);
            userinput.current.shake();
            userinput.current.focus();
        }

        else if(shop == ''){
            setUserErrStyle(false);
            setUserErr('');

            setShopErr('please enter shop name');
            setShopErrStyle(true);
            shopinput.current.shake();
            shopinput.current.focus();
        }

        else if(address == ''){
            setShopErrStyle(false);
            setShopErr('');

            setAddressErr('please enter user address');
            setAddressErrStyle(true);
            addressinput.current.shake();
            addressinput.current.focus();
        }

        else {
            var response = await CreateUser(user, contact, shop, address, Gst);
            //alert("Message Is : "+response)
            
            if(response != 'success')
                alert('Server Error')
            
            else{

                setContactErrStyle(false);
                setContactErr('');

                setUserErrStyle(false);
                setUserErr('');

                setShopErrStyle(false);
                setShopErr('');

                setAddressErrStyle(false);
                setAddressErr('');

                SignUp();
                
                // navigation.reset({
                //     index:0,
                //     routes:[
                //         {name:'User_Dashboard', params:{cont:contact}}
                //     ],
                // })
            }
            
        }
    }

    return(

            <ScrollView>
                <View style={styles.LoginView}>

                    <View style={{height:50}}></View>
                    <Text h4 style={{textTransform:'capitalize', color:'black'}}>New User Registration</Text>
                    <View style={{height:20, borderBottomWidth:3, borderColor:'#2288dc', width:200}}></View>
                    <View style={{height:80}}></View>

                    <Input 
                        value = {contact}
                        disabled
                        ref={contactinput}
                        onFocus={() => setContactFocus(true)}
                        inputContainerStyle={[contactFocus ? styles.inputFocused : {}, contactErrStyle ? styles.inputErr : {} ]}
                        onChangeText = {(contact) => setContact(contact)}
                        maxLength={10}
                        keyboardType={'number-pad'}
                        placeholder='Enter Contact Number*'
                        leftIcon={ <Icon name='phone' size={25} color='gray'/>}
                        errorStyle={{ color: 'red', textTransform:'capitalize' }}
                        errorMessage={contactErr}
                    />


                    <Input 
                        value = {user}
                        ref={userinput}
                        onFocus={() => setUserFocus(true)}
                        inputContainerStyle={[userFocus ? styles.inputFocused : {}, userErrStyle ? styles.inputErr : {} ]}
                        onChangeText = {(user) => setUser(user)}
                        maxLength={100}
                        placeholder='Enter User Name*'
                        leftIcon={ <Icon name='user' size={25} color='gray'/>}
                        errorStyle={{ color: 'red', textTransform:'capitalize' }}
                        errorMessage={userErr}
                    />

                    <Input 
                        value = {shop}
                        ref={shopinput}
                        onFocus={() => setShopFocus(true)}
                        inputContainerStyle={[shopFocus ? styles.inputFocused : {}, shopErrStyle ? styles.inputErr : {} ]}
                        onChangeText = {(shop) => setShop(shop)}
                        maxLength={100}
                        placeholder='Enter Shop Name*'
                        leftIcon={ <Icon name='home' size={25} color='gray'/>}
                        errorStyle={{ color: 'red', textTransform:'capitalize' }}
                        errorMessage={shopErr}
                    />

                    <Input 
                        value = {address}
                        ref={addressinput}
                        onFocus={() => setAddressFocus(true)}
                        inputContainerStyle={[addressFocus ? styles.inputFocused : {}, addressErrStyle ? styles.inputErr : {} ]}
                        onChangeText = {(address) => setAddress(address)}
                        maxLength={100}
                        placeholder='Enter Address*'
                        leftIcon={ <Icon name='map-marker' size={25} color='gray'/>}
                        errorStyle={{ color: 'red', textTransform:'capitalize' }}
                        errorMessage={addressErr}
                    />

                    <Input 
                        value = {Gst}
                        ref={Gstinput}
                        onFocus={() => setGstFocus(true)}
                        inputContainerStyle={[GstFocus ? styles.inputFocused : {}, GstErrStyle ? styles.inputErr : {} ]}
                        onChangeText = {(Gst) => setGst(Gst)}
                        placeholder='Enter GST Number'
                        maxLength={15}
                        leftIcon={ <Icon name='address-card' size={25} color='gray'/>}
                        errorStyle={{ color: 'red', textTransform:'capitalize' }}
                        errorMessage={GstErr}
                    />

               </View>

            <View style={styles.Next_button}>
               <Button onPress={SEND_OTP} buttonStyle={{backgroundColor:'#2288dc', borderRadius:100,  paddingLeft:50, paddingRight:30, padding:10, justifyContent:'space-between'}} title='Next' iconRight icon={<Icon name="arrow-right"  size={15} color="white"/>}></Button>
            </View>

        </ScrollView>
    )
}



const styles = StyleSheet.create({
    LoginView: {
        padding:20,
        justifyContent: 'center',
        alignItems: 'center'
    },

    Next_button: {
        padding:20,
        marginTop:50
    },

    inputFocused: {
       borderBottomColor: '#2288dc',
       borderBottomWidth:2
    },

    inputErr: {
       borderBottomColor: 'red',
    },

});

export default Register_User;