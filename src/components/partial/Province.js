import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import Loading from '../Loading';

const PROVINCE_QUERY = gql`query ProvinceQuery($country: Int!) {
  province(where: {country_id: {_eq: $country}}) {
      name
      id
  }
}`;

function Province({ handleProvince, country, selected }) {
  const { loading, error, data } = useQuery(PROVINCE_QUERY, { variables: { country } });

  const renderSelected = (province, selected, handleProvince) => {

    return (

      <React.Fragment>
        <FormControl className="select__input">
          <InputLabel id="province">Provinsi</InputLabel>
          <Select
            labelId="province"
            id="province"
            name="province"
            onChange={(e) => handleProvince(e)}
            value={selected}
          >
            {province.map(p => (
              <MenuItem key={p.id} selected={selected} value={p.id + ""}>{p.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </React.Fragment>
    );
  }

  if (loading) return <Loading type="input" />;
  if (error) return <p>Error :(</p>;

  return renderSelected(data.province, selected, handleProvince);
}

export default Province;