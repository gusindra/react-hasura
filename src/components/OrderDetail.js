import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import { CardMedia, Container, Grid, List, ListItem, ListItemText } from '@material-ui/core';
import { useQuery, gql } from '@apollo/client';
import Loading from './Loading';
import Price from './Price';

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
        phone
        address
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

const Order = ({
    match: {
        params: { slug },
    },
}) => {
    const classes = useStyles();

    const nextPath = () => {
        window.history.back();
    };

    const { loading, error, data } = useQuery(ORDER_QUERY, { variables: { slug } });

    if (loading) return <Loading type="input" />;
    if (error) return <p>Error :(</p>;

    const { order_code, name, phone, address, detail_order, order_date, total, shipping_charges, shipment, status } = data.orders_by_pk;

    const textStatus = (status) => {
        switch (status) {
            case 0:
                return "Menunggu Konfirmasi";
            case 1:
                return "Terkonfirmasi";
            case 2:
                return "Terbayar";
            case 3:
                return "Terkirim";
            default:
                return 'Batal';
        }
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="absolute" color="default" className={classes.appBar}>
                <div className="header_nav">
                    <Button component={Link} to="/"><ArrowBack fontSize="small" /></Button>
                    <h4 disabled>
                        Kembali
                    </h4>
                </div>
            </AppBar>
            <React.Fragment>
                <Container>
                    <br></br>
                    <Typography variant="body2" gutterBottom>
                        Detail Pengiriman & Penagihan
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {name}<br></br>
                        {phone}<br></br>
                        {address}<br></br>
                    </Typography>
                    <br></br>
                    <hr></hr>
                    <Grid container className="space__between">
                        <Typography variant="body2" gutterBottom>
                            Detail Produk
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            {textStatus(status)}
                        </Typography>
                    </Grid>
                    <List disablePadding>
                        {detail_order.map((cartItem, index) => (
                            <ListItem className="cart__item" key={index}>
                                <Grid container spacing={3}>
                                    <Grid item xs={4}>
                                        <CardMedia
                                            className="thumb__image"
                                            image={cartItem.product.images[0].url}
                                            title={cartItem.product.name}
                                        />
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <Typography align="right" variant="subtitle1">
                                                    <ListItemText primary={cartItem.product.name} secondary={'x ' + cartItem.quantity} />
                                                    <Price value={cartItem.unit_price}></Price>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </ListItem>
                        ))}
                    </List>
                    <br></br>
                    <hr></hr>
                    <br></br>
                    <Typography variant="subtitle1">
                        Pesanan #{order_code}
                    </Typography>
                    <Typography variant="caption">
                        Dipesan pada {order_date}
                    </Typography>
                    <br></br>
                    <hr></hr>
                    <Grid container className="space__between">
                        <Typography variant="body1" gutterBottom>
                            Subtotal
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Rp{total - shipping_charges}
                        </Typography>
                    </Grid>
                    <Grid container className="space__between">
                        <Typography variant="body1" gutterBottom>
                            Biaya Pengiriman ({shipment})
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Rp{shipping_charges}
                        </Typography>
                    </Grid>
                    <hr></hr>
                    <Grid container className="space__between">
                        <Typography align="right" variant="body1" gutterBottom></Typography>
                        <Typography align="right" variant="h6" gutterBottom>
                            Total : Rp{total}
                        </Typography>
                    </Grid>
                </Container>
            </React.Fragment>
        </React.Fragment>
    );
};
export default Order;