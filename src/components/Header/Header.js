import React, { Component } from 'react';
import './Header.css';
import {
  headerHiddenPanelProfileVisibility,
  headerHiddenPanelBasketVisibility,
  headerMainSearchVisibility,
  mainSubmenuVisibility
} from '../js/script';

class Header extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <header className='header'>
        <TopMenu />
        <HeaderMain />
        <MainMenu />
        <DroppedMenu />
      </header>
    )
  }
}

const TopMenu = (props) => {
  return (
    <div className="top-menu">
      <div className="wrapper">
        <ul className="top-menu__items">
          {topMenuItems.map(item =>
            <li className="top-menu__item">
              <a href={item.url}>{item.title}</a>
            </li>)}
        </ul>
      </div>
    </div>
  )
}

const topMenuItems = [
  {
    title: 'Возврат',
    url: "#"
  },
  {
    title: 'Доставка и оплата',
    url: "#"
  },
  {
    title: 'О магазине',
    url: "#"
  },
  {
    title: 'Контакты',
    url: "#"
  },
  {
    title: 'Новости',
    url: "#"
  },]


class HeaderMain extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='header-main'>
        <div className="header-main__wrapper wrapper">
          <div className="header-main__phone">
            <a href="tel:+7-495-790-35-03">+7 495 79 03 5 03</a>
            <p>Ежедневно: с 09-00 до 21-00</p>
          </div>
          <div className="header-main__logo">
            <a href="#">
              <h1>
                <img src="img/header-logo.png" alt="logotype" />
              </h1>
            </a>
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
                <div className="header-main__pic_basket_full">1</div>
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
            <a href="#">Личный кабинет</a>
            <a href="favorite.html">
              <i className="fa fa-heart-o" aria-hidden="true"></i>Избранное
            </a>
            <a href="#">Выйти</a>
          </div>
          <div className="hidden-panel__basket basket-dropped">
            <div className="basket-dropped__title">
              В вашей корзине:
            </div>
            <ProductList />
            <a className="basket-dropped__order-button" href="order.html">Оформить заказ</a>
          </div>
        </div>
      </div>
    )
  }
}

const MainMenu = () => {
  return (
    <nav className="main-menu">
      <div className="wrapper">
        <ul className="main-menu__items">
          {mainMenuItems.map(item =>
            <li className={`main-menu__item main-menu__item_${item.className}`}>
              <a href={item.url}>{item.title}</a>
            </li>)}
        </ul>
      </div>
    </nav>
  )
}

const mainMenuItems = [
  {
    title: 'Акции',
    url: "#",
    className: 'sales'
  },
  {
    title: 'Женская обувь',
    url: "#",
    className: 'women'
  },
  {
    title: 'Мужская обувь',
    url: "#",
    className: 'men'
  },
  {
    title: 'Детская обувь',
    url: "#",
    className: 'kids'
  },
  {
    title: 'Аксессуары',
    url: "#",
    className: 'accessories'
  },
  {
    title: 'Для дома',
    url: "#",
    className: 'home'
  },
  {
    title: 'Бренды',
    url: "#",
    className: 'brands'
  },
  {
    title: 'Новинки',
    url: "#",
    className: 'new'
  },
]

