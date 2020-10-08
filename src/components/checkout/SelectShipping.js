import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/LocalShipping';

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

function ShippingDialog(props) {
    const classes = useStyles();
    const { onClose, selectedValue, open, origin, destination, weight, handleMethod, shop } = props;
    const [page, setPage] = useState(1);
    const [commitHistory, setCommitHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(
          `https://archeeshop.com/api/shipping-cost`,
          {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "origin": origin,
                "destination": destination,
                "weight": weight
            })
            // headers: new Headers({
            //   Accept: "application/vnd.github.cloak-preview"
            // })
          }
        )
          .then(res => res.json())
          .then(response => {
            setCommitHistory(response.results);
            setIsLoading(false);
          })
          .catch(error => console.log(error));
      }, [page]);

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
        // handleMethod(value);
    };

    const renderSelected = (open, selectedValue, shop) => {
        return (
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title">Pilih Kurir</DialogTitle>
                <List>
                    {commitHistory.map((c,i) => (
                        <React.Fragment key={i}>
                        {c.costs.map((service, ind) => (
                            <React.Fragment key={ind}>
                                {service.cost.map((price, index) => (
                                    <ListItem button 
                                        onClick={() => handleListItemClick({id: shop, service: c.name, price: price.value})} 
                                        key={index}>
                                        <ListItemAvatar>
                                            <Avatar className={classes.avatar}>
                                                <PersonIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={c.name} secondary={service.description} />
                                        Rp{price.value}
                                    </ListItem>
                                ))}
                            </React.Fragment>
                            ))}
                        </React.Fragment>
                    ))}
                    <ListItem autoFocus button 
                        onClick={() => handleListItemClick({id: shop, service: 'COD', price: 10000})}
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="COD" secondary="cash on delivery"  />
                        Rp10.000
                    </ListItem>
                    <ListItem autoFocus button 
                        onClick={() => handleListItemClick({id: shop, service: 'PROMO', price: 5000})}
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="PROMO" secondary="promo ongkir"  />
                        Rp5.000
                    </ListItem>
                </List>
            </Dialog>
        );
    }


    return renderSelected(open, selectedValue, shop);

}

ShippingDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default ShippingDialog;