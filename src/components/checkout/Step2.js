import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import AddressForm from './AddressForm';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";

const useStyles = theme => ({
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
});

const steps = ['Keranjang', 'Pengiriman', 'Pembayaran', 'Selesai'];

class Step2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitFromOutside: false,
            activeStep: 1
        };
    }

    submitCustomForm = () => {
        this.setState({
            submitFromOutside: true,
        });
    };

    componentDidMount() {
        console.log(this.form);
    }

    render() {
        const { classes } = this.props;

        const nextPath = () => {
            window.history.back();
        };

        return (
            <React.Fragment>
                <CssBaseline />
                <AppBar position="absolute" color="default" className={classes.appBar}>
                    <div className="header_nav">
                        <Button onClick={nextPath}><ArrowBack fontSize="small" /></Button>
                        <h4 disabled>
                            Pengiriman
                        </h4>
                    </div>
                </AppBar>
    
                <main className={classes.layout}>
                    <div>
                        <Stepper activeStep={this.state.activeStep} className={classes.stepper}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </div>
                </main>
    
                <div>
                    <AddressForm submitFromOutside={this.state.submitFromOutside} />
                </div>
                <React.Fragment>
                    <footer className={classes.footer__product}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={this.submitCustomForm}
                            // component={Link} to="/checkout/payment"
                        >
                            Next
                        </Button>
                    </footer>
                </React.Fragment>
            </React.Fragment>
        );
    }

}
export default withStyles(useStyles)(Step2);