import React, { Component } from 'react';
import slider from '../js/slider';
import { NavLink } from 'react-router-dom'

class MainPage extends Component {
  componentDidMount() {
    var f = document.querySelector('.slider__pictures'),
      a = f.getElementsByClassName('slider__image'),
      button = f.getElementsByClassName('slider__circles')[0].getElementsByClassName('slider__circle'),
      arrows = f.getElementsByClassName('slider__arrow');
    slider(f, a, button, '4000', '1000', arrows);
  }

  render() {
    return (
      <div className='main-page'>
        <section className="slider">
          <Slider />
        </section>
        <NewDeals />
        <section className="sales-and-news wave-bottom">
          <h2 className="h2">акции и новости</h2>
          <Sales />
        </section>
        <section className="about-us">
          <AboutUs />
        </section>
      </div>
    )
  }
}

//Перебрать button и slider image
const Slider = () => {
  return (
    <div className="wrapper">
      <div className="slider__pictures">
        <NavLink className="slider__image" to="/">
          <img src="img/slider.jpg" alt="slide img" />
        </NavLink>
        <NavLink className="slider__image" to="/">
          <img src="img/slider180deg.jpeg" alt="slide img" />
        </NavLink>
        <NavLink className="slider__image" to="/">
          <img src="img/slider.jpg" alt="slide img" />
        </NavLink>
        <NavLink className="slider__image" to="/">
          <img src="img/slider180deg.jpeg" alt="slide img" />
        </NavLink>
        <div className="arrow slider__arrow slider__arrow_left"></div>
        <div className="arrow slider__arrow slider__arrow_right"></div>
        <div className="slider__circles">
          <button className="slider__circle" value="0"></button>
          <button className="slider__circle" value="1"></button>
          <button className="slider__circle" value="2"></button>
          <button className="slider__circle" value="3"></button>
        </div>
        <h2 className="h2">К весне готовы!</h2>
      </div>
    </div>

  )
}

class NewDeals extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      productInfo: "",
      check: false
    }
  }
  componentDidMount() {
    fetch("https://neto-api.herokuapp.com/bosa-noga/featured", {
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
        console.log(data)
        this.setState({
          data: data.data,
          productInfo: data.data[1],
          check: true
        })
      })
      .catch(error => {
        console.log(error)
      });
  }

  loadProductInfo = (param) => {
    console.log(param)
    this.setState({
      productInfo: param
    })
  }

  render() {
    return (
      <section className="new-deals wave-bottom">
        <h2 className="h2">Новинки</h2>
        <NewDealsMenu />
        {this.state.check && <DealsSlider img={this.state.data} infoFunc={this.loadProductInfo} />}
        {this.state.check && <ProductInfo info={this.state.productInfo} />}
      </section>
    )
  }
}

class NewDealsMenu extends NewDeals {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: ""
    }
  }

  handleClick = index => {
    this.setState({
      activeIndex: index
    })
  }
  render() {
    return (
      <div className="new-deals__menu">
        <ul className="new-deals__menu-items">
          {newDealsData.map((item, index) => <ListItem key={item.id}
            url={item.url}
            func={this.handleClick}
            title={item.title}
            isActive={this.state.activeIndex === index}
            idx={index} />)}
        </ul>
      </div>
    )
  }
}

class ListItem extends Component {
  handleClick = () => this.props.func(this.props.idx)
  render() {
    return (
      <li className={this.props.isActive ? 'new-deals__menu-item new-deals__menu-item_active' : 'new-deals__menu-item'}>
        <button className={this.props.isActive ? 'new-deals__item-button new-deals__item-button_active' : 'new-deals__item-button'} onClick={this.handleClick}>{this.props.title}</button>
      </li>)
  }

}

const newDealsData = [
  {
    title: "Женская обувь",
    id: 1
  },
  {
    title: "Мужская обувь",
    id: 2
  },
  {
    title: "Детская обувь",
    id: 3
  },
  {
    title: "аксессуары",
    id: 4
  },
  {
    title: "для дома",
    id: 5
  }
]

