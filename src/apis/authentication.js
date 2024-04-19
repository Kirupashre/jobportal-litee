import {addDoc, collection, getDocs, query, where} from 'firebase/firestore';
import { fireDB } from '../firebaseCongfig';
import CryptoJS from 'crypto-js';

export const LoginUser =async (payload ) => {
    try{

        //check if user exist
        const qry = query(collection(fireDB, "users"), where("email", "==", payload.email));
        const querySnapshot = await getDocs(qry);
        if(querySnapshot.empty){
            return{
                success : false,
                message : "User not found"
            }
        } else{
            const snapshotsData = querySnapshot.docs.map((doc)=>({
                id: doc.id,
                ...doc.data(),
            }));
            const user = snapshotsData[0];
            const decryptedPassword = CryptoJS.AES.decrypt(
                user.password,
                "jobportal-lite"
            ).toString(CryptoJS.enc.Utf8);
                if(decryptedPassword === payload.password){
                    return{
                        success  : true,
                        message : "Login Successful",
                        data : {
                            ...user,
                            password : "",
                        },
                    };
                } else {
                    return{
                        success : false,
                        message : "Incorrect password",
                    };
                }
        }

    }catch {

    }
}

export const RegisterUser = async(payload) => {
    try{

        // chech if email already exist
        const qry = query(collection(fireDB, "users"), where("email","==", payload.email));
        const querySnapshot = await getDocs(qry);
        if(querySnapshot.size > 0){
            return{
                success : false,
                message : "Email alreay exists",
            };
        }

        // encrypt password
        const encryptedPassword = CryptoJS.AES.encrypt(
            payload.password,
            "jobportal-lite"
        ).toString();
        payload.password =  encryptedPassword;

        //add user to db
        const response =  await addDoc(collection(fireDB, "users"), payload);
        return {
            success : true,
            message : "User Registered Successfully",
            data : response
        }
    } catch(error){
        return{
            success : false,
            message : error.message,
            data : null
        }

    }
};