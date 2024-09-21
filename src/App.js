import React, { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';


const apiUrl = 'https://recruiting.verylongdomaintotestwith.ca/api/{Sanjupriya}/character';

function App() {
  const [num, setNum] = useState(ATTRIBUTE_LIST.map(() => 10));
  const [skillnum, setSkillNum] = useState(SKILL_LIST.map(() => 0));
  const [checked, setChecked] = useState({});
  const [savedCharacter, setSavedCharacter] = useState(null);
  const [charMin,setCharMin] = useState(false);

 
function increment(attr,index) {
    const attr_list = [...num];
    attr_list[index] = attr_list[index] + 1;
    setNum(attr_list);
  }

function decrement(attr,index) {
    const attr_list = [...num];
    attr_list[index] = attr_list[index] - 1;
    setNum(attr_list);
  }

  function increment_skill(index) {
    const skill_list = [...skillnum];
    skill_list[index] = skill_list[index] + 1;
    setSkillNum(skill_list);
  }

function decrement_skill(index) {
  const skill_list = [...skillnum];
  skill_list[index] = skill_list[index] -1;
  setSkillNum(skill_list);
  }


  
function CharTables({char}) {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>MAXIMUM VALUE OF</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(CLASS_LIST[char]).map(([modKey,modValue],index) => (
            <tr key={index}>
             <td>{modKey}:{modValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  
  function handleCharClick(e,charName) {
    setChecked((prevState) => ({
      ...prevState,
      [charName]: e.target.checked,
    }));
  }
  function check(charLimit,attrLimit){
    return charLimit===attrLimit;
  }
 function checkCharMinimum(name){
  const attrLimit = [...num]; 
  const charLimit = CLASS_LIST[name]; 

    return Object.entries(charLimit).every(([attrKey, minValue], index) => {
      const userValue = attrLimit[ATTRIBUTE_LIST.indexOf(attrKey)];
      return userValue >= minValue;
    });
  
 }
 
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
       
        <table className="table">
          <thead>
            <tr>
              <th>ATTRIBUTE</th>
            </tr>
          </thead>
          <tbody>
            {ATTRIBUTE_LIST.map((attr, index) => (
              <tr key={index}>
                <td>{attr}</td>
                <td>
                  <div>
                    {'Value:'} {num[index]}
                    <button onClick={() => increment(attr,index)}>+</button>
                    <button onClick={() => decrement(attr,index)}>-</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

     
        <table className="table">
          <thead>
            <tr>
              <th>SKILL NAME</th>
              <th>SKILL POINT</th>
              <th>ATTRIBUTE MODIFIER</th>
              <th>MODIFIER VALUE</th>
            </tr>
          </thead>
          <tbody>
            {SKILL_LIST.map((skill, index) => (
              <tr key={index}>
                <td>{skill.name}</td>
                <td>{skillnum[index]}</td>
                <td>{skill.attributeModifier}</td>
                <td>
                  <div>
                    {'Value:'} {skillnum[index]}
                    <button onClick={() => increment_skill(index)}>+</button>
                    <button onClick={() => decrement_skill(index)}>-</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>


        <table className="table">
          <thead>
            <tr>
              <th>CHARACTERS</th>
            </tr>
          </thead>
          <tbody>
          {Object.keys(CLASS_LIST).map((charName, index) => {
              const meetsRequirements = checkCharMinimum(charName); // Check if character meets the class requirements

              return (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={checked[charName] || false}
                      onChange={(e) => handleCharClick(e, charName)}
                    />
                    <span
                      style={{
                        color: meetsRequirements ? 'green' : 'red',
                        fontWeight: meetsRequirements ? 'bold' : 'normal',
                      }}
                    >
                      {charName} {meetsRequirements ? '(Requirements Met)' : '(Requirements Not Met)'}
                    </span>
                  </td>
                  <td>
                  {checked[charName] && <CharTables char={charName} />}
                </td>
                </tr>
              );
            })}

            <tr><td><button onClick={saveCharacter}>Save Character</button>
            <button onClick={getCharacter}>Retrieve Character</button></td></tr>
          </tbody>
        </table>{savedCharacter && (
          <div>
            <h2>Retrieved Data of Character</h2>
            <p>{JSON.stringify(savedCharacter,null,2)}</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
