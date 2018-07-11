import React, { Component } from 'react';
import './style-product-card.css';

class ProductCard extends Component {
  render() {
    return (
      <main>
        <h2 className="section-name">Ботинки женские</h2>
        <section className="product-card-content__main-screen">
          <section className="main-screen__favourite-product-slider">
            <div className="favourite-product-slider">
              <div className="favourite-product-slider__arrow favourite-product-slider__arrow_up arrow-up"></div>
              <div className="favourite-product-slider__item favourite-product-slider__item-1">
                <a href="#"></a>
              </div>
              <div className="favourite-product-slider__item favourite-product-slider__item-2">
                <a href="#"></a>
              </div>
              <div className="favourite-product-slider__item favourite-product-slider__item-3">
                <a href="#"></a>
              </div>
              <div className="favourite-product-slider__arrow favourite-product-slider__arrow_down arrow-down"></div>
            </div>
          </section>
          <div className="main-screen__favourite-product-pic">
            <a href="#">
              <img src="img/product-card-pics/product-card__favourite-product-pic.png" alt="" />
            </a>
            <a href="#" className="main-screen__favourite-product-pic__zoom" />
          </div>
          <div className="main-screen__product-info">
            <div className="product-info-title">
              <h2>Ботинки женские</h2>
              <div className="in-stock">В наличии</div>
            </div>
            <div className="product-features">
              <table className="features-table">
                <tr>
                  <td className="left-col">Артикул:</td>
                  <td className="right-col">BD0677C</td>
                </tr>
                <tr>
                  <td className="left-col">Производитель:</td>
                  <td className="right-col"><a href="#"><span className="producer">Fabi</span></a></td>
                </tr>
                <tr>
                  <td className="left-col">Цвет:</td>
                  <td className="right-col">чёрный</td>
                </tr>
                <tr>
                  <td className="left-col">Материалы:</td>
                  <td className="right-col">натуральная кожа</td>
                </tr>
                <tr>
                  <td className="left-col">Сезон:</td>
                  <td className="right-col">Осень-зима</td>
                </tr>
                <tr>
                  <td className="left-col">Повод:</td>
                  <td className="right-col">Любой</td>
                </tr>
              </table>
            </div>
            <p className="size">Размер</p>
            <ul className="sizes">
              <li><a href="#">36</a></li>
              <li className="active"><a href="#">37</a></li>
              <li><a href="#">38</a></li>
              <li><a href="#">38</a></li>
              <li><a href="#">39</a></li>
            </ul>
            <div className="size-wrapper">
              <a href="#"><span className="size-rule"></span><p className="size-table">Таблица размеров</p></a>
            </div>
            <a href="#" className="in-favourites-wrapper">
              <div className="favourite" href="#"></div><p className="in-favourites">В избранное</p>
            </a>
            <div className="basket-item__quantity">
              <div className="basket-item__quantity-change basket-item-list__quantity-change_minus">-</div>1
									  <div className="basket-item__quantity-change basket-item-list__quantity-change_plus">+</div>
            </div>
            <div className="price">26 120 ₽</div>
            <button className="in-basket in-basket-click">В корзину</button>
          </div>
        </section>
      </main>
    )
  }
}

class OverlookedSlider extends Component {
  render() {
    return (
      <section className="product-card__overlooked-slider">
        <h3>Вы смотрели:</h3>
        <div className="overlooked-slider">
          <div className="overlooked-slider__arrow overlooked-slider__arrow_left arrow" />
          <div className="overlooked-slider__item overlooked-slider__item-1">
            <a href="product-card-desktop.html"></a>
          </div>
          <div className="overlooked-slider__item overlooked-slider__item-2">
            <a href="product-card-desktop.html"></a>
          </div>
          <div className="overlooked-slider__item overlooked-slider__item-3">
            <a href="product-card-desktop.html"></a>
          </div>
          <div className="overlooked-slider__item overlooked-slider__item-4">
            <a href="product-card-desktop.html"></a>
          </div>
          <div className="overlooked-slider__item overlooked-slider__item-5">
            <a href="product-card-desktop.html"></a>
          </div>
          <div className="overlooked-slider__arrow overlooked-slider__arrow_right arrow" />
        </div>
      </section>
    )
  }
}

class SimilarSlider extends Component {
  render() {
    return (
      <section className="product-card__similar-products-slider">
        <h3>Похожие товары:</h3>
        <div className="similar-products-slider">
          <div className="similar-products-slider__arrow similar-products-slider__arrow_left arrow"></div>
          <div className="similar-products-slider__item-list__item-card item">
            <div className="similar-products-slider__item">
              <a href="product-card-desktop.html"><img src="img/product-card-pics/product-card__similar-products-slider-item-1.png" className="similar-products-slider__item-pic-1" alt="Ботинки женские" />
              </a>
            </div>
            <div className="similar-products-slider__item-desc">
              <h4 className="similar-products-slider__item-name">Ботинки женские</h4>
              <p className="similar-products-slider__item-producer">Производитель: <span className="producer">Norma J.Baker</span></p>
              <p className="similar-products-slider__item-price">23 150</p>
            </div>
          </div>
          <div className="similar-products-slider__item-list__item-card item">
            <div className="similar-products-slider__item">
              <a href="product-card-desktop.html"><img src="img/product-card-pics/product-card__similar-products-slider-item-2.png" className="similar-products-slider__item-pic-2" alt="Полуботинки женские" /></a>
            </div>
            <div className="similar-products-slider__item-desc">
              <h4 className="similar-products-slider__item-name">Полуботинки женские</h4>
              <p className="similar-products-slider__item-producer">Производитель: <span className="producer">Shoes Market</span></p>
              <p className="similar-products-slider__item-price">4 670</p>
            </div>
          </div>
          <div className="similar-products-slider__item-list__item-card item">
            <div className="similar-products-slider__item">
              <a href="product-card-desktop.html"><img src="img/product-card-pics/product-card__similar-products-slider-item-3.png" className="similar-products-slider__item-pic-3" alt="Ботинки женские" /></a>
            </div>
            <div className="similar-products-slider__item-desc">
              <h4 className="similar-products-slider__item-name">Ботинки женские</h4>
              <p className="similar-products-slider__item-producer">Производитель: <span className="producer">Menghi Shoes</span></p>
              <p className="similar-products-slider__item-price">6 370</p>
            </div>
          </div>
          <div className="similar-products-slider__arrow similar-products-slider__arrow_right arrow"></div>
        </div>
      </section>
    )
  }
}
export default { ProductCard, OverlookedSlider, SimilarSlider } 