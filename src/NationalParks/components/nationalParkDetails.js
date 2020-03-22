import React from 'react';
import './nationalParkDetails.scss';

const NationalParkDetails = props => {
  return (
    <div className="parkDetails">
      <h2>{props.fullName}</h2>
      {props.url && <p>Website: <a className="gradient--text" href={props.url}>{props.url}</a></p>}
      {props.images && props.images[0] && <img style={{ height: '300px' }} src={props.images[0].url} alt={props.images[0].altText} />}
    </div>
  );
}

export default NationalParkDetails;
