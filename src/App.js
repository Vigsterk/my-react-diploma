import React, { Component } from 'react';
import { Catalogue, Favorite, Footer, Header, Order, OrderEnd, MainPage, ProductCard } from './components'
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <BrowserRouter>
        <div className='container'>
          <Header />
          <Route path='/' exact component={MainPage} />
          <Route path='/Catalogue' exact component={Catalogue} />
          <Route path='/Favorite' exact component={Favorite} />
          <Route path='/Order' exact component={Order} />
          <Route path='/OrderEnd' exact component={OrderEnd} />
          <Route path='/ProductCard' exact component={ProductCard} />
          <Footer />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
