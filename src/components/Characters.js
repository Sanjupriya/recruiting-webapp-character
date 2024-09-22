import React, {useState} from 'react';

import './../App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './../consts.js';

export default function Characters({checked,setChecked,num}){

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
    
     function checkCharMinimum(name){
      const attrLimit = [...num]; 
      const charLimit = CLASS_LIST[name]; 
    
        return Object.entries(charLimit).every(([attrKey, minValue], index) => {
          const userValue = attrLimit[ATTRIBUTE_LIST.indexOf(attrKey)];
          return userValue >= minValue;
        });
      
     }
    

    return(
        <table className="table">
          <thead>
            <tr>
              <th>CHARACTERS</th>
            </tr>
          </thead>
          <tbody>
          {Object.keys(CLASS_LIST).map((charName, index) => {
              const meetsRequirements = checkCharMinimum(charName);

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
            </tbody>        
          </table>
    );
}