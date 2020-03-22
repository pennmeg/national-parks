# U.S. National Parks

Search for National Parks by state using the National Park Service API (https://www.nps.gov/subjects/developer/get-started.htm)

## Running Locally

### Clone project

Clone project onto your local machine

### Install dependencies

Run `npm install` on project folder

### Get an API key

Go to the [National Park Service and sign up for an API key](https://www.nps.gov/subjects/developer/get-started.htm).

### Open the code editor

In `src/NationalParks/constants/constants.js` replace value assigned to `myApiKey` with your API key.

It should look like this `const myApiKey = YOUR-API-KEY;`

### Run project in development mode

`npm start` and open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Getting started

### Choose a state

Select a state from the dropdown, and click search

### Choose a park

API will find a list of parks in select stated and display them under `National Parks in {state}`. Choose a park to see more information.

## Notes

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Uses SASS and Styled-Components.
