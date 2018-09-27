import React, { Component } from "react";
import { mainSubmenuVisibility } from "../js/script";
import topMenuData from "./HeaderData";
import HeaderMain from './HeaderMain'
import { Link } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCategory: null
    };
  };

  getActiveCategory = (id, title) => {
    this.setState({
      activeCategory: {
        id: id,
        title: title
      }
    });
  };

  render() {
    const { cart, func, search, categories, filters, filterLoader, history } = this.props;
    return (
      <header className="header">
        <TopMenu />
        <HeaderMain cart={cart} func={func} search={search} history={history} />
        <MainMenu categories={categories} getActiveCategory={this.getActiveCategory} />
        <DroppedMenu filters={filters} filterLoader={filterLoader} activeCategory={this.state.activeCategory} />
      </header>
    );
  };
};

class TopMenu extends Component {
  render() {
    return (
      <div className="top-menu">
        <div className="wrapper">
          <ul className="top-menu__items">
            {topMenuData.map(item =>
              <li key={item.id} className="top-menu__item">
                <Link to="/">{item.title}</Link>
              </li>)}
          </ul>
        </div>
      </div>
    );
  };
};

class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.categories ? this.props.categories : [],
    };
  };

  componentDidUpdate(prevProps) {
    if (this.props.categories !== prevProps.categories) {
      this.setState({
        data: this.props.categories,
      });
    };
  };

  setActiveCategory = (id, title) => {
    this.props.getActiveCategory(id, title);
  };

  render() {
    return (
      <nav className="main-menu">
        <div className="wrapper">
          <ul className="main-menu__items">
            {this.state.data.map(item =>
              <CategoriesList key={item.id} id={item.id} title={item.title} func={this.setActiveCategory} />
            )}
          </ul>
        </div>
      </nav>
    );
  };
};

class CategoriesList extends Component {
  handleClick = () => this.props.func(this.props.id, this.props.title);
  render() {
    return (
      <li className="main-menu__item" onClick={mainSubmenuVisibility}>
        {<button className="main-menu__item_button" onClick={this.handleClick}>{this.props.title}</button>}
      </li>
    );
  };
};

class DroppedMenu extends Component {
  getMenuItems = (type) => {
    const { filters, activeCategory } = this.props;
    if (!filters || !filters[type]) {
      return null;
    } else {
      return filters[type].map(name => (
        <li key={name} className="dropped-menu__item">
          <Link to={`/catalogue/`} onClick={this.props.filterLoader({ activeCategory, type, name })}>{name}</Link>
        </li>
      ));
    };
  };

  render() {
    return (
      <div className="dropped-menu">
        <div className="wrapper">
          <div className="dropped-menu__lists dropped-menu__lists_women">
            <h3 className="dropped-menu__list-title">Повод:</h3>
            <ul className="dropped-menu__list">
              {this.getMenuItems('reason')}
            </ul>
          </div>
          <div className="dropped-menu__lists">
            <h3 className="dropped-menu__list-title">Категории:</h3>
            <ul className="dropped-menu__list">
              {this.getMenuItems('type')}
            </ul>
          </div>
          <div className="dropped-menu__lists">
            <h3 className="dropped-menu__list-title">Сезон:</h3>
            <ul className="dropped-menu__list">
              {this.getMenuItems('season')}
            </ul>
          </div>
          <div className="dropped-menu__lists dropped-menu__lists_three-coloumns">
            <h3 className="dropped-menu__list-title">Бренды:</h3>
            <ul className="dropped-menu__list">
              {this.getMenuItems('brand')}
            </ul>
          </div>
        </div>
      </div>
    );
  };
};

export default Header;