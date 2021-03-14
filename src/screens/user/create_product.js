import React, {useState, navigation, useContext} from 'react';
import { StyleSheet, ScrollView, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input, Button, Text } from 'react-native-elements';
import { CreateNewProduct } from '../../services/api/users/userapi'

export const CreateProduct = (props) => {

    const [name, setName] = useState('');
    const [nameErr, setNameErr] = useState('');
    const [nameFocus, setNameFocus] = useState(false);
    const [nameErrStyle, setNameErrStyle] = useState(false);
    const nameinput = React.createRef();


    const [price, setPrice] = useState('');
    const [priceErr, setPriceErr] = useState('');
    const [priceFocus, setPriceFocus] = useState(false);
    const [priceErrStyle, setPriceErrStyle] = useState(false);
    const priceinput = React.createRef();
    

    const [emi, setEmi] = useState('');
    const [emiErr, setEmiErr] = useState('');
    const [emiFocus, setEmiFocus] = useState(false);
    const [emiErrStyle, setEmiErrStyle] = useState(false);
    const emiinput = React.createRef();


    async function CREATE_PRODUCT(){
        if(name == ''){
            setNameErr('please enter product name');
            setNameErrStyle(true);
            nameinput.current.shake();
            nameinput.current.focus();
        }

        else if(price == ''){
            setNameErr('');
            setNameErrStyle(false);

            setPriceErr('please enter price');
            setPriceErrStyle(true);
            priceinput.current.shake();
            priceinput.current.focus();
        }

        else {
            var response = await CreateNewProduct(name, price, emi);
            //console.log('response : ', response)
             if(response == 'error')
                 alert('Server Error')
            else{
                setNameErr('');
                setName('')
                setNameErrStyle(false);

                setPriceErr('');
                setPrice('')
                setPriceErrStyle(false);

                setEmi('')

                props.navigation.goBack();
                //props.navigation.navigate('ViewProduct')
            }
            
        }
    }
    
    return(
        <ScrollView>
        <View style={styles.LoginView}>

            <View style={{height:50}}></View>
            <Text h4 style={{textTransform:'capitalize', color:'black'}}>New Product</Text>
            <View style={{height:20, borderBottomWidth:3, borderColor:'#2288dc', width:100}}></View>
            <View style={{height:80}}></View>

            <Input 
                value = {name}
                ref={nameinput}
                onFocus={() => setNameFocus(true)}
                inputContainerStyle={[nameFocus ? styles.inputFocused : {}, nameErrStyle ? styles.inputErr : {} ]}
                onChangeText = {(name) => setName(name)}
                maxLength={100}
                placeholder='Enter Product Name'
                leftIcon={ <MaterialCommunityIcons name='devices' size={25} color='gray'/>}
                errorStyle={{ color: 'red', textTransform:'capitalize' }}
                errorMessage={nameErr}
            />


            <Input 
                value = {price}
                ref={priceinput}
                onFocus={() => setPriceFocus(true)}
                inputContainerStyle={[priceFocus ? styles.inputFocused : {}, priceErrStyle ? styles.inputErr : {} ]}
                onChangeText = {(price) => setPrice(price)}
                maxLength={10}
                keyboardType='number-pad'
                placeholder='Enter Price'
                leftIcon={ <MaterialCommunityIcons name='currency-inr' size={25} color='gray'/>}
                errorStyle={{ color: 'red', textTransform:'capitalize' }}
                errorMessage={priceErr}
            />

            <Input 
                value = {emi}
                ref={emiinput}
                onFocus={() => setEmiFocus(true)}
                inputContainerStyle={[emiFocus ? styles.inputFocused : {}, emiErrStyle ? styles.inputErr : {} ]}
                onChangeText = {(emi) => setEmi(emi)}
                maxLength={100}
                placeholder='Enter EMI Number'
                leftIcon={ <MaterialCommunityIcons name='alpha-e-box-outline' size={25} color='gray'/>}
                errorStyle={{ color: 'red', textTransform:'capitalize' }}
                errorMessage={emiErr}
            />
           
       </View>

    <View style={styles.Next_button}>
       <Button onPress={CREATE_PRODUCT} buttonStyle={{backgroundColor:'#2288dc', borderRadius:100,  paddingLeft:50, paddingRight:30, padding:10}} title='Create Product'></Button>
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