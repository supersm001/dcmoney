import React, {useState, useEffect} from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text, ScrollView, Switch} from 'react-native';
import {GetAllUserDetails, CreateNewPayment, CancelBill, ChangeUserEmiType} from '../../services/api/users/userapi'
import {FormatDate} from '../../utils/function'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import { ListItem, Avatar, SearchBar, ButtonGroup, Overlay, Button, Input} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import RNPickerSelect from 'react-native-picker-select';

export const AdminViewUser = (props) => {

    const [details,setDetails] =useState([]);
    const [SearchDetails,setSearchDetails] =useState([]);
    const [userdetails,setUserdetails] =useState([{}]);
    const [search, setSearch] =useState('');
    const [visible, setVisible] = useState(false);
    const [switchValue, setSwitchValue] = useState(false);
    const [Inter, SetInter] = useState(0);
    const [CancelVisible, setCancelVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const toggleCancelOverlay = () => {
        setCancelVisible(!CancelVisible);
    };

    useEffect(()=>{
        getfuncion();
        // let interval =  setInterval(()=>{
        //     getfuncion();
        // },5000);
        // SetInter(interval);

        //return ()=>{clearInterval(interval)}
    },[])
        
    async function getfuncion(){
        if(search) return;
        const res = await GetAllUserDetails();
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
                const itemData = item.user_name.toUpperCase()+item.shop_name.toUpperCase()+item.contact.toUpperCase()+item.gst_number.toUpperCase();
                const textData = search.toUpperCase();
                return  itemData.indexOf(textData) > -1
            });
        }
        setDetails(newData);
        setSearch(search);
    };

    const SelectCustomer = (item) =>{
        if(item.emi_type == '0')
            setSwitchValue(false);
        else
            setSwitchValue(true);

        setUserdetails([item])
        toggleOverlay();
    }

    function ShowSpecificBillInvoiceDetailsFunction(){
        toggleOverlay();
        
    }

    
    const toggleSwitch = (value) => {
        setSwitchValue(value);
        if(value)
            ChangeUserEmiType(userdetails[0].id ,'1');
        else    
            ChangeUserEmiType(userdetails[0].id, '0');
        
        //alert(value);
    };

    //const user_contact = route.params.cont;
    return(

        
        <View style={styles.LoginView}>

            {/* <RNPickerSelect
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
            /> */}

            <SearchBar
                placeholder="Search..."
                onChangeText={(search) => SearchProductData(search)}
                value={search}
                containerStyle={{borderColor:'gray', borderWidth:1, padding:0,  borderRadius:50}}
                inputContainerStyle={{backgroundColor:"white", borderWidth:1,borderColor:'white', borderRadius:50}}
            />


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
                                <ListItem.Subtitle style={styles.title}><FontAwesome5 name="user" size={15} color="gray" /> {item.user_name}</ListItem.Subtitle>
                                <ListItem.Subtitle style={{marginTop:10}}><MaterialCommunityIcons name="home-city-outline" size={15} color="gray" /> {item.shop_name}</ListItem.Subtitle>
                                <ListItem.Subtitle style={{marginTop:10, width:'200%', marginTop:10 }}><MaterialCommunityIcons name="map-marker-radius" size={15} color="gray" /> {item.address}</ListItem.Subtitle>
                            </ListItem.Content>

                            <ListItem.Content>
                                <ListItem.Subtitle><FontAwesome5 name="mobile-alt" size={15} color="gray" /> {item.contact}</ListItem.Subtitle>
                                <ListItem.Subtitle style={{marginTop:10}}><FontAwesome5 name="id-card" size={15} color="gray" />  {item.gst_number}</ListItem.Subtitle>
                                <ListItem.Subtitle style={{marginTop:10}}></ListItem.Subtitle>
                            </ListItem.Content>

                    </ListItem>


                </TouchableOpacity>
            )
            }}
            keyExtractor={(item, index) => index.toString()}
           />
        <View>



                <Overlay isVisible={visible} overlayStyle={{borderRadius:10}} onBackdropPress={toggleOverlay}>
                <View style={{ padding:40}}>
                            <View style={{position:"absolute", right:10}}>
                                <Button onPress={toggleOverlay} icon={<FontAwesome5 name="times" size={20} color="white" />} buttonStyle={styles.ImageCloseButton} />
                            </View>

                        <View style={{alignItems:'center'}}>
                            <Text style={{color:'black', textTransform:'uppercase', marginTop:20, fontSize:22}}>user details</Text>
                            <Text style={{borderColor:'red', marginTop:10, borderTopWidth:2, width:125}}/>
                        </View>
                        
                        <View style={{marginTop:10, flexDirection:"row", justifyContent:'space-between'}} >
                            <View><Text style={{fontSize:20}}>EMI</Text></View>
                            <View>
                                <Switch style={{ width:100, transform:[{ scale:1.3}]}} onValueChange={toggleSwitch} value={switchValue} />
                            </View>
                        </View>

                        {/* <View style={{marginTop:10}} >
                            <Button onPress={()=>ShowSpecificBillInvoiceDetailsFunction()} buttonStyle={{marginTop:20, borderRadius:20, backgroundColor:'gray'}}  title='BILL DETAILS'/>
                        </View> */}


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
