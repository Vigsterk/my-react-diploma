import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

export default OrderConfimed;