import axios from 'axios';

export const logInAccount = async (credentials) => {

  return await axios.post('http://localhost:3000/user/login', credentials)
}


export const bringUserProfile = async (id, token) => {

    let config = {
        headers: { 
          'Authorization': 'Bearer '+ token,  
        }
      };

    return await axios.get(`http://localhost:3000/user/${id}`, config);
}


export const bringDentists = async () => {

  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhnaW5vcnlAZ21haWwuY29tIiwiaWQiOiI2NDRhOTkxNGYwYTc0ZGIyNTQwMzFjYTUiLCJyb2wiOiJDbGllbnRlIiwiaWF0IjoxNjgzNzkyODU4fQ.8eRYjmC0o1QjzqUo4qRj630jrTQOLVNKlc-HqVCbnSo';

  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };

  return await axios.get(`https://proyecto-4-clinica-dental-production.up.railway.app/user/dentist`, config);
}

export const userSignUp = async (credentials) =>{

  return await axios.post('http://localhost:3000/user/', credentials);

}