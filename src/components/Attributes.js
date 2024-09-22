import React, {useState} from 'react';

import './../App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './../consts.js';

export default function Attributes({num,setNum,numMod,setNumMod}){
    
    function increment(attr,index) {
        const attr_list = [...num];
        const numMod_list = [...numMod];
        attr_list[index] = attr_list[index] + 1;
        
        if (attr_list[index] > 10 && attr_list[index] % 2 === 0) {
          numMod_list[index] = numMod_list[index] + 2;
    
          
      };
      setNum(attr_list);
          setNumMod(numMod_list)
    }
    function decrement(attr,index) {
        const attr_list = [...num];
        const numMod_list = [...numMod];
        attr_list[index] = attr_list[index] - 1;
    
        if (attr_list[index] > 10 && attr_list[index] % 2 === 0) {
          numMod_list[index] =numMod_list[index] - 2;
        }
    
        setNum(attr_list);
        setNumMod(numMod_list)
      }
    return(
        <table className="table">
          <thead>
            <tr>
              <th>ATTRIBUTE</th>
            </tr>
          </thead>
          <tbody>
            {ATTRIBUTE_LIST.map((attr, index) => 
              (
              <tr key={index}>
                <td>{attr}</td>
                <td>
                  <div>
                    {'Value:'} {num[index]}
                    <span>{"(Modifier:"}{numMod[index]}{')'}</span>                  
                    <button onClick={() => increment(attr,index)}>+</button>
                    <button onClick={() => decrement(attr,index)}>-</button>
                  </div>
                </td>
              </tr>)
              
            )}
          </tbody>
        </table>
    );
}