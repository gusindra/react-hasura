import React, { Component } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Container, RadioGroup, Radio, FormControl } from '@material-ui/core';
import Shop from '../../context/Shop';

class PaymentForm extends Component {
  static contextType = Shop;

  constructor(props) {
    super(props);
    this.state = {
        method: 'transfer',
    };
    this.saveMethod = this.props.handleMethod.bind(this);
  };
  componentDidMount(){
    if(this.context.method){
      this.setState({method: this.context.method || ''});
    }
  }
  handleChange = (value) => {
    this.setState({method: value});
    this.saveMethod(value);
  }

  render() {
    return (
      <React.Fragment>
        <Container>
          <form  >
          <Shop.Consumer>
            {context => (
            <FormControl component="fieldset">
              {/* <FormLabel component="legend">Pilih Metode Pembayaran</FormLabel> */}
              <RadioGroup aria-label="method" name="method" value={this.state.method} 
                onChange={(e)=>this.handleChange(e.target.value) }
                >
                <FormControlLabel value="transfer" control={<Radio />} label="Transfer Bank" />
                <FormControlLabel value="midtrans" control={<Radio />} label="Pembayaran Lainnya" />
                <FormControlLabel value="paypal" control={<Radio />} label="Paypal" />
                <FormControlLabel value="cod" control={<Radio />} label="COD" />
              </RadioGroup>
            </FormControl>
            )}
          </Shop.Consumer>
          </form>
        </Container>
      </React.Fragment>
    );
  }
}

export default PaymentForm;