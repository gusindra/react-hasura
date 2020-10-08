import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/icons/Search';
import { Input, IconButton  } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    margin: {
        margin: theme.spacing(1),
    },
}));

export default function Search({ inputVal, onChange, onSearch }) {
  const classes = useStyles();

  return (
    <div className="search__form">
        <Input value={inputVal} onChange={onChange} fontSize="small" placeholder="Cari produk..." />
        <IconButton onClick={onSearch} className={classes.margin} size="small"><Icon fontSize="small" className={classes.icon} /></IconButton >
    </div>
  );
}