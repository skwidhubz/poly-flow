import React, { useState } from 'react';
import '../styles/library.css'

    // ?data = do nothing


const Library = () => {

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
      <h1>library page</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="text-box">text</label>
            <input type="text" id="text-form" value={defaultText} onChange={handleTextChange}/>
            <input type="submit" value="Submit"/>
        </form>
      </>
    )
  }

export default Library;