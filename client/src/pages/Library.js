import React, { useState } from 'react';
import '../styles/library.css'
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL, LOAD_DATA } from '../utils/queries';
import { DELETE_DATA } from '../utils/mutations';
import { Link } from "react-router-dom";
import Auth from '../utils/auth';


const Library = () => {

  const [deleteData] = useMutation(DELETE_DATA, 
    {
      update(cache, { data: { deleteData }}) {
        console.log(deleteData);
        cache.writeQuery({
          query: LOAD_DATA,
          data: { params: deleteData.savedData },
        });
      }
    });

  const deleteDataHandler = async (event) => {
    const dataID = event.target.id;
    await deleteData({
      variables: {
        dataID
      }
    })
  };

  const { data } = useQuery(LOAD_DATA); // received new object. change syntax and handling. 
  console.log('loaded data', data);
  const savedData = data?.params || "";
  // console.log(savedData);


// check if user is logged in to display page 🛡️
const authCheck = () => {
  const token = localStorage.getItem('id_token'); // get token from LS
  const isTokenValid = !(Auth.isTokenExpired(token)); // check if token is still valid
  const isLoggedIn = token!==null && isTokenValid; // if token exists AND is valid then logged in is true
  // EARLY RETURN IF STATEMENT FUCTION TO DISABLE PAGE FUNCTION IF !LOGGED-IN
  if (!isLoggedIn) {
      return <p className='login-warning'>Please signup and/or login to view this page 🙏</p>
  }};
  
  authCheck();
  
  return (
      <>
      <div className='library-container'>
      <h1>USER LIBRARY PAGE </h1>
        <div>
         <h1>Saved Canvas':</h1> 
         <ul id="params-list">
         {
          savedData ? savedData.map((data, index) => {
            return (
            <li className="library-li" key={index}>
              <p>Params: {JSON.stringify(data?.params)}</p>
              <Link className="library-load lib-button" to={`/canvas/${data?._id}`}>LOAD</Link>
              <Link className="library-delete lib-button" id={data?._id} onClick={deleteDataHandler}>DELETE</Link>
            </li>
            )
          }) : <p>no saved data</p>
         }
         </ul>
        </div>
      </div>
      </>
    )
  }

export default Library;