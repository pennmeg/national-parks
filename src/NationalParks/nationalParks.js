import React, { useState } from 'react';
import usStates from './config/states.config.js';
import './nationalParks.scss';
import parkSVG from '../assets/example-26.svg';
import LoadingSpinner from '../LoadingSpinner/loadingSpinner';
import NationalParkDetails from './components/nationalParkDetails';

const npsUrl = `https://developer.nps.gov/api/v1/`;
const parkApi = `parks?`;
const apiKey = `&api_key=${process.env.REACT_APP_NATIONAL_PARK_API_KEY}`;


function NationalPark() {
  const [state, setState] = useState('AL');
  const [isLoading, setIsLoading] = useState(false);
  const [stateParks, setStateParks] = useState([]);
  const [selectedPark, setSelectedPark] = useState([]);
  const [error, setError] = useState(false);

  const handleChange = (value) => {
    if (value === state) {
      return;
    } else {
      setState(value)
    }
  };

  const searchState = () => {
    const stateCode = `stateCode=${state}`;
    const url = npsUrl + parkApi + stateCode + apiKey;
    setIsLoading(true);
    fetch(url)
      .then(response => response.json())
      .then(data => { setStateParks(data.data); setIsLoading(false) })
      .catch(err => { setError(true); setIsLoading(false) })
  }

  const searchPark = (value) => {
    const parkCode = `parkCode=${value}`;
    const url = npsUrl + parkApi + parkCode + apiKey;
    fetch(url)
      .then(response => response.json())
      .then(data => setSelectedPark(data.data))
      .catch(err => setError(true))
  }

  return (
    <div className="nationalParks">
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
        <div style={{ textAlign: 'center', minHeight: '100px' }}>
          <h2 id="stateParks">National Parks {stateParks && stateParks.length ? `in ${state}` : ''}</h2>
          {isLoading ?
            <LoadingSpinner /> :
            <ul className="parkList" aria-labelledby="stateParks">
              {stateParks && stateParks.map(park => {
                return <li key={park.parkCode} role="none"><button onClick={() => searchPark(park.parkCode)} type="button">{park.fullName}</button></li>
              })}
            </ul>
          }
        </div>
        {selectedPark && selectedPark.length ? <NationalParkDetails {...selectedPark[0]}/> : ''}
      </div>
    </div>
  );
}

export default NationalPark;
