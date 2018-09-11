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
      orderItems: null,
      cartId: null,
      orderDetails: null,
      catalogueFilterParam: null
    }

    this.CarryedMainPage = this.bindProps(MainPage, {
      categories: this.state.categories
    });

    this.CarryedHeader = this.bindProps(Header, {
      cart: this.state.productCartItems,
      categories: this.state.categories,
      filters: this.state.filters,
      func: this.orderLoader,
      filterLoader: this.mainMenuFilterLoader
    });

    this.CarryedCatalogue = this.bindProps(Catalogue, {
      categories: this.state.categories,
      filters: this.state.filters,
      filterParam: this.state.catalogueFilterParam
    });

    this.CarryedFavorite = this.bindProps(Favorite, {});

    this.CarryedOrderEnd = this.bindProps(OrderEnd, {
      orderDetails: this.state.orderDetails
    });

    this.CarryedOrder = this.bindProps(Order, {
      cartItems: this.state.orderItems,
      cartId: this.state.cartId,
      cartUploader: this.cartItemUploader,
      orderDone: this.orderDoneLoader
    });

    this.CarryedProductCard = this.bindProps(ProductCard, {
      func: this.reloadCategories,
      cartUploader: this.cartItemUploader,
    });
  }

  componentDidMount() {
    let filters = dataLoader('filters')
    let categories = dataLoader('categories')
    Promise.all([filters, categories]).then(([filters, categories]) => {
      this.CarryedMainPage = this.bindProps(MainPage, {
        categories: categories
      });

      this.CarryedHeader = this.bindProps(Header, {
        cart: this.state.productCartItems,
        categories: categories,
        filters: this.state.filters,
        func: this.orderLoader,
        filterLoader: this.mainMenuFilterLoader
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
      cartItems: data,
      cartId: this.state.cartId,
      cartUploader: this.cartItemUploader,
      orderDone: this.orderDoneLoader
    });
    this.setState({
      orderItems: data
    })
  }

  orderDoneLoader = (param) => {
    console.log(param)
    this.CarryedOrderEnd = this.bindProps(OrderEnd, {
      orderDetails: param
    });
    this.setState({
      orderDetails: param
    })
  }

  cartItemUploader = (data) => {
    this.setState({
      productCartItems: data,
      cartId: data.id
    })
  }

  mainMenuFilterLoader = ({ activeCategory, type, item }) => (event) => {

    const selectedFilterSearch = `categoryId=${activeCategory}&${type}=${item}`;

    this.CarryedCatalogue = this.bindProps(Catalogue, {
      categories: this.state.categories,
      filters: this.state.filters,
      filterParam: selectedFilterSearch
    });
    this.setState({
      catalogueFilterParam: selectedFilterSearch
    })

  }

  bindProps = (Component, bindingProps) => (selfProps) => <Component {...bindingProps}{...selfProps} />;

  render() {
    const { CarryedMainPage, CarryedCatalogue, CarryedFavorite, CarryedOrder, CarryedOrderEnd, CarryedProductCard, CarryedHeader } = this;
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className='container'>
          {this.state.categories && <CarryedHeader cart={this.state.productCartItems} categories={this.state.categories} filters={this.state.filters} func={this.orderLoader} />}
          {this.state.categories && <Route path='/' exact component={CarryedMainPage} />}
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
