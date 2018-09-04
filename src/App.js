import React, { Component } from 'react';
import { Catalogue, Favorite, Footer, Header, Order, OrderEnd, MainPage, ProductCard } from './components'
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import dataLoader from "./components/Fetch/Fetch"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productCartItems: null,
      filters: null,
      categories: null,
      orderItems: null
    }

    this.CarryedMainPage = this.bindProps(MainPage, {
      categories: this.state.categories
    });

    this.CarryedCatalogue = this.bindProps(Catalogue, {
      categories: this.state.categories,
      filters: this.state.filters
    });

    this.CarryedFavorite = this.bindProps(Favorite, {});

    this.CarryedOrderEnd = this.bindProps(OrderEnd, {});

    this.CarryedOrder = this.bindProps(Order, {
      cartItems: this.state.orderItems
    });

    this.CarryedProductCard = this.bindProps(ProductCard, {
      func: this.reloadCategories,
      cartUploader: this.cartItemUploader,
      status: this.state.activeStatus
    });
  }

  componentDidMount() {
    let filters = dataLoader('filters')
    let categories = dataLoader('categories')
    Promise.all([filters, categories]).then(([filters, categories]) => {
      this.CarryedMainPage = this.bindProps(MainPage, {
        categories: categories
      });
      this.setState({
        categories: categories,
        filters: filters
      })
    },
      reason => {
        console.log(reason)
      });
  }

  orderLoader = (data) => {
    console.log("orderLoader", data)
    this.CarryedOrder = this.bindProps(Order, {
      cartItems: data
    });
    this.setState({
      orderItems: data
    })
  }

  cartItemUploader = (data) => {
    this.setState({ productCartItems: data })
  }

  bindProps = (Component, bindingProps) => (selfProps) => <Component {...bindingProps}{...selfProps} />;

  render() {
    const { CarryedMainPage, CarryedCatalogue, CarryedFavorite, CarryedOrder, CarryedOrderEnd, CarryedProductCard } = this;
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className='container'>
          {this.state.categories && <Header cart={this.state.productCartItems} categories={this.state.categories} filters={this.state.filters} func={this.orderLoader} />}
          {this.state.categories && <Route path='/' exact component={CarryedMainPage} />}
          <Route path='/catalogue/' exact component={CarryedCatalogue} />
          <Route path='/favorite' exact component={CarryedFavorite} />
          <Route path='/order' exact component={CarryedOrder} />}
          <Route path='/orderEnd' exact component={CarryedOrderEnd} />
          <Route path='/productCard/:id' exact component={CarryedProductCard} />
          <Footer />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
