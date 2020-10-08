import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import Loading from '../Loading';
import Shop from '../../context/Shop';

const STATE_QUERY = gql`query StateQuery($city: Int!) {
  districts(where: {city_id: {_eq: $city}}) {
      name
      id
  }
}  
`

function States({ handleSelectDistrict, city, selected }) {
    const { loading, error, data } = useQuery(STATE_QUERY, { variables: { city } });

    const renderSelected = (districts, handleSelectDistrict) => {
        return (
            <Shop.Consumer>
                {context => (
                    <React.Fragment>
                        <FormControl className="select__input">
                            <InputLabel id="district">Kecamatan</InputLabel>
                            <Select
                                labelId="district"
                                id="district"
                                name="province"
                                onChange={(e) => handleSelectDistrict(e)}
                                value={selected}
                            >
                                {districts.map(p => (
                                    <MenuItem key={p.id} selected={selected === p.id} value={p.id}>{p.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </React.Fragment>
                )}
            </Shop.Consumer>
        );
    }

    if (loading) return <Loading type="input" />;
    if (error) return <p>Error :(</p>;

    return renderSelected(data.districts, handleSelectDistrict);
}

export default States;