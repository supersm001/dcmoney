import React, {useState, useEffect} from 'react';
import {GetUserSpecBillDetails} from '../../services/api/users/userapi'
import { StyleSheet, View, TouchableOpacity, PermissionsAndroid} from 'react-native';
import { Button } from 'react-native-elements';
import PDFView from 'react-native-view-pdf';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNShareFile from 'react-native-share-file'
import RNFetchBlob from 'rn-fetch-blob'

export const AdminSpecficInvoiceDetails = (props) => { 

    const [BillID,setBillID] =useState(props.route.params[0].id);
    const [InvType,setInvType] =useState(props.route.params[0].type);
    const [BillDetails,setBillDetails] =useState([]);
    const [CustomerDetails,setCustomerDetails] =useState([]);
    const [InvoiceUrl,setInvoiceUrl] =useState();

    useEffect(()=>{
        getfuncion(BillID);
    },[]) 

    
    async function getfuncion(id){
        const res = await GetUserSpecBillDetails(id);
        setBillDetails([...res]);
        if(InvType == 'invoice')
            setInvoiceUrl('SOSINVOICE'+res[0].invoice_id+'.pdf')
        else
            setInvoiceUrl('SOSEMIINVOICE'+res[0].emi_invoice_id+'.pdf')
    }

    const resources = {
        file: Platform.OS === 'ios' ? InvoiceUrl : '/sdcard/Download/'+InvoiceUrl,
        url: 'http://pcsetupvsss.xyz/sos/'+InvType+'/'+InvoiceUrl,
        base64: 'JVBERi0xLjMKJcfs...',
    };
   
    const resourceType = 'url';
    let dirs = RNFetchBlob.fs.dirs

    function DownloadFile(){
        const FilePath = dirs.DownloadDir+'/'+InvoiceUrl;
        //const FilePath = '/sdcard/Download/'+InvoiceUrl;
        //console.log(FilePath)
        RNFetchBlob.fs.exists(FilePath)
        .then((exist) => {
            if(!exist){
                RNFetchBlob.config({
                    // response data will be saved to this path if it has access right.
                    //path : dirs.DocumentDir + '/'+InvoiceUrl
                    path : FilePath
                }).fetch('GET', 'http://pcsetupvsss.xyz/sos/'+InvType+'/'+InvoiceUrl, {
                }).then((res) => {
                    // the path should be dirs.DocumentDir + 'path-to-file.anything'
                    //console.log('The file saved to ', res.path())
                })
            }
        })
        .catch((err) => { 
            console.log("Erro ", err)
         })
    }

    const requestCameraPermission = async () => {
        try {
          await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        } catch (err) {
          console.warn(err);
        }
      };


    const SharePDF = async () =>{
        await requestCameraPermission();
        await DownloadFile();
        RNShareFile.share({
            url : dirs.DownloadDir+'/'+InvoiceUrl
            //url:'/sdcard/Download/'+InvoiceUrl
        })
    }
    
    return(

        <>
            <View style={styles.ButtonView}>
                <Button onPress={SharePDF} title='' icon={<MaterialCommunityIcons name='share-variant' size={25} color='white'/>} buttonStyle={styles.ShareButton} />
            </View>
            
            <View style={{ flex: 1 }}>
                <PDFView
                    fadeInDuration={500.0}
                    style={{ flex: 1 }}
                    resource={resources[resourceType]}
                    resourceType={resourceType}
                    //onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
                    //onError={(error) => console.log('Cannot render PDF', error)}
                />
            </View>
        </>
        )
}


const styles = StyleSheet.create({
    LoginView: {
        padding:20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ShareButton:{
        borderRadius:100,
        textTransform:"uppercase",
        width:60,
        height:60,
        zIndex:1,
    },
    ButtonView:{
        position:"absolute",
        zIndex:1,
        bottom:20,
        right:20
    }
});
