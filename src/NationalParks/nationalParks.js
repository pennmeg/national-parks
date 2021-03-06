import React, { useState } from 'react';

import usStates from './config/states.config';
import * as constants from './constants/constants';

import LoadingSpinner from '../LoadingSpinner/loadingSpinner';
import ParkDetails from './components/ParkDetails/parkDetails';
import ParkList from './components/ParkList/parkList';

import parkSVG from '../assets/example-26.svg';
import './styles/nationalParks.scss';
import './styles/global.scss';

function NationalParks() {
  const [state, setState] = useState('AL');
  const [isLoading, setIsLoading] = useState(false);
  const [stateParks, setStateParks] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedPark, setSelectedPark] = useState([]);
  const [stateError, setStateError] = useState(false);
  const [parkError, setParkError] = useState(false);

  const handleChange = (value) => {
    if (value === state) {
      return;
    } else {
      setState(value)
    }
  };

  const searchState = () => {
    const stateCode = `stateCode=${state}`;
    const url = constants.npsUrl + constants.parkApi + stateCode + constants.apiKey;
    stateError && setStateError(false);
    setSelectedPark([]);
    setSelectedState(state);
    setIsLoading(true);
    fetch(url)
      .then(response => response.json())
      .then(data => { setStateParks(data.data); setIsLoading(false) })
      .catch(err => { setStateError(true); setIsLoading(false) })
  }

  const searchPark = (value) => {
    const parkCode = `parkCode=${value}`;
    const url = constants.npsUrl + constants.parkApi + parkCode + constants.apiKey;
    parkError && setParkError(false);
    fetch(url)
      .then(response => response.json())
      .then(data => setSelectedPark(data.data))
      .catch(err => setParkError(true))
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
          <h2 id="stateParks">National Parks {stateParks && stateParks.length ? `in ${selectedState}` : ''}</h2>
          {isLoading ?
            <LoadingSpinner /> :
            ( stateError ?
              <p>Error finding parks. Please try again later.</p> :
              <ParkList parks={stateParks} callback={searchPark} />
            )
          }
        </div>
        {selectedPark && selectedPark.length ? <ParkDetails error={parkError} {...selectedPark[0]}/> : ''}
      </div>
    </div>
  );
}

export default NationalParks;
