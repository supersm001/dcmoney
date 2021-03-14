import React, {useState, navigation} from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, TouchableOpacity} from 'react-native';
import { Text, Avatar } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const UserDashboard = (props) => {
     //const user_contact = route.params.cont;
    return(

            <ScrollView>
                <View style={styles.LoginView}>

                    <View style={{height:10}}></View>
                    <Text h4 style={{textTransform:'uppercase'}}>Services</Text>
                    <View style={{height:10}}></View>

               </View>

               <View style={{flexDirection:"row", justifyContent:'space-evenly', paddingTop:20, paddingBottom:20}}>
                    <TouchableOpacity onPress={()=> props.navigation.navigate('CreateBill')} >
                        <View style={{backgroundColor:'white', padding:30, borderRadius:10, alignItems:'center', width:160}} >
                            <Avatar
                                rounded
                                size="large"
                                source={{
                                    uri:'http://pcsetupvsss.xyz/sos/images/bill_icon.png',
                                }}
                            />
                            <View style={{height:10}} />
                            <Text>Create Bill</Text>
                        </View>  
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=> props.navigation.navigate('UserViewPayment')} >
                        <View style={{backgroundColor:'white', padding:30, borderRadius:10, alignItems:'center', width:160}} >
                            <Avatar
                                rounded
                                size="large"
                                source={{
                                    uri:'http://pcsetupvsss.xyz/sos/images/device_image.jpg',
                                }}
                            />
                            <View style={{height:10}} />
                            <Text>View Product</Text>
                        </View>  
                    </TouchableOpacity>

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
});
