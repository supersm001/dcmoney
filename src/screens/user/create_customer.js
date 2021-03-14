import React, {useState, navigation, useContext} from 'react';
import { StyleSheet, ScrollView, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Text } from 'react-native-elements';
import { CreateNewCustomer } from '../../services/api/users/userapi'

export const CreateCustomer = (props) => {



    const [user, setUser] = useState('');
    const [userErr, setUserErr] = useState('');
    const [userFocus, setUserFocus] = useState(false);
    const [userErrStyle, setUserErrStyle] = useState(false);
    const userinput = React.createRef();
    
    const [contact, setContact] = useState('');
    const [contactErr, setContactErr] = useState('');
    const [contactFocus, setContactFocus] = useState(false);
    const [contactErrStyle, setContactErrStyle] = useState(false);
    const contactinput = React.createRef();

    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [emailFocus, setEmailFocus] = useState(false);
    const [emailErrStyle, setEmailErrStyle] = useState(false);
    const emailinput = React.createRef();
    

    const [address, setAddress] = useState('');
    const [addressErr, setAddressErr] = useState('');
    const [addressFocus, setAddressFocus] = useState(false);
    const [addressErrStyle, setAddressErrStyle] = useState(false);
    const addressinput = React.createRef();
    
    const [aadhar, setAadhar] = useState('');
    const [aadharErr, setAadharErr] = useState('');
    const [aadharFocus, setAadharFocus] = useState(false);
    const [aadharErrStyle, setAadharErrStyle] = useState(false);
    const aadharinput = React.createRef();

    async function CREATE_CUSTOMER(){
        if(user == ''){
            setUserErr('please enter user name');
            setUserErrStyle(true);
            userinput.current.shake();
            userinput.current.focus();
        }

        else if(contact.length != 10){
            setUserErr('');
            setUserErrStyle(false);

            setContactErr('enter a valid contact number');
            setContactErrStyle(true);
            contactinput.current.shake();
            contactinput.current.focus();
        }


        else if(email == ''){
            setContactErrStyle(false);
            setContactErr('');

            setEmailErr('please enter email address');
            setEmailErrStyle(true);
            emailinput.current.shake();
            emailinput.current.focus();
        }

        else if(address == ''){
            setEmailErrStyle(false);
            setEmailErr('');

            setAddressErr('please enter user address');
            setAddressErrStyle(true);
            addressinput.current.shake();
            addressinput.current.focus();
        }

        else {
            var response = await CreateNewCustomer(user, contact, email, address, aadhar);
            //console.log('Res :', response);

            if(response == 'error')
                alert('Server Error')
            
            else{

                
                setUserErrStyle(false);
                setUserErr('');
                setUser('')

                setContactErrStyle(false);
                setContactErr('');
                setContact('');
                
                setEmailErrStyle(false);
                setEmailErr('');
                setEmail('');

                setAddressErrStyle(false);
                setAddressErr('');
                setAddress('');

                setAadharErrStyle(false);
                setAadharErr('');
                setAadhar('');

                props.navigation.goBack();
                //props.navigation.navigate('ViewCustomer')

            }
            
         }

    }

    return(
        <ScrollView>
        <View style={styles.LoginView}>

            <View style={{height:50}}></View>
            <Text h4 style={{textTransform:'capitalize', color:'black'}}>New Customer</Text>
            <View style={{height:20, borderBottomWidth:3, borderColor:'#2288dc', width:100}}></View>
            <View style={{height:80}}></View>

            <Input 
                value = {user}
                ref={userinput}
                onFocus={() => setUserFocus(true)}
                inputContainerStyle={[userFocus ? styles.inputFocused : {}, userErrStyle ? styles.inputErr : {} ]}
                onChangeText = {(user) => setUser(user)}
                maxLength={100}
                placeholder='Name*'
                leftIcon={ <Icon name='user' size={25} color='gray'/>}
                errorStyle={{ color: 'red', textTransform:'capitalize' }}
                errorMessage={userErr}
            />


            <Input 
                value = {contact}
                ref={contactinput}
                onFocus={() => setContactFocus(true)}
                inputContainerStyle={[contactFocus ? styles.inputFocused : {}, contactErrStyle ? styles.inputErr : {} ]}
                onChangeText = {(contact) => setContact(contact)}
                maxLength={10}
                keyboardType={'number-pad'}
                placeholder='Contact*'
                leftIcon={ <Icon name='phone' size={25} color='gray'/>}
                errorStyle={{ color: 'red', textTransform:'capitalize' }}
                errorMessage={contactErr}
            />

            <Input 
                value = {email}
                ref={emailinput}
                onFocus={() => setEmailFocus(true)}
                inputContainerStyle={[emailFocus ? styles.inputFocused : {}, emailErrStyle ? styles.inputErr : {} ]}
                onChangeText = {(email) => setEmail(email)}
                maxLength={100}
                placeholder='Email*'
                leftIcon={ <Icon name='envelope' size={25} color='gray'/>}
                errorStyle={{ color: 'red', textTransform:'capitalize' }}
                errorMessage={emailErr}
            />

            <Input 
                value = {address}
                ref={addressinput}
                onFocus={() => setAddressFocus(true)}
                inputContainerStyle={[addressFocus ? styles.inputFocused : {}, addressErrStyle ? styles.inputErr : {} ]}
                onChangeText = {(address) => setAddress(address)}
                placeholder='Address*'
                leftIcon={ <Icon name='map-marker' size={25} color='gray'/>}
                errorStyle={{ color: 'red', textTransform:'capitalize' }}
                errorMessage={addressErr}
            />

            <Input 
                value = {aadhar}
                ref={aadharinput}
                onFocus={() => setAadharFocus(true)}
                inputContainerStyle={[aadharFocus ? styles.inputFocused : {}, aadharErrStyle ? styles.inputErr : {} ]}
                onChangeText = {(aadhar) => setAadhar(aadhar)}
                maxLength={12}
                keyboardType={'number-pad'}
                placeholder='Aadhar Number (Optional)'
                leftIcon={ <Icon name='id-card' size={25} color='gray'/>}
                errorStyle={{ color: 'red', textTransform:'capitalize' }}
                errorMessage={aadharErr}
            />

       </View>

    <View style={styles.Next_button}>
        <Button onPress={CREATE_CUSTOMER} buttonStyle={{backgroundColor:'#2288dc', borderRadius:100,  paddingLeft:50, paddingRight:30, padding:10}} title='Create Customer'></Button>
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