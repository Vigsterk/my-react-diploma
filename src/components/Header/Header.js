import React, { Component } from "react";
import "./Header.css";
import {
  headerHiddenPanelProfileVisibility,
  headerHiddenPanelBasketVisibility,
  headerMainSearchVisibility,
  mainSubmenuVisibility
} from "../js/script";

import { BrowserRouter, Route, NavLink } from "react-router-dom"

class Header extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <header className="header">
        <TopMenu />
        <HeaderMain />
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
      data: []
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
          data: data.data
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
            {this.state.data.map(item =>
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
  }
  render() {
    return (
      <div className="header-main">
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
            <a href="#">Личный кабинет</a>
            <NavLink to="/favorite">
              <i className="fa fa-heart-o" aria-hidden="true"></i>Избранное
            </NavLink>
            <a href="#">Выйти</a>
          </div>
          <div className="hidden-panel__basket basket-dropped">
            <div className="basket-dropped__title">
              В вашей корзине:
            </div>
            <ProductList />
            <NavLink className="basket-dropped__order-button" to="/order">Оформить заказ</NavLink>
          </div>
        </div>
      </div>
    )
  }
}

class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enableLink: true
    };
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({ enableLink: this.state.enableLink ? false : true })
  }

  render() {
    return (
      <nav className="main-menu">
        <div className="wrapper">
          <ul className="main-menu__items">
            {mainMenuItems.map(item =>
              <li className={`main-menu__item main-menu__item_${item.className}`}>
                {this.state.enableLink ? <NavLink to="#" onClick={() => this.handleClick()}>{item.title}</NavLink> : <NavLink to={item.url}>{item.title}</NavLink>}
              </li>)}
          </ul>
        </div>
      </nav>
    )
  }
}

const mainMenuItems = [
  {
    title: "Акции",
    url: "/catalogue",
    className: "sales"
  },
  {
    title: "Женская обувь",
    url: "/catalogue",
    className: "women"
  },
  {
    title: "Мужская обувь",
    url: "/catalogue",
    className: "men"
  },
  {
    title: "Детская обувь",
    url: "/catalogue",
    className: "kids"
  },
  {
    title: "Аксессуары",
    url: "/catalogue",
    className: "accessories"
  },
  {
    title: "Для дома",
    url: "/catalogue",
    className: "home"
  },
  {
    title: "Бренды",
    url: "/catalogue",
    className: "brands"
  },
  {
    title: "Новинки",
    url: "/catalogue",
    className: "new"
  },
]

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

//Может стоит выбросить все Items массивы в отдельный файл и импортировать их?

const droppedMenuItems = [
  {
    title: "Повод:",
    columnID: 1,
    classNamePath: "lists_women",
    data: [
      {
        title: "Офис",
        url: "/catalogue",
        id: "1-1"
      },
      {
        title: "Вечеринка",
        url: "/catalogue",
        id: "1-2"
      },
      {
        title: "Свадьба",
        url: "/catalogue",
        id: "1-3"
      },
      {
        title: "Спорт",
        url: "/catalogue",
        id: "1-4"
      },
      {
        title: "Море",
        url: "/catalogue",
        id: "1-5"
      },
      {
        title: "Дом",
        url: "/catalogue",
        id: "1-6"
      },
      {
        title: "Повседневное",
        url: "/catalogue",
        id: "1-7"
      }
    ]
  },
  {
    title: "Категории:",
    columnID: 2,
    classNamePath: "lists_three-coloumns",
    data: [
      {
        title: "Балетки",
        url: "/catalogue",
        id: "2-1"
      },
      {
        title: "Босоножки",
        url: "/catalogue",
        id: "2-2"
      },
      {
        title: "Ботильоны",
        url: "/catalogue",
        id: "2-3"
      },
      {
        title: "Ботинки",
        url: "/catalogue",
        id: "2-4"
      },
      {
        title: "Ботфорты",
        url: "/catalogue",
        id: "2-5"
      },

      {
        title: "Галоши",
        url: "/catalogue",
        id: "2-6"
      },

      {
        title: "Кеды и кроссовки",
        url: "/catalogue",
        id: "2-7"
      },
      {
        title: "Мокасины",
        url: "/catalogue",
        id: "2-8"
      },
      {
        title: "Полусапоги",
        url: "/catalogue",
        id: "2-9"
      },
      {
        title: "Резиновые сапоги",
        url: "/catalogue",
        id: "2-10"
      },
      {
        title: "Сабо",
        url: "/catalogue",
        id: "2-11"
      },
      {
        title: "Сапоги",
        url: "/catalogue",
        id: "2-12"
      },
      {
        title: "Сникерсы",
        url: "/catalogue",
        id: "2-13"
      },
      {
        title: "Тапочки",
        url: "/catalogue",
        id: "2-14"
      },
      {
        title: "Туфли",
        url: "/catalogue",
        id: "2-15"
      },
      {
        title: "Шлёпанцы и вьетнамки",
        url: "/catalogue",
        id: "2-16"
      }
    ]
  },
  {
    title: "Сезон:",
    columnID: 3,
    classNamePath: "seasons",
    data: [
      {
        title: "Зима",
        url: "/catalogue",
        id: "3-1"
      },
      {
        title: "Весна",
        url: "/catalogue",
        id: "3-2"
      },
      {
        title: "Лето",
        url: "/catalogue",
        id: "3-3"
      },
      {
        title: "Осень",
        url: "/catalogue",
        id: "3-4"
      }
    ]
  },
  {
    title: "Бренды:",
    columnID: 4,
    classNamePath: "brands",
    data: [
      {
        title: "Albano",
        url: "/catalogue",
        id: "4-1"
      },
      {
        title: "Ballin",
        url: "/catalogue",
        id: "4-2"
      },
      {
        title: "Baldinini",
        url: "/catalogue",
        id: "4-3"
      },
      {
        title: "Damlax",
        url: "/catalogue",
        id: "4-4"
      },
      {
        title: "Pegia",
        url: "/catalogue",
        id: "4-5"
      },
      {
        title: "Renzi",
        url: "/catalogue",
        id: "4-6"
      },
      {
        title: "Все",
        url: "/catalogue",
        id: "4-7"
      }
    ]
  }

]

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

//Тестовый массив для проверки отображения товаров в корзине
const productDatabase = [
  {
    src: "img/product-list__pic_1.jpg",
    title: "Ботинки женские",
    producer: "Baldinini",
    price: 12360,
    url: "/product-card-desktop.html",
    id: 1
  },
  {
    src: "img/product-list__pic_1.jpg",
    title: "Ботинки женские",
    producer: "Baldinini",
    price: 12360,
    url: "/product-card-desktop.html",
    id: 2
  },
  {
    src: "img/product-list__pic_1.jpg",
    title: "Ботинки женские",
    producer: "Baldinini",
    price: 12360,
    url: "/product-card-desktop.html",
    id: 3
  }
]


export default Header;