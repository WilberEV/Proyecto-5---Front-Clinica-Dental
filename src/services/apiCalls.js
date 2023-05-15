import axios from 'axios';

export const logInAccount = async (credentials) => {
    console.log(credentials, '//////credentials/////////')
    const res = await axios.post('http://localhost:3000/user/login', credentials)
    console.log(res, '////////////////res//////////////')
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

    return await axios.get(`https://proyecto-4-clinica-dental-production.up.railway.app/user/${id}`, config);
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

export const userSignUp = async () =>{

  let body = {
    name: "Clark",
    lastname: "Kent",
    dni: "9543156S",
    email: "superman@email.com",
    phone: "796245",
    password: "Abril.2023",
    role: "USER"
  }

  let token = {
    id: '123',
    role: 'USER'
  }

  return await axios.post(`https://proyecto-4-clinica-dental-production.up.railway.app/user/`, body);

}