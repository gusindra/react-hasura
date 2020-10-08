import React, { Component } from 'react';

import Shop from './Shop';

class GlobalState extends Component {
  state = {
    cart: [],
    shoppingCart: [],//{ shop: 0, cart: [], shipping: 0 }, // shop > product, shipping
    buyer: [],
    payment: [],
    shipping: [],
  };

  addProductToCart = product => {
    console.log('Adding product', product);
    const updatedCart = [...this.state.cart];
    const updatedShoppingCart = [...this.state.shoppingCart];

    const updatedItemIndex = updatedCart.findIndex(
      item => item.id === product.id
    );

    const updatedCartItemIndex = updatedShoppingCart.findIndex(
      shops => shops.id === product.account_id
    );

    if (updatedItemIndex < 0) {
      updatedCart.push({ ...product, quantity: 1 });
    } else {
      const updatedItem = {
        ...updatedCart[updatedItemIndex]
      };
      updatedItem.quantity++;
      updatedCart[updatedItemIndex] = updatedItem;
    }

    console.log(updatedCartItemIndex);
    if (updatedCartItemIndex < 0) {
      console.log("Push new shop");
      const productItem = [];
      const shop = [{
        id: product.account_id,
        shop: product.shop,
        cart: productItem,
        shipping: {id: product.account_id, service: 'Pengiriman '+product.shop.name, price: 0}
      }];
      productItem.push({ ...product, quantity: 1 });
      updatedShoppingCart.push(...shop);
    } else {
      const updatedCartItem = {
        ...updatedShoppingCart[updatedCartItemIndex]
      };
      console.log(updatedCartItem);
      const updatedCartInItemIndex = updatedCartItem.cart.findIndex(
        produk => produk.id === product.id
      );

      if (updatedCartInItemIndex < 0) {
        console.log('add product to shop');
        updatedCartItem.cart.push({ ...product, quantity: 1 });
      } else {
        console.log('update qty product to shop');

        const updatedProductItem = {
          ...updatedCartItem.cart[updatedCartInItemIndex]
        };
        updatedProductItem.quantity++;
        updatedCartItem.cart[updatedCartInItemIndex] = updatedProductItem;
        updatedShoppingCart[updatedCartItemIndex] = updatedCartItem;
      }

    }

    setTimeout(() => {
      this.setState({ cart: updatedCart });
      this.setState({ shoppingCart: updatedShoppingCart });
    }, 700);

    console.log('Cart', this.state.cart);
    console.log('ShoppingCart', this.state.shoppingCart);

  };

  addStockButton = product => {
    console.log('Add qty product', product);
    // ADD STOCK CART
    const updatedCart = [...this.state.cart];
    const updatedItemIndex = updatedCart.findIndex(
      item => item.id === product.id
    );

    const updatedItem = {
      ...updatedCart[updatedItemIndex]
    };
    updatedItem.quantity++;
    updatedCart[updatedItemIndex] = updatedItem;

    // ADD STOCK SHOPCART
    const updatedShoppingCart = [...this.state.shoppingCart];
    const updatedCartItemIndex = updatedShoppingCart.findIndex(
      shops => shops.id === product.account_id
    );
    const updatedShopItem = {
      ...updatedShoppingCart[updatedCartItemIndex]
    };
    const updatedProductItemIndex = updatedShopItem.cart.findIndex(
      produk => produk.id === product.id
    );
    const updatedProductItem = {
      ...updatedShopItem.cart[updatedProductItemIndex]
    };
    updatedProductItem.quantity++;
    updatedShopItem.cart[updatedProductItemIndex] = updatedProductItem;
    updatedShoppingCart[updatedCartItemIndex] = updatedShopItem;

    setTimeout(() => {
      this.setState({ cart: updatedCart });
      this.setState({ shoppingCart: updatedShoppingCart });
    }, 700);
    console.log('Cart', updatedCart);
  };

