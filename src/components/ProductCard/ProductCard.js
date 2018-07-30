import React, { Component } from 'react';
import './style-product-card.css';
import { NavLink } from 'react-router-dom'
import SitePath from '../SitePath/SitePath'

class ProductCard extends Component {
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
          title: ""
        },
        {
          to: "/",
          title: ""
        },
        {
          to: "/",
          title: ""
        }
      ],
      data: [],
      selectedImage: [],
      id: props.match.params.id
    }

  }

  componentDidMount() {
    fetch(`https://neto-api.herokuapp.com/bosa-noga/products/${this.state.id}`, {
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
          selectedImage: data.data.images[0]
        })
        console.log(this.state.data)
      })
      .catch(error => {
        console.log(error)
      });
  }

  changeImage = index => {
    console.log(index)
    let selectedImage = this.state.data.images[index]
    this.setState({
      selectedImage: selectedImage
    })
    console.log(this.state.selectedImage)
  }
  render() {
    return (
      <div>
        <SitePath pathprops={this.state.sitepath} />
        <main className="product-card">
          <section class="product-card-content">
            {this.state.data.title && <h2 className="section-name">{this.state.data.title}</h2>}
            <section className="product-card-content__main-screen">
              {this.state.data.images && <FavoriteSlider data={this.state.data} func={this.changeImage} />}
              <div className="main-screen__favourite-product-pic">
                {this.state.data.images && <img src={this.state.selectedImage} alt={this.state.data.title} />}
                <NavLink to="/" className="main-screen__favourite-product-pic__zoom" />
              </div>

              <div className="main-screen__product-info">
                <div className="product-info-title">
                  <h2>{this.state.data.title}</h2>
                  <div className="in-stock">В наличии</div>
                </div>
                <div className="product-features">
                  <table className="features-table">
                    <tr>
                      <td className="left-col">Артикул:</td>
                      <td className="right-col">{this.state.data.sku}</td>
                    </tr>
                    <tr>
                      <td className="left-col">Производитель:</td>
                      <td className="right-col"><NavLink to="/"><span className="producer">{this.state.data.brand}</span></NavLink></td>
                    </tr>
                    <tr>
                      <td className="left-col">Цвет:</td>
                      <td className="right-col">{this.state.data.color}</td>
                    </tr>
                    <tr>
                      <td className="left-col">Материалы:</td>
                      <td className="right-col">{this.state.data.material}</td>
                    </tr>
                    <tr>
                      <td className="left-col">Сезон:</td>
                      <td className="right-col">{this.state.data.season}</td>
                    </tr>
                    <tr>
                      <td className="left-col">Повод:</td>
                      <td className="right-col">{this.state.data.reason}</td>
                    </tr>
                  </table>
                </div>

                <p className="size">Размер</p>
                <ul className="sizes">
                  {this.state.data.sizes && this.state.data.sizes.map(item => <li className="active">{item.size}</li>)}
                </ul>

                <div className="size-wrapper">
                  <NavLink to="/"><span className="size-rule"></span><p className="size-table">Таблица размеров</p></NavLink>
                </div>
                <NavLink to="/" className="in-favourites-wrapper">
                  <div className="favourite" to="/"></div><p className="in-favourites">В избранное</p>
                </NavLink>

                <div className="basket-item__quantity">
                  <div className="basket-item__quantity-change basket-item-list__quantity-change_minus">-</div>1
									  <div className="basket-item__quantity-change basket-item-list__quantity-change_plus">+</div>
                </div>

                <div className="price">{this.state.data.price}₽</div>

                <button className="in-basket in-basket-click">В корзину</button>
              </div>
            </section>
          </section>
        </main>
        <OverlookedSlider />
        <SimilarSlider />
      </div>
    )
  }
}

