import React, { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';
import Attributes from './components/Attributes.js';
import Skills from './components/Skills.js';
import Characters from './components/Characters.js';


const apiUrl = 'https://recruiting.verylongdomaintotestwith.ca/api/{Sanjupriya}/character';

function App() {
  const [num, setNum] = useState(ATTRIBUTE_LIST.map(() => 10));
  const [numMod,setNumMod]= useState(ATTRIBUTE_LIST.map(()=>0));
  const [skillnum, setSkillNum] = useState(SKILL_LIST.map(() => 0));
  const [savedCharacter, setSavedCharacter] = useState(null);
  const [checked, setChecked] = useState({});
  const [charMin,setCharMin] = useState(false);
  const saveCharacter = async () => {
    const savedata = {
      attributes: num,
      skills: skillnum,
      class: Object.keys(CLASS_LIST).filter((charName) => checked[charName]), 
    };
console.log("Saveddata",savedata)
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(savedata),
      });
console.log(response)
      const data = await response.json();
      console.log('Character saved:', data);
      setSavedCharacter(data);
    } 
    catch (error) {
      console.error('Error saving character:', error);
    }
  };

  
  const getCharacter = async () => {
    try {
      const getData = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data =await getData.json();
      console.log('Character retrieved:', data);
      
    } 
    catch (error) {
      console.error('Error retrieving character:', error);
    }
  };

  
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>

      <section className="App-section table-container">
       
        <Attributes num={num} setNum={setNum} numMod={numMod} setNumMod={setNumMod}/>
        <Skills skillnum={skillnum} setSkillNum={setSkillNum}/>
        <Characters checked={checked} setChecked={setChecked} num={num}/>
       <div><button onClick={saveCharacter}>Save Character</button>
       <button onClick={getCharacter}>Retrieve Character</button></div>
          
          {savedCharacter && (
          <div>
            <h2>Retrieved Data of Character</h2>
            <p>{JSON.stringify(savedCharacter,null,2)}</p>
          </div>)}
     
      
        
        
        
      </section>
    </div>
  );
}

export default App;
