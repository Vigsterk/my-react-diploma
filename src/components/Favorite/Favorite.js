import React, { Component } from 'react';
import './style-favorite.css';

const Favorite = (props) => {
  return (
    props.items.map((item, idx) =>
      <div className="wrapper wrapper_favorite">
        <div className="site-path">
          <ul className="site-path__items">
            <li className="site-path__item"><a href="index.html">Главная</a></li>
            <li className="site-path__item"><a href="favorite.html">Избранное</a></li>
          </ul>
        </div>

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

            <a className="item-list__item-card item" href="product-card-desktop.html">
              <div className="item-pic">
                <img className='item-pic-12' src='../img/catalogue-pics/product-catalogue__item-12.png' alt="" />
                <div className="product-catalogue__product_favorite">
                  <p></p>
                </div>
                <div className="arrow arrow_left"></div>
                <div className="arrow arrow_right"></div>
              </div>
              <div className="item-desc">
                <h4 className="item-name">Туфли женские</h4>
                <p className="item-producer">Производитель: <span className="producer">Vittorio Virgili</span></p>
                <p className="item-price">17750</p>
                <div className="sizes">
                  <p className="sizes__title">Размеры в наличии:</p>
                  <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                </div>
              </div>
            </a>
          </section>
        </main>
      </div>
    )
  )
}

/*
const Data = () => {
  let items = [{
    item_pic_class: 'item-pic-12',
    sizes: '36, 37, 38, 39, 40, 41, 42',
    producer: 'Vittorio Virgili',
    item_name: 'Туфли женские',
    price: 17750,
    src: '../img/catalogue-pics/product-catalogue__item-12.png'
  }]
  return (
    <Favorite items={items} />
  )
}
*/
export default Favorite