class DroppedMenu extends Component {
  componentDidMount() {
    let mainMenuItems = document.querySelectorAll('.main-menu__item');
    for (let item of mainMenuItems) {
      item.onclick = mainSubmenuVisibility;
    }
  }
  render() {
    return (
      <div className="dropped-menu">
        <div className="wrapper">
          <div className="dropped-menu__lists dropped-menu__lists_women">
            <h3 className="dropped-menu__list-title">Повод:</h3>
            <ul className="dropped-menu__list">
              <li className="dropped-menu__item">
                <a href="#">Офис</a>
              </li>
              <li className="dropped-menu__item">
                <a href="#">Вечеринка</a>
              </li>
              <li className="dropped-menu__item">
                <a href="#">Свадьба</a>
              </li>
              <li className="dropped-menu__item">
                <a href="#">Спорт</a>
              </li>
              <li className="dropped-menu__item">
                <a href="#">Море</a>
              </li>
              <li className="dropped-menu__item">
                <a href="#">Дом</a>
              </li>
              <li className="dropped-menu__item">
                <a href="#">Повседневное</a>
              </li>
            </ul>
          </div>
          <div className="dropped-menu__lists dropped-menu__lists_three-coloumns">
            <h3 className="dropped-menu__list-title">Категории:</h3>
            <ul className="dropped-menu__list">
              <li className="dropped-menu__item">
                <a href="#">Балетки</a>
              </li>
              <li className="dropped-menu__item">
                <a href="#">Босоножки</a>
              </li>
              <li className="dropped-menu__item">
                <a href="#">Ботильоны</a>
              </li>
              <li className="dropped-menu__item">
                <a href="#">Ботинки</a>
              </li>
              <li className="dropped-menu__item">
                <a href="#">Ботфорты</a>
              </li>
              <li className="dropped-menu__item">
                <a href="#">Галоши</a>
              </li>
              <li className="dropped-menu__item">
                <a href="#">Кеды и кроссовки</a>
              </li>
              <li className="dropped-menu__item">
                <a href="#">Мокасины</a>
              </li>
              <li className="dropped-menu__item">
                <a href="#">Полусапоги</a>
              </li>
              <li className="dropped-menu__item">
                <a href="#">Резиновые сапоги</a>
              </li>
              <li className="dropped-menu__item">
                <a href="#">Сабо</a>
              </li>
              <li className="dropped-menu__item">
                <a href="#">Сапоги</a>
              </li>
              <li className="dropped-menu__item">
                <a href="#">Сникерсы</a>
              </li>
              <li className="dropped-menu__item">
                <a href="#">Тапочки</a>
              </li>
              <li className="dropped-menu__item">
                <a href="#">Туфли</a>
              </li>
              <li className="dropped-menu__item">
                <a href="#">Шлёпанцы и вьетнамки</a>
              </li>
            </ul>
          </div>
          <div className="dropped-menu__lists">
            <h3 className="dropped-menu__list-title">Сезон:</h3>
            <ul className="dropped-menu__list">
              <li className="dropped-menu__item">
                <a href="#">Зима</a>
              </li>
              <li className="dropped-menu__item">
                <a href="#">Весна</a>
              </li>
              <li className="dropped-menu__item">
                <a href="#">Лето</a>
              </li>
              <li className="dropped-menu__item">
                <a href="#">Осень</a>
              </li>
            </ul>
          </div>
          <div className="dropped-menu__lists">
            <h3 className="dropped-menu__list-title">Бренды:</h3>
            <ul className="dropped-menu__list">
              <li className="dropped-menu__item">
                <a href="#">Albano</a>
              </li>
              <li className="dropped-menu__item">
                <a href="#">Ballin</a>
              </li>
              <li className="dropped-menu__item">
                <a href="#">Baldinini</a>
              </li>
              <li className="dropped-menu__item">
                <a href="#">Damlax</a>
              </li>
              <li className="dropped-menu__item">
                <a href="#">Pegia</a>
              </li>
              <li className="dropped-menu__item">
                <a href="#">Renzi</a>
              </li>
              <li className="dropped-menu__item">
                <a href="#">Все</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

const ProductList = () => {
  return (
    <div className="basket-dropped__product-list product-list">
      {productDatabase.map(item =>
        <div key={item.id} className="product-list__item">
          <a className="product-list__pic">
            <img src={item.src} alt="product" />
          </a>
          <a href={item.url} className="product-list__product">
            {item.title}, {item.producer}
          </a>
          <div className="product-list__fill"></div>
          <div className="product-list__price">
            {item.price}
            <i className="fa fa-rub" aria-hidden="true"></i>
          </div>
          <div className="product-list__delete">
            <i className="fa fa-times" aria-hidden="true"></i>
          </div>
        </div>
      )}
    </div>
  )
}

const productDatabase = [
  {
    src: 'img/product-list__pic_1.jpg',
    title: 'Ботинки женские',
    producer: 'Baldinini',
    price: 12360,
    url: '#',
    id: 1
  },
  {
    src: 'img/product-list__pic_1.jpg',
    title: 'Ботинки женские',
    producer: 'Baldinini',
    price: 12360,
    url: '#',
    id: 2
  },
  {
    src: 'img/product-list__pic_1.jpg',
    title: 'Ботинки женские',
    producer: 'Baldinini',
    price: 12360,
    url: '#',
    id: 3
  }
]


export default Header;