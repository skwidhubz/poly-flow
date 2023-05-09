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
  }

  const { data } = useQuery(LOAD_DATA);
  const savedData = data?.params || "";



  const [defaultText, setText] = useState("enter text");

  const handleTextChange = (e) => {
    let textValue = e.target.value;
    setText(textValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(defaultText);
    };

  return (
      <>
      <div>
      <h1>library page</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="text-box">text</label>
            <input type="text" id="text-form" value={defaultText} onChange={handleTextChange}/>
            <input type="submit" value="Submit"/>
        </form>
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