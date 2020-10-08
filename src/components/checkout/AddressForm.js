import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Container } from '@material-ui/core';
import Province from '../partial/Province';
import City from '../partial/City';
import State from '../partial/State';
import Shop from '../../context/Shop';
import { withRouter } from 'react-router-dom';

class Form extends Component {
  static contextType = Shop;

  constructor(props) {
    super(props);
    this.state = {
        name: '',
        email: '',
        phone: '',
        address: '',
        country: {id:1},
        province: {id:0},
        city: {id:0},
        district: {id:0},
        zip: '',
    };
  };

  finallySubmit = () => {
    this.props.history.push('/checkout/payment');
  }

  selectProvince = selected => {
    console.log(selected);
    this.setState({
      province: {
        id:selected.target.value,
        name:selected.nativeEvent.target.outerText
      }
    });
  }
  selectCity = selected => {
    this.setState({city: {
      id:selected.target.value,
      name:selected.nativeEvent.target.outerText
    }})
  }
  selectDistrict = selected => {
    this.setState({district: {
      id:selected.target.value,
      name:selected.nativeEvent.target.outerText
    }})
  }

  componentDidMount(){
    {this.context.buyer.map(user => {
      this.setState({name: user.name || ''});
      this.setState({email: user.email || ''});
      this.setState({phone: user.phone || ''});
      this.setState({address: user.address || ''});
      this.setState({province: user.province || ''});
      this.setState({city: user.city || ''});
      this.setState({district: user.district || ''});
      this.setState({zip: user.zip || ''});
    })}
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.submitFromOutside) {
      // pass form data
      // get it from state
      const formData = {
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        address: this.state.address,
        province: this.state.province,
        city: this.state.city,
        district: this.state.district,
        zip: this.state.zip,
      };
      console.log('data', formData);

      this.finallySubmit();
    }
  }

  render() {
    var	handleSelectProvince	=	this.selectProvince;
    var	handleSelectCity	=	this.selectCity;
    var	handleSelectDistrict	=	this.selectDistrict;

    return (
      <React.Fragment>
        <Container>

        <form onKeyUp={this.context.fillBuyerData.bind(this, {
          name: this.state.name,
          email: this.state.email,
          phone: this.state.phone,
          address: this.state.address,
          province: this.state.province,
          city: this.state.city,
          district: this.state.district,
          zip: this.state.zip,
        })} >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="name"
                  name="name"
                  label="Nama"
                  fullWidth
                  value={this.state.name}
                  onChange={(e)=>this.setState({name: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="email"
                  name="email"
                  label="Email"
                  fullWidth
                  value={this.state.email}
                  onChange={(e)=>this.setState({email: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="phone"
                  name="phone"
                  label="Phone"
                  fullWidth
                  value={this.state.phone}
                  onChange={(e)=>this.setState({phone: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="address"
                  name="address"
                  label="Alamat"
                  fullWidth
                  autoComplete="shipping address-line1"
                  value={this.state.address}
                  onChange={(e)=>this.setState({address: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* <select onChange={(e)=>this.setState({province: e.target.value})}>
                  <option value="1">Aceh</option>
                  <option value="2">Bali</option>
                </select> */}
                <Province handleProvince={handleSelectProvince.bind(this)} selected={this.state.province.id} country={1} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <City handleSelectCity={handleSelectCity.bind(this)} province={this.state.province.id} selected={this.state.city.id} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <State handleSelectDistrict={handleSelectDistrict.bind(this)} city={this.state.city.id} selected={this.state.district.id} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="zip"
                  name="zip"
                  label="Zip / Postal code"
                  fullWidth
                  autoComplete="shipping postal-code"
                  value={this.state.zip}
                  onChange={(e)=>this.setState({zip: e.target.value})}
                />
              </Grid>
            </Grid>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </form>

        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(Form);