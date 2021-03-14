import React, {useState, useEffect} from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import { Button} from 'react-native-elements';
import {GetLoggedInUserCustomerDetails} from '../../services/api/users/userapi'
//import {Avatar, Title, Caption} from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import { ListItem, Avatar } from 'react-native-elements'

export const UserViewCustomer = (props) => {

    const [details,setDetails] =useState([]);
    
    useFocusEffect(()=>{
        getfuncion();    
    },[])
    
    
    async function getfuncion(){
        const res = await GetLoggedInUserCustomerDetails();
        //console.log(res);
        setDetails([...res]);
    }

    return(
        <View style={styles.LoginView}>
            <FlatList
            data={details}
            renderItem={({item})=>{ return( 
                <TouchableOpacity>

                    <ListItem bottomDivider>
                        <Avatar rounded source={{uri: 'https://serviceonway.com/serviceonway/files/images/user1.png'}} size={80} />
                        <ListItem.Content style={{marginLeft:20}}>
                            <ListItem.Title style={styles.title}>{item.name}</ListItem.Title>
                            <ListItem.Subtitle>{item.contact}</ListItem.Subtitle>
                            <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
                            <ListItem.Subtitle style={styles.title}>{item.address}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>

                </TouchableOpacity>
            )
            }}

            keyExtractor={(item, index) => index.toString()}

           />

        <Button onPress={()=>{props.navigation.navigate('CreateCustomer')}} buttonStyle={{backgroundColor:'#2288dc', borderRadius:100,  paddingLeft:50, paddingRight:30, padding:15}} title='Create New' iconRight icon={<Icon name="plus" style={{marginLeft:20}}  size={15} color="white"/>}></Button>
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
        marginTop: 1,
        textTransform:"capitalize"
    },
  });