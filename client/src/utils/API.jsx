import { BalldontlieAPI } from "@balldontlie/sdk";
import { Query } from "mongoose";
import express from 'express';

// // route to get logged in user's info (needs the token)
// export const getMe = (token: string) => {
//   return fetch('/api/users/me', {
//     headers: {
//       'Content-Type': 'application/json',
//       authorization: `Bearer ${token}`,
//     },
//   });
// };

// export const createUser = (userData: User) => {
//   return fetch('/api/users', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(userData),
//   });
// };

// export const loginUser = (userData: User) => {
//   return fetch('/api/users/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(userData),
//   });
// };

// // save book data for a logged in user
// export const saveBook = (bookData: Book, token: string) => {
//   return fetch('/api/users', {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(bookData),
//   });
// };

// // remove saved book data for a logged in user
// export const deleteBook = (bookId: string, token: string) => {
//   return fetch(`/api/users/books/${bookId}`, {
//     method: 'DELETE',
//     headers: {
//       authorization: `Bearer ${token}`,
//     },
//   });
// };

// @ts-ignore
export const searchTeam = async (query) => {
try{
  // @ts-ignore
  const api = new BalldontlieAPI( { apiKey: `${import.meta.env.VITE_YOUR_API_KEY}`  })
  const response = await api.nba.getTeams();
  console.log('Response',response);
  const teams = await response.data;
  
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

export const saveTeam = async(query) => {




  return fetch(`https://api.balldontlie.io/v1/teams/${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
       authorization: `${import.meta.env.VITE_YOUR_API_KEY}`
    },
    body: JSON.stringify(query),
  });
};


// remove saved book data for a logged in user
export const deleteTeam = (full_name) => {
  return fetch(`https://api.balldontlie.io/v1/teams/${full_name}`, {
    method: 'DELETE',
    headers: {
      authorization: `${import.meta.env.VITE_YOUR_API_KEY}`
    },
  });
};

// make a search to google books api

export const searchSport = (query) => {
  return fetch(`https://api.balldontlie.io/v1/teams${query}`);
};