class FavoriteSlider extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      data: this.props.data,
      firstPic: this.props.data.images[0],
      secondPic: this.props.data.images[1],
      lastPic: this.props.data.images[2],
      func: this.props.func
    }

  }

  arrowUp = () => {
    let imgIndex = this.state.data.images.indexOf(this.state.firstPic) + 1
    imgIndex < this.state.data.images.length - 1 ? imgIndex + 1 : imgIndex = 0
    this.state.func(imgIndex)
  }

  arrowDown = () => {
    let imgIndex = this.state.data.images.indexOf(this.state.firstPic)
    imgIndex > 0 ? imgIndex - 1 : imgIndex = this.state.data.images.length - 1
    this.state.func(imgIndex)
  }

  render() {
    return (
      <section className="main-screen__favourite-product-slider" >
        <div className="favourite-product-slider">
          <div className="favourite-product-slider__arrow favourite-product-slider__arrow_up arrow-up" onClick={this.arrowUp}></div>
          <FirstImg img={this.state.firstPic} />
          {this.state.secondPic && <SecondImg img={this.state.secondPic} />}
          {this.state.lastPic && <LastImg img={this.state.lastPic} />}
          <div className="favourite-product-slider__arrow favourite-product-slider__arrow_down arrow-down" onClick={this.arrowDown}></div>
        </div>
      </section>
    )
  }
}

const FirstImg = (props) => {
  console.log(props)
  return (
    <div className="favourite-product-slider__item">
      <img className="favorite-slider-img favourite-product-slider__item-1" src={props.img} />
    </div>
  )
}
const SecondImg = (props) => {
  console.log(props)
  return (
    <div className="favourite-product-slider__item">
      <img className="favorite-slider-img favourite-product-slider__item-2" src={props.img} />
    </div>
  )
}
const LastImg = (props) => {
  console.log(props)
  return (
    <div className="favourite-product-slider__item">
      <img className="favorite-slider-img favourite-product-slider__item-3" src={props.img} />
    </div>
  )
}


class OverlookedSlider extends Component {
  render() {
    return (
      <section className="product-card__overlooked-slider">
        <h3>Вы смотрели:</h3>
        <div className="overlooked-slider">
          <div className="overlooked-slider__arrow overlooked-slider__arrow_left arrow" />
          {overlookedData.map(item => <div className={`overlooked-slider__item overlooked-slider__item-${item.classNum}`}>
            <NavLink to={item.href}></NavLink>
          </div>)}
          <div className="overlooked-slider__arrow overlooked-slider__arrow_right arrow" />
        </div>
      </section>
    )
  }
}

const overlookedData = [
  {
    classNum: 1,
    href: '/productCard'
  },
  {
    classNum: 2,
    href: '/productCard'
  },
  {
    classNum: 3,
    href: '/productCard'
  },
  {
    classNum: 4,
    href: '/productCard'
  },
  {
    classNum: 5,
    href: '/productCard'
  }
];

class SimilarSlider extends Component {
  render() {
    return (
      <section className="product-card__similar-products-slider">
        <h3>Похожие товары:</h3>
        <div className="similar-products-slider">
          <div className="similar-products-slider__arrow similar-products-slider__arrow_left arrow"></div>
          {similarData.map(item =>
            <div className="similar-products-slider__item-list__item-card item">
              <div className="similar-products-slider__item">
                <NavLink to={item.href}>
                  <img src={item.src} className={`similar-products-slider__item-pic-${item.classNum}`} alt={item.name} />
                </NavLink>
              </div>
              <div className="similar-products-slider__item-desc">
                <h4 className="similar-products-slider__item-name">{item.name}</h4>
                <p className="similar-products-slider__item-producer">Производитель: <span className="producer">{item.producer}</span></p>
                <p className="similar-products-slider__item-price">{item.price}</p>
              </div>
            </div>
          )}
          <div className="similar-products-slider__arrow similar-products-slider__arrow_right arrow"></div>
        </div>
      </section>
    )
  }
}

const similarData = [
  {
    href: '/productCard',
    src: 'img/product-card-pics/product-card__similar-products-slider-item-1.png',
    name: 'Ботинки женские',
    price: 23150,
    producer: 'Norma J.Baker',
    classNum: 1
  },
  {
    href: '/productCard',
    src: 'img/product-card-pics/product-card__similar-products-slider-item-2.png',
    name: 'Полуботинки женские',
    price: 4670,
    producer: 'Shoes Market',
    classNum: 2
  },
  {
    href: '/productCard',
    src: 'img/product-card-pics/product-card__similar-products-slider-item-3.png',
    name: 'Ботинки женские',
    price: 6370,
    producer: 'Menghi Shoes',
    classNum: 3
  }
];

export default ProductCard