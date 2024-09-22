import React, {useState} from 'react';

import './../App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './../consts.js';

export default function Skills({skillnum, setSkillNum}){
    
    
  
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
  
    return(
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
    );
}