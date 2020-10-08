import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import Price from './Price';
import Loading from './Loading';

const ALLPRODUCTS = gql`
  query MyQuery {
    products {
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

const SHOPPRODUCTS = gql`
  query ProductDetailsQuery($shopId: bigint!) {
      products(where: {account_id: {_eq: $shopId}}) {
          name
          slug
          id
          description
          price
          stock   
          weight 
          images(where: {model: {_eq: "product"}}) {
              url
          }
      }
  }  
`;

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: '10px !important;',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '100%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
    padding: '0 10px',
  }
}));

function Products({ newProducts, shopId }) {
  const [listQuery, setQuery] = useState(ALLPRODUCTS);

  useEffect(()=>{
    if (shopId) {
      setQuery(SHOPPRODUCTS);
    }
  }, [listQuery]);
  
  const { loading, error, data } = useQuery(listQuery, { variables: { shopId } });
  const classes = useStyles();

  const renderProducts = (products) => {
    return products.map(({ id, name, price, images, slug }) => (
      <Grid className={classes.grid} item key={id} xs={6} sm={6} md={4}>
        <Link to={`/product/${slug}`}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={images[0].url}
              title="Image title"
            />
            <div className={classes.cardContent}>
              <p>
                {name}
                <br></br>
                <Price value={price}></Price>
              </p>
            </div>
          </Card>
        </Link>
      </Grid>
    ));
  }

  if (loading) return <Loading />;
  if (error) return <p>Error :(</p>;

  return renderProducts(newProducts || data.products);
}

export default Products;