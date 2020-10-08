import React from 'react';
import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();


import { render } from 'react-dom';
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './components/Home';
import ProductDetail from './components/ProductDetail';
import OrderDetail from './components/OrderDetail';
import Categories from './components/Categories';
import Step1 from './components/checkout/Step1';
import Step2 from './components/checkout/Step2';
import Step3 from './components/checkout/Step3';
import Step4 from './components/checkout/Step4';
import Finish from './components/checkout/Finish';
import Account from './components/Account';
import Shop from './components/Shop';
import GlobalState from './context/GlobalState';

// import { useSelector, useDispatch } from 'react-redux';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// import store from './store';
import allReducer from './reducers';

let store = createStore(
  allReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => console.log(store.getState()));

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://archee-pgsql.herokuapp.com/v1/graphql'
  })
});

// const state = {
//   cart:[]
// }

const App = () => (
  <GlobalState>
    <BrowserRouter>
      <ApolloProvider client={client}>
          <Switch>
            <Route path="/shop/:id" component={Shop}></Route>
            <Route path="/product/:slug" component={ProductDetail}></Route>
            <Route path="/category/:slug" component={Categories}></Route>
            <Route path="/checkout/shipping" component={Step2}></Route>
            <Route path="/checkout/payment" component={Step3}></Route>
            <Route path="/checkout/review" component={Step4}></Route>
            <Route path="/checkout/finish/:slug" component={Finish}></Route>
            <Route path="/order/:slug" component={OrderDetail}></Route>
            <Route path="/checkout" component={Step1}></Route>
            <Route path="/account/:id" component={Account}></Route>
            <Route path="/" component={Home}></Route>
          </Switch>
      </ApolloProvider>
    </BrowserRouter>
  </GlobalState>
);

render(
  <Provider store={store}><App /></Provider>, 
  document.getElementById('root')
);