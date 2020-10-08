import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Shop from '../../context/Shop';
import Price from '../Price';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Remove';
import SearchIcon from '@material-ui/icons/Add';
import { InputBase, Grid, Container } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';

class Cart extends Component{
    static contextType = Shop;
    
    render(){
        return (
            <React.Fragment>
                <List disablePadding>
                    {/* {this.context.cart.map(cartItem => (
                        <ListItem className="cart__item" key={cartItem.name}>
                            <Grid container spacing={3}>
                                <Grid item xs={4}>
                                    <CardMedia
                                        className="thumb__image"
                                        image={cartItem.images[0].url}
                                        title={cartItem.name}
                                    />
                                </Grid>
                                <Grid item xs={8}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <Typography variant="subtitle1">
                                                <ListItemText primary={cartItem.name} />
                                                <Price value={cartItem.price}></Price>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <Paper className="button__qty">
                                                <IconButton 
                                                    onClick={this.context.removeStockButton.bind(this, {id: cartItem.id, account_id: cartItem.account_id})}
                                                    aria-label="menu" size="small">
                                                    <MenuIcon />
                                                </IconButton>
                                                <InputBase
                                                    align="center"
                                                    className="input__qty"
                                                    placeholder="Qty"
                                                    inputProps={{ 'aria-label': 'Qty' }}
                                                    value={cartItem.quantity}
                                                />
                                                <IconButton 
                                                    onClick={this.context.addStockButton.bind(this, {id: cartItem.id, account_id: cartItem.account_id})}
                                                    type="submit" aria-label="search" size="small">
                                                    <SearchIcon />
                                                </IconButton>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography variant="body2">
                                                <IconButton className="button__remove" onClick={this.context.removeProductFromCart.bind(this, {id: cartItem.id, account_id: cartItem.account_id})} aria-label="delete">
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </ListItem>
                    ))} */}

                    {this.context.shoppingCart.length>0?(
                        this.context.shoppingCart.map((shop, i) => (
                        <React.Fragment key={i}>
                            <Typography variant="subtitle1">{shop.shop.name}</Typography>
                            {shop.cart.length>0?(shop.cart.map(item => (
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
                                                <Grid item xs={9}>
                                                    <Paper className="button__qty">
                                                        <IconButton 
                                                            onClick={this.context.removeStockButton.bind(this, {id: item.id, account_id: item.account_id})}
                                                            aria-label="menu" size="small">
                                                            <MenuIcon />
                                                        </IconButton>
                                                        <InputBase
                                                            align="center"
                                                            className="input__qty"
                                                            placeholder="Qty"
                                                            inputProps={{ 'aria-label': 'Qty' }}
                                                            value={item.quantity}
                                                        />
                                                        <IconButton 
                                                            onClick={this.context.addStockButton.bind(this, {id: item.id, account_id: item.account_id})}
                                                            type="submit" aria-label="search" size="small">
                                                            <SearchIcon />
                                                        </IconButton>
                                                    </Paper>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Typography variant="body2">
                                                        <IconButton className="button__remove" onClick={this.context.removeProductFromCart.bind(this, {id: item.id, account_id: item.account_id})} aria-label="delete">
                                                            <DeleteIcon fontSize="small" />
                                                        </IconButton>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                </ListItem>
                            ))):('')}
                        </React.Fragment>
                    ))):('')}
                </List>
                <Container>
                    <Grid container className="total__price" spacing={3}>
                        <Grid item xs={6}>
                            <ListItemText primary="Total Belanja" />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1" align="center">
                                <Price value={this.context.cart.reduce((count, curItem) => {
                                    return count + curItem.price*curItem.quantity;
                                }, 0)}></Price>
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>

            </React.Fragment>
        )
    }
}

export default Cart;