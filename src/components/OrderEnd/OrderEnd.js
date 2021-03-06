import React, { Component } from 'react';
import { Link } from "react-router-dom";
import SitePath from '../SitePath/SitePath';
import PropTypes from 'prop-types';

const paymentTypes = {
  onlineCard: 'Картой онлайн',
  offlineCard: 'Картой курьеру',
  offlineCash: 'Наличными курьеру'
};

class OrderEnd extends Component {
  static get propTypes() {
    return {
      orderDetails: PropTypes.object
    };
  };

  getPaymentType = () => {
    const { paymentType } = this.props.orderDetails;
    return paymentTypes[paymentType];
  };

  render() {
    const { orderDetails } = this.props;
    return (
      <div className="wrapper order-wrapper">
        <SitePath mainUrlparam={{ to: '/orderEnd', title: 'Заказ принят' }} />
        <section className="order-done">
          <h2 className="order-done__title order-process__title">Заказ принят, спасибо!</h2>
          <div className="order-done__information order-info">
            <div className="order-info__item order-info__item_summ">
              <h3>Сумма заказа:</h3>
              <p>{orderDetails.totalPrice}<i className="fa fa-rub" aria-hidden="true"></i></p>
            </div>
            <div className="order-info__item order-info__item_pay-form">
              <h3>Способ оплаты:</h3>
              <p>{this.getPaymentType()}</p>
            </div>
            <div className="order-info__item order-info__item_customer-name">
              <h3>Имя клиента:</h3>
              <p>{orderDetails.name}</p>
            </div>
            <div className="order-info__item order-info__item_adress">
              <h3>Адрес доставки:</h3>
              <p>{orderDetails.address}</p>
            </div>
            <div className="order-info__item order-info__item_phone">
              <h3>Телефон:</h3>
              <p>{orderDetails.phone}</p>
            </div>
          </div>
          <p className="order-done__notice">Данные о заказе отправлены на адрес <span>notbosaanymore@gmail.com. </span></p>
          <Link to='/catalogue/' className="order-done__continue">продолжить покупки</Link>
        </section>
      </div>
    );
  };
};

export default OrderEnd;