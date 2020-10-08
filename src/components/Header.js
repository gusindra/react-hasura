import React from 'react';
import { Badge, Button } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import AddShoppingCart from '@material-ui/icons/ShoppingCart';
import Shop from '../context/Shop';


export default function Header() {
  let location = useLocation();

  return (
    <div >
      <Shop.Consumer>
        {context => (
          <React.Fragment>
            {location.pathname === '/checkout' ? ("") : (
              <div className="header_nav space__between">
                <img
                  src="https://archeeshop.com/img/logo/new_logo.png"
                  title="Image title"
                  alt="logo"
                />

                <Button component={Link} to="/checkout">
                  <Badge badgeContent={context.cart.reduce((count, curItem) => {
                      return count + curItem.quantity;
                    }, 0)} color="secondary">
                    <AddShoppingCart />
                  </Badge>
                </Button>

              </div>
            )}
          </React.Fragment>
        )}
      </Shop.Consumer>
    </div>
  );
}