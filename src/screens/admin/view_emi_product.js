import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text, ScrollView} from 'react-native';
import { GetAdminUserSpecEmiBillDetails, CreateNewEmiPayment } from '../../services/api/users/userapi'
import { FormatDate, ExtendMonth, ResetDate } from '../../utils/function'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import { ListItem, Avatar, SearchBar, ButtonGroup, Overlay, Button, Input, CheckBox } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Gallery from 'react-native-image-gallery';

export const AdminSpecficEmiDetails = (props) => {

    const [BillID, setBillID] = useState(props.route.params.id);
    const [AllDetails, setAllDetails] = useState([]);
    const [EmiDetails, setEmiDetails] = useState([]);
    const [BillDetails, setBillDetails] = useState([]);
    const [EmiPaymentDetails, setEmiPaymentDetails] = useState([]);
    const [CustomerDetails, setCustomerDetails] = useState([]);
    const [visible, setVisible] = useState(false);
    const [EmiDate, setEmiDate] = useState('');
    const [ImageVisible, setImageVisible] = useState(false);

    const [UserImage, setUserImage] = useState('');
    const [AadharFrontImage, setAadharFrontImage] = useState('');
    const [AadharBackImage, setAadharBackImage] = useState('');
    const [PanImage, setPanImage] = useState('');

    const [AadharNumber, setAadharNumber] = useState('');
    const [PanNumber, setPanNumber] = useState('');


    const toggleImageOverlay = () => {
        setImageVisible(!ImageVisible);
    };


    useEffect(() => {
        getfuncion(BillID);
    }, [])

    async function getfuncion(id) {
        const res = await GetAdminUserSpecEmiBillDetails(id);
        setAllDetails([...res]);
        setEmiDetails([...res[0]]);
        setBillDetails([...res[1]]);
        setCustomerDetails([...res[3]])
        setUserImage('http://pcsetupvsss.xyz/sos/images/uploaded/' + res[3][0].user_image);
        setAadharFrontImage('http://pcsetupvsss.xyz/sos/images/uploaded/' + res[3][0].aadhar_front_image);
        setAadharBackImage('http://pcsetupvsss.xyz/sos/images/uploaded/' + res[3][0].aadhar_back_image);
        setPanImage('http://pcsetupvsss.xyz/sos/images/uploaded/' + res[3][0].pan_image);
        setAadharNumber(res[3][0].aadhar);
        setPanNumber(res[3][0].pan);
        if (res[2] != null)
            setEmiPaymentDetails([...res[2]]);
    }

    return (

        <View>

            <FlatList
                data={BillDetails}
                renderItem={({ item }) => {
                    var cur_date = ExtendMonth(EmiDetails[0].date, 0);
                    var status = item.status;
                    var paid_month = EmiPaymentDetails.length;

                    var status_btn = <Button title='Paid' titleStyle={{ fontSize: 12 }} buttonStyle={{ backgroundColor: 'green', borderRadius: 100, width: 80, padding: 5 }} />
                    if (status == 0)
                        status_btn = <Button title='Pending' titleStyle={{ fontSize: 12 }} buttonStyle={{ backgroundColor: 'red', borderRadius: 100, width: 80, padding: 5 }} />
                    var emi_section = [];

                    emi_section.push(
                        <View key={0} style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                            <Text style={styles.emi_text}>{cur_date}</Text>
                            <Text style={[styles.emi_text, styles.emi_amount]}><MaterialCommunityIcons name="currency-inr" size={15} color="gray" /> {EmiDetails[0].pay}</Text>
                            <Text style={styles.emi_text, styles.emi_check}>
                                <CheckBox containerStyle={{ marginTop: 19 }} checked={true} checkedColor="green" style={styles.emiCheckbox} />
                            </Text>
                        </View>
                    )

                    for (var i = 0; i < EmiDetails[0].month; i++) {
                        var CheckBoxLayout = <CheckBox uncheckedColor="lightgray" uncheckedIcon="lock" checkedColor="green" containerStyle={{ marginTop: 19 }} checked={false} style={styles.emiCheckbox} />;
                        if (paid_month > i)
                            CheckBoxLayout = <CheckBox uncheckedColor="lightgray" checkedColor="green" containerStyle={{ marginTop: 19 }} checked={true} style={styles.emiCheckbox} />;

                        if (paid_month == i) {
                            var id = i + 1;
                            CheckBoxLayout = <CheckBox uncheckedColor="green" checkedColor="green" containerStyle={{ marginTop: 19 }} checked={false} style={styles.emiCheckbox} />;
                        }


                        emi_section.push(
                            <View key={i + 1} style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                <Text style={[styles.emi_text]}>{ExtendMonth(EmiDetails[0].date, (i + 1))}</Text>
                                <Text style={[styles.emi_text, styles.emi_amount]}><MaterialCommunityIcons name="currency-inr" size={15} color="gray" /> {EmiDetails[0].per_month}</Text>
                                <Text style={styles.emi_text, styles.emi_check}>{CheckBoxLayout}</Text>
                            </View>
                        )
                    }


                    return (
                        <View>

                            <ListItem bottomDivider>
                                <ListItem.Content style={{ alignItems: "center" }}>
                                    <ListItem.Title style={styles.title}><Text>Product Details</Text> </ListItem.Title>
                                    <ListItem.Subtitle style={{ marginTop: 10, textTransform: 'capitalize' }}><MaterialCommunityIcons name="tablet-cellphone" size={15} color="gray" /> {item.name}</ListItem.Subtitle>
                                    <ListItem.Subtitle style={{ marginTop: 10 }}><MaterialCommunityIcons name="currency-inr" size={15} color="gray" /> {item.total_price}</ListItem.Subtitle>
                                    <ListItem.Subtitle style={{ marginTop: 10 }}><MaterialCommunityIcons name="account-cash-outline" size={15} color="gray" /> {item.balance}</ListItem.Subtitle>
                                </ListItem.Content>

                                <ListItem.Content style={{ alignItems: "center" }}>
                                    <ListItem.Title style={styles.title}><Text>User Details</Text></ListItem.Title>
                                    <ListItem.Subtitle style={{ marginTop: 10 }}><FontAwesome5 name="user" size={15} color="gray" /> {item.customer_name}</ListItem.Subtitle>
                                    <ListItem.Subtitle style={{ marginTop: 10 }}><FontAwesome5 name="mobile-alt" size={15} color="gray" />  {item.customer_contact}</ListItem.Subtitle>
                                    <ListItem.Subtitle style={{ marginTop: 10 }}><MaterialCommunityIcons name="calendar-blank" size={15} color="gray" /> {cur_date}</ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>

                            <View style={styles.viewStyle}>

                                <View style={{ alignItems: "center" }}>
                                    <ListItem.Title style={styles.title}><Text>Document</Text></ListItem.Title>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
                                    <View style={{ marginTop: 10, flexDirection: 'column', alignItems: 'center' }}>
                                        <Text style={{ color: 'gray' }}>
                                            AADHAR
                                        </Text>
                                        <Text style={{ color: 'black' }}>
                                            {AadharNumber}
                                        </Text>
                                    </View>
                                    <View style={{ marginTop: 10, flexDirection: 'column', alignItems: 'center' }}>
                                        <Text style={{ color: 'gray' }}>
                                            PAN
                                        </Text>
                                        <Text style={{ color: 'black' }}>
                                            {PanNumber}
                                        </Text>
                                    </View>

                                    <Text><Button buttonStyle={{ borderRadius: 100 }} icon={<MaterialCommunityIcons name="eye" size={25} color="white" />} onPress={toggleImageOverlay} /></Text>
                                </View>
                                <View style={{ height: 10 }} />
                            </View>

                            <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray' }} />

                            <View style={styles.viewStyle}>

                                <View style={{ alignItems: "center" }}>
                                    <ListItem.Title style={styles.title}><Text>Emi Details</Text></ListItem.Title>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
                                    <Text style={{ marginTop: 10 }}><MaterialCommunityIcons name="calendar-month" size={15} color="gray" /> {EmiDetails[0].month}</Text>
                                    <Text style={{ marginTop: 10 }}><MaterialCommunityIcons name="percent-outline" size={15} color="gray" /> {EmiDetails[0].percent}</Text>
                                    <Text>{status_btn}</Text>
                                </View>

                                <ListItem.Title style={styles.title}></ListItem.Title>
                                <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
                                    <ListItem.Title><Text>Month</Text></ListItem.Title>
                                    <ListItem.Title><Text>Amount</Text></ListItem.Title>
                                    <ListItem.Title><Text>Status</Text></ListItem.Title>
                                </View>

                                <ScrollView>
                                    {emi_section}
                                </ScrollView>
                                <Button onPress={() => props.navigation.navigate('AdminSpecficInvoiceDetails', [{ id: EmiDetails[0].bill_id, type: 'emi_invoice' }])} title='View Invoice' containerStyle={{ marginTop: 50 }} buttonStyle={{ borderRadius: 100, padding: 10 }} />
                            </View>
                        </View>
                    )
                }}
                keyExtractor={(item, index) => index.toString()}
            />



            <Overlay isVisible={ImageVisible} onBackdropPress={toggleImageOverlay}>
                <View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Button onPress={toggleImageOverlay} icon={<FontAwesome5 name="times" size={25} color="white" />} buttonStyle={styles.ImageCloseButton} />
                    </View>
                    <Gallery
                        style={{ flex: 1, backgroundColor: 'white' }}
                        images={[
                            { source: { uri: UserImage } },
                            { source: { uri: AadharFrontImage } },
                            { source: { uri: AadharBackImage } },
                            { source: { uri: PanImage } },
                        ]}
                    />
                </View>
            </Overlay>


        </View>

    )

}

const styles = StyleSheet.create({

    viewStyle: {
        backgroundColor: 'white',
        padding: 14,
    },
    emi_text: {
        color: 'gray'
    },
    emi_amount: {
        marginLeft: -50
    },
    emi_check: {
        marginTop: -10
    },
    StatusButton: {
        color: 'red'
    },
    LoginView: {
        backgroundColor: 'white',
        flex: 1,
        padding: 20,
    },
    paid_amount: {
        color: "green"
    },
    unpaid_amount: {
        color: "red"
    },
    title: {
        marginTop: 3,
        textTransform: "capitalize",
        borderColor: 'red',
        borderBottomWidth: 1,
        paddingBottom: 5,
    },
    AddButtonView: {
        position: "absolute",
        bottom: "2%",
        right: "5%",
        borderRadius: 100,
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: '#2288dc',
        height: 70,
        width: 70,
    },
    listStyle: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginTop: 10
    },
    inputFocused: {
        borderBottomColor: '#2288dc',
        borderBottomWidth: 2
    },
    inputErr: {
        borderBottomColor: 'red',
    },
    PaymentInput: {
        marginTop: 10,
        marginBottom: -20,
    },
    ImageCloseButton: {
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: 'brown',
        marginTop: 10,
    }

});