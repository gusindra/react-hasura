import React from 'react';
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core';
import Shop from '../context/Shop';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ShopIcon from '@material-ui/icons/Home';

export default function ProductFooter({ shop, product }) {
  return (
    <Shop.Consumer>
        {context => (
          <footer className="footer__product">
              <Button className="icon__button" component={Link} to="/"><ArrowBack></ArrowBack></Button>
              <Button className="icon__button" component={Link} to={`/shop/${shop}`}><ShopIcon></ShopIcon></Button>
              <Button component={Link} to="/checkout" onClick={context.addProductToCart.bind(this, product)} variant="contained" color="secondary">Beli sekarang</Button>
              <Button onClick={context.addProductToCart.bind(this, product)} variant="contained" color="primary">Tambah ke Cart</Button>
          </footer>
        )}
    </Shop.Consumer>
  );
}