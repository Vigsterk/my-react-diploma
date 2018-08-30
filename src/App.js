import React, { Component } from 'react';
import { Catalogue, Favorite, Footer, Header, Order, OrderEnd, MainPage, ProductCard } from './components'
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import dataLoader from "./components/Fetch/Fetch"

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      productCartItems: "",
      activeStatus: true,
      filters: [],
      categories: []
    }

    this.CarryedMainPage = this.bindProps(MainPage, {
      func: this.reloadCategories,
      status: this.state.activeStatus,
      categories: this.state.categories
    });

    this.CarryedCatalogue = this.bindProps(Catalogue, {
      func: this.reloadCategories,
      status: this.state.activeStatus
    });

    this.CarryedFavorite = this.bindProps(Favorite, {
      func: this.reloadCategories,
      status: this.state.activeStatus
    });

    this.CarryedOrder = this.bindProps(Order, {
      func: this.reloadCategories,
      status: this.state.activeStatus
    });

    this.CarryedOrderEnd = this.bindProps(OrderEnd, {
      func: this.reloadCategories,
      status: this.state.activeStatus
    });

    this.CarryedProductCard = this.bindProps(ProductCard, {
      func: this.reloadCategories,
      cartUploader: this.cartItemUploader,
      status: this.state.activeStatus
    });
  }

  cartItemUploader = (data) => {
    this.setState({ productCartItems: data })
  }

  reloadCategories = (response) => {
    this.state.activeStatus === true && this.setState({
      activeStatus: response
    })
  }

  bindProps = (Component, bindingProps) => (selfProps) => <Component {...bindingProps}{...selfProps} />;

  render() {
    const { CarryedMainPage, CarryedCatalogue, CarryedFavorite, CarryedOrder, CarryedOrderEnd, CarryedProductCard } = this;
    console.log(this.state.categories)
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className='container'>
          <Header status={this.state.activeStatus} cart={this.state.productCartItems} categories={this.state.categories} filters={this.state.filters} />
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
