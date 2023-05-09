import React, { useState } from 'react';
import '../styles/library.css'
import { useQuery, useMutation } from '@apollo/client';
import { LOAD_DATA } from '../utils/queries';
import { DELETE_DATA } from '../utils/mutations';

    // ?data = do nothing

  // 

const Library = () => {

  const [deleteData] = useMutation(DELETE_DATA);

  const deleteDataHandler = async (event) => {
    const dataID = event.target.id;
    await deleteData({
      variables: {
        dataID
      }
    });
    // MAKE PAGE REFRESH ON DELETE
    document.location.reload();
  }

  const { data } = useQuery(LOAD_DATA);
  const savedData = data?.params || "";


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
              <p>hue: {JSON.parse(data.params).hue}</p> 
              <p>circles: {JSON.parse(data.params).circles}</p>
              <button id={data._id} onClick={deleteDataHandler}>DELETE</button>
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