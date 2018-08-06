import React, { Component } from 'react';
import { Catalogue, Favorite, Footer, Header, Order, OrderEnd, MainPage, ProductCard } from './components'
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeStatus: true
    }
    this.CarryedMainPage = this.bindProps(MainPage, { func: this.reloadCategories });
    this.CarryedCatalogue = this.bindProps(Catalogue, { func: this.reloadCategories });
    this.CarryedFavorite = this.bindProps(Favorite, { func: this.reloadCategories });
    this.CarryedOrder = this.bindProps(Order, { func: this.reloadCategories });
    this.CarryedOrderEnd = this.bindProps(OrderEnd, { func: this.reloadCategories });
    this.CarryedProductCard = this.bindProps(ProductCard, { func: this.reloadCategories });
  }
  reloadCategories = (response) => {
    this.state.activeStatus === true && this.setState({
      activeStatus: response
    })
  }

  bindProps = (Component, bindingProps) => (selfProps) => <Component {...bindingProps}{...selfProps} />;

  render() {
    const { CarryedMainPage, CarryedCatalogue, CarryedFavorite, CarryedOrder, CarryedOrderEnd, CarryedProductCard } = this;
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className='container'>
          <Header status={this.state.activeStatus} />
          <Route path='/' exact component={CarryedMainPage} />
          <Route path='/catalogue/' exact component={CarryedCatalogue} />
          <Route path='/favorite' exact component={CarryedFavorite} />
          <Route path='/order' exact component={CarryedOrder} />
          <Route path='/orderEnd' exact component={CarryedOrderEnd} />
          <Route path='/productCard/:id' exact component={CarryedProductCard} />
          <Footer />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
