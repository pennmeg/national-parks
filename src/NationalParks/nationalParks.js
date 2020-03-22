import React, { useState } from 'react';
import usStates from './config/states.config.js';
import './nationalParks.css';
import parkSVG from '../assets/example-26.svg';

function NationalPark() {
  const [state, setState] = useState('AL');
  const [isLoading, setIsLoading] = useState(false);
  const [stateParks, setStateParks] = useState([]);
  const [error, setError] = useState(false);

  const handleChange = (value) => {
    if (value === state) {
      return;
    } else {
      setState(value)
    }
  };

  const searchState = () => {
    console.log(state);
    const npsUrl = `https://developer.nps.gov/api/v1/`;
    const parkApi = `parks?`;
    const stateCode = `stateCode=${state}`;
    const apiKey = `&api_key=${process.env.REACT_APP_NATIONAL_PARK_API_KEY}`;
    const url = npsUrl + parkApi + stateCode + apiKey;
    fetch(url)
      .then(response => response.json())
      .then(data => setStateParks(data.data))
      .catch(err => setError(true))
  }

  return (
    <>
      <header className="nationalParks--header flexBox--justifyCenter">
        <div>
          <h1>U.S. National Parks</h1>
          <p id="stateDesc">Select a state to begin searching for a park!</p>
          <form aria-labelledby="stateDesc" className="stateForm flexBox">
            <label for="stateSelect" className="srOnly">State</label>
            <select id="stateSelect" value={state} onChange={e => handleChange(e.target.value)}>
              {usStates.map(state => {
                return <option value={state.state} key={`us-state-${state.state}`}>{state.state}</option>;
              })}
            </select>
            <button onClick={() => searchState()} type="button">Search</button>
          </form>
        </div>
        <img role="img" src={parkSVG} alt="" />
      </header>
      <div>
        <div>
          <div>
            <h2 id="stateParks">National Parks {stateParks && stateParks.lentgh && `in ${state}`}</h2>
            <ul aria-labelledby="stateParks">
              {stateParks && stateParks.map(park => {
                return <li role="none"><button type="button">{park.fullName}</button></li>
              })}
            </ul>
          </div>
          <div>
            <h2>Nationl Park Name</h2>
            <img src="" />
            <p>Website</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default NationalPark;
