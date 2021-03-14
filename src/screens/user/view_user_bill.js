import React, {useState, useEffect} from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text, ScrollView} from 'react-native';
import {GetLoggedInUserBillDetails, CreateNewPayment, CancelBill} from '../../services/api/users/userapi'
import {FormatDate} from '../../utils/function'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import { ListItem, Avatar, SearchBar, ButtonGroup, Overlay, Button, Input} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import RNPickerSelect from 'react-native-picker-select';

export const UserViewPayment = (props) => { 

    const [details,setDetails] =useState([]);
    const [SearchDetails,setSearchDetails] =useState([]);
    const [paymentdetails,setPaymentdetails] =useState([{}]);
    const [search, setSearch] =useState('');
    const [EmiMonthValue, setEmiMonthValue] = useState('1');
    
    const [visible, setVisible] = useState(false);
    const [partpayment, setPartpayment] = useState('');
    const [partpaymentErr, setPartpaymentErr] = useState('');
    const [partpaymentFocus, setPartpaymentFocus] = useState(false);
    const [partpaymentErrStyle, setPartpaymentErrStyle] = useState(false);
    const partpaymentinput = React.createRef();
    const [partpaymentdisplay, setPartpaymentdisplay] = useState('none');
    const [EmiDisplay, setEmiDisplay] = useState('none');
    const [RightIconDisplay, setRightIconDisplay] = useState('flex');
    
    const [Inter, SetInter] = useState(0);
    
    const [CancelVisible, setCancelVisible] = useState(false);
    const [CancelBid, setCancelBid] = useState('');

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const toggleCancelOverlay = () => {
        setCancelVisible(!CancelVisible);
    };

    useEffect(()=>{
        getfuncion();
        let interval =  setInterval(()=>{
            getfuncion();
        },5000);
        SetInter(interval);

        return ()=>{clearInterval(interval)}
    },[])
        
    async function getfuncion(){
        if(search) return;
        const res = await GetLoggedInUserBillDetails();
        setDetails([...res]);
        setSearchDetails([...res]);
        //console.log(res.length);
    }

    const SearchProductData= (search)=>  {
        var newData;
        if(!search){
            newData = SearchDetails;
        } else {
            clearInterval(Inter);
            newData = SearchDetails.filter(item => {
                const itemData = item.pay_type.toUpperCase();
                const textData = search.toUpperCase();
                return  itemData.indexOf(textData) > -1
            });
        }
        setDetails(newData);
        setSearch(search);
    };

    const SelectCustomer = (item) =>{
        if(item.status == '0' && item.pay_type == 'part'){
            setPartpaymentdisplay('flex')
            setEmiDisplay('none')
        }
        //else if(item.status == '0' && item.pay_type == 'emi'){
        else if(item.pay_type == 'emi'){
            setPartpaymentdisplay('none')
            setEmiDisplay('flex')
        }
        else{
            setPartpaymentdisplay('none')
            setEmiDisplay('none')
        }
            
        setPaymentdetails([item])
        toggleOverlay();
    }

    async function UpdatePaymentDetails(){
        if(partpayment == '' || parseFloat(partpayment) > parseFloat(paymentdetails[0].balance) ){
            setPartpaymentErr('enter valid amount');
            setPartpaymentErrStyle(true);
            partpaymentinput.current.shake();
            partpaymentinput.current.focus();
        }
        else{
            setRightIconDisplay('none')
            setPartpaymentErr('');
            setPartpaymentErrStyle(false);
            var bal = paymentdetails[0].balance - partpayment;
            var total_pay = parseInt(paymentdetails[0].pay) + parseInt(partpayment);
            var res = await CreateNewPayment(paymentdetails[0].id, partpayment, total_pay, bal);
    
            if(res == 'success'){
                setRightIconDisplay('flex')
                setPartpayment('');
                toggleOverlay();
                props.navigation.navigate('UserViewPayment')
            }else{
                setRightIconDisplay('flex')
                alert('Server Error')
            }

        }
    }

    function ShowEmiDetailsFunction(){
        toggleOverlay();
        props.navigation.navigate('UserSpecficEmiDetails', {id:paymentdetails[0].id})
    }

    function ShowInvoiceDetailsFunction(){
        toggleOverlay();
        props.navigation.navigate('UserSpecficInvoiceDetails', [{id:paymentdetails[0].id, type:'invoice'}])
    }

    function ShowCancelFunction(bid){
        setCancelBid(bid);
        toggleOverlay();
        toggleCancelOverlay();
    }

    async function ConfirmCancel(){
        var resp = await CancelBill(CancelBid);
        toggleCancelOverlay();
    }

    return(

        <View style={styles.LoginView}>

            <RNPickerSelect
                onValueChange={(value) =>  SearchProductData(value)}
                placeholder={{ label: 'Select Period'}}
                key={search}
                value={search}
                useNativeAndroidPickerStyle={true}
                style={SelectStyle}
                placeholder={{label:'Select Payment Type', value:null, color:'lightgray'}}
                color='red'
                items={[
                    { label: 'Full Payment', value: 'full'},
                    { label: 'Emi Payment', value: 'emi' },
                    { label: 'Canceled Bill', value: 'cancel' },
                ]}
            />

            {/* <SearchBar
                placeholder="Search Product..."
                onChangeText={(search) => SearchProductData(search)}
                value={search}
                containerStyle={{borderColor:'gray', borderWidth:1, padding:0,  borderRadius:50}}
                inputContainerStyle={{backgroundColor:"white", borderWidth:1,borderColor:'white', borderRadius:50}}
            /> */}


            <FlatList
            data={details}
            renderItem={({item})=>{
                var ButtonStatus =  <Button title='' buttonStyle={{padding:0, backgroundColor:'white'}} icon={<MaterialCommunityIcons name="check-decagram" size={25} color="green" />} ></Button>;
                var cur_date = FormatDate(item.date);
                if(item.status == '0'){
                    ButtonStatus = <Button title='' buttonStyle={{padding:0, backgroundColor:'white'}} icon={<MaterialCommunityIcons name="brightness-percent" size={25} color="#2288dc" />} ></Button>
                }
                if(item.pay_type == 'cancel'){
                    ButtonStatus = <Button title='' buttonStyle={{padding:0, backgroundColor:'white'}} icon={<MaterialCommunityIcons name="delete-forever" size={25} color="red" />} ></Button>
                }

                
                return( 
                <TouchableOpacity onPress={() => SelectCustomer(item)}>

                    <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title style={styles.title}><MaterialCommunityIcons name="tablet-cellphone" size={15} color="gray" /> {item.name}</ListItem.Title>
                                <ListItem.Subtitle style={{marginTop:10}}><MaterialCommunityIcons name="currency-inr" size={15} color="gray" /> {item.total_price}</ListItem.Subtitle>
                                <ListItem.Subtitle style={{marginTop:10}}><MaterialCommunityIcons name="account-cash-outline" size={15} color="gray" /> {item.balance}</ListItem.Subtitle>
                            </ListItem.Content>

                            <ListItem.Content>
                                <ListItem.Title style={styles.title}><FontAwesome5 name="user" size={15} color="gray" /> {item.customer_name}</ListItem.Title>
                                <ListItem.Subtitle style={{marginTop:10}}><FontAwesome5 name="mobile-alt" size={15} color="gray" />  {item.customer_contact}</ListItem.Subtitle>
                                <ListItem.Subtitle style={{marginTop:10}}><MaterialCommunityIcons name="calendar-blank" size={15} color="gray" /> {cur_date}</ListItem.Subtitle>
                            </ListItem.Content>

                            {ButtonStatus}
                

                        <ListItem.Chevron />
                    </ListItem>


                </TouchableOpacity>
            )
            }}
            keyExtractor={(item, index) => index.toString()}
           />


            <View style={styles.AddButtonView}>
                <MaterialCommunityIcons name="plus" size={20} color="white" style={{padding:25}}  onPress={()=>{props.navigation.navigate('CreateBill')}} />
            </View>
        <View>



                <Overlay isVisible={visible} overlayStyle={{borderRadius:10}} onBackdropPress={toggleOverlay}>
                <View style={{ padding:40}}>
                            <View style={{position:"absolute", right:10}}>
                                <Button onPress={toggleOverlay} icon={<FontAwesome5 name="times" size={20} color="white" />} buttonStyle={styles.ImageCloseButton} />
                            </View>

                        <View style={{alignItems:'center'}}>
                            <Text style={{color:'black', textTransform:'uppercase', marginTop:20, fontSize:22}}>payment details</Text>
                            <Text style={{borderColor:'red', marginTop:10, borderTopWidth:2, width:125}}/>
                        </View>
                        <View>
                            <View style={styles.listStyle}><Text>PRICE</Text><Text><MaterialCommunityIcons name="currency-inr" size={15} color="gray" /> {paymentdetails[0].price}</Text></View>
                            <View style={styles.listStyle}><Text>CGST (9%)</Text><Text><MaterialCommunityIcons name="currency-inr" size={15} color="gray" /> {paymentdetails[0].cgst}</Text></View>
                            <View style={styles.listStyle}><Text>SGST (9%)</Text><Text><MaterialCommunityIcons name="currency-inr" size={15} color="gray" /> {paymentdetails[0].sgst}</Text></View>
                            <View style={styles.listStyle}><Text>IGST (9%)</Text><Text> {paymentdetails[0].igst}</Text></View>
                            <View style={[styles.listStyle]}><Text>TOTAL PRICE</Text><Text><MaterialCommunityIcons name="currency-inr" size={15} color="gray" /> {paymentdetails[0].total_price}</Text></View>
                            <View style={[styles.listStyle, {borderTopWidth:2, borderColor:'gray', marginTop:10, paddingTop:10}]}><Text style={{color:'green'}}>PAID</Text><Text style={{color:'green'}}><MaterialCommunityIcons name="currency-inr" size={15} color="green" /> {paymentdetails[0].pay}</Text></View>
                        </View>

                        <View style={{display:partpaymentdisplay}}>
                            <View style={styles.listStyle}><Text style={{color:'red'}}>BALANCE</Text><Text style={{color:'red'}}><MaterialCommunityIcons name="currency-inr" size={15} color="red" /> {paymentdetails[0].balance}</Text></View>
                            <View style={styles.PaymentInput}>
                                <Input 
                                    value = {partpayment}
                                    ref={partpaymentinput}
                                    onFocus={() => setPartpaymentFocus(true)}
                                    inputContainerStyle={[partpaymentFocus ? styles.inputFocused : {}, partpaymentErrStyle ? styles.inputErr : {}, {marginLeft:-10, marginRight:-10}]}
                                    inputStyle={{fontSize:15, padding:0, paddingRight:10}}
                                    onChangeText = {(partpayment) => setPartpayment(partpayment)}
                                    maxLength={10}
                                    placeholder='Enter Amount'
                                    keyboardType='number-pad'
                                    leftIcon={ <MaterialCommunityIcons name='currency-inr' size={20} color='gray'/>}
                                    errorStyle={{ color: 'red', textTransform:'capitalize' }}
                                    errorMessage={partpaymentErr}
                                    rightIcon={<MaterialCommunityIcons name='checkbox-marked' style={{display:RightIconDisplay}} size={30} color="green" onPress={UpdatePaymentDetails} />}
                                />
                            </View>
                        </View> 


                        <View style={{display:EmiDisplay}}>
                            <View style={styles.listStyle}><Text style={{color:'red'}}>BALANCE</Text><Text style={{color:'red'}}><MaterialCommunityIcons name="currency-inr" size={15} color="red" /> {paymentdetails[0].balance}</Text></View>
                            <View style={styles.PaymentInput}>
                                <Button onPress={()=>ShowEmiDetailsFunction()} buttonStyle={{marginTop:20, borderRadius:20}} title='EMI DETAILS'/>
                            </View>
                        </View> 

                        <View style={{marginTop:10}} >
                            <Button onPress={()=>ShowInvoiceDetailsFunction()} buttonStyle={{marginTop:20, borderRadius:20, backgroundColor:'gray'}}  title='VIEW INVOICE'/>
                            <Button onPress={()=>ShowCancelFunction(paymentdetails[0].id)} buttonStyle={[{marginTop:10, borderRadius:20, backgroundColor:'brown'}, paymentdetails[0].pay_type == 'cancel' ? {display:'none'} : {display:'flex'} ]}  title='CANCEL BILL'/>
                        </View>


                    </View>
                </Overlay>
        
        
                <Overlay isVisible={CancelVisible} overlayStyle={{borderRadius:5}} onBackdropPress={toggleCancelOverlay}>
                    <View style={{padding:10, alignItems:"center"}}>
                        <View>
                            <Text style={{textTransform:'uppercase', fontWeight:"bold", textShadowColor:'brown', textShadowRadius:1, textShadowOffset: {width: 2, height: 2}, fontSize:20}}>Confirm To Cancel</Text>
                        </View>
                        <View style={{padding:0, flexDirection:'row'}}>
                            <View style={{padding:10}}>
                                <Button onPress={() => ConfirmCancel()} title=' YES' icon={<MaterialCommunityIcons name="check-decagram" size={18} color="white" />} buttonStyle={{padding:10, marginTop:20, backgroundColor:'green', width:100}} />
                            </View>
                            <View style={{padding:10}}>
                                <Button onPress={() => toggleCancelOverlay()} title=' NO' icon={<MaterialCommunityIcons name="close-octagon" size={18} color="white" />} buttonStyle={{padding:10, marginTop:20, backgroundColor:'brown', width:100}} />
                            </View>
                        </View>
                    </View>
                </Overlay>

        </View>
        
        
        </View>
    

    )
}

