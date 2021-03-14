import React, {useState, useEffect} from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import { Button} from 'react-native-elements';
import {GetLoggedInUserProductDetails} from '../../services/api/users/userapi'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import { ListItem, Avatar } from 'react-native-elements';

export const UserViewProduct = (props) => { 

    const [details,setDetails] =useState([]);
    
    useFocusEffect(()=>{
        getfuncion();    
    },[])
    
    
    async function getfuncion(){
        const res = await GetLoggedInUserProductDetails();
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
                        <Avatar source={{uri: 'https://serviceonway.com/serviceonway/files/images/update1.png'}} size={60} />
                            <ListItem.Content style={{marginLeft:20}}>
                                <ListItem.Title style={styles.title}>{item.product_name}</ListItem.Title>
                                <ListItem.Subtitle>{item.product_price}</ListItem.Subtitle>
                                <ListItem.Subtitle>{item.product_emi}</ListItem.Subtitle>
                            </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>


                </TouchableOpacity>
            )
            }}
            keyExtractor={(item, index) => index.toString()}
           />


        <Button onPress={()=>{props.navigation.navigate('CreateProduct')}} buttonStyle={{backgroundColor:'#2288dc', borderRadius:100,  paddingLeft:50, paddingRight:30, padding:15}} title='Create New' iconRight icon={<Icon name="plus" style={{marginLeft:20}}  size={15} color="white"/>}></Button>
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
    });