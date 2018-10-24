import React, { Component } from "react";
import HeaderMain from './HeaderMain'
import PropTypes from 'prop-types';
import TopMenu from './TopMenu';
import MainMenu from './MainMenu';
import DroppedMenu from './DroppedMenu';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCategory: null
    };
  };

  static get propTypes() {
    return {
      cart: PropTypes.object,
      categories: PropTypes.array,
      filterLoader: PropTypes.func,
      filters: PropTypes.object.isRequired,
      orderLoader: PropTypes.func,
      history: PropTypes.object,
    };
  };

  // Функция передатчик - передаёт активную категорию для переходов в каталог в Dropped Menu
  getActiveCategory = (id, title) => {
    this.setState({
      activeCategory: {
        id: id,
        title: title
      }
    });
  };

  render() {
    const { cart, orderLoader, search, categories, filters, filterLoader, history } = this.props;
    return (
      <header className="header">
        <TopMenu />
        <HeaderMain cart={cart} orderLoader={orderLoader} search={search} history={history} />
        <MainMenu categories={categories} getActiveCategory={this.getActiveCategory} />
        <DroppedMenu filters={filters} filterLoader={filterLoader} activeCategory={this.state.activeCategory} />
      </header>
    );
  };
};

export default Header;