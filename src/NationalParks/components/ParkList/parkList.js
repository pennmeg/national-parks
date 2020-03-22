import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ListItem = styled.li`
  display: inline;
`;

const Button = styled.button`
  border: none;
  margin: 0 0.5em;
  color: #3A5BC6; {/* $indigo */}
`;

function ParkList(props) {
  const items = props.parks.map(park => {
    return (
      <ListItem key={park.parkCode} role="none">
        <Button onClick={() => props.callback(park.parkCode)} type="button">{park.fullName}</Button>
      </ListItem>
    )
  });
  return (
    <List aria-labelledby="stateParks">
      {props.parks && props.parks.length ? items : ''}
    </List>
  );
}

export default ParkList;
