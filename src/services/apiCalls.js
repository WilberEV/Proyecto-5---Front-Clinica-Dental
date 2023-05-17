import axios from 'axios';

export const logInAccount = async (credentials) => {

  return await axios.post('https://proyecto-4-clinica-dental-production.up.railway.app/user/login', credentials)
}


export const bringUserProfile = async (id, token) => {

    let config = {
        headers: { 
          'Authorization': 'Bearer '+ token,  
        }
      };

    return await axios.get(`https://proyecto-4-clinica-dental-production.up.railway.app/user/${id}`, config);
}


// export const bringDentists = async () => {

//   let config = {
//     headers: { 
//       'Authorization': 'Bearer '+ token,  
//     }
//   };

//   return await axios.get(`https://proyecto-4-clinica-dental-production.up.railway.app/user/dentist`, config);
// }

export const userSignUp = async (credentials) =>{

  return await axios.post('https://proyecto-4-clinica-dental-production.up.railway.app/user/', credentials);

}