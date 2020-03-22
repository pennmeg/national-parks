import React, { PropTypes } from 'react';

const NationalParkDetails = props => {
  return (
    <div className="parkDetails">
      <h2>{props.fullName}</h2>
      {props.url && <p>Website: <a href={props.url}>{props.url}</a></p>}
      {props.images && <img src={props.images[0].url} alt={props.images[0].altText} />}
    </div>
  );
}

export default NationalParkDetails;
