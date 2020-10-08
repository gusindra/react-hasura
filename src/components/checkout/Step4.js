import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Review from './Review';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from "react-router-dom";
import Loading from '../Loading';
import Shop from '../../context/Shop';

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

const steps = ['Keranjang', 'Pengiriman', 'Pembayaran', 'Selesai'];

const SAVEORDER = gql`mutation addOrderDetail($account_id: Int!, $address: String!, $city: bigint!, $customer_id: Int!, $discount: float8!, $email: String!, $name: String!, $notes: String!, $order_code: String!, $order_date: date!, $phone: String!, $receipt_number: String!, $shipment: String!, $shipping_charges: float8!, $status: smallint!, $tax: float8!, $total: float8!) {
    insert_orders_one(object: {
        account_id: $account_id, 
        address: $address, 
        city: $city, 
        customer_id: $customer_id, 
        discount: $discount, 
        email: $email, 
        name: $name, 
        notes: $notes, 
        order_code: $order_code, 
        order_date: $order_date, 
        phone: $phone, 
        receipt_number: $receipt_number, 
        shipment: $shipment, 
        shipping_charges: $shipping_charges, 
        status: $status, 
        tax: $tax, 
        total: $total
    }) {
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
    }
}
`;

const SAVEPRODUCT = gql`mutation addOrderDetail(
    $order_id: bigint!, 
    $product_id: bigint!, 
    $product_variants_id: bigint!, 
    $quantity: bigint!, 
    $unit_price: float8!
) {
insert_order_details(objects: {
    order_id: $order_id, 
    product_id: $product_id, 
    product_variants_id: $product_variants_id, 
    quantity: $quantity, 
    unit_price: $unit_price
}) {
    returning {
        id
        quantity
        unit_price
        product {
            name
            images(limit: 1) {
                url
            }
        }
    }
}
}`;

function Checkout(){
    let history = useHistory();
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(3);
    const [submitForm, setSubmitForm] = useState(false);
    const [createOrder, {loading, error}] = useMutation(SAVEORDER);
    const [saveCart] = useMutation(SAVEPRODUCT);

    const nextPath = () => {
        window.history.back();
    };

    const submitOrder = (context) => {
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        //DATA BUYER
        const address = 'Jalan';
        const city = 1;
        const customer_id = 0;
        const email = 'buyer@arch.com';
        const name = 'buyer';
        const phone = '234234234';
        const notes = '';

        //DATA CHECKOUT
        const shop = 1;
        const discount = 0;
        const tax = 0;
        const shipment = 0;
        const shipping_charges = 0;
        const total = 0;

        createOrder({ variables: { 
            account_id: shop, 
            address: address, 
            city: city, 
            customer_id: customer_id, 
            discount: discount, 
            email: email, 
            name: name, 
            notes: notes, 
            order_code: 'INV123321', 
            order_date: date, 
            phone: phone, 
            receipt_number: '', 
            shipment: 'JNE', 
            shipping_charges: 1000, 
            status: 0, 
            tax: 0, 
            total: 20000
        } })
        .then((order) => {
            context.shoppingCart.map(product => {
                product.cart.map(item => {
                    saveCart({ variables: {
                        order_id: order.data.insert_orders_one.id, 
                        product_id: item.id, 
                        product_variants_id: 0, 
                        quantity: item.quantity, 
                        unit_price: item.unit_price
                    }});
                })
            });
            history.push('/checkout/finish/'+order.data.insert_orders_one.id)
        })
        .catch((error) => alert(error.message));
        
    }

    if(loading) return <Loading type="input" />;
    if(error) return <p>Error :(</p>;

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="absolute" color="default" className={classes.appBar}>
                <div className="header_nav">
                    <Button onClick={nextPath}><ArrowBack fontSize="small" /></Button>
                    <h4 disabled>
                        Checkout
                    </h4>
                </div>
            </AppBar>

            <main className={classes.layout}>
                <div>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </div>
            </main>

            <React.Fragment>
                <Review />
            </React.Fragment>

            <Shop.Consumer>
                {context => (
                    <React.Fragment>
                        <footer className={classes.footer__product}>
                            <Button
                                variant="contained"
                                color="primary"
                                // component={Link} to="/checkout/finish"
                                className={classes.button}
                                onClick={() => submitOrder(context)}
                            >
                                Buat Pesanan
                            </Button>
                        </footer>
                    </React.Fragment>
                )}
            </Shop.Consumer>
        </React.Fragment>
    );
}

export default Checkout;