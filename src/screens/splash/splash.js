import React from 'react';
import { StyleSheet, ActivityIndicator, View} from 'react-native';
import { Text, Avatar } from 'react-native-elements';

export const SplashScreen = () => {
    return(
            <View style={styles.LoginView}>
                <Text style={{textTransform:'capitalize', fontSize:20}}>
                    <ActivityIndicator size="large" color="white" />
                </Text>
            </View>
    )
}

const styles = StyleSheet.create({
    LoginView: {
        backgroundColor:'#3b3c48',
        flex:1,
        padding:20,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
