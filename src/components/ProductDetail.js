import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Carousel from 'react-material-ui-carousel';
import Footer from './FooterProduct';
import Products from './Products';
import Loading from './Loading';
import Price from './Price';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Header from './Header';

const PRODUCTS = gql`
    query ProductDetailsQuery($slug: String!) {
        products(where: {slug: {_eq: $slug}}) {
            name
            slug
            id
            description
            price
            stock   
            weight 
            account_id
            images(where: {model: {_eq: "product"}}) {
                url
                id
            }
            account_id
            shop {
                origin_city
                name
                account_id
            }
        }
    }  
`;

const Product = ({
    match: {
        params: { slug },
    },
}) => {
    const { loading, error, data } = useQuery(PRODUCTS, { variables: { slug }});

    if(loading) return <Loading type="product" />;
    if(error) return <p>Error :(</p>;

    const { id, name, price, stock, weight, description, images, account_id } = data.products[0];

    return (
        <React.Fragment>
            <CssBaseline />
            <Header />
            <main>
                <div>
                    <Grid item key={id} xs={12} sm={12} md={12}>
                        <Carousel autoPlay={false}>
                            {images.map((image) => (
                                <img alt={name} key={image.id} className="post__image" src={image.url} />
                            ))}
                        </Carousel>
                    </Grid>
                    <Container>
                        <Typography component="p" variant="h6" align="left" color="textPrimary" gutterBottom>
                            <Price value={price}></Price>
                        </Typography>
                        <Typography component="p" align="left" color="textPrimary" gutterBottom>
                            {name}
                        </Typography>
                        <List className="table__product">
                            <ListItem className="cart__item">
                                <ListItemText primary="Stock" />
                                <ListItemText primary={stock} />
                            </ListItem>
                            <ListItem className="cart__item">
                                <ListItemText primary="Weight" />
                                <ListItemText primary={weight} />
                            </ListItem>
                        </List>
                        <Typography align="left" color="textSecondary" paragraph>
                            {description}
                        </Typography>
                        <hr></hr>
                        <h5>Rekomendasi lain</h5>
                        <Grid container spacing={4}>
                            <Products shopId={account_id}></Products>
                        </Grid>
                    </Container>
                </div>
            </main>
            <Footer shop={account_id} product={data.products[0]} />
        </React.Fragment>
    );
};

export default Product;

