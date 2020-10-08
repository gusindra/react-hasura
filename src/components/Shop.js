import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ProductSearch from './ProductSearch';
import Footer from './Footer';
import Header from './Header';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));

const PRODUCTS = gql`
    query ProductDetailsQuery($id: bigint!) {
        products(where: {account_id: {_eq: $id}}) {
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

const Product = ({
  match: {
    params: { id },
  },
}) => {
  const { loading, error, data } = useQuery(PRODUCTS, { variables: { id } });
  const classes = useStyles();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <main>
        {/* Hero unit */}
        <div>
          <Container maxWidth="sm">
            <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom>
              Shop Name
              </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              About us.
              </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Contact
                    </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Login
                    </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>

        <ProductSearch defaultProduct={data} />
      </main>
      <Footer />

    </React.Fragment>
  );
};

export default Product;