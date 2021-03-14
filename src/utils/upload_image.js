import {UploadImage} from '../services/api/users/userapi'

export const UploadImageToServer = async (file, type) => {
    var resp = await UploadImage(file, type);
    return resp;
}