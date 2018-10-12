import React, { Component } from 'react';
import './style-order.css';
import { Link } from 'react-router-dom';
import SitePath from '../SitePath/SitePath';
import PropTypes from 'prop-types';

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
                  func={this.getTotalPrice}
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

class BasketItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: this.props.amount,
      price: this.props.products.price * this.props.amount
    };
    //console.log(this.props)
  };

  static get propTypes() {
    return {
      idx: PropTypes.number,
      products: PropTypes.object,
      amount: PropTypes.number,
      size: PropTypes.number,
      func: PropTypes.func,
      deleteFunc: PropTypes.func,
    };
  };

  incrementCount = () => {
    const { amount, price } = this.state;
    let tempCount = amount;
    tempCount += 1;
    let tempPrice = price + this.props.products.price;
    this.setState({
      amount: tempCount,
      price: tempPrice
    });
    this.props.func(tempCount, this.props.idx);
  };

  decrementCount = () => {
    const { amount, price } = this.state;
    let tempCount = amount;
    let tempPrice = price;
    if (tempCount > 0) {
      tempCount -= 1;
    }
    if (tempCount === 0) {
      this.props.deleteFunc(this.props.idx);
    };
    if (tempPrice > this.props.products.price) {
      tempPrice -= this.props.products.price;
    };
    this.setState({
      amount: tempCount,
      price: tempPrice
    });
    this.props.func(tempCount, this.props.idx);
  };

  render() {
    const { products, size } = this.props;
    const { amount, price } = this.state;
    return (
      <div className="basket-item">
        <div className="basket-item__pic"><img src={products.images[0]} alt={products.title} /></div>
        <div className="basket-item__product">
          <div className="basket-item__product-name"><Link to={`productCard/${products.id}`}>{products.title}</Link></div>
          <div className="basket-item__product-features">
            <div className="basket-item__size">Размер: <span>{size}</span></div>
            <div className="basket-item__producer">Производитель: <span>{products.brand}</span></div>
            <div className="basket-item__color">Цвет: <span>{products.color}</span></div>
          </div>
        </div>
        <div className="basket-item__quantity">
          <div className="basket-item__quantity-change basket-item-list__quantity-change_minus" onClick={this.decrementCount}>-</div>
          {amount}
          <div className="basket-item__quantity-change basket-item-list__quantity-change_plus" onClick={this.incrementCount}>+</div>
        </div>
        <div className="basket-item__price">{price}<i className="fa fa-rub" aria-hidden="true"></i></div>
      </div>
    );
  };
};

class OrderConfimed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderDetails: {
        name: '',
        phone: '',
        address: '',
        paymentType: 'onlineCard',
      }
    };
  };

  static get propTypes() {
    return {
      price: PropTypes.number,

    };
  };

  setClientData = (event) => {
    const { value, name } = event.currentTarget;
    const { orderDetails } = this.state;
    orderDetails[name] = value;
    this.setState({ orderDetails });
  };

  sendOrderData = (event) => {
    event.preventDefault();
    const { orderDetails } = this.state;
    const { cartId, price } = this.props;
    if (!orderDetails.name || !orderDetails.phone || !orderDetails.address || !cartId) {
      return null;
    };

    const orderParam = {
      name: orderDetails.name,
      phone: orderDetails.phone,
      address: orderDetails.address,
      paymentType: orderDetails.paymentType,
      cart: cartId
    };

    fetch('https://api-neto.herokuapp.com/bosa-noga/order', {
      body: JSON.stringify(orderParam),
      credentials: 'same-origin',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        if (200 <= response.status && response.status < 300) {
          return response;
        };
        throw new Error(response.statusText);
      })
      .then(response => response.json())
      .then(response => {
        if (response.status === 'ok') {
          localStorage.removeItem("postCartIDKey")
          this.props.orderDone({
            name: orderDetails.name,
            phone: orderDetails.phone,
            address: orderDetails.address,
            paymentType: orderDetails.paymentType,
            totalPrice: price
          });
          this.props.cartUploader(null)
          this.props.history.push('/orderEnd');
        };
      });
  };

  render() {
    const { orderDetails } = this.state;
    return (
      <div className="order-process__confirmed">
        <form onSubmit={this.sendOrderData} action="#">
          <div className="order-process__delivery">
            <h3 className="h3">кому и куда доставить?</h3>
            <div className="order-process__delivery-form">
              <label className="order-process__delivery-label">
                <div className="order-process__delivery-text">Имя</div>
                <input
                  value={orderDetails.name}
                  onChange={this.setClientData}
                  className="order-process__delivery-input"
                  type="text"
                  name="name"
                  placeholder="Представьтесь, пожалуйста"
                />
              </label>
              <label className="order-process__delivery-label">
                <div className="order-process__delivery-text">Телефон</div>
                <input
                  value={orderDetails.phone}
                  onChange={this.setClientData}
                  className="order-process__delivery-input"
                  type="tel"
                  name="phone"
                  placeholder="Номер в любом формате"
                />
              </label>
              <label className="order-process__delivery-label">
                <div className="order-process__delivery-text">Адрес</div>
                <input
                  value={orderDetails.address}
                  onChange={this.setClientData}
                  className="order-process__delivery-input order-process__delivery-input_adress"
                  type="text"
                  name="address"
                  placeholder="Ваша покупка будет доставлена по этому адресу" />
              </label>
            </div>
            <p>Все поля обязательны для заполнения. Наш оператор свяжется с вами для уточнения деталей заказа.</p>
          </div>
          <div className="order-process__paid">
            <h3 className="h3">хотите оплатить онлайн или курьеру при получении?</h3>
            <div className="order-process__paid-form">
              <label className="order-process__paid-label">
                <input
                  checked={orderDetails.paymentType === 'onlineCard'}
                  onChange={this.setClientData}
                  className="order-process__paid-radio"
                  type="radio"
                  name="paymentType"
                  value="onlineCard"
                />
                <span className="order-process__paid-text">Картой онлайн</span>
              </label>
              <label className="order-process__paid-label">
                <input
                  checked={orderDetails.paymentType === 'offlineCard'}
                  onChange={this.setClientData}
                  className="order-process__paid-radio"
                  type="radio"
                  name="paymentType"
                  value="offlineCard"
                />
                <span className="order-process__paid-text">Картой курьеру</span>
              </label>
              <label className="order-process__paid-label">
                <input
                  checked={orderDetails.paymentType === 'offlineCash'}
                  onChange={this.setClientData}
                  className="order-process__paid-radio"
                  type="radio"
                  name="paymentType"
                  value="offlineCash"
                />
                <span className="order-process__paid-text">Наличными курьеру</span>
              </label>
            </div>
          </div>
          <button type="submit"
            className={!orderDetails.name || !orderDetails.phone || !orderDetails.address ? "order-process__form-submit_disabled order-process__form-submit_click" :
              'order-process__form-submit order-process__form-submit_click'}>Подтвердить заказ</button>
        </form>
      </div>
    );
  };
};

export default Order;