import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import Loading from '../Loading';
import Shop from '../../context/Shop';

const CITY_QUERY = gql`query CityQuery($province: Int!) {
  city(where: {province_id: {_eq: $province}}) {
      name
      id
  }
}  
`

function Cities({ handleSelectCity, province, selected }) {
  const { loading, error, data } = useQuery(CITY_QUERY, { variables: { province }});
  
  if(loading) return <Loading type="input" />;
  if(error) return <p>Error :(</p>;

  const renderSelected = (city, handleSelectCity, selected) => {
    return (
      <Shop.Consumer>
        {context => (
        <React.Fragment>
            <FormControl className="select__input">
            <InputLabel id="city">Kota</InputLabel>
            <Select
              labelId="city"
              id="city"
              name="city"
              onChange={(e) => handleSelectCity(e)}
              value={selected}
            >
                {city.map(p => (
                    <MenuItem key={p.id} selected={selected === p.id} value={p.id}>{p.name}</MenuItem>
                ))}
            </Select>
            </FormControl>
        </React.Fragment>
        )}
      </Shop.Consumer>
    );
  }

  return renderSelected(data.city, handleSelectCity, selected);
}

export default Cities;