import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Cart from './Cart';
import ArrowBack from '@material-ui/icons/ArrowBack';

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

function Checkout() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <div className="header_nav">
          <Button component={Link} to="/"><ArrowBack fontSize="small" /></Button>
          <h4 disabled>
            Keranjang Saya
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
        <React.Fragment>
          <Cart />
        </React.Fragment>
      </main>


      <React.Fragment>
        <footer className={classes.footer__product}>
          <Button
            variant="contained"
            color="primary"
            component={Link} to="/checkout/shipping"
            className={classes.button}
          >
            Next
            </Button>
        </footer>
      </React.Fragment>

    </React.Fragment>
  );
}

export default Checkout;