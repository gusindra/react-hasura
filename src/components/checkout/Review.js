import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import { IconButton, CardMedia, Container, ListItem, ListItemText } from '@material-ui/core';
import Shop from '../../context/Shop';
import { withStyles } from "@material-ui/core/styles";
import Price from '../Price';
import ArrowBack from '@material-ui/icons/KeyboardArrowRight';
import { Link } from 'react-router-dom';
import ShippingDialog from './SelectShipping';
import ButtonShipping from './ButtonShipping';

const useStyles = theme => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
    lineHeight: 3.6
  },
});

class Review extends Component {
  static contextType = Shop;

  constructor(props) {
    super(props);
    this.state = {
      submitFromOutside: false,
      activeStep: 1,
      shopId: 1,
      open: false,
      service: '',
      serviceFee: 0,
      shipping: [],
      origin: 144,
      destination: 144,
      selectedValue: 1
    };
  }

  handleClickOpen = (id, status) => {
    if(!this.state.open){
      console.log(id);
      this.setState({ shopId: id });
      if(status){
        this.setState({ open: true });
      }
    }
  }

  handleClose = (value) => {
    this.setState({ open: false });
    this.setState({ service: value.service });
    this.setState({ serviceFee: value.price });
    const shopcart = [...this.state.shipping];
    const index = this.state.shipping.findIndex(obj => obj.id === value.id);
    // console.log(index);
    shopcart[index] = value;
    this.setState({ shipping: shopcart });
    console.log(this.state.shipping);
    this.context.selectShippingMethod.bind({
      data: this.state.shipping
    });
  }

  handleShop = (id) => {
    if(!this.state.open){
      this.setState({ shopId: id });
    }
  }

  componentDidMount() {
    //{
      this.context.shoppingCart.map(cart => {
        var joined = this.state.shipping;
        joined.push(cart.shipping);
        this.setState({ shipping: joined });
      })
    //}
  }

  // getShipping = (shipping, shop_id, tipe) => {
  //   // const shopcart = [...this.state.shipping];
  //   // const index = this.state.shipping.findIndex(obj => obj.id === shop);
  //   var service = 'Pilih';
  //   // console.log('after change', service);
  //   console.log(this.state.shipping);
  //   // console.log('state change', shop_id);
  //   if (tipe == 'service') {
  //     shipping.map(shop => {
  //       if (shop.id == shop_id) {
  //         console.log('service', shop.service);
  //         service = shop.service;
  //       }
  //     })
  //     return service;
  //   } else {
  //     return this.state.serviceFee;
  //   }
  // }

  render() {
    const { classes } = this.props;
    var handleClickOpen = this.handleClickOpen;
    var handleClose = this.handleClose;
    var handleShop = this.handleShop;

    return (
      <React.Fragment>
        <Container>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Grid container className="space__between">
                <Typography variant="button" gutterBottom className={classes.title}>
                  Produk
                  </Typography>
                <IconButton component={Link} to="/checkout"><ArrowBack fontSize="small" /></IconButton >
              </Grid>
              <List disablePadding>
                {this.context.shoppingCart.length > 0 ? (
                  this.context.shoppingCart.map((shop, i) => (
                    <React.Fragment key={i}>
                      <Typography variant="subtitle1">{shop.shop.name}</Typography>
                      {shop.cart.length > 0 ? (shop.cart.map(item => (
                        <React.Fragment key={i}>
                          <ListItem className="cart__item" key={item.name}>
                            <Grid container spacing={3}>
                              <Grid item xs={4}>
                                <CardMedia
                                  className="thumb__image"
                                  image={item.images[0].url}
                                  title={item.name}
                                />
                              </Grid>
                              <Grid item xs={8}>
                                <Grid container spacing={3}>
                                  <Grid item xs={12}>
                                    <Typography variant="subtitle1">
                                      <ListItemText primary={item.name} />
                                      <Price value={item.price}></Price>
                                    </Typography>
                                  </Grid>

                                </Grid>
                              </Grid>
                            </Grid>

                          </ListItem>
                        </React.Fragment>
                      ))) : ('')}
                      <React.Fragment>
                        <Grid container className="space__between">
                          <ButtonShipping 
                            shipping={this.state.shipping} 
                            shop={shop.shop.account_id} 
                            onClick={() => handleShop(shop.shop.account_id)} 
                            handleClick={() => handleClickOpen(shop.shop.account_id, true)} 
                          />
                        </Grid>
                      </React.Fragment>
                    </React.Fragment>
                  ))) : ('')}
              </List>
            </Grid>
            <ShippingDialog
              shop={this.state.shopId}
              origin={this.state.origin}
              destination={this.state.destination}
              weight={this.context.cart.reduce((count, curItem) => { return count + curItem.weight * curItem.quantity; }, 0)}
              selectedValue={this.state.selectedValue}
              open={this.state.open}
              onClose={handleClose}
              handleMethod={this.context.selectShippingMethod.bind(this.state.shipping)}
            />
            {/* {this.state.shipping.map(sip => sip.service)} */}
            <Grid item xs={12} sm={6}>
              <Grid container className="space__between">
                <Typography variant="button" gutterBottom className={classes.title}>
                  Pengiriman
                  </Typography>
                <IconButton component={Link} to="/checkout/shipping"><ArrowBack fontSize="small" /></IconButton >
              </Grid>
              {this.context.buyer.map(user => (
                <React.Fragment>
                  <Grid key={user.id}>
                    <Typography variant="subtitle2" gutterBottom>{user.name} | {user.phone}</Typography>
                    <Typography variant="subtitle2" gutterBottom>{user.address}, {user.district.name}, {user.city.name}, {user.province.name} {user.zip}</Typography>
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>

            <Grid item container direction="column" xs={12} sm={6}>
              <Grid container className="space__between">
                <Typography variant="button" gutterBottom className={classes.title}>
                  Pembayaran
                  </Typography>
                <IconButton component={Link} to="/checkout/payment"><ArrowBack fontSize="small" /></IconButton >
              </Grid>
              <Grid container>
                {this.context.payment.map(pay => (
                  <React.Fragment>
                    <Grid key={pay.id} className="space__between">
                      <Typography variant="subtitle2" gutterBottom>Tipe Pembayaran</Typography>
                      <Typography variant="subtitle2" gutterBottom>{pay.method}</Typography>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>

              <br></br>
              <br></br>
              <br></br>
              <br></br>

            </Grid>

            <Grid container className="total__price " spacing={3}>
              <Grid item xs={6}>
                <ListItemText primary="Total Belanja" />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" align="center">
                  <Price value={this.context.cart.reduce((count, curItem) => {
                    return count + curItem.price * curItem.quantity;
                  }, 0) + this.state.shipping.reduce((count, ship) => {
                    return count + ship.price;
                  }, 0)}></Price>
                </Typography>
              </Grid>
            </Grid>
          </Grid>

        </Container>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(Review);