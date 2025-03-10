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
export const searchTeam = async (query, token) => {
try{
  // @ts-ignore
  const api = new BalldontlieAPI( { apiKey: `${import.meta.env.VITE_YOUR_API_KEY}`  })
  const response = await api.nba.getTeams();
  

  console.log('Response',response);
  const teams = response.data;
  
 const team = teams.find(team => team.name.toLowerCase() === query.toLowerCase());

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

  return fetch(`/api/sport/Team/${query}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
       authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(query),
  });
};


// remove saved book data for a logged in user
export const deleteTeam = (full_name, token) => {
  return fetch(`/api/sport/Team/${full_name}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`
    },
  });
};

// make a search to google books api

export const searchSport = (query) => {
  return fetch(`https://api.balldontlie.io/v1/teams${query}`);
};
