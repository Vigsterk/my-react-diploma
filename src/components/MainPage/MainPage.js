import React, { Component } from 'react';
import slider from '../js/slider';
import { Link } from 'react-router-dom'
import NewDeals from './NewDeals'

class MainPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      featuredData: null,
      productInfo: null,
      check: false
    }
  }

  componentDidMount() {
    var f = document.querySelector('.slider__pictures'),
      a = f.getElementsByClassName('slider__image'),
      button = f.getElementsByClassName('slider__circles')[0].getElementsByClassName('slider__circle'),
      arrows = f.getElementsByClassName('slider__arrow');
    slider(f, a, button, '4000', '1000', arrows);

    fetch("https://api-neto.herokuapp.com/bosa-noga/featured", {
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
          featuredData: data.data,
          productInfo: data.data[1],
          check: true,
        })
      })
      .catch(error => {
        console.log(error)
      });

  }

  availableCategories() {
    const categories = this.props.categories
    const featuredData = this.state.featuredData
    return categories.filter(category => featuredData.find(item => item.categoryId === category.id)).sort((a, b) => a.id > b.id)
  }

  render() {
    const { featuredData, productInfo } = this.state
    return (
      <div className='main-page'>
        <section className="slider">
          <Slider />
        </section>
        {this.state.check && <NewDeals categories={this.availableCategories()} data={featuredData} info={productInfo} />}
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

const Slider = () => {
  return (
    <div className="wrapper">
      <div className="slider__pictures">
        <Link className="slider__image" to="/">
          <img src="img/slider.jpg" alt="slide img" />
        </Link>
        <Link className="slider__image" to="/">
          <img src="img/slider180deg.jpeg" alt="slide img" />
        </Link>
        <Link className="slider__image" to="/">
          <img src="img/slider.jpg" alt="slide img" />
        </Link>
        <Link className="slider__image" to="/">
          <img src="img/slider180deg.jpeg" alt="slide img" />
        </Link>
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

const Sales = () => {
  return (
    <div className="sales-and-news__items">
      {salesItemsData.map(item => <div key={item.id} className={`sales-and-news__item sales-and-news__item_${item.id}`}>
        <Link to={item.to} className="sales-and-news__item-link">
          <h3 className="h3">{item.title[0]}<br /><span>{item.title[1]}</span></h3>
        </Link>
      </div>)}
      <div className="sales-and-news__news">
        <div className="sales-and-news__arrow sales-and-news__arrow_up arrow"></div>
        {salesNewsData.map(item =>
          <div key={item.id} className="sales-and-news__new">
            <time dateTime={item.time}>{item.pubdate}</time>
            <Link className="sales-and-news__item-link" to={item.to}>{item.title}</Link>
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
          на аксессуары в магазине BosaNoga.</li>
        <li>У нас всегда есть из чего выбрать. Неважно, какую категорию вы просматриваете: осень-зима, или же весна-лето –
          вы всегда сможете найти варианты, подходящие вам по внешнему виду и цене.</li>
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