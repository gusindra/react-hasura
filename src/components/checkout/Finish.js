import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { useQuery, gql } from '@apollo/client';
import Loading from '../Loading';

const ORDER_QUERY = gql`query MyOrder($slug: Int!) {
    orders_by_pk(id: $slug) {
        id
        total
        status
        order_date
        order_code
        notes
        shipment
        id
        account_id
        email
        name
        shipping_charges
        detail_order {
            product_id
            product {
                name
                images(limit: 1) {
                    url
                }
            }
            quantity
            unit_price
        }
    }
}`;

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'initial'
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 2),
    },
    button: {
        borderRadius: '0',
        width: '100%'
    },
    footer__product: {
        borderTop: 'lightgray 1px solid',
        background: '#ddd',
        display: 'flex',
        justifyContent: 'flex-end',
        position: 'fixed',
        width: '100%',
        height: '50px;'
    }
}));

const Checkout = ({
    match: {
        params: { slug },
    },
}) => {
    const classes = useStyles();
    
    const nextPath = () => {
        window.history.back();
    };
    
    const { loading, error, data } = useQuery(ORDER_QUERY, { variables: { slug }});
  
    if(loading) return <Loading type="input" />;
    if(error) return <p>Error :(</p>;

    const { order_code } = data.orders_by_pk;

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="absolute" color="default" className={classes.appBar}>
                <div className="header_nav">
                    <Button onClick={nextPath}><ArrowBack fontSize="small" /></Button>
                    <Button component={Link} to="/"><ArrowBack fontSize="small" /></Button>

                    <h4 disabled>
                        Kembali
                    </h4>
                </div>
            </AppBar>
            <React.Fragment>
                <Container>
                    <br></br>
                    <Typography variant="body1" gutterBottom>
                        Thank you for your order.
                    </Typography>
                    <br></br>
                    <Typography variant="subtitle1">
                        Your order number is {order_code}. We have emailed your order confirmation, and will
                        send you an update when your order has shipped.
                    </Typography>
                </Container>
            </React.Fragment>
            <React.Fragment>
                <footer className={classes.footer__product}>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link} to={`/order/${slug}`}
                        className={classes.button}
                    >
                        Detail Order
                    </Button>
                </footer>
            </React.Fragment>
        </React.Fragment>
    );
};
export default Checkout;