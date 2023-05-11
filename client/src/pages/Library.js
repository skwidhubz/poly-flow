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



  const { data } = useQuery(LOAD_DATA);
  const savedData = data?.params || "";

  // const blakeTest = 'blake' 

  // const loadDataHandler = (id) => {
  //   console.log('load handle exe');
  //   redirect(`/canvas/:${id}`)
  // };

  // EARLY RETURN IF STATEMENT FUCTION TO DISABLE PAGE FUNCTION IF !LOGGED-IN
  if (!data?.params) {
    return <p className='login-warning'>Please signup and/or login to view this page 🙏</p>
  } 


  return (
      <>
      <div className='library-container'>
      <h1>SAVED POLY PAGE</h1>
        <div>
         <h1>Saved Data:</h1> 
         <ul id="params-list">
         {
          savedData ? savedData.map((data, index) => {
            return (
            <li key={index}>
              <p>hue: {JSON.parse(data?.params).hue}</p> 
              <p>circles: {JSON.parse(data?.params).circles}</p>
              <Link to={`/canvas/${data?._id}`}>LOAD</Link>
              <button id={data?._id} onClick={deleteDataHandler}>DELETE</button>
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