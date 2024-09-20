import React,{ useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';


function App() {
  const [num, setNum] = useState(ATTRIBUTE_LIST.map(()=>10));

  const [skillnum, setSkillNum] = useState(SKILL_LIST.map(()=>0));
  const [checked,setChecked] = useState(false);
  
  function increment(index){
      const attr_list = [...num];
      attr_list[index] = attr_list[index] +1
      setNum(attr_list)
  }
  function decrement(index){
    const attr_list = [...num];
    attr_list[index] = attr_list[index] -1
    setNum(attr_list)
}
function CharTables(char){
 return(<table class="table">
  <tr>
    <th>MAXIMUM VALUE OF</th>
  </tr>
    {Object.entries(CLASS_LIST[char]).map((eachModifier,index) => <tr>
      <td key={index}>{eachModifier}</td>
      </tr>)}
</table>);
}
function handleCharClick(e){
  //setChecked(e.target.checked);
}
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section table-container">
        <table class="table">
          <tr>
            <th>ATTRIBUTE</th>
          </tr>
            {ATTRIBUTE_LIST.map((attr,index) => <tr><td key={index}>{attr}</td>
            <td><div>{'Value:'}{num[index]}
              <button onClick={() =>increment(index)}>+</button>
              <button onClick={() =>decrement(index)}>-</button>
              </div></td>
              </tr>)}
        </table>
        <table class="table">
          <tr>
            <th>SKILL NAME</th>
            <th>SKILL POINT</th>
            <th>ATTRIBUTE MODIFIER</th>
            <th>MODIFIER VALUE</th>
          </tr>
            {SKILL_LIST.map((skill,index) => <tr>
              <td key={index}>{skill.name}</td>
              <td key={index}>{skillnum[index]}</td>
              <td key={index}>{skill.attributeModifier}</td>

              <td><div>{'Value:'}{skillnum[index]}
              <button onClick={() =>increment(index)}>+</button>
              <button onClick={() =>decrement(index)}>-</button>
              </div></td>
              </tr>)}

        </table>
        <table class="table">
          <tr>
            <th>CHARACTERS</th>
          </tr>
            {Object.keys(CLASS_LIST).map((charName,index) => <tr>
              <td key={index}>
                <input type='checkbox' onChange={handleCharClick((e) =>e)}/>{charName}</td>
                <div>
        {checked === true && <CharTables char={charName}/>}
      </div>
              </tr>)}
              
        </table>
      </section>
    </div>
  );
}

export default App;
