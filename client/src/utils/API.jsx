import { BalldontlieAPI } from "@balldontlie/sdk";


// // route to get logged in user's info (needs the token)
export const getMe = (token) => {
  return fetch('/api/sport/me', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData) => {
  return fetch('/api/sport', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch('/api/sport/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};


// @ts-ignore
export const searchTeam = async (query) => {
try{
  // @ts-ignore
  const api = new BalldontlieAPI( { apiKey: `${import.meta.env.VITE_YOUR_API_KEY}`  })
  const response = await api.nba.getTeams();
  

  console.log('Response',response);
  const teams = response.data;

  
  
 const team = teams.find(team => team.name.toLowerCase() === query.toLowerCase());

 console.log('Response',team);
  if (team){

  return team
  }else{
  console.log('Team not found')
  return null;
} }
catch(err) 
{
  console.log('an error occurred',err);
}

};

export const saveTeam = async(query, token) => {
try{
  const response = await fetch(`/api/sport/Team`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
       authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(query),
  });
  // console.log(`${query.name}`)
  console.log(query)
  // console.log('Saving team to:', `/api/sport/Team/${query.name}`);
  console.log('API response',response)
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`API Error: ${errorData.message || 'Failed to save team'}`);
  }
  const data = await response.json(); 
  console.log('data in json',data)
  return data;
} catch (err) {
  console.error('Save team error:', err);
  throw err; // Ensure calling function gets the error
}

};


// remove saved book data for a logged in user
export const deleteTeam = (query, token) => {
  return fetch(`/api/sport/Team/${query}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`
    },
  });
};


