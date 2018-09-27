import React, { Component } from "react";
import {
  headerHiddenPanelProfileVisibility,
  headerHiddenPanelBasketVisibility,
  headerMainSearchVisibility,
} from "../js/script";
import header_logo from '../img/header-logo.png';
import { Link } from "react-router-dom";
import ProductList from './HeaderMainProductList'

class HeaderMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartIDJson: localStorage.postCartIDKey && JSON.parse(localStorage.postCartIDKey),
      loadedCartItems: [],
      searchValue: ''
    };
    localStorage.postCartIDKey && this.loadCartData();
  };

  componentDidUpdate(prevProps) {
    if (this.props.cart !== prevProps.cart) {
      this.loadCartData(this.props.cart);
    };
  };

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
        );
        Promise.all(promises)
          .then(responseArray => {
            const resJsonPromises = responseArray.map(res => res.json());
            return Promise.all(resJsonPromises);
          })
          .then(dataArr => {
            let cartItemArr = [];
            data.data.products.map((item, index) =>
              cartItemArr.push({
                products: dataArr[index].data,
                amount: item.amount,
                size: item.size
              })
            );
            this.setState({
              loadedCartItems: cartItemArr
            });
          })
          .catch(error => console.log(`Ошибка: ${error.message}`));
      });
  };

  removeItem = (itemID, itemSize) => {
    let cartData = this.props.cart ? this.props.cart.id : this.state.cartIDJson.id;
    const cartItemProps = {
      id: itemID,
      size: itemSize,
      amount: 0
    };
    const serialCartItemProps = JSON.stringify(cartItemProps);
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
        };
      })
      .catch(error => {
        localStorage.removeItem("postCartIDKey")
        this.setState({
          loadedCartItems: []
        });
      });
  };

  sendCartItemsToOrder = () => {
    this.props.func(this.state.loadedCartItems);
  };

  changeSearchValue = (event) => {
    this.setState({ searchValue: event.currentTarget.value });
  };

  searchSubmit = (event) => {
    event.preventDefault();
    this.props.search(this.state.searchValue);
    this.props.history.push('/catalogue/');
    this.setState({ searchValue: '' });
  };

  render() {
    const { loadedCartItems } = this.state;
    return (
      <div className="header-main">
        <div className="header-main__wrapper wrapper">
          <div className="header-main__phone">
            <a href="tel:+7-495-790-35-03">+7 495 79 03 5 03</a>
            <p>Ежедневно: с 09-00 до 21-00</p>
          </div>
          <div className="header-main__logo">
            <Link to="/">
              <h1>
                <img src={header_logo} alt="logotype" />
              </h1>
            </Link>
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
            <form onSubmit={this.searchSubmit} className="header-main__search" action="#">
              <input onChange={this.changeSearchValue} value={this.state.searchValue} placeholder="Поиск" />
              <i className="fa fa-search" aria-hidden="true"></i>
            </form>
          </div>
        </div>
        <div className="header-main__hidden-panel hidden-panel">
          <div className="hidden-panel__profile">
            <Link to="/">Личный кабинет</Link>
            <Link to="/favorite">
              <i className="fa fa-heart-o" aria-hidden="true"></i>Избранное</Link>
            <Link to="/">Выйти</Link>
          </div>
          {loadedCartItems.length > 0 ?
            <div className="hidden-panel__basket basket-dropped">
              <div className="basket-dropped__title">
                В вашей корзине:
                  </div>
              <ProductList loadedCartItems={loadedCartItems} removeFunc={this.removeItem} />
              <Link className="basket-dropped__order-button" to="/order" onClick={this.sendCartItemsToOrder}>Оформить заказ</Link>
            </div> : <div className="hidden-panel__basket basket-dropped">
              <div className="basket-dropped__title">В корзине пока ничего нет. Не знаете, с чего начать? Посмотрите наши новинки!</div>
            </div>}
        </div>
      </div>
    )
  }
}

export default HeaderMain;