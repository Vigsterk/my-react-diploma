import React, { Component } from 'react';
import './style-favorite.css';
import SitePath from '../SitePath/SitePath';

class Favorite extends Component {
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
          title: "Избранное"
        }]
    }
  }
  render() {
    return (
      <div className="wrapper wrapper_favorite">
        <SitePath pathprops={this.state.sitepath} />
        <main className="product-catalogue product-catalogue_favorite">

          <section className="product-catalogue__head product-catalogue__head_favorite">

            <div className="product-catalogue__section-title">
              <h2 className="section-name">В вашем избранном</h2>
              <span className="amount amount_favorite">99</span>
            </div>

            <div className="product-catalogue__sort-by">
              <p className="sort-by">Сортировать</p>
              <select id="sorting" name="">
                <option value="">по дате добавления</option>
                <option value="">по размеру</option>
                <option value="">по производителю</option>
              </select>
            </div>
          </section>

          <section className="product-catalogue__item-list product-catalogue__item-list_favorite">

            {favoriteData.map(item => <a className="item-list__item-card item" href="product-card-desktop.html">
              <div className="item-pic">
                <img className={item.item_pic_class} src={item.src} alt="" />
                <div className="product-catalogue__product_favorite">
                  <p></p>
                </div>
                <div className="arrow arrow_left"></div>
                <div className="arrow arrow_right"></div>
              </div>
              <div className="item-desc">
                <h4 className="item-name">{item.item_name}</h4>
                <p className="item-producer">Производитель: <span className="producer">{item.producer}</span></p>
                <p className="item-price">{item.price}</p>
                <div className="sizes">
                  <p className="sizes__title">Размеры в наличии:</p>
                  <p className="sizes__avalible">{item.sizes}</p>
                </div>
              </div>
            </a>)}
          </section>
        </main>
      </div>
    )
  }
}


const favoriteData = [{
  item_pic_class: 'item-pic-12',
  sizes: '36, 37, 38, 39, 40, 41, 42',
  producer: 'Vittorio Virgili',
  item_name: 'Туфли женские',
  price: 17750,
  src: '../img/catalogue-pics/product-catalogue__item-12.png'
}]


export default Favorite