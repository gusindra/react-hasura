import React, { useState, useEffect } from 'react';
import InputSearch from './Search';
import Products from './Products';
import { useLazyQuery, gql } from '@apollo/client';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Loading from './Loading';

const SEARCH = gql`
  query Search($match: String) {
    products(where: {name: {_ilike: $match}}) {
      name
      slug
      id
      description
      stock
      price
      weight
      images(where: {model: {_eq: "product"}}) {
        url
      }
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(5),
  },
}));


function ProductSearch({ defaultProduct }) {
  const [inputVal, setInputVal] = useState("");
  const [search, {loading, error, data} ] = useLazyQuery(SEARCH);
  const classes = useStyles();
  const [listProduct, setListProduct] = useState(null);

  useEffect((defaultProduct)=>{
    const unsubscribe = () => {
      if(defaultProduct){
        setListProduct(defaultProduct.products);
      }
    };
    return () => {
      unsubscribe();
    }
  }, [listProduct]);

  if(loading) return <Loading type="product" />;
  if(error) return <p>Error :(</p>;

  return (
    <div>
      <Container className={classes.cardGrid} maxWidth="md">
        <InputSearch
          inputVal={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onSearch={() => search({variables: {match: `%${inputVal}%`}})}
        ></InputSearch>
        <br></br>
        <Grid container spacing={4}>
          <Products newProducts={data ? data.products : listProduct}></Products>
        </Grid>
      </Container>
    </div>
  );
}

export default ProductSearch;