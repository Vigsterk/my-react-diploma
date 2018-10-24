import React, { Component } from 'react';
import './style-order.css';
import SitePath from '../SitePath/SitePath';
import PropTypes from 'prop-types';
import BasketItem from './BasketItem';
import OrderConfimed from './OrderConfimed';

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: null,
      cartItems: this.props.cartItems,
      cartId: this.props.cartId ? this.props.cartId : localStorage.postCartIDKey ? JSON.parse(localStorage.postCartIDKey).id : ''
    };
    //console.log('Order Props', this.props)
  };

  static get propTypes() {
    return {
      cartId: PropTypes.string,
      cartItems: PropTypes.array,
      cartUploader: PropTypes.func.isRequired,
      orderDone: PropTypes.func.isRequired,
    };
  };

  componentDidMount() {
    localStorage.postCartIDKey && this.props.cartItems && this.getTotalPrice();
  };

  getTotalPrice = (num, idx) => {
    const tempCartItem = [...this.state.cartItems];
    if (num) {
      tempCartItem[idx].amount = num;
      this.reloadCart(idx, num);
    };
    let totalPrice = "";
    const priceArr = [];
    tempCartItem.forEach((item) => {
      priceArr.push(item.products.price * item.amount);
      totalPrice = priceArr.reduce((a, b) => {
        return a + b;
      });
    });
    this.setState({
      totalPrice: totalPrice
    });
  };

  deleteItem = (idx) => {
    const tempCartItem = [...this.state.cartItems];
    tempCartItem.splice(idx, 1);
    this.reloadCart(idx, 0);
    this.setState({
      cartItems: tempCartItem
    });
  };

  reloadCart = (idx, num) => {
    const { cartItems } = this.state;
    const cartItemProps = {
      id: cartItems[idx].products.id,
      size: cartItems[idx].size,
      amount: cartItems[idx].amount = num
    };
    const serialCartItemProps = JSON.stringify(cartItemProps);
    const cartIDJson = JSON.parse(localStorage.postCartIDKey);
    fetch(`https://api-neto.herokuapp.com/bosa-noga/cart/${cartIDJson.id}`, {
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
        this.props.cartUploader(data.data);
      })
      .catch(error => {
        localStorage.removeItem("postCartIDKey")
        this.props.cartUploader(null)
      });
  };

  render() {
    const { cartItems } = this.state;
    return (
      <div className="wrapper order-wrapper">
        <SitePath mainUrlparam={{ to: '/order', title: 'Оформление заказа' }} />
        <section className="order-process">
          <h2 className="order-process__title">Оформление заказа</h2>
          <div className="order-process__basket order-basket">
            <div className="order-basket__title">в вашей корзине: {cartItems && cartItems.length}</div>
            <div className="order-basket__item-list">
              {cartItems && cartItems.map((item, index) =>
                <BasketItem
                  key={index}
                  idx={index}
                  products={item.products}
                  amount={item.amount}
                  size={item.size}
                  getTotalPrice={this.getTotalPrice}
                  deleteFunc={this.deleteItem}
                />
              )}
            </div>
            <div className="order-basket__summ">Итого:<span>{this.state.totalPrice}<i className="fa fa-rub" aria-hidden="true"></i></span></div>
          </div>
          <OrderConfimed price={this.state.totalPrice} cartId={this.state.cartId} orderDone={this.props.orderDone} history={this.props.history} cartUploader={this.props.cartUploader} />
        </section>
      </div>
    );
  };
};

export default Order;