class DealsSlider extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      data: this.props.img,
      first: this.props.img[0],
      active: this.props.img[1],
      last: this.props.img[2],
      func: this.props.infoFunc
    }
    this.moveLeft = this.moveLeft.bind(this)
    this.moveRight = this.moveRight.bind(this)
  }

  moveLeft() {
    const tempDataArr = [...this.state.data]
    let tempDataIndex = tempDataArr.indexOf(this.state.active)
    let tempDataIndexFirst = tempDataArr.indexOf(this.state.first)
    let tempDataIndexLast = tempDataArr.indexOf(this.state.last)
    tempDataIndex > 0 ? tempDataIndex-- : tempDataIndex = tempDataArr.length - 1
    tempDataIndexFirst > 0 ? tempDataIndexFirst-- : tempDataIndexFirst = tempDataArr.length - 1
    tempDataIndexLast > 0 ? tempDataIndexLast-- : tempDataIndexLast = tempDataArr.length - 1
    let tempDataActive = tempDataArr[tempDataIndex]
    let tempDataFirst = tempDataArr[tempDataIndexFirst]
    let tempDataLast = tempDataArr[tempDataIndexLast]
    this.setState({
      first: tempDataFirst,
      active: tempDataActive,
      last: tempDataLast
    })
    this.state.func(tempDataActive)
  }

  moveRight() {
    const tempDataArr = [...this.state.data]
    let tempDataIndex = tempDataArr.indexOf(this.state.active)
    let tempDataIndexFirst = tempDataArr.indexOf(this.state.first)
    let tempDataIndexLast = tempDataArr.indexOf(this.state.last)
    tempDataIndex < (tempDataArr.length - 1) ? tempDataIndex++ : tempDataIndex = 0
    tempDataIndexFirst < (tempDataArr.length - 1) ? tempDataIndexFirst++ : tempDataIndexFirst = 0
    tempDataIndexLast < (tempDataArr.length - 1) ? tempDataIndexLast++ : tempDataIndexLast = 0
    let tempDataActive = tempDataArr[tempDataIndex]
    let tempDataFirst = tempDataArr[tempDataIndexFirst]
    let tempDataLast = tempDataArr[tempDataIndexLast]
    this.setState({
      first: tempDataFirst,
      active: tempDataActive,
      last: tempDataLast
    })
    this.state.func(tempDataActive)
  }

  render() {
    return (
      <div className="new-deals__slider">
        <div className="new-deals__arrow new-deals__arrow_left arrow" onClick={this.moveLeft}></div>
        <ProductFirst images={this.state.first.images[0]} />
        <ProductActive images={this.state.active.images[0]} />
        <ProductLast images={this.state.last.images[0]} />
        <div className="new-deals__arrow new-deals__arrow_right arrow" onClick={this.moveRight}></div>
      </div>
    )
  }
}

const ProductFirst = (props) => {
  return (
    <div className="new-deals__product new-deals__product_first">
      <NavLink className="new-deals__product_link" to="/productCard">
        <img className="new-deals__product_first_img" src={props.images} alt={"lastProduct"} />
      </NavLink>
    </div>)
}

const ProductActive = (props) => {
  return (
    <div>
      <div className="new-deals__product new-deals__product_active">
        <NavLink className="new-deals__product_link" to="/productCard">
          <img className="new-deals__product_active_img" src={props.images} alt={"ActiveProduct"} />
        </NavLink>
        <div className="new-deals__product_favorite"></div>
      </div>
    </div>
  )
}

const ProductLast = (props) => {
  return (
    <div className="new-deals__product new-deals__product_last">
      <NavLink className="new-deals__product_link" to="/productCard">
        <img className="new-deals__product_last_img" src={props.images} alt={"LastProduct"} />
      </NavLink>
    </div>)
}

const ProductInfo = (props) => {
  return (
    <div className="new-deals__product-info">
      <NavLink to="productCard" className="h3">{props.info.title}</NavLink>
      <p>Производитель:
          <span>{props.info.brand}</span>
      </p>
      <h3 className="h3">{props.info.price}₽</h3>
    </div>
  )
}

