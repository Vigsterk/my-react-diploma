import React, { Component } from "react";
import {
  headerHiddenPanelProfileVisibility,
  headerHiddenPanelBasketVisibility,
  headerMainSearchVisibility,
  mainSubmenuVisibility
} from "../js/script";
import topMenuData from "./HeaderData"
import header_logo from '../img/header-logo.png';
import { NavLink } from "react-router-dom"

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeCategory: null
    }
  }
  getActiveCategory = (id, title) => {
    this.setState({
      activeCategory: {
        id: id,
        title: title
      }
    })
  }
  render() {
    return (
      <header className="header">
        <TopMenu />
        <HeaderMain cart={this.props.cart} func={this.props.func} />
        <MainMenu categories={this.props.categories} getActiveCategory={this.getActiveCategory} />
        <DroppedMenu filters={this.props.filters} filterLoader={this.props.filterLoader} activeCategory={this.state.activeCategory} />
      </header>
    )
  }
}

class TopMenu extends Component {
  render() {
    return (
      <div className="top-menu">
        <div className="wrapper">
          <ul className="top-menu__items">
            {topMenuData.map(item =>
              <li key={item.id} className="top-menu__item">
                <NavLink to="/">{item.title}</NavLink>
              </li>)}
          </ul>
        </div>
      </div>
    )
  }
}

