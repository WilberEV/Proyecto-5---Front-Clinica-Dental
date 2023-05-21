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

export const bringDentists = async (id, token) => {

  let config = {
      headers: { 
        'Authorization': 'Bearer '+ token,  
      }
    };

  return await axios.get(`https://proyecto-4-clinica-dental-production.up.railway.app/user/${id}`, config);
}


export const updateUserProfile = async (id, data, token) => {
  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,
    },
  };
  let body = {};
    if (data.email !== "") {
      body.email = data.email;
    }
    if (data.phone !== "") {
      body.phone = data.phone;
    }
    if (data.password !== "") {
      body.password = data.password;
    }

  return await axios.put(`https://proyecto-4-clinica-dental-production.up.railway.app/user/${id}`, body, config);
}

export const userSignUp = async (credentials) =>{

  return await axios.post('https://proyecto-4-clinica-dental-production.up.railway.app/user/', credentials);

}

export const findAppointment = async (start, end, token) => {

  let config = {
      headers: { 
        'Authorization': 'Bearer '+ token,  
      }
    };

  return await axios.get(`https://proyecto-4-clinica-dental-production.up.railway.app/appointments?start=${start}&end=${end}`, config);
}

export const generateAppointment = async (data, token) =>{

  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,
    },
  };

  return await axios.post('https://proyecto-4-clinica-dental-production.up.railway.app/appointments/', data, config);

}

export const updateAppointment = async (data, token) =>{

  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,
    },
  };

  let ID = data._id;

  let body = {};
    if (data.doctor !== "") {
      body.doctor = data.doctor;
    }
    if (data.start !== "") {
      body.start = data.start;
    }
    if (data.end !== "") {
      body.end = data.end;
    }


    console.log(body, 'SIDE CHEST')

  return await axios.patch(`https://proyecto-4-clinica-dental-production.up.railway.app/appointments/${ID}`, body, config);
}