const styles = StyleSheet.create({
    LoginView: {
        backgroundColor:'white',
        flex:1,
        padding:20,
    },
    title: {
        marginTop: 3,
        textTransform:"capitalize"
    }, 
    AddButtonView :{
        position:"absolute",
        bottom:"2%",
        right:"5%",
        borderRadius:100,
        alignItems:'center',
        alignContent:'center',
        backgroundColor:'#2288dc',
        height:70,
        width:70,
    },
    listStyle:{
        flexDirection:"row", 
        justifyContent:'space-between', 
        marginTop:10
    },
    inputFocused: {
        borderBottomColor: '#2288dc',
        borderBottomWidth:2
     },
    inputErr: {
        borderBottomColor: 'red',
    },
    PaymentInput:{
        marginTop:10, 
        marginBottom:-20,
    },
    ImageCloseButton:{
        width:30,
        height:30,
        borderRadius:100,
        backgroundColor:'brown',
        marginTop:10,
    }
    });

    const SelectStyle = {
        placeholder:{color:"lightgray"},
        viewContainer:{borderBottomWidth:1, borderBottomColor:'gray', color:"red"}, 
        inputAndroidContainer:{backgroundColor:"white", alignItems:"center", borderBottomColor:'gray', borderBottomWidth:2},
        useNativeAndroidPickerStyle:{color:"red"}
        
    }
