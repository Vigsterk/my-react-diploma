import React, { Component } from 'react';
import './style-order.css';
import { NavLink } from 'react-router-dom'
import SitePath from '../SitePath/SitePath';
import OrderEnd from '../OrderEnd/OrderEnd';

class Order extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sitepath: [
        {
          to: "/",
          title: "Главная"
        },
        {
          to: "/",
          title: "Корзина"
        },
        {
          to: "/order",
          title: "Оформление заказа"
        }],
      orderDetails: {
        name: '',
        phone: '',
        adress: ''
      },
      totalPrice: null,
      cartItems: this.props.cartItems
    }
  }

  componentDidMount() {
    this.props.cartItems && this.getTotalPrice()
  }

  getTotalPrice = (num, idx) => {
    let tempCartItem = [...this.state.cartItems]
    if (num) {
      tempCartItem[idx].amount = num
    }
    let totalPrice = ""
    let priceArr = []
    tempCartItem.forEach((item) => {
      priceArr.push(item.products.price * item.amount)
      totalPrice = priceArr.reduce((a, b) => {
        return a + b
      })
    })
    this.setState({
      totalPrice: totalPrice
    })
  }

  deleteItem = (idx) => {
    console.log(idx)
    let tempCartItem = [...this.state.cartItems]
    console.log(tempCartItem)
    tempCartItem.splice(idx, 1)
    console.log(tempCartItem)
    this.setState({
      cartItems: tempCartItem
    })
  }

  handleChange = (value) => {
    this.setState({ name: value });
  };

  render() {
    const { cartItems } = this.state
    return (
      <div className="wrapper order-wrapper">
        <SitePath pathprops={this.state.sitepath} />
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
          <div className="order-process__confirmed">
            <form action="#">
              <div className="order-process__delivery">
                <h3 className="h3">кому и куда доставить?</h3>
                <div className="order-process__delivery-form">
                  <label className="order-process__delivery-label">
                    <div className="order-process__delivery-text">Имя</div>
                    <input className="order-process__delivery-input" type="text" name="delivery" placeholder="Представьтесь, пожалуйста" onChange={(ev) => this.handleChange(ev.target.value)} />
                  </label>
                  <label className="order-process__delivery-label">
                    <div className="order-process__delivery-text">Телефон</div>
                    <input className="order-process__delivery-input" type="tel" name="delivery" placeholder="Номер в любом формате" />
                  </label>
                  <label className="order-process__delivery-label">
                    <div className="order-process__delivery-text">Адрес</div>
                    <input className="order-process__delivery-input order-process__delivery-input_adress" type="text" name="delivery" placeholder="Ваша покупка будет доставлена по этому адресу" />
                  </label>
                </div>
                <p>Все поля обязательны для заполнения. Наш оператор свяжется с вами для уточнения деталей заказа.</p>
              </div>
              <div className="order-process__paid">
                <h3 className="h3">хотите оплатить онлайн или курьеру при получении?</h3>
                <div className="order-process__paid-form">
                  <label className="order-process__paid-label">
                    <input className="order-process__paid-radio" type="radio" name="paid" value="card-online" checked="true" />
                    <span className="order-process__paid-text">Картой онлайн</span>
                  </label>
                  <label className="order-process__paid-label">
                    <input className="order-process__paid-radio" type="radio" name="paid" value="card-courier" checked="true" />
                    <span className="order-process__paid-text">Картой курьеру</span>
                  </label>
                  <label className="order-process__paid-label">
                    <input className="order-process__paid-radio" type="radio" name="paid" value="cash" checked="true" />
                    <span className="order-process__paid-text">Наличными курьеру</span>
                  </label>
                </div>
              </div>
              <button className="order-process__form-submit order-process__form-submit_click">
                <NavLink to="/orderEnd" onClick={() => <OrderEnd orderprops={this.state.orderDetails} />}>
                  Подтвердить заказ
                </NavLink>
              </button>
            </form>
          </div>
        </section>
      </div>
    )
  }
}

class BasketItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: this.props.amount,
      price: this.props.products.price * this.props.amount
    }
  }

  incrementCount = () => {
    const { amount, price } = this.state
    let tempCount = amount
    tempCount += 1;
    let tempPrice = price + this.props.products.price;
    this.setState({
      amount: tempCount,
      price: tempPrice
    });
    this.props.func(tempCount, this.props.idx)
  };

  decrementCount = () => {
    const { amount, price } = this.state
    let tempCount = amount;
    let tempPrice = price
    tempCount -= 1
    if (tempCount === 0) {
      this.props.deleteFunc(this.props.idx)
    }

    if (tempPrice > this.props.products.price) {
      tempPrice -= this.props.products.price
    }
    this.setState({
      amount: tempCount,
      price: tempPrice
    });
    this.props.func(tempCount, this.props.idx)
  };

  render() {
    const { products, size } = this.props
    const { amount, price } = this.state
    return (
      <div className="basket-item">
        <div className="basket-item__pic"><img src={products.images[0]} alt={products.title} /></div>
        <div className="basket-item__product">
          <div className="basket-item__product-name"><NavLink to={`productCard/${products.id}`}>{products.title}</NavLink></div>
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
    )
  }
}

export default Order;