import React, { Component } from 'react';
import { Catalogue, Favorite, Footer, Header, Order, OrderEnd, MainPage, ProductCard } from './components'

import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='container'>
          <Header />
          <Route path='/' exact component={MainPage} />
          <Route path='/catalogue' exact component={Catalogue} />
          <Route path='/favorite' exact component={Favorite} />
          <Route path='/order' exact component={Order} />
          <Route path='/orderEnd' exact component={OrderEnd} />
          <Route path='/productCard' exact component={ProductCard} />
          <Footer />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
