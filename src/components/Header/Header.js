import React, { Component } from "react";
import {
  headerHiddenPanelProfileVisibility,
  headerHiddenPanelBasketVisibility,
  headerMainSearchVisibility,
  mainSubmenuVisibility
} from "../js/script";
import { mainMenuItems, droppedMenuItems, topMenuData } from "./HeaderData"
import header_logo from '../img/header-logo.png';
import { NavLink } from "react-router-dom"

class Header extends Component {
  render() {
    return (
      <header className="header">
        <TopMenu bool={this.props.status} />
        <HeaderMain cart={this.props.cart} />
        <MainMenu />
        <DroppedMenu />
      </header>
    )
  }
}

class TopMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      dataVault: topMenuData,
      isActive: true
    }
  }
  componentDidMount() {
    fetch("https://neto-api.herokuapp.com/bosa-noga/categories", {
      method: "GET"
    })
      .then(response => {
        if (200 <= response.status && response.status < 300) {
          return response;
        }
        throw new Error(response.statusText);
      })
      .then(response => response.json())
      .then(data => {
        this.setState({
          isActive: this.props.bool,
          data: data.data,
        })
      })
      .catch(error => {
        console.log(error)
      });
  }
  render() {
    return (
      <div className="top-menu">
        <div className="wrapper">
          <ul className="top-menu__items">
            {(this.state.isActive ? this.state.data : this.state.dataVault).map(item =>
              <li key={item.id} className="top-menu__item">
                <NavLink to={`catalogue/${item.id}`}>{item.title}</NavLink>
              </li>)}
          </ul>
        </div>
      </div>
    )
  }
}

class HeaderMain extends Component {
  render() {
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
          <div className="hidden-panel__basket basket-dropped">
            <div className="basket-dropped__title">
              В вашей корзине:
            </div>
            <ProductList cart={this.props.cart} />
            <NavLink className="basket-dropped__order-button" to="/order">Оформить заказ</NavLink>
          </div>
        </div>
      </div>
    )
  }
}

class MainMenu extends Component {
  render() {
    return (
      <nav className="main-menu">
        <div className="wrapper">
          <ul className="main-menu__items">
            {mainMenuItems.map(item =>
              <li key={item.id} className={`main-menu__item main-menu__item_${item.className}`} >
                {<button className="main-menu__item_button">{item.title}</button>}
              </li>)}
          </ul>
        </div>
      </nav>
    )
  }
}

class DroppedMenu extends Component {
  componentDidMount() {
    let mainMenuItems = document.querySelectorAll(".main-menu__item");
    for (let item of mainMenuItems) {
      item.onclick = mainSubmenuVisibility;
    }
  }
  render() {
    return (
      <div className="dropped-menu">
        <div className="wrapper">
          {droppedMenuItems.map(item =>
            <div key={item.columnID} className={`dropped-menu__lists dropped-menu__${item.classNamePath}`}>
              <h3 className="dropped-menu__list-title">{item.title}</h3>
              <ul className="dropped-menu__list">
                {item.data.map(item => <li key={item.id} className="dropped-menu__item">
                  <a href={item.url}>{item.title}</a>
                </li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  }
}

class ProductList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cartIDJson: localStorage.postCartIDKey ? JSON.parse(localStorage.postCartIDKey) : [],
      cartData: [],
      loadedCartItems: [],
    }
    this.loadCartData()
  }

  loadCartData = () => {
    let cartData = this.props.cart.id ? this.props.cart.id : this.state.cartIDJson.id;
    console.log("CartID", cartData)
    fetch(`https://neto-api.herokuapp.com/bosa-noga/cart/${cartData}`, {
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
        this.setState({
          cartData: data.data,
          loadedCartItems: []
        })
        data.data.products.forEach(element => {
          this.loadItemData(element)
        })
      })
      .catch(error => {
        console.log(error)
      });
  }


  componentDidUpdate(prevProps) {
    if (this.props.cart !== prevProps.cart) {
      this.loadCartData(this.props.cart);
    }
  }
  loadItemData = (cartProps) => {
    fetch(`https://neto-api.herokuapp.com/bosa-noga/products/${cartProps.id}`, {
    })
      .then(response => {
        if (200 <= response.status && response.status < 300) {
          return response;
        }
        throw new Error(response.statusText);
      })
      .then(response => response.json())
      .then(data => {
        let tempData = [...this.state.loadedCartItems]
        tempData.push({
          products: data.data,
          amount: cartProps.amount
        })
        console.log(tempData)
        this.setState({
          loadedCartItems: tempData
        })
      })
      .catch(error => {
        console.log(error)
      });
  }

  removeItem = (itemID) => {
    let cartData = this.props.cart.id ? this.props.cart.id : this.state.cartIDJson.id;
    let sizeParam = this.state.cartData.products.find((el) => itemID === el.id)
    const cartItemProps = {
      "id": itemID,
      "size": sizeParam.size,
      "amount": 0
    }
    const serialCartItemProps = JSON.stringify(cartItemProps)

    console.log(serialCartItemProps)

    fetch(`https://neto-api.herokuapp.com/bosa-noga/cart/${cartData}`, {
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
        this.setState({
          cartData: data.data,
          loadedCartItems: []
        })
        data.data.products.forEach(element => {
          this.loadItemData(element)
        })
      })
      .catch(error => {
        console.log(error)
      });
  }


  render() {
    return (
      <div className="basket-dropped__product-list product-list">
        {this.state.loadedCartItems.length > 0 && this.state.loadedCartItems.map(item =>
          <ListItem
            key={item.products.id}
            id={item.products.id}
            title={item.products.title}
            images={item.products.images}
            brand={item.products.brand}
            price={item.products.price * item.amount}
            func={this.removeItem}
          />
        )}
      </div>
    )
  }
}

class ListItem extends Component {
  handleClick = () => this.props.func(this.props.id)
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


export default Header;