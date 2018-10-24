import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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
      getTotalPrice: PropTypes.func.isRequired,
      deleteFunc: PropTypes.func.isRequired,
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
    this.props.getTotalPrice(tempCount, this.props.idx);
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
    this.props.getTotalPrice(tempCount, this.props.idx);
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

export default BasketItem;