import React from 'react';

export default React.createContext({
  cart: [],
  shoppingCart: [],
  buyer: [],
  payment: [],
  shipping: [],
  addProductToCart: product => {},
  removeProductFromCart: product => {},
  addStockButton: product => {},
  removeStockButton: product => {},
  fillBuyerData: user => {},
  selectPaymentMethod: method => {},
  selectShippingMethod: shipping => {}
});