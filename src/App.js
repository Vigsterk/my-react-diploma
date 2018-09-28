import React, { Component } from 'react';
import { Catalogue, Favorite, Footer, Header, Order, OrderEnd, MainPage, ProductCard } from './components';
import './App.css';
import { Router, Route } from 'react-router-dom';
import dataLoader from "./components/Fetch/Fetch";
import createHistory from 'history/createBrowserHistory';
const history = createHistory();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productCartItems: null,
      filters: null,
      categories: null,
      orderItems: null,
      cartId: null,
      orderDetails: null,
      catalogueFilterParam: null,
      catalogueParam: null
    };

    this.CarryedMainPage = this.bindProps(MainPage, {
      categories: this.state.categories
    });

    this.CarryedCatalogue = this.bindProps(Catalogue, {
      categories: this.state.categories,
      filters: this.state.filters,
      filterParam: this.state.catalogueFilterParam,
      catalogueParam: this.state.catalogueParam
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
  };

  componentDidMount() {
    let filters = dataLoader('filters');
    let categories = dataLoader('categories');
    Promise.all([filters, categories]).then(([filters, categories]) => {
      this.CarryedMainPage = this.bindProps(MainPage, {
        categories: categories
      });

      this.CarryedCatalogue = this.bindProps(Catalogue, {
        categories: this.state.categories,
        filters: filters,
        filterParam: this.state.catalogueFilterParam,
        catalogueParam: this.state.catalogueParam
      });

      this.setState({
        categories: categories,
        filters: filters
      });
    },
      reason => {
        console.log(reason)
      });
  };

  orderLoader = (data) => {
    this.CarryedOrder = this.bindProps(Order, {
      cartItems: data,
      cartId: this.state.cartId,
      cartUploader: this.cartItemUploader,
      orderDone: this.orderDoneLoader
    });
    this.setState({
      orderItems: data
    });
  };

  orderDoneLoader = (param) => {
    this.CarryedOrderEnd = this.bindProps(OrderEnd, {
      orderDetails: param
    });
    this.setState({
      orderDetails: param
    });
  };

  cartItemUploader = (data) => {
    this.setState({
      productCartItems: data,
      cartId: data.id
    });
  };

  mainMenuFilterLoader = ({ activeCategory, type, name }) => (event) => {
    const selectedCategories = `categoryId=${activeCategory.id}&${type}=${name}`;
    const selectedCategoriesProps = { [type]: name };
    this.CarryedCatalogue = this.bindProps(Catalogue, {
      categories: this.state.categories,
      filters: this.state.filters,
      filterParam: selectedCategories,
      catalogueParam: { activeCategory, selectedCategoriesProps }
    });
    this.setState({
      catalogueFilterParam: selectedCategories,
      catalogueParam: { activeCategory, selectedCategoriesProps }
    });
  };

  searchParamLoader = (searchValue) => {
    const searchParam = `search=${searchValue}`;
    this.CarryedCatalogue = this.bindProps(Catalogue, {
      categories: this.state.categories,
      filters: this.state.filters,
      filterParam: searchParam,
      catalogueParam: this.state.catalogueParam
    });
    this.setState({
      filterParam: searchParam
    });
  };

  bindProps = (Component, bindingProps) => (selfProps) => <Component {...bindingProps}{...selfProps} />;

  render() {
    const { CarryedMainPage, CarryedCatalogue, CarryedFavorite, CarryedOrder, CarryedOrderEnd, CarryedProductCard } = this;
    return (
      <Router basename={process.env.PUBLIC_URL} history={history}>
        {(this.state.categories && this.state.filters) && <div className='container'>
          <Header history={history} cart={this.state.productCartItems}
            categories={this.state.categories} filters={this.state.filters} func={this.orderLoader}
            filterLoader={this.mainMenuFilterLoader} search={this.searchParamLoader} />
          <Route path='/' exact component={CarryedMainPage} />
          <Route path='/catalogue/' exact component={CarryedCatalogue} />
          <Route path='/favorite' exact component={CarryedFavorite} />
          <Route path='/order' exact component={CarryedOrder} />
          <Route path='/orderEnd' exact component={CarryedOrderEnd} />
          <Route path='/productCard/:id' exact component={CarryedProductCard} />
          <Footer />
        </div>}
      </Router>
    );
  };
};

export default App;
