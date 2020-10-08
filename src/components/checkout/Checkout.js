import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
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
  const [activeStep, setActiveStep] = React.useState(0);
  const [submitForm, setSubmitForm] = useState(false);
  
  const handleNext = () => {
    setActiveStep(activeStep + 1);
    if (activeStep == 1) {
      alert('submit');
      setSubmitForm(true);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const nextPath = () => {
    window.history.back();
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <div className="header_nav">
          <Button onClick={nextPath}><ArrowBack fontSize="small" /></Button>
          <Button disabled>
            Keranjang Saya
          </Button>
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
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography variant="h5" gutterBottom>
              Thank you for your order.
              </Typography>
            <Typography variant="subtitle1">
              Your order number is #2001539. We have emailed your order confirmation, and will
              send you an update when your order has shipped.
              </Typography>
          </React.Fragment>
        ) : (
            <React.Fragment>
              {getStepContent(activeStep, submitForm)}
            </React.Fragment>
          )}
      </React.Fragment>
      {activeStep === steps.length ? ('') : (
        <React.Fragment>
          <footer className={classes.footer__product}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} className={classes.button}>
                Back
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              className={classes.button}
            >
              {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
            </Button>
          </footer>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}


function getStepContent() {
  return <Cart />;
}

export default Checkout;