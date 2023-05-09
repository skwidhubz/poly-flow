import React, { useState } from 'react';
import '../styles/library.css'
import { useQuery } from '@apollo/client';
import { LOAD_DATA } from '../utils/mutations';

    // ?data = do nothing

  // 

const Library = () => {

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
         <h1>Saved Data:</h1>  {savedData}
        </div>
      </div>
      </>
    )
  }

export default Library;