import React, { useState } from 'react';
import '../styles/library.css'
import { useQuery, useMutation } from '@apollo/client';
import { LOAD_DATA } from '../utils/queries';
import { DELETE_DATA } from '../utils/mutations';
import { Route, Routes, Link, redirect } from "react-router-dom";
import Canvas from './Canvas';


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
  const savedData = data?.params || "";
  console.log(savedData);


  // EARLY RETURN IF STATEMENT FUCTION TO DISABLE PAGE FUNCTION IF !LOGGED-IN
  // if (!data?.params) {
  //   return <p className='login-warning'>Please signup and/or login to view this page 🙏</p>
  // } 
  
  return (
      <>
      <div className='library-container'>
      <h1>USER LIBRARY PAGE </h1>
        <div>
         <h1>Saved Canvas':</h1> 
         <ul id="params-list">
         {
          savedData ? savedData?.map((data, index) => {
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