import axios from 'axios';

var AxiosInstance = axios.create({
    //baseURL : 'http://192.168.43.63:3000/', // Home Localhost
    //baseURL : 'http://192.168.1.16:3000/', // Office Localhost SOS 5G
    baseURL : 'http://103.117.180.175:3000/', // Live
    timeout : 300000,
    //maxBodyLength:5e+7,
})

export default AxiosInstance;