  removeStockButton = product => {
    console.log('Remove qty product', product);
    // MINUS STOCK CART
    const updatedCart = [...this.state.cart];
    const updatedItemIndex = updatedCart.findIndex(
      item => item.id === product.id
    );
    const updatedItem = {
      ...updatedCart[updatedItemIndex]
    };
    updatedItem.quantity--;
    if (updatedItem.quantity <= 0) {
      updatedCart.splice(updatedItemIndex, 1);
    } else {
      updatedCart[updatedItemIndex] = updatedItem;
    }

    // MINUS STOCK SHOPCART
    const updatedShoppingCart = [...this.state.shoppingCart];
    const updatedCartItemIndex = updatedShoppingCart.findIndex(
      shops => shops.id === product.account_id
    );
    const updatedShopItem = {
      ...updatedShoppingCart[updatedCartItemIndex]
    };
    const updatedProductItemIndex = updatedShopItem.cart.findIndex(
      produk => produk.id === product.id
    );
    const updatedProductItem = {
      ...updatedShopItem.cart[updatedProductItemIndex]
    };
    updatedProductItem.quantity--;
    if (updatedProductItem.quantity <= 0) {
      updatedShopItem.cart.splice(updatedProductItemIndex, 1);
    } else {
      updatedShopItem.cart[updatedProductItemIndex] = updatedProductItem;
    }
    updatedShoppingCart[updatedCartItemIndex] = updatedShopItem;

    setTimeout(() => {
      this.setState({ cart: updatedCart });
      this.setState({ shoppingCart: updatedShoppingCart });
    }, 700);
    console.log('Cart', updatedCart);
  };

  removeProductFromCart = product => {
    console.log('Removing product: ' + product);
    // REMOVE CART
    const updatedCart = [...this.state.cart];
    const updatedItemIndex = updatedCart.findIndex(
      item => item.id === product.id
    );
    const updatedItem = {
      ...updatedCart[updatedItemIndex]
    };
    updatedItem.quantity--;
    // if (updatedItem.quantity <= 0) {
      updatedCart.splice(updatedItemIndex, 1);
    // } else {
    //   updatedCart[updatedItemIndex] = updatedItem;
    // }

    // REMOVE SHOPCART
    const updatedShoppingCart = [...this.state.shoppingCart];
    const updatedCartItemIndex = updatedShoppingCart.findIndex(
      shops => shops.id === product.account_id
    );
    const updatedShopItem = {
      ...updatedShoppingCart[updatedCartItemIndex]
    };
    const updatedProductItemIndex = updatedShopItem.cart.findIndex(
      produk => produk.id === product.id
    );
    const updatedProductItem = {
      ...updatedShopItem.cart[updatedProductItemIndex]
    };
    updatedProductItem.quantity--;
    // if (updatedProductItem.quantity <= 0) {
      updatedShopItem.cart.splice(updatedProductItemIndex, 1);
    // } else {
    //   updatedShopItem.cart[updatedProductItemIndex] = updatedProductItem;
    // }
    updatedShoppingCart[updatedCartItemIndex] = updatedShopItem;

    setTimeout(() => {
      this.setState({ cart: updatedCart });
      this.setState({ shoppingCart: updatedShoppingCart });
    }, 700);
    console.log('Cart', updatedCart);

  };

  fillBuyerData = user => {
    // alert(user);
    console.log('Fill shipping', user);
    const updatedBuyer = [];

    updatedBuyer.push({ ...user });

    setTimeout(() => {
      this.setState({ buyer: updatedBuyer });
    }, 700);

    console.log('Buyer', updatedBuyer);
  }

  selectPaymentMethod = method => {
    console.log('Fill payment', method);
    const updatedPayment = [];
    updatedPayment.push({ method });

    this.setState({ payment: updatedPayment });

    console.log('Payment', this.state.payment);
  }

  selectShippingMethod = shipping => {
    console.log('Fill shipment', shipping);
    const updatedShipping = [];
    updatedShipping.push({ shipping });

    // ADD STOCK SHOPCART
    const updatedShoppingCart = [...this.state.shoppingCart];
    const updatedCartItemIndex = updatedShoppingCart.findIndex(
      shops => shops.id === shipping.id
    );
    const updatedShopItem = {
      ...updatedShoppingCart[updatedCartItemIndex]
    };
    // console.log(updatedShopItem);
    updatedShopItem.shipping = shipping;

    // updatedShopItem.shipping = shipping;
    updatedShoppingCart[updatedCartItemIndex] = updatedShopItem;

    this.setState({ shipping: updatedShipping });
    this.setState({ shopingcart: updatedShoppingCart });

    console.log('Shipping', this.state.shipping);
    // console.log('ShippingCart', this.state.shopingcart);
  }

  render() {
    return (
      <Shop.Provider
        value={{
          cart: this.state.cart,
          shoppingCart: this.state.shoppingCart,
          buyer: this.state.buyer,
          payment: this.state.payment,
          shipping: this.state.shipping,
          addProductToCart: this.addProductToCart,
          removeProductFromCart: this.removeProductFromCart,
          removeStockButton: this.removeStockButton,
          addStockButton: this.addStockButton,
          fillBuyerData: this.fillBuyerData,
          selectPaymentMethod: this.selectPaymentMethod,
          selectShippingMethod: this.selectShippingMethod,
        }}
      >
        {this.props.children}
      </Shop.Provider>
    );
  }
}

export default GlobalState;