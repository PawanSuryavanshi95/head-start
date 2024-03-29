import api from './index';

const headers = { 'X-access-token': localStorage.getItem('userToken') };

export default {
   getProfile : async (params) => {
       console.log(headers)
       console.log(params);
        const res = await api.get('/user/profile', { headers: headers, params: params }).catch(e =>{console.log(e.message)});
        console.log(res);
        return res.data;
    },
    
    //getNotifications : async () => {
    //     const {data} = await api.get('/user/notifications', { headers : headers }).catch(e => { console.log(e.message) });
    //     return data;
    // }
    
   changeEmail : async (email) => {
        const {data} = await api.post("/user/change-email", {headers: headers, email:email}).catch(e => { console.log(e.message) });
        return data;
    },
    
   changePassword : async (pass1,pass2) => {
        const {data} = await api.post("/user/change-password", {headers: headers, password:pass1, new_password:pass2}).catch(e => { console.log(e.message) });
        return data;
    },
    
   toggleMail : async (bool) => {
        const {data} = await api.post("/user/toggle-receive-mail", {headers: headers, receiveMail:bool}).catch(e => { console.log(e.message) });
        return data;
    },
    
   postDetails : async (details) => {
        const {data} = await api.post('/user/details', { headers: headers, details: details}).catch(e => { console.log(e) });
        return data;
    },
    
   forgotPassword : async (id) => {
        const {data} = await api.post("user/forgot-password", { id:id }).catch(e => { console.log(e.message) });
        return data;
    },
    
   forgotPassOTP : async (otpID, otp, newPass) => {
        const {data} = await api.post("/user/forgot-pass-otp", { id:otpID, otp:otp, newPass:newPass }).catch(e => {console.log(e.message)});
        return data;
    },
}