import React, { useState } from 'react';
import usStates from './config/states.config.js';

function NationalPark() {
  const [state, setState] = useState('AK');

  const handleChange = (value) => {
    if (value === state) {
      return;
    } else {
      setState(value)
    }
  };

  const searchState = () => {


  }
  return (
    <div id="nationalPark">
      <header className="App-header">
        <h1>National Parks</h1>
        <p id="selectState">Select a state to begin</p>
        <form aria-describedby="selectState">
          <label for="state" className="srOnly">State</label>
          <select id="state" value={state} onChange={e => handleChange(e.target.value)}>
            {usStates.map(state => {
              return <option value={state.state} key='usState-`${state.state}`'>{state.state}</option>;
            })}
          </select>
          <button onClick={() => searchState()} type="submit">Search</button>
        </form>
      </header>
      <div>
        <div>
          <div>
            <h2>National Parks in STATE</h2>
            <ul>
            </ul>
          </div>
          <div>
            <h2>Nationl Park Name</h2>
            <img src="" />
            <p>Website</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NationalPark;
