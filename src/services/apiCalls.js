import axios from 'axios';

export const logInAccount = async (credentials) => {

    const res = await axios.post('https://dentistclinicbackend-production.up.railway.app/user/login', credentials)

    return res
}



export const bringUserProfile = async () => {

    const id = 'DOCTOR';

    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTIwZWJiYzRjN2NiZDExODZiNDljMyIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY4Mzc5MjI5M30.CrD--k8TwIKk1MBkhwlXLlHXFZOjLmTXkDSzvGf3ar8';

    let config = {
        headers: { 
          'Authorization': 'Bearer '+ token,  
        }
      };

    return await axios.get(`https://fsdemian-clinica-dental-production-a578.up.railway.app/${id}`, config);
}


export const bringDentists = async () => {

  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhnaW5vcnlAZ21haWwuY29tIiwiaWQiOiI2NDRhOTkxNGYwYTc0ZGIyNTQwMzFjYTUiLCJyb2wiOiJDbGllbnRlIiwiaWF0IjoxNjgzNzkyODU4fQ.8eRYjmC0o1QjzqUo4qRj630jrTQOLVNKlc-HqVCbnSo';

  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };

  return await axios.get(`https://dentistclinicbackend-production.up.railway.app/user/dentist`, config);
}