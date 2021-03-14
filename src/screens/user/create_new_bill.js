import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, FlatList, TouchableOpacity, ScrollView, ActivityIndicator, SafeAreaView} from 'react-native';
import {GetLoggedInUserProductDetails, GetLoggedInUserCustomerDetails, CreateNewBill, CreateNewEmiBill, GetLoggedInUserDetails} from '../../services/api/users/userapi'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import { ListItem, Avatar, SearchBar, ButtonGroup, Overlay, Button, Input, CheckBox, Image, BottomSheet} from 'react-native-elements';
import { color } from 'react-native-reanimated';
import RNPickerSelect from 'react-native-picker-select';
import ImagePicker from 'react-native-image-crop-picker';
import {UploadImageToServer} from '../../utils/upload_image'
import AsyncStorage from '@react-native-community/async-storage';

var ProductFinalDetails = {data :[{}]};
var CustomerFinalDetails = {data :[{}]};

//ProductFinalDetails.data.push({id:'1',name:'redmi',price:'9999',emi:'1123123122312312312312'})
//CustomerFinalDetails.data.push({id:'1',name:'snj',contact:'9887878767',email:'snj@gmail.com',address:'rajapuri uttam nagar, new dlehi'})

export const CreateBill = (props) => {

    //****************************************** Create Customer  ***************************************/
    
    const [EmiType, setEmiType] = useState('0');
    GetEmiFunction()

    async function GetEmiFunction(){
        setEmiType(await AsyncStorage.getItem('EmiType'));
    }

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

    const [pan, setPan] = useState('');
    const [panErr, setPanErr] = useState('');
    const [panFocus, setPanFocus] = useState(false);
    const [panErrStyle, setPanErrStyle] = useState(false);
    const paninput = React.createRef();

    const [RelativeName1, setRelativeName1] = useState('');
    const [RelativeName1Err, setRelativeName1Err] = useState('');
    const [RelativeName1Focus, setRelativeName1Focus] = useState(false);
    const [RelativeName1ErrStyle, setRelativeName1ErrStyle] = useState(false);
    const RelativeName1Input = React.createRef();
     
    const [RelativeContact1, setRelativeContact1] = useState('');
    const [RelativeContact1Err, setRelativeContact1Err] = useState('');
    const [RelativeContact1Focus, setRelativeContact1Focus] = useState(false);
    const [RelativeContact1ErrStyle, setRelativeContact1ErrStyle] = useState(false);
    const RelativeContact1Input = React.createRef();
     
    const [RelativeName2, setRelativeName2] = useState('');
    const [RelativeName2Err, setRelativeName2Err] = useState('');
    const [RelativeName2Focus, setRelativeName2Focus] = useState(false);
    const [RelativeName2ErrStyle, setRelativeName2ErrStyle] = useState(false);
    const RelativeName2Input = React.createRef();
     
    const [RelativeContact2, setRelativeContact2] = useState('');
    const [RelativeContact2Err, setRelativeContact2Err] = useState('');
    const [RelativeContact2Focus, setRelativeContact2Focus] = useState(false);
    const [RelativeContact2ErrStyle, setRelativeContact2ErrStyle] = useState(false);
    const RelativeContact2Input = React.createRef();
     
     
    //****************************************** Create Product  ***************************************/

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

    const [gstcheck, setGstcheck] = useState(false);
    const [gstcheckErr, setGstcheckErr] = useState('');
    const [gstcheckFocus, setGstcheckFocus] = useState(false);
    const [gstcheckErrStyle, setGstcheckErrStyle] = useState(false);
    const gstcheckinput = React.createRef();


    //****************************************** Emi Section  ***************************************/

    const [finalPrice, setFinalPrice] = useState(false);
    const [firstPrice, setFirstPrice] = useState(false);
    const [gst_cgst, setGst_cgst] = useState(false);
    const [gst_sgst, setGst_sgst] = useState(false);
    const [gst_igst, setGst_igst] = useState(false);
    const [GrandTotal, setGrandTotal] = useState(false);

    const [Emipaidamount, setEmipaidamount] = useState('');
    const [Emibalanceamount, setEmibalanceamount] = useState('');
    const [Emimonthamount, setEmimonthamount] = useState('');
    const [Emipayableamount, setEmipayableamount] = useState('');
    const [Emitotalamount, setEmitotalamount] = useState('');
 
    const [PaymentType, setPaymentType] = useState('');
    const [visible, setVisible] = useState(false);
    const [emivisible, setEmiVisible] = useState(false);
    const [emialertvisible, setEmiAlertVisible] = useState(false);

    const [partpayment, setPartpayment] = useState('');
    const [partpaymentErr, setPartpaymentErr] = useState('');
    const [partpaymentFocus, setPartpaymentFocus] = useState(false);
    const [partpaymentErrStyle, setPartpaymentErrStyle] = useState(false);
    const partpaymentinput = React.createRef();
    const [partpaymentdisplay, setPartpaymentdisplay] = useState('flex');

    const [emipayment, setEmipayment] = useState('');
    const [emipaymentErr, setEmipaymentErr] = useState('');
    const [emipaymentFocus, setEmipaymentFocus] = useState(false);
    const [emipaymentErrStyle, setEmipaymentErrStyle] = useState(false);
    const emipaymentinput = React.createRef();

    const [emipercent, setEmipercent] = useState('3');
    const [emipercentErr, setEmipercentErr] = useState('');
    const [emipercentFocus, setEmipercentFocus] = useState(false);
    const [emipercentErrStyle, setEmipercentErrStyle] = useState(false);
    const emipercentinput = React.createRef();
    
    const [EmiMonthValue, setEmiMonthValue] = useState('3');
    const [emimonthFocus, setEmimonthFocus] = useState(false);
    const [emimonthErrStyle, setEmimonthErrStyle] = useState(false);

    //****************************************** Images  ***************************************/
    
    const [UserImage, setUserImage] = useState('http://pcsetupvsss.xyz/sos/images/admin.png');
    const [UserBase64Image, setUserBase64Image] = useState('');
    const [userImageErr, setuserImageErr] = useState(false);
    const UserImageErrFocus = React.createRef();
        
    const [PanImage, setPanImage] = useState('http://pcsetupvsss.xyz/sos/images/pan.png');
    const [PanBase64Image, setPanBase64Image] = useState('');

    const [AadharFrontImage, setAadharFrontImage] = useState('http://pcsetupvsss.xyz/sos/images/aadhar_front.png');
    const [AadharFrontBase64Image, setAadharFrontBase64Image] = useState('');

    const [AadharBackImage, setAadharBackImage] = useState('http://pcsetupvsss.xyz/sos/images/aadhar_back.png');
    const [AadharBackBase64Image, setAadharBackBase64Image] = useState('');

    const [ImageType, setImageType] = useState('');

    const [Bottomvisible, setBottomvisible] = useState(false);

    const [LoaderIcon, setLoaderIcon] = useState('none');

    useEffect(()=>{
        if(price > 0)
            ShowPayDetails();
    },[price, gstcheck])

    function ShowPayDetails(){
        setFirstPrice(price); //847
        setGst_cgst('-'); // 152
        setGst_sgst('-');  // 152
        setGst_igst('-');

        if(gstcheck == true){
            var fp = Math.round(price*100/118);
            setFirstPrice(fp); //847
            setGst_cgst(Number((fp*0.09).toFixed(2))); // 152
            setGst_sgst(Number((fp*0.09).toFixed(2)));  // 152
            setGst_igst('-');
        }
        //const GrandTotal = Math.round(firstPrice+gst_cgst+gst_sgst);
        setGrandTotal(price);
    }

    function ShowEmiOutput(){
        var total_bal = GrandTotal-emipayment;
        var total_percent = EmiMonthValue*emipercent;
        var emi_pay_amount = (total_bal/100*total_percent)+total_bal;
        var per_month = parseInt(emi_pay_amount) / parseInt(EmiMonthValue);
        var total_pay = parseInt(emi_pay_amount) + parseInt(emipayment);

        setEmipaidamount(Number(emipayment).toFixed(0));
        setEmibalanceamount(Number(total_bal).toFixed(0));
        setEmimonthamount(Number(per_month).toFixed(0));
        setEmipayableamount(Number(emi_pay_amount).toFixed(0))
        setEmitotalamount(Number(total_pay).toFixed(0))
        
    }

    useEffect(()=>{
        if(parseFloat(emipayment) > 0 && parseFloat(emipayment) <= parseFloat(GrandTotal)) 
            ShowEmiOutput();
    },[
        emipayment,emipercent,EmiMonthValue
    ])
 
    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const toggleEmiOverlay = () => {
        setEmiVisible(!emivisible);
    };

    const toggleEmiAlertOverlay = () => {
        setEmiAlertVisible(!emialertvisible);
    };

    const PaymentFunciton = async (item) =>{
        var check = await CheckUserData(item);
        if(check == 'success'){
            if(item == 0){
                setPaymentType('full');
                toggleOverlay();
                setPartpaymentdisplay('none');
            }else if(item == 2){
                setPaymentType('emi');
                toggleOverlay();
                setPartpaymentdisplay('flex');
            } else{
                if(EmiType == '0'){
                    toggleEmiAlertOverlay();
                }
                else{
                    setPaymentType('emi');
                    toggleEmiOverlay();
                }
            }
        }
    }

    async function GstCheckFunction(){
        if(gstcheck == true){
            setGstcheck(false);
        }
        else{
            setGstcheck(true);
        }
    }

    async function SelectImage(type){
        setImageType(type);
        toggleBottomNavigationView();
    }

    async function SelectImageSection(type){
        toggleBottomNavigationView();
        if(type == 'cam'){
            ImagePicker.openCamera({
                cropping: true,
                width: 300,
                height: 300,
                includeBase64:true
            }).then(image => {
                CallMainFunction(image, ImageType)
            });
        }
        else{
            ImagePicker.openPicker({
                cropping: true,
                width: 300,
                height: 300,
                includeBase64:true
            }).then(image => {
                CallMainFunction(image, ImageType)
            });
        }

        async function CallMainFunction(image, type){
            const Base64Image = `data:image/jpeg;base64,${image.data}`;
            if(type == 'US'){
                setUserImage(image.path);
                setUserBase64Image(Base64Image);
            }
            else if(type == 'PN'){
                setPanImage(image.path);
                setPanBase64Image(Base64Image);
            }
            else if(type == 'ADF'){
                setAadharFrontImage(image.path);
                setAadharFrontBase64Image(Base64Image);
            }
            else if(type == 'ADB'){
                setAadharBackImage(image.path);
                setAadharBackBase64Image(Base64Image);
            }

            //var res = await UploadImageToServer(Base64Image, type) 
            //console.warn("Final Res : ", res.message);
        }

    }

    const toggleBottomNavigationView = () => {
        setBottomvisible(!Bottomvisible);
    };

    async function PayPaymentFunction(){
        setLoaderIcon('flex');
        var res = await CreateNewBill (CustomerFinalDetails.data[0].name, CustomerFinalDetails.data[0].contact, CustomerFinalDetails.data[0].address, CustomerFinalDetails.data[0].aadhar, CustomerFinalDetails.data[0].pan, ProductFinalDetails.data[0].name, ProductFinalDetails.data[0].emi, firstPrice, gst_cgst, gst_sgst, gst_igst, GrandTotal, GrandTotal, '0', PaymentType);
         if(res == 'success'){
             toggleOverlay();
             ClearFunction();
             props.navigation.navigate('UserViewPayment')
         }else{
             alert('Server Error')
         }
    }

    async function PayEmiPaymentFunction(){
        if(emipayment == '' || parseFloat(emipayment) > parseFloat(GrandTotal) ){
            setEmipaymentErr('enter valid amount');
            setEmipaymentErrStyle(true);
            emipaymentinput.current.shake();
            emipaymentinput.current.focus();
        }
        else if(!EmiMonthValue > 0){
            setEmipaymentErr('');
            setEmipaymentErrStyle(false);
            
            setEmimonthErrStyle(true);
        }
        else if(emipercent == '' || !parseFloat(emipercent) > 0 ){
            setEmipaymentErr('');
            setEmipaymentErrStyle(false);
            setEmimonthErrStyle(false);

            setEmipercentErr('enter valid Percent amount');
            setEmipercentErrStyle(true);
            emipercentinput.current.shake();
            emipercentinput.current.focus();
        }
        else{
            setLoaderIcon('flex')
            var BaseImage = [UserBase64Image, AadharFrontBase64Image, AadharBackBase64Image, PanBase64Image];
            var BaseImageType = ['US','ADF','ADB', 'PN'];
            var BaseImageName = [];

            for(var i=0; i<BaseImage.length; i++){
                var res = await UploadImageToServer(BaseImage[i], BaseImageType[i]) 
                BaseImageName[i]=res;
            }
            
            var emi_bal_amount = Emitotalamount - Emipaidamount;
            var res = await CreateNewEmiBill (CustomerFinalDetails.data[0].name, CustomerFinalDetails.data[0].contact, CustomerFinalDetails.data[0].address, CustomerFinalDetails.data[0].aadhar, CustomerFinalDetails.data[0].pan, ProductFinalDetails.data[0].name, ProductFinalDetails.data[0].emi, firstPrice, gst_cgst, gst_sgst, gst_igst, GrandTotal, Emitotalamount, Emipaidamount, EmiMonthValue, emipercent, emi_bal_amount /*Emibalanceamount*/, Emimonthamount, Emipayableamount, Emitotalamount, PaymentType, BaseImageName[0].message, BaseImageName[1].message, BaseImageName[2].message, BaseImageName[3].message, RelativeName1, RelativeContact1, RelativeName2, RelativeContact2);
            if(res == 'success'){
                setEmipaymentErr('');
                setEmipaymentErrStyle(false);
                setEmimonthErrStyle(false);
                setEmipercentErr('');
                setEmipercentErrStyle(false);
                toggleEmiOverlay();
                ClearFunction();
                props.navigation.navigate('UserViewPayment')
            }else{
                setLoaderIcon('none')
                alert('Server Error')
            }
        }
    }

    function CheckUserData(item){
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

        else if(address == ''){
            setContactErrStyle(false);
            setContactErr('');

            setAddressErr('please enter user address');
            setAddressErrStyle(true);
            addressinput.current.shake();
            addressinput.current.focus();
        }

        else if(name == ''){

            setUserErrStyle(false);
            setUserErr('');

            setContactErrStyle(false);
            setContactErr('');
            
            setAddressErrStyle(false);
            setAddressErr('');

            setAadharErrStyle(false);
            setAadharErr('');

            setPanErrStyle(false);
            setPanErr('');

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
        else{

            if(item == 1){
                if(UserBase64Image == ''){
                    setuserImageErr(true);
                    UserImageErrFocus.current.focus();
                }

                else if(aadhar.length != 12 || AadharFrontBase64Image == '' || AadharBackBase64Image == ''){
                    setAadharErr('please enter Aadhar Number and upload the image');
                    setAadharErrStyle(true);
                    aadharinput.current.shake();
                    aadharinput.current.focus();
                    setuserImageErr(false);
                }
                else if(pan.length != 10 || PanBase64Image == ''){
                    setPanErr('please enter Pan Number and upload the image');
                    setPanErrStyle(true);
                    paninput.current.shake();
                    paninput.current.focus();

                    setAadharErr('');
                    setAadharErrStyle(false);
                    
                }
                else if(RelativeName1 == ''){
                    setRelativeName1Err('please enter Name');
                    setRelativeName1ErrStyle(true);
                    RelativeName1Input.current.shake();
                    RelativeName1Input.current.focus();

                    setPanErr('');
                    setPanErrStyle(false);
                    
                }
                else if(RelativeContact1.length != 10){
                    setRelativeContact1Err('please enter Valid Contact');
                    setRelativeContact1ErrStyle(true);
                    RelativeContact1Input.current.shake();
                    RelativeContact1Input.current.focus();

                    setRelativeName1Err('');
                    setRelativeName1ErrStyle(false);
                    
                }
                else if(RelativeName2 == ''){
                    setRelativeName2Err('please enter Name');
                    setRelativeName2ErrStyle(true);
                    RelativeName2Input.current.shake();
                    RelativeName2Input.current.focus();

                    setRelativeName1Err('');
                    setRelativeName1ErrStyle(false);
                    setRelativeContact1Err('');
                    setRelativeContact1ErrStyle(false);
                    
                }
                else if(RelativeContact2.length != 10){
                    setRelativeContact2Err('please enter Valid Contact');
                    setRelativeContact2ErrStyle(true);
                    RelativeContact2Input.current.shake();
                    RelativeContact2Input.current.focus();

                    setRelativeName1Err('');
                    setRelativeName1ErrStyle(false);
                    setRelativeName2Err('');
                    setRelativeName2ErrStyle(false);
                    setRelativeContact1Err('');
                    setRelativeContact1ErrStyle(false);
                }
                
                else{

                    ProductFinalDetails.data = [];
                    CustomerFinalDetails.data = [];
    
                    ProductFinalDetails.data.push({id:'', name:name, price:price, emi:emi})
                    CustomerFinalDetails.data.push({id:'', name:user, contact:contact, address:address, aadhar:aadhar, pan:pan })
    
                    var in_amount = Number(GrandTotal / 2).toFixed(0);
                    setEmipayment(in_amount.toString());
                
                    setUserErrStyle(false);
                    setUserErr('');
        
                    setContactErrStyle(false);
                    setContactErr('');
                    
                    setAddressErrStyle(false);
                    setAddressErr('');
    
                    setAadharErr('');
                    setAadharErrStyle(false);
    
                    setPanErr('');
                    setPanErrStyle(false);
    
                    setNameErr('');
                    setNameErrStyle(false);
    
                    setPriceErr('');
                    setPriceErrStyle(false);
    
                    setuserImageErr(false);
                    
                    setRelativeName1Err('');
                    setRelativeName1ErrStyle(false);
                    
                    setRelativeName2Err('');
                    setRelativeName2ErrStyle(false);
                    
                    setRelativeContact1Err('');
                    setRelativeContact1ErrStyle(false);
                    
                    setRelativeContact2Err('');
                    setRelativeContact2ErrStyle(false);

                    return 'success';
                }
            }
            
            else{

                ProductFinalDetails.data = [];
                CustomerFinalDetails.data = [];

                ProductFinalDetails.data.push({id:'', name:name, price:price, emi:emi})
                CustomerFinalDetails.data.push({id:'', name:user, contact:contact, address:address, aadhar:aadhar, pan:pan })

                var in_amount = Number(GrandTotal / 2).toFixed(0);
                setEmipayment(in_amount.toString());
            
                setUserErrStyle(false);
                setUserErr('');
    
                setContactErrStyle(false);
                setContactErr('');
                
                setAddressErrStyle(false);
                setAddressErr('');

                setAadharErr('');
                setAadharErrStyle(false);

                setPanErr('');
                setPanErrStyle(false);

                setNameErr('');
                setNameErrStyle(false);

                setPriceErr('');
                setPriceErrStyle(false);

                setRelativeName1Err('');
                setRelativeName1ErrStyle(false);
                
                setRelativeName2Err('');
                setRelativeName2ErrStyle(false);
                
                setRelativeContact1Err('');
                setRelativeContact1ErrStyle(false);
                
                setRelativeContact2Err('');
                setRelativeContact2ErrStyle(false);


                return 'success';
            }
        }


    }
    
    function ClearFunction(){

        setUser('');
        setUserErr('');
        setUserFocus(false);
        setUserErrStyle(false);
        
        setContact('');
        setContactErr('');
        setContactFocus(false);
        setContactErrStyle(false);
        
        setAddress('');
        setAddressErr('');
        setAddressFocus(false);
        setAddressErrStyle(false);
        
        setAadhar('');
        setAadharErr('');
        setAadharFocus(false);
        setAddressErrStyle(false);

        setPan('');
        setPanErr('');
        setPanFocus(false);
        setPanErrStyle(false)

        setName('');
        setNameErr('');
        setNameFocus(false);
        setNameErrStyle(false)
        
        setPrice('');
        setPriceErr('');
        setPriceFocus(false);
        setPriceErrStyle(false)
        
        setEmi('');
        setEmiErr('');
        setEmiFocus(false);
        setEmiErrStyle(false)
        
        setGstcheck(false);        

        setFirstPrice('');
        setGst_cgst('');
        setGst_sgst('');
        setGst_igst('');
        setGrandTotal('');

        setLoaderIcon('none')
    
        setUserImage('http://pcsetupvsss.xyz/sos/images/admin.png');
        setUserBase64Image('');
        setuserImageErr(false);
            
        setPanImage('http://pcsetupvsss.xyz/sos/images/pan.png');
        setPanBase64Image('');

        setAadharFrontImage('http://pcsetupvsss.xyz/sos/images/aadhar_front.png');
        setAadharFrontBase64Image('');

        setAadharBackImage('http://pcsetupvsss.xyz/sos/images/aadhar_back.png');
        setAadharBackBase64Image('');

        setRelativeName1Err('');
        setRelativeName1ErrStyle(false);
        
        setRelativeName2Err('');
        setRelativeName2ErrStyle(false);
        
        setRelativeContact1Err('');
        setRelativeContact1ErrStyle(false);
        
        setRelativeContact2Err('');
        setRelativeContact2ErrStyle(false);


    }


    return(

            <View style={styles.BillView}>

                <ScrollView>
      
                    <View>
                        <ListItem bottomDivider disabled  >
                            <ListItem.Content style={{marginLeft:10, alignItems:"center"}}>
                                <Text style={{fontSize:20}}>User Details</Text>
                                <View style={{height:10, borderBottomColor:'red', borderBottomWidth:1, width:'100%'}}/>

                                <View style={{height:20}}/>
                                <TouchableOpacity onPress={() => SelectImage('US')}>
                                    <View style={{display:"none"}}>
                                        <Input ref={UserImageErrFocus}/>
                                    </View>
                                    <View  style={[{borderColor:'gray', borderWidth:2, borderRadius:100}, userImageErr ? {borderColor:'red'} : {}]}>
                                    <Avatar rounded source={{uri: UserImage }} size={100} />
                                    </View>
                                </TouchableOpacity>
                                

                                <View style={{height:20}}/>
                                
                                <Input 
                                    value = {user}
                                    ref={userinput}
                                    onFocus={() => setUserFocus(true)}
                                    inputContainerStyle={[userFocus ? styles.inputFocused : {}, userErrStyle ? styles.inputErr : {}]}
                                    onChangeText = {(user) => setUser(user)}
                                    maxLength={100}
                                    placeholder='User Name*'
                                    leftIcon={ <Icon name='user' size={17} color='gray'/>}
                                    errorStyle={{ color: 'red', textTransform:'capitalize' }}
                                    errorMessage={userErr}
                                    style={{fontSize:15}}
                                />


                                <Input 
                                    value = {contact}
                                    ref={contactinput}
                                    onFocus={() => setContactFocus(true)}
                                    inputContainerStyle={[contactFocus ? styles.inputFocused : {}, contactErrStyle ? styles.inputErr : {}, {marginTop:-10} ]}
                                    onChangeText = {(contact) => setContact(contact)}
                                    maxLength={10}
                                    keyboardType={'number-pad'}
                                    placeholder='User Contact*'
                                    leftIcon={ <Icon name='phone' size={17} color='gray'/>}
                                    errorStyle={{ color: 'red', textTransform:'capitalize' }}
                                    errorMessage={contactErr}
                                    style={{fontSize:15}}
                                />

                                <Input 
                                    value = {address}
                                    ref={addressinput}
                                    onFocus={() => setAddressFocus(true)}
                                    inputContainerStyle={[addressFocus ? styles.inputFocused : {}, addressErrStyle ? styles.inputErr : {}, {marginTop:-10} ]}
                                    onChangeText = {(address) => setAddress(address)}
                                    placeholder='User Address*'
                                    maxLength={60}
                                    leftIcon={ <Icon name='map-marker' size={17} color='gray'/>}
                                    errorStyle={{ color: 'red', textTransform:'capitalize' }}
                                    errorMessage={addressErr}
                                    style={{fontSize:15}}
                                />

                                <Input 
                                    value = {aadhar} 
                                    ref={aadharinput}
                                    onFocus={() => setAadharFocus(true)}
                                    inputContainerStyle={[aadharFocus ? styles.inputFocused : {}, aadharErrStyle ? styles.inputErr : {}, {marginTop:-10} ]}
                                    onChangeText = {(aadhar) => setAadhar(aadhar)}
                                    maxLength={12}
                                    keyboardType={'number-pad'}
                                    placeholder='Aadhar Number'
                                    leftIcon={ <Icon name='id-card' size={17} color='gray'/>}
                                    rightIcon={ <FontAwesome5 onPress={() => SelectImage('ADF')} name='upload' size={17} color='gray'/>}
                                    errorStyle={{ color: 'red', textTransform:'capitalize' }}
                                    errorMessage={aadharErr}
                                    style={{fontSize:15}}
                                />

                                <View style={{flexDirection:'row'}}>
                                    <TouchableOpacity onPress={() => SelectImage('ADF')}>
                                        <View style={{paddingLeft:20, paddingRight:20, alignItems:'center'}}>
                                            <Avatar source={{uri: AadharFrontImage }} size={100} />
                                            <Text style={{marginTop:10, color:'gray', textTransform:'uppercase', fontSize:10}}>Aadhar Front</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => SelectImage('ADB')}>
                                        <View style={{paddingLeft:20, paddingRight:20, alignItems:'center'}}>
                                            <Avatar source={{uri: AadharBackImage }} size={100} />
                                            <Text style={{marginTop:10, color:'gray', textTransform:'uppercase', fontSize:10}}>Aadhar Back</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <View style={{height:20}} />


                                <Input 
                                    value = {pan}
                                    ref={paninput}
                                    onFocus={() => setPanFocus(true)}
                                    inputContainerStyle={[panFocus ? styles.inputFocused : {}, panErrStyle ? styles.inputErr : {}, {marginTop:-10} ]}
                                    onChangeText = {(pan) => setPan(pan)}
                                    maxLength={10}
                                    placeholder='PAN Number'
                                    autoCapitalize={"characters"}
                                    leftIcon={ <Icon name='vcard-o' size={17} color='gray'/>}
                                    rightIcon={ <FontAwesome5 onPress={() => SelectImage('PN')} name='upload' size={17} color='gray'/>}
                                    errorStyle={{ color: 'red', textTransform:'capitalize' }}
                                    errorMessage={panErr}
                                    style={{fontSize:15, textTransform:"uppercase"}}
                                />

                                <View style={{flexDirection:'row'}}>
                                    <TouchableOpacity onPress={() => SelectImage('PN')}>
                                        <View style={{padding:10}}><Avatar source={{uri: PanImage }} size={100} /></View>
                                    </TouchableOpacity>
                                </View>

                                <View style={{height:40}}/>
                                <Text style={{fontSize:20}}>Relative Details</Text>
                                <View style={{height:10, borderBottomColor:'red', borderBottomWidth:1, width:'100%'}}/>
                                <View style={{height:40}}/>


                                <View style={{flexDirection:'row'}}>
                                    <View style={{width:'50%'}}>
                                        <Input 
                                            value = {RelativeName1}
                                            ref={RelativeName1Input}
                                            onFocus={() => setRelativeName1Focus(true)}
                                            inputContainerStyle={[RelativeName1Focus ? styles.inputFocused : {}, RelativeName1ErrStyle ? styles.inputErr : {}, {width:'100%'} ]}
                                            onChangeText = {(RelativeName1) => setRelativeName1(RelativeName1)}
                                            maxLength={100}
                                            placeholder='1st Relative Name'
                                            leftIcon={ <Icon name='user' size={17} color='gray'/>}
                                            errorStyle={{ color: 'red', textTransform:'capitalize' }}
                                            errorMessage={RelativeName1Err}
                                            style={{fontSize:15}}
                                        />
                                    </View>

                                    <View style={{width:'50%'}}>
                                        <Input 
                                            value = {RelativeContact1}
                                            ref={RelativeContact1Input}
                                            onFocus={() => setRelativeContact1Focus(true)}
                                            inputContainerStyle={[RelativeContact1Focus ? styles.inputFocused : {}, RelativeContact1Err ? styles.inputErr : {}, {width:'100%'} ]}
                                            onChangeText = {(RelativeContact1) => setRelativeContact1(RelativeContact1)}
                                            maxLength={10}
                                            keyboardType={"number-pad"}
                                            placeholder='1st Relative Contact'
                                            leftIcon={ <Icon name='phone' size={17} color='gray'/>}
                                            errorStyle={{ color: 'red', textTransform:'capitalize' }}
                                            errorMessage={RelativeContact1Err}
                                            style={{fontSize:15}}
                                        />
                                    </View>
                                </View>


                                <View style={{flexDirection:'row'}}>
                                    <View style={{width:'50%'}}>
                                        <Input 
                                            value = {RelativeName2}
                                            ref={RelativeName2Input}
                                            onFocus={() => setRelativeName2Focus(true)}
                                            inputContainerStyle={[RelativeName2Focus ? styles.inputFocused : {}, RelativeName2ErrStyle ? styles.inputErr : {}, {width:'100%'} ]}
                                            onChangeText = {(RelativeName2) => setRelativeName2(RelativeName2)}
                                            maxLength={100}
                                            placeholder='2nd Relative Name'
                                            leftIcon={ <Icon name='user' size={17} color='gray'/>}
                                            errorStyle={{ color: 'red', textTransform:'capitalize' }}
                                            errorMessage={RelativeName2Err}
                                            style={{fontSize:15}}
                                        />
                                    </View>

                                    <View style={{width:'50%'}}>
                                        <Input 
                                            value = {RelativeContact2}
                                            ref={RelativeContact2Input}
                                            onFocus={() => setRelativeContact2Focus(true)}
                                            inputContainerStyle={[RelativeContact2Focus ? styles.inputFocused : {}, RelativeContact2Err ? styles.inputErr : {}, {width:'100%'} ]}
                                            onChangeText = {(RelativeContact2) => setRelativeContact2(RelativeContact2)}
                                            maxLength={10}
                                            keyboardType={"number-pad"}
                                            placeholder='2nd Relative Contact'
                                            autoCapitalize={"characters"}
                                            leftIcon={ <Icon name='phone' size={17} color='gray'/>}
                                            errorStyle={{ color: 'red', textTransform:'capitalize' }}
                                            errorMessage={RelativeContact2Err}
                                            style={{fontSize:15}}
                                        />
                                    </View>
                                </View>

                            <View style={{height:5}}/>
                            </ListItem.Content>
                        </ListItem>


                        <ListItem bottomDivider disabled  >
                            <ListItem.Content style={{marginLeft:10, alignItems:"center"}}>
                                <View style={{height:40}}/>
                                <Text style={{fontSize:20}}>Product Details</Text>
                                <View style={{height:10, borderBottomColor:'red', borderBottomWidth:1, width:'100%'}}/>

                                <View style={{height:40}}/>
                                <Avatar rounded source={{uri: 'https://www.tourdemelon.com/wp-content/plugins/maxbuttons/images/gopro/icons/responsive.png'}} size={100} />
                                <View style={{height:40}}/>

                                <Input 
                                    value = {name}
                                    ref={nameinput}
                                    onFocus={() => setNameFocus(true)}
                                    inputContainerStyle={[nameFocus ? styles.inputFocused : {}, nameErrStyle ? styles.inputErr : {}, {marginTop:-10} ]}
                                    onChangeText = {(name) => setName(name)}
                                    maxLength={100}
                                    placeholder='Product Name*'
                                    leftIcon={ <MaterialCommunityIcons name='devices' size={17} color='gray'/>}
                                    errorStyle={{ color: 'red', textTransform:'capitalize' }}
                                    errorMessage={nameErr}
                                    style={{fontSize:15}}
                                />


                                <Input 
                                    value = {price}
                                    ref={priceinput}
                                    onFocus={() => setPriceFocus(true)}
                                    inputContainerStyle={[priceFocus ? styles.inputFocused : {}, priceErrStyle ? styles.inputErr : {}, {marginTop:-10} ]}
                                    onChangeText = {(price) => setPrice(price)}
                                    maxLength={10}
                                    keyboardType='number-pad'
                                    placeholder='Product Price*'
                                    leftIcon={ <MaterialCommunityIcons name='currency-inr' size={17} color='gray'/>}
                                    errorStyle={{ color: 'red', textTransform:'capitalize' }}
                                    errorMessage={priceErr}
                                    style={{fontSize:15}}
                                />

                                <Input 
                                    value = {emi}
                                    ref={emiinput}
                                    onFocus={() => setEmiFocus(true)}
                                    inputContainerStyle={[emiFocus ? styles.inputFocused : {}, emiErrStyle ? styles.inputErr : {}, {marginTop:-10} ]}
                                    onChangeText = {(emi) => setEmi(emi)}
                                    maxLength={100}
                                    placeholder='Product EMI Number'
                                    leftIcon={ <MaterialCommunityIcons name='alpha-e-box-outline' size={17} color='gray'/>}
                                    errorStyle={{ color: 'red', textTransform:'capitalize' }}
                                    errorMessage={emiErr}
                                    style={{fontSize:15}}
                                />

                                <CheckBox uncheckedColor="lightgray" title='INCLUDE GST' checkedColor="green" containerStyle={{marginTop:0, width:'100%'}} checked={gstcheck} value={gstcheck} onPress={()=> GstCheckFunction()} />
                                
                                {/* <Input disabled inputContainerStyle={[emiFocus ? styles.inputFocused : {}, emiErrStyle ? styles.inputErr : {}, {marginTop:-10, borderBottomWidth:0} ]} /> */}

                            
                            <View style={{height:5}}/>
                            </ListItem.Content>
                        </ListItem>

                        <View style={{height:20}}/>
                        

                        <View style={{alignItems:'center'}}>
                            <Text style={{fontSize:20}}>Payment Details</Text>
                            <View style={{height:10, borderBottomColor:'red', borderBottomWidth:1, width:'90%'}}/>
                        </View>
                        <ListItem bottomDivider disabled >
                            <ListItem.Content style={{marginLeft:10, alignItems:'center'}}>
                                <View style={styles.listStyle}><Text>PRICE</Text><Text><MaterialCommunityIcons name="currency-inr" size={15} color="gray" /> {firstPrice}</Text></View>
                                <View style={styles.listStyle}><Text>CGST (9%)</Text><Text><MaterialCommunityIcons name="currency-inr" size={15} color="gray" /> {gst_cgst}</Text></View>
                                <View style={styles.listStyle}><Text>SGST (9%)</Text><Text><MaterialCommunityIcons name="currency-inr" size={15} color="gray" /> {gst_sgst}</Text></View>
                                <View style={styles.listStyle}><Text>IGST (9%)</Text><Text style={{marginRight:'5%'}}> {gst_igst}</Text></View>
                                <Text style={{borderBottomWidth:2, borderColor:'brown', width:'100%'}}/>
                                <View style={styles.listStyle}><Text style={{color:'brown'}}>TOTAL PRICE</Text><Text style={{color:'brown'}}><MaterialCommunityIcons name="currency-inr" size={15} color="brown" /> {GrandTotal}</Text></View>
                            </ListItem.Content>
                        </ListItem>

                        <View style={{height:100}} />                    
                    </View>

                    <View style={{position:"absolute", bottom:0, width:'100%'}}>
                        <ButtonGroup
                            buttons={['Payment','EMI']}
                            onPress={(index) =>PaymentFunciton(index)}
                            buttonStyle={{backgroundColor:'#2288dc', borderRadius:5}}
                            containerStyle={{borderColor:'white',  height:50}}
                            textStyle={{color:'white'}}
                        />
                    </View>

                    <View>
                        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                            <View style={{alignItems:'center', justifyContent:'center', padding:40, height:300}}>
                                <View style={{alignItems:'center'}}>
                                    <Text style={{color:'black', textTransform:'uppercase', marginTop:10, fontSize:22}}>CONFIRMATION</Text>
                                    <Text style={{borderColor:'red', marginTop:10, borderTopWidth:2, width:125}}/>
                                    <Text style={{color:'gray', textTransform:'uppercase', marginTop:10}}><MaterialCommunityIcons name="tablet-cellphone" size={15} color="gray" /> {ProductFinalDetails.data[0].name}</Text>
                                    <Text style={{color:'gray', marginTop:10}}><MaterialCommunityIcons name="currency-inr" size={15} color="gray" /> {GrandTotal}</Text>
                                </View>
                                <View style={[styles.PaymentInput, {display:partpaymentdisplay} ]}>
                                    <Input 
                                        value = {partpayment}
                                        ref={partpaymentinput}
                                        onFocus={() => setPartpaymentFocus(true)}
                                        inputContainerStyle={[partpaymentFocus ? styles.inputFocused : {}, partpaymentErrStyle ? styles.inputErr : {}, {width:170} ]}
                                        onChangeText = {(partpayment) => setPartpayment(partpayment)}
                                        maxLength={10}
                                        placeholder='Enter Amount'
                                        keyboardType='number-pad'
                                        leftIcon={ <MaterialCommunityIcons name='currency-inr' size={25} color='gray'/>}
                                        errorStyle={{ color: 'red', textTransform:'capitalize' }}
                                        errorMessage={partpaymentErr}
                                    />
                                </View>

                                <View style={{marginTop:20}}>
                                    <ActivityIndicator style={{display:LoaderIcon}} size="small" color="gray" />
                                    <View style={{height:10}}/>
                                    <Button title='CONFIRM' titleStyle={{fontSize:12}} onPress={PayPaymentFunction} buttonStyle={{backgroundColor:'green', width:150, height:35}} />
                                    <Button title='CANCEL' titleStyle={{fontSize:12}} onPress={()=>toggleOverlay()} buttonStyle={{backgroundColor:'brown', width:150, height:35, marginTop:10}} />
                                </View>
                            </View>

                            
                        </Overlay>
                    </View>

                    <View>
                    
                    <Overlay isVisible={emivisible} onBackdropPress={toggleEmiOverlay}>

                        <View style={{alignItems:'center', justifyContent:'center', padding:10, paddingLeft:50, paddingRight:35}}>

                        <View style={{height:'95%'}}>

                            <View style={{alignItems:'center'}}>
                                <Text style={{color:'black', textTransform:'uppercase', marginTop:10, fontSize:22}}>EMI CONFIRMATION</Text>
                                <Text style={{borderColor:'red', marginTop:10, borderTopWidth:2, width:125}}/>
                            </View>

                            <ScrollView>

                            <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                                <Text style={{color:'gray', textTransform:'uppercase', marginTop:10}}><MaterialCommunityIcons name="tablet-cellphone" size={15} color="gray" /> {name}</Text>
                                <Text style={{color:'green', textTransform:'uppercase', marginTop:10}}>|</Text>
                                <Text style={{color:'gray', marginTop:10}}><MaterialCommunityIcons name="currency-inr" size={15} color="gray" /> {GrandTotal}</Text>
                            </View>

                            <View style={{alignItems:'center'}}>
                                <Text style={{borderColor:'green', marginTop:10, borderTopWidth:1, width:"100%"}}/>
                            </View>

                            <View style={[styles.EmiPaymentInputStyle]}>
                                <Input 
                                    value = {emipayment}
                                    ref={emipaymentinput}
                                    onFocus={() => setEmipaymentFocus(false)}
                                    inputContainerStyle={[emipaymentFocus ? styles.inputFocused : {}, emipaymentErrStyle ? styles.inputErr : {} ]}
                                    onChangeText = {(emipayment) => setEmipayment(emipayment)}
                                    maxLength={10}
                                    placeholder='Initial Amount'
                                    keyboardType='number-pad'
                                    style={{width:'100%'}}
                                    leftIcon={ <MaterialCommunityIcons name='currency-inr' size={25} color='gray'/>}
                                    errorStyle={{ color: 'red', textTransform:'capitalize' }}
                                    errorMessage={emipaymentErr}
                                />
                            </View>

                            <View style={[styles.EmiPaymentInputStyle, styles.EmiPaymentInputStyle2]}>
                                <RNPickerSelect
                                    onValueChange={(value) =>  setEmiMonthValue(value)}
                                    placeholder={{ label: 'Select Period'}}
                                    key={EmiMonthValue}
                                    value={EmiMonthValue}
                                    onFocus={() => setEmimonthFocus(true)}
                                    style={{viewContainer:[{borderBottomWidth:1, borderBottomColor:'gray', width:'93%'}, emimonthErrStyle ? {borderBottomColor:'red'} : {}]}}
                                    color='red'
                                    items={[
                                        { label: '3 Month', value: '3' },
                                        { label: '6 Month', value: '6' },
                                        { label: '9 Month', value: '9' },
                                    ]}
                                />
                            </View>

                            <View style={[styles.ShowPaymentInputStyle2]}>
                                <Input 
                                    value = {emipercent}
                                    ref={emipercentinput}
                                    onFocus={() => setEmipercentFocus(false)}
                                    inputContainerStyle={[emipercentFocus ? styles.inputFocused : {}, emipercentErr ? styles.inputErr : {}]}
                                    onChangeText = {(emipercent) => setEmipercent(emipercent)}
                                    maxLength={2}
                                    placeholder='Percent Per Month'
                                    keyboardType='number-pad'
                                    leftIcon={ <MaterialCommunityIcons name='percent-outline' size={25} color='gray'/>}
                                    errorStyle={{ color: 'red', textTransform:'capitalize' }}
                                    errorMessage={emipercentErr}
                                />
                            </View>

                            <View style={[styles.ShowPaymentInputStyle3]}>
                                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                    <Text>Total</Text>
                                    <Text><MaterialCommunityIcons name='currency-inr' size={13} color='gray'/> {GrandTotal}</Text>
                                </View>

                                <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:5}}>
                                    <Text>Paid</Text>
                                    <Text><MaterialCommunityIcons name='currency-inr' size={13} color='gray'/> {Emipaidamount}</Text>
                                </View>

                                <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:5}}>
                                    <Text>Balance</Text>
                                    <Text><MaterialCommunityIcons name='currency-inr' size={13} color='gray'/> {Emibalanceamount}</Text>
                                </View>

                                <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:5, borderTopColor:'gray', borderTopWidth:1}}></View>
                                
                                <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:5}}>
                                    <Text>Per Month</Text>
                                    <Text><MaterialCommunityIcons name='currency-inr' size={13} color='gray'/> {Emimonthamount}</Text>
                                </View>

                                <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:5}}>
                                    <Text>Payable Amount</Text>
                                    <Text><MaterialCommunityIcons name='currency-inr' size={13} color='gray'/> {Emipayableamount}</Text>
                                </View>

                                <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:5, borderTopColor:'gray', borderTopWidth:1}}></View>

                                <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:5}}>
                                    <Text style={{color:'red'}}>Total Amount</Text>
                                    <Text style={{color:'red'}}><MaterialCommunityIcons name='currency-inr' size={13} color='red'/> {Emitotalamount}</Text>
                                </View>

                            </View>

                            </ScrollView>

                            <View>
                                <ActivityIndicator style={{display:LoaderIcon}} size="small" color="gray" />
                            </View>
                            <View style={{marginTop:20, alignItems:'center', flexDirection:'row', justifyContent:'flex-end'}}>
                                <Button title='CONFIRM' titleStyle={{fontSize:12}} onPress={PayEmiPaymentFunction} buttonStyle={{backgroundColor:'green', width:100, height:40}} />
                                <Button title='CANCEL' titleStyle={{fontSize:12}} onPress={()=>toggleEmiOverlay()} buttonStyle={{backgroundColor:'brown', width:100, height:40, marginLeft:10}} />
                            </View>

                            </View>

                        </View>

                    </Overlay>
                </View>
             

                <View>
                        <Overlay isVisible={emialertvisible} onBackdropPress={toggleEmiAlertOverlay}>
                            <View style={{alignItems:'center', justifyContent:'center', padding:40, height:200}}>
                                <View style={{alignItems:'center'}}>
                                    <Text style={{color:'red', textTransform:'uppercase', marginTop:10, fontSize:22}}>EMI ALERT</Text>
                                    <Text style={{color:'black', textTransform:'capitalize', marginTop:10, fontSize:15}}>your emi section is disabled.</Text>
                                    <Text style={{color:'black', textTransform:'capitalize', marginTop:10, fontSize:15}}>please contact to the admin.</Text>
                                </View>
                                <View style={{marginTop:20}}>
                                    <Button title='CANCEL' titleStyle={{fontSize:12}} onPress={()=>toggleEmiAlertOverlay()} buttonStyle={{backgroundColor:'brown', width:150, height:35, marginTop:10}} />
                                </View>
                            </View>
                        </Overlay>
                    </View>

                </ScrollView>
            
                <SafeAreaView>

                    <BottomSheet isVisible={Bottomvisible} modalProps={{onBackdropPress:{toggleBottomNavigationView}}} >
                        <View style={{backgroundColor:"#2980B9", flex:1, height:200}}>
                            <View style={{flexDirection:"row", justifyContent:'space-evenly', padding:50}}>
                                <TouchableOpacity onPress={() => SelectImageSection('cam')}>
                                    <View style={styles.BottomViewStyle}>
                                        <FontAwesome5 name='camera-retro' size={40} color='gray'/>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => SelectImageSection('fil')}>
                                    <View style={styles.BottomViewStyle}>
                                        <FontAwesome5 name='folder-plus' size={40} color='gray'/>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={{backgroundColor:'brown', height:'100%', position:'absolute', right:0}}>
                                <TouchableOpacity onPress={toggleBottomNavigationView}>
                                    <View onPress={toggleBottomNavigationView} style={{padding:20, alignItems:'center'}}>
                                        <Text style={{color:'white', marginTop:5}}>C</Text>
                                        <Text style={{color:'white', marginTop:5}}>L</Text>
                                        <Text style={{color:'white', marginTop:5}}>O</Text>
                                        <Text style={{color:'white', marginTop:5}}>S</Text>
                                        <Text style={{color:'white', marginTop:5}}>E</Text>
                                        <FontAwesome5 onPress={toggleBottomNavigationView} name='window-close' size={20} color='white' style={{marginTop:10}} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                                    

                        </View>
                    </BottomSheet>
                </SafeAreaView>

            
            </View>


        )
}

const styles = StyleSheet.create({
    LoginView: {
        backgroundColor:'white',
        flex:1,
        padding:20,
        zIndex:1,
    },
    BillView: {
        backgroundColor:'lightgray',
        backgroundColor:'white',
        flex:1,
        
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
        width:'100%', 
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
        marginBottom:-20
    },
    EmiPaymentInputStyle:{
        marginTop:10, 
        marginBottom:-20,
        width:'100%'
    },

    EmiPaymentInputStyle2:{
        marginTop:5, 
        marginLeft:5
    },

    ShowPaymentInputStyle2:{
        marginTop:30, 
        width:'100%',
    },

    ShowPaymentInputStyle3:{
        width:'100%',
        backgroundColor:'#DAF5F5',
        padding:10,
        marginTop:20, 
        
    },

    BottomViewStyle: {
        backgroundColor: '#fff',
        padding:30,
        borderRadius:100,
    },


});