const Sales = () => {
  return (
    <div className="sales-and-news__items">
      {salesItemsData.map(item => <div key={item.id} className={`sales-and-news__item sales-and-news__item_${item.id}`}>
        <NavLink to={item.to} className="sales-and-news__item-link">
          <h3 className="h3">{item.title[0]}<br /><span>{item.title[1]}</span></h3>
        </NavLink>
      </div>)}
      <div className="sales-and-news__news">
        <div className="sales-and-news__arrow sales-and-news__arrow_up arrow"></div>
        {salesNewsData.map(item =>
          <div key={item.id} className="sales-and-news__new">
            <time dateTime={item.time}>{item.pubdate}</time>
            <NavLink className="sales-and-news__item-link" to={item.to}>{item.title}</NavLink>
          </div>)}
        <div className="sales-and-news__arrow sales-and-news__arrow_down arrow"></div>
      </div>
    </div>
  )
}

const salesItemsData = [
  {
    id: 1,
    to: "/",
    title: ["обувь к свадьбе"]
  },
  {
    id: 2,
    to: "/",
    title: ["20% скидка", "На летнюю обувь"]
  },
  {
    id: 3,
    to: "/",
    title: ["готовимся к лету!"]
  },
  {
    id: 4,
    to: "/",
    title: ["Больше покупок – ", "больше скидка!"]
  }

]

const salesNewsData = [
  {
    id: 1,
    to: "/",
    time: "2017-01-18 00:00",
    pubdate: "18 января 2017",
    title: "Американские резиновые сапоги Bogs идеально подходят для русской зимы!"
  },
  {
    id: 2,
    to: "/",
    time: "2017-05-18 00:00",
    pubdate: "18 мая 2017",
    title: "Магазины Bosa Noga"
  },
  {
    id: 3,
    to: "/",
    time: "2017-03-10 00:00",
    pubdate: "10 марта 2017",
    title: "Тенденция весны 2018: розовый и фуксия. 10 пар обуви для яркого образа"
  }
]

const AboutUs = () => {
  return (
    <div>
      <h2 className="about-us__title">Клиенты делают заказ
        <br /> в интернет-магазине BosaNoga!</h2>

      <p className="about-us__text">
        В Интернете можно встретить немало магазинов, предлагающих аксессуары. Но именно к нам хочется возвращаться снова и снова.
      </p>
      <h3 className="about-us__text_header">Мы предлагаем вам особые условия:</h3>
      <ol className="about-us__text">
        <li>Индивидуальный подход специалиста. Когда поступает новая коллекция обуви весна-лето или же коллекция обуви осень-зима
          – покупателям бывает трудно сориентироваться во всем многообразии новинок. Наш менеджер по телефону поможет вам
          определиться с товарами, подходящими именно вам.</li>
        <li>Мы периодически проводим распродажи как женских и мужских, так и детских моделей. Вы будете приятно удивлены ценами
          на аксессуары в мага- зине BosaNoga.</li>
        <li>У нас всегда есть из чего выбрать. Неважно, какую категорию вы прос- матриваете: осень-зима, или же весна-лето –
          вы всегда сможете найти ва- рианты, подходящие вам по внешнему виду и цене.</li>
        <li>Мы несем ответственность за все товары.</li>
        <li>Молодые мамы будут рады обширному ассортименту детских моделей.</li>
      </ol>
      <p className="about-us__text">
        Если вы ищете место, где представлены обувные новинки от самых известных брендов, то вы зашли по верному адресу.
      </p>
      <p className="about-us__text">
        У нас представлены модели для мужчин, женщин, а также детские сапоги, босоножки, ботинки и туфли. Сделав заказ в нашем интернет-магазине,
        вы сможете быть модным и стильным как осенью-зимой, так и весной-летом. Просто наберите номер нашего телефона, и мы
        поможем вам определиться с покупкой.
      </p>

      <span className="about-us__text_overlay"></span>
      <button className="about-us__text_button">читать</button>
    </div>
  )
}

export default MainPage;