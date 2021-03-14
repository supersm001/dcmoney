import React, {useState, navigation, useContext} from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Text } from 'react-native-elements';
import { SendOTP, VerifyOTP, GetToken } from '../../services/api/users/userapi'
import {Authcontext} from '../../components/context'


var FinalContact = "";

export const Login = ({ navigation }) => {

    const [contact, setContact] = useState('');
    const [contactErr, setContactErr] = useState('');
    const [contactFocus, setContactFocus] = useState(false);
    const [contactErrStyle, setContactErrStyle] = useState(false);
    const input = React.createRef();

    async function SEND_OTP(){
        if(contact.length != 10){
            setContactErr('enter a valid contact number');
            setContactErrStyle(true);
            input.current.shake();
            input.current.focus();
        }
        else{
            setContactErrStyle(false);
            setContactErr('');
            //var res = 'otp sent';
            var res = await SendOTP(contact);
            if(res == 'otp sent'){
                FinalContact = contact;
                navigation.navigate('EnterOtp');
            }
            else
                alert(res)
        }
    }

    return(

            <ScrollView>
                <View style={styles.LoginView}>

                    <View style={{height:50}}></View>
                    <Text h4 style={{textTransform:'capitalize'}}>Enter Your Phone Number For Verification</Text>
                    <View style={{height:20}}></View>
                    <Text style={{fontSize:15, textTransform:'capitalize'}}>The number will be used for all communication. You shall receive a SMS with Code for Verification.</Text>
                    <View style={{height:100}}></View>

                    <Input 
                        value = {contact}
                        ref={input}
                        onFocus={() => setContactFocus(true)}
                        inputContainerStyle={[contactFocus ? styles.inputFocused : {}, contactErrStyle ? styles.inputErr : {} ]}
                        onChangeText = {(contact) => setContact(contact)}
                        maxLength={10}
                        keyboardType={'number-pad'}
                        placeholder='Enter Contact Number'
                        leftIcon={ <Icon name='phone' size={30} color='gray'/>}
                        errorStyle={{ color: 'red', textTransform:'capitalize' }}
                        errorMessage={contactErr}
                    />

               </View>

            <View style={styles.Next_button}>
               <Button onPress={SEND_OTP} buttonStyle={{backgroundColor:'#2288dc', borderRadius:100,  paddingLeft:50, paddingRight:30, padding:10, justifyContent:'space-between'}} title='Next' iconRight icon={<Icon name="arrow-right"  size={15} color="white"/>}></Button>
            </View>

        </ScrollView>
    )
}


export const EnterOtp = ({navigation}) => {

    const{SignIn} = useContext(Authcontext);

    const [otp, setOtp] = useState('');
    const [otpErr, setOtpErr] = useState('');
    const [otpFocus, setOtpFocus] = useState(false);
    const [otpErrStyle, setOtpErrStyle] = useState(false);
    const Otpinput = React.createRef();

    async function VERIFY_OTP(){
        if(otp.length != 6){
            setOtpErr('Enter 6 Digit OTP');
            setOtpErrStyle(true);
            Otpinput.current.shake();
            Otpinput.current.focus();
        }
        else {
            setOtpErrStyle(false);
            setOtpErr('');
            

            var res = await VerifyOTP(FinalContact, otp);
            //console.log("Otp Verify REs : ",res);
            
            if(res == 'old_user'){
                SignIn();
                //navigation.reset({index:0, routes:[{name:'User_Dashboard', params:{cont:FinalContact}}]})
            }
            else if(res == 'new_user'){
                navigation.reset({
                    index:0,
                    routes:[
                        {name:'Register_User', params:{cont:FinalContact}}
                    ],
                })
            }
            else if(res == 'invalid'){
                setOtpErr('Invalid OTP');
                setOtpErrStyle(true);
            }
            else {
                alert("Server Error");
            }
        }
    }
    
    return(
        <ScrollView>
                <View style={styles.LoginView}>
                    <View style={{height:50}}></View>
                    <Text h4 style={{textTransform:'capitalize'}}>Enter Your 6 Digit <Text style={{textTransform:'uppercase'}}>OTP</Text> Code </Text>
                    <View style={{height:20}}></View>
                    <Text style={{textTransform:'capitalize'}}>OTP SENT ON <Text style={{color:'red'}}> {FinalContact} </Text>  </Text>
                    <View style={{height:80}}></View>
                    <Input 
                        value = {otp}
                        ref={Otpinput}
                        onFocus={() => setOtpFocus(true)}
                        inputContainerStyle={[otpFocus ? styles.inputFocused : {}, otpErrStyle ? styles.inputErr : {} ]}
                        onChangeText = {(otp) => setOtp(otp)}
                        maxLength={6}
                        keyboardType={'number-pad'}
                        placeholder='Enter 6 Digit OTP'
                        leftIcon={ <Icon name='mobile' size={30} color='gray'/>}
                        errorStyle={{ color: 'red', textTransform:'capitalize' }}
                        errorMessage={otpErr}
                    />

               </View>

            <View style={styles.Next_button}>
                <Button onPress={VERIFY_OTP} buttonStyle={{backgroundColor:'#2288dc', borderRadius:100,  paddingLeft:50, paddingRight:30, padding:10, justifyContent:'space-between'}} title='Verify' iconRight icon={<Icon name="arrow-right"  size={15} color="white"/>}></Button>
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