class HeaderMain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cartIDJson: localStorage.postCartIDKey && JSON.parse(localStorage.postCartIDKey),
      loadedCartItems: [],
    }
    localStorage.postCartIDKey && this.loadCartData()
  }

  loadCartData = () => {
    let cartData = this.props.cart ? this.props.cart.id : this.state.cartIDJson.id;
    fetch(`https://api-neto.herokuapp.com/bosa-noga/cart/${cartData}`, {
      headers: {
        "Content-type": "application/json"
      },
    })
      .then(response => {
        if (200 <= response.status && response.status < 300) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(data => {
        const promises = data.data.products.map(element =>
          fetch(`https://api-neto.herokuapp.com/bosa-noga/products/${element.id}`, {
            method: "GET"
          })
        )
        Promise.all(promises)
          .then(responseArray => {
            const resJsonPromises = responseArray.map(res => res.json());
            return Promise.all(resJsonPromises)
          })
          .then(dataArr => {
            let cartItemArr = []
            data.data.products.map((item, index) =>
              cartItemArr.push({
                products: dataArr[index].data,
                amount: item.amount,
                size: item.size
              })
            )
            this.setState({
              loadedCartItems: cartItemArr
            })
          })
          .catch(error => console.log(`Ошибка: ${error.message}`));
      })
  }

  componentDidUpdate(prevProps) {
    if (this.props.cart !== prevProps.cart) {
      this.loadCartData(this.props.cart);
    }
  }

  removeItem = (itemID, itemSize) => {
    let cartData = this.props.cart ? this.props.cart.id : this.state.cartIDJson.id;
    const cartItemProps = {
      id: itemID,
      size: itemSize,
      amount: 0
    }
    const serialCartItemProps = JSON.stringify(cartItemProps)
    fetch(`https://api-neto.herokuapp.com/bosa-noga/cart/${cartData}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: serialCartItemProps
    })
      .then(response => {
        if (200 <= response.status && response.status < 300) {
          return response;
        }
        throw new Error(response.statusText);
      })
      .then(response => response.json())
      .then(data => {
        const serialTempData = JSON.stringify(data.data);
        localStorage.setItem("postCartIDKey", serialTempData);
        if (this.props.cart !== cartData) {
          this.loadCartData(this.props.cart);
        }
      })
      .catch(error => {
        localStorage.removeItem("postCartIDKey")
        this.setState({
          loadedCartItems: []
        })
      });
  }

  sendCartItemsToOrder = () => {
    this.props.func(this.state.loadedCartItems)
  }

  render() {
    const { loadedCartItems } = this.state
    return (
      <div className="header-main">
        <div className="header-main__wrapper wrapper">
          <div className="header-main__phone">
            <a href="tel:+7-495-790-35-03">+7 495 79 03 5 03</a>
            <p>Ежедневно: с 09-00 до 21-00</p>
          </div>
          <div className="header-main__logo">
            <NavLink to="/">
              <h1>
                <img src={header_logo} alt="logotype" />
              </h1>
            </NavLink>
            <p>Обувь и аксессуары для всей семьи</p>
          </div>
          <div className="header-main__profile">
            <div className="header-main__pics">
              <div className="header-main__pic header-main__pic_search" onClick={headerMainSearchVisibility}>
              </div>
              <div className="header-main__pic_border"></div>
              <div className="header-main__pic header-main__pic_profile" onClick={headerHiddenPanelProfileVisibility}>
                <div className="header-main__pic_profile_menu"></div>
              </div>
              <div className="header-main__pic_border"></div>
              <div className="header-main__pic header-main__pic_basket" onClick={headerHiddenPanelBasketVisibility}>
                <div className="header-main__pic_basket_full"></div>
                <div className="header-main__pic_basket_menu"></div>
              </div>
            </div>
            <form className="header-main__search" action="#">
              <input placeholder="Поиск" />
              <i className="fa fa-search" aria-hidden="true"></i>
            </form>
          </div>
        </div>
        <div className="header-main__hidden-panel hidden-panel">
          <div className="hidden-panel__profile">
            <NavLink to="/">Личный кабинет</NavLink>
            <NavLink to="/favorite">
              <i className="fa fa-heart-o" aria-hidden="true"></i>Избранное</NavLink>
            <NavLink to="/">Выйти</NavLink>
          </div>
          {localStorage.postCartIDKey ?
            <div className="hidden-panel__basket basket-dropped">
              <div className="basket-dropped__title">
                В вашей корзине:
                  </div>
              <ProductList loadedCartItems={loadedCartItems} removeFunc={this.removeItem} />
              <NavLink className="basket-dropped__order-button" to="/order" onClick={this.sendCartItemsToOrder}>Оформить заказ</NavLink>
            </div> : <div className="hidden-panel__basket basket-dropped">
              <div className="basket-dropped__title">В корзине пока ничего нет. Не знаете, с чего начать? Посмотрите наши новинки!</div>
            </div>}
        </div>
      </div>
    )
  }
}

class ProductList extends Component {
  render() {
    const { loadedCartItems } = this.props
    return (
      <div className="basket-dropped__product-list product-list">
        {loadedCartItems.length > 0 && loadedCartItems.map(item =>
          <ListItem
            key={`${item.products.id}-${item.size}`}
            id={item.products.id}
            size={item.size}
            title={item.products.title}
            images={item.products.images}
            brand={item.products.brand}
            price={item.products.price * item.amount}
            func={this.props.removeFunc}
          />
        )}
      </div>
    )
  }
}

class ListItem extends Component {
  handleClick = () => this.props.func(this.props.id, this.props.size)
  render() {
    return (
      <div className="product-list__item">
        <NavLink to={`productCard/${this.props.id}`} className="product-list__pic_wrap">
          <img className="product-list__pic" src={this.props.images[0]} alt={this.props.title} />
          <p className="product-list__product">{this.props.title}, {this.props.brand}</p>
        </NavLink>
        <div className="product-list__fill"></div>
        <div className="product-list__price">
          {this.props.price}
          <i className="fa fa-rub" aria-hidden="true"></i>
        </div>
        <div className="product-list__delete" onClick={this.handleClick}>
          <i className="fa fa-times" aria-hidden="true"></i>
        </div>
      </div>
    );
  }
}

class MainMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.categories ? this.props.categories : [],
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.categories !== prevProps.categories) {
      this.setState({
        data: this.props.categories,
      });
    }
  }

  setActiveCategory = (id, title) => {
    this.props.getActiveCategory(id, title)
  }

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
    )
  }
}

class CategoriesList extends Component {
  handleClick = () => this.props.func(this.props.id, this.props.title)
  render() {
    return (
      <li className="main-menu__item" onClick={mainSubmenuVisibility}>
        {<button className="main-menu__item_button" onClick={this.handleClick}>{this.props.title}</button>}
      </li>
    )
  }
}

class DroppedMenu extends Component {

  getMenuItems = (type) => {
    const { filters, activeCategory } = this.props
    if (!filters || !filters[type]) {
      return null;
    } else {
      return filters[type].map(name => (
        <li key={name} className="dropped-menu__item">
          <NavLink to={`/catalogue/`} onClick={this.props.filterLoader({ activeCategory, type, name })}>{name}</NavLink>
        </li>
      ));
    }
  }

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
    )
  }
}

export default Header;