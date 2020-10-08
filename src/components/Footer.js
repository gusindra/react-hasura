import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Modal, Button, Input } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  footer: {
    position: "sticky",
    bottom: 0,
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
  paper: {
    background: 'white',
    top: '50%',
    left: '50%',
    transform: `translate(0%, 50%)`,
    padding: '40px',
    margin: '0 auto',
    maxWidth: '400px',
  }
}));


export default function StickyFooter() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  
  const signUp = (event) => {
    event.preventDefault();
    
    setOpen(false);
  }

  return (
      <footer className="footer__product">
        <Button component={Link} to="/">Beranda</Button>
        <Button component={Link} to="/category/1">Kategori</Button>
        <Button component={Link} to="/checkout">Keranjang</Button>
        <Button onClick={() => setOpen(true)}>Akun</Button>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
        >
          <div className={classes.paper}>
            <center>

              <form className="app__signup">
                <Input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <Input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <Button type="submit" onClick={signUp} >Sign up</Button>
              </form>

            </center>
          </div>
        </Modal>
      </footer>
  );
}