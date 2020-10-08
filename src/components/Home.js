import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ProductSearch from './ProductSearch';
import Header from './Header';

export default function Home() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <br></br>
      <main>
        <div>
          <Container maxWidth="sm">
            <Typography component="h2" variant="h4" align="center" color="textPrimary" gutterBottom>
              Selamat Datang
            </Typography>
          </Container>
        </div>
        <ProductSearch />
      </main>
    </React.Fragment>
  );
}