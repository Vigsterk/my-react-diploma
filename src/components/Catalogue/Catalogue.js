import React, { Component } from 'react';
import './style-catalogue.css';

const Catalogue = () => {
  return (
    <div>
      <div className="site-path">
        <ul className="site-path__items">
          <li className="site-path__item"><a href="index.html">Главная</a></li>
          <li className="site-path__item"><a href="#">Женская обувь</a></li>
        </ul>
      </div>

      <main className="product-catalogue">

        <section className="sidebar">
          <section className="sidebar__division">
            <div className="sidebar__catalogue-list">
              <div className="sidebar__division-title">
                <h3>Каталог</h3>

                <div className="opener-down"></div>
              </div>
              <ul>
                <li><a href="#">Балетки</a></li>
                <li><a href="#">Босоножки и сандалии</a></li>
                <li><a href="#">Ботильоны</a></li>
                <li><a href="#">Ботинки</a></li>
                <li><a href="#">Ботфорты</a></li>
                <li><a href="#">Галоши</a></li>
                <li><a href="#">Тапочки</a></li>
                <li><a href="#">Туфли</a></li>
                <li><a href="#">Сапоги</a></li>
              </ul>
            </div>
          </section>
          <div className="separator-150 separator-150-1"></div>
          <section className="sidebar__division">
            <div className="sidebar__price">
              <div className="sidebar__division-title">
                <h3>Цена</h3>

                <div className="opener-down"></div>
              </div>
              <div className="price-slider">
                <div className="circle-container">
                  <div className="circle-1"></div>
                  <div className="line-white"></div>
                  <div className="line-colored"></div>
                  <div className="circle-2"></div>
                </div>
                <div className="counter">
                  <input type="text" className="input-1" value="1000" />

                  <div className="input-separator"></div>
                  <input type="text" className="input-2" value="30 000" />
                </div>
              </div>
            </div>
          </section>
          <div className="separator-150 separator-150-2"></div>
          <section className="sidebar__division">
            <div className="sidebar__color">
              <div className="sidebar__division-title">
                <h3>Цвет</h3>

                <div className="opener-down"></div>
              </div>
              <ul>
                <li><a href="#">
                  <div className="color beige"></div>
                  <span className="color-name">Бежевый</span></a></li>
                <li><a href="#">
                  <div className="color whitesnake"></div>
                  <span className="color-name">Белый</span></a></li>
                <li><a href="#">
                  <div className="color shocking-blue"></div>
                  <span className="color-name">Голубой</span></a></li>
                <li><a href="#">
                  <div className="color yellow"></div>
                  <span className="color-name">Жёлтый</span></a></li>
                <li><a href="#">
                  <div className="color king-crimson"></div>
                  <span className="color-name">Алый</span></a></li>
                <li><a href="#">
                  <div className="color deep-purple"></div>
                  <span className="color-name">Фиолетовый</span></a></li>
                <li><a href="#">
                  <div className="color black-sabbath"></div>
                  <span className="color-name">Чёрный</span></a></li>
              </ul>
            </div>
          </section>
          <div className="separator-150 separator-150-3"></div>
          <section className="sidebar__division">
            <div className="sidebar__size">
              <div className="sidebar__division-title">
                <h3>Размер</h3>

                <div className="opener-down"></div>
              </div>
              <ul>
                <div className="list-1">
                  <li><label><input type="checkbox" className="checkbox"
                    name="checkbox-31" />
                    <span className="checkbox-custom"></span>
                    <span className="label">31</span>
                  </label>
                  </li>
                  <li><label><input type="checkbox" className="checkbox"
                    name="checkbox-33" />
                    <span className="checkbox-custom"></span>
                    <span className="label">33</span>
                  </label>
                  </li>
                  <li><label><input type="checkbox" className="checkbox"
                    name="checkbox-35" /><span
                      className="checkbox-custom"></span> <span
                        className="label">35</span></label></li>
                  <li><label><input type="checkbox" className="checkbox"
                    name="checkbox-37" /><span
                      className="checkbox-custom"></span> <span
                        className="label">37</span></label></li>
                  <li><label><input type="checkbox" className="checkbox"
                    name="checkbox-39" />
                    <span className="checkbox-custom"></span>
                    <span className="label">39</span>
                  </label>
                  </li>
                </div>
                <div className="list-2">
                  <li><label><input type="checkbox" className="checkbox"
                    name="checkbox-32" />
                    <span className="checkbox-custom"></span>
                    <span className="label">32</span>
                  </label>
                  </li>
                  <li><label><input type="checkbox"
                    className="checkbox"
                    name="checkbox-34" />
                    <span className="checkbox-custom"></span>
                    <span className="label">34</span>
                  </label>
                  </li>
                  <li><label><input type="checkbox"
                    className="checkbox"
                    name="checkbox-36"
                    checked />
                    <span className="checkbox-custom"></span>
                    <span className="label">36</span>
                  </label>
                  </li>
                  <li><label><input type="checkbox"
                    className="checkbox"
                    name="checkbox-38" />
                    <span className="checkbox-custom"></span>
                    <span className="label">38</span>
                  </label>
                  </li>
                  <li><label><input type="checkbox"
                    className="checkbox"
                    name="checkbox-40" />
                    <span className="checkbox-custom"></span>
                    <span className="label">40</span>
                  </label>
                  </li>
                </div>
              </ul>
            </div>
          </section>
          <div className="separator-150 separator-150-4"></div>
          <section className="sidebar__division">
            <div className="sidebar__heel-height">
              <div className="sidebar__division-title">
                <h3>Размер каблука</h3>

                <div className="opener-up"></div>
              </div>
            </div>
          </section>
          <div className="separator-150 separator-150-5"></div>
          <section className="sidebar__division">
            <div className="sidebar__occasion">
              <div className="sidebar__division-title">
                <h3>Повод</h3>

                <div className="opener-down"></div>
              </div>
              <ul>
                <li><a href="#">Офис</a></li>
                <li><a href="#">Вечеринка</a></li>
                <li><a href="#">Свадьба</a></li>
                <li><a href="#">Спорт</a></li>
                <li><a href="#">Путешествие</a></li>
                <li><a href="#">Свидание</a></li>
                <li><a href="#">Дома</a></li>
                <li><a href="#">Произвести впечатление</a></li>
              </ul>
            </div>
          </section>
          <div className="separator-150 separator-150-6"></div>
          <section className="sidebar__division">
            <div className="sidebar__season">
              <div className="sidebar__division-title">
                <h3>Сезон</h3>

                <div className="opener-up"></div>
              </div>
            </div>
          </section>
          <div className="separator-150 separator-150-7"></div>
          <section className="sidebar__division">
            <div className="sidebar__brand">
              <h3>Бренд</h3>

              <form action="post" className="brand-search">
                <input type="search"
                  className="brand-search"
                  id="brand-search"
                  placeholder="Поиск" />
                <input type="submit" name=""
                  value="" className="submit" />
              </form>
            </div>
            <label><input type="checkbox"
              className="checkbox"
              name="checkbox-disc" />
              <span className="checkbox-discount"></span>
              <span className="text-discount">Со скидкой</span>
            </label>

            <div className="separator-240"></div>
          </section>

          <section className="sidebar__division">
            <div className="drop-down">
              <a href="#"><span className="drop-down-icon"></span>Сбросить</a>
            </div>
          </section>
        </section>

        <section className="product-catalogue-content">

          <section className="product-catalogue__head">
            <div className="product-catalogue__section-title">
              <h2 className="section-name">Женская обувь</h2>
              <span className="amount"> 1 764 товара</span>
            </div>
            <div className="product-catalogue__sort-by">
              <p className="sort-by">Сортировать</p>
              <select name="" id="sorting">
                <option value="">по популярности
                                </option>
                <option value="">по размеру</option>
                <option value="">по производителю</option>
              </select>
            </div>
          </section>

          <section className="product-catalogue__item-list">

            <a className="item-list__item-card item" href="product-card-desktop.html">
              <div className="item-pic">
                <img className="item-pic-1"
                  src="img/catalogue-pics/product-catalogue__item-1.png"
                  alt="Босоножки женские" />

                <div className="product-catalogue__product_favorite">
                  <p></p>
                </div>
                <div className="arrow arrow_left"></div>
                <div className="arrow arrow_right"></div>
              </div>
              <div className="item-desc">
                <h4 className="item-name">Босоножки женские</h4>

                <p className="item-producer">Производитель: <span className="producer">Damlax</span>
                </p>

                <p className="item-price">18 520</p>

                <div className="sizes">
                  <p className="sizes__title">Размеры в наличии:</p>

                  <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                </div>
              </div>
            </a>
            <a className="item-list__item-card item" href="product-card-desktop.html">
              <div className="item-pic">
                <img className="item-pic-2"
                  src="img/catalogue-pics/product-catalogue__item-2.png"
                  alt="Ботинки женские" />

                <div className="product-catalogue__product_favorite">
                  <p></p>
                </div>
                <div className="arrow arrow_left"></div>
                <div className="arrow arrow_right"></div>
              </div>
              <div className="item-desc">
                <h4 className="item-name">Ботинки женские</h4>

                <p className="item-producer">Производитель:<span
                  className="producer">Norma J.Baker</span>
                </p>

                <p className="item-price">23 150</p>

                <div className="sizes">
                  <p className="sizes__title">Размеры в наличии:</p>

                  <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                </div>
              </div>
            </a>
            <a className="item-list__item-card item" href="product-card-desktop.html">
              <div className="item-pic">
                <img className="item-pic-3"
                  src="img/catalogue-pics/product-catalogue__item-3.png"
                  alt="Босоножки женские" />

                <div className="product-catalogue__product_favorite">
                  <p></p>
                </div>
                <div className="arrow arrow_left"></div>
                <div className="arrow arrow_right"></div>
              </div>
              <div className="item-desc">
                <h4 className="item-name">Босоножки женские</h4>

                <p className="item-producer">
                  Производитель:<span className="producer">Damlax</span>
                </p>

                <p className="item-price">5 390</p>

                <div className="sizes">
                  <p className="sizes__title">Размеры в наличии:</p>

                  <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                </div>
              </div>
            </a>
            <a className="item-list__item-card item" href="product-card-desktop.html">
              <div className="item-pic">
                <img className="item-pic-4"
                  src="img/catalogue-pics/product-catalogue__item-4.png"
                  alt="Кроссовки женские" />

                <div className="product-catalogue__product_favorite">
                  <p></p>
                </div>
                <div className="arrow arrow_left"></div>
                <div className="arrow arrow_right"></div>
              </div>
              <div className="item-desc">
                <h4 className="item-name">Кроссовки женские</h4>

                <p className="item-producer">
                  Производитель:<span className="producer">Damlax</span>
                </p>

                <p className="item-price">6 520</p>

                <div className="sizes">
                  <p className="sizes__title">Размеры в наличии:</p>

                  <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                </div>
              </div>
            </a>
            <a className="item-list__item-card item" href="product-card-desktop.html">
              <div className="item-pic">
                <img className="item-pic-5"
                  src="img/catalogue-pics/product-catalogue__item-5.png"
                  alt="Резиновые полусапоги женские" />

                <div className="product-catalogue__product_favorite">
                  <p></p>
                </div>
                <div className="arrow arrow_left"></div>
                <div className="arrow arrow_right"></div>
              </div>
              <div className="item-desc">
                <h4 className="item-name">Резиновые полусапоги женские</h4>

                <p className="item-producer">
                  Производитель:<span className="producer">Menghi Shoes</span>
                </p>

                <p className="item-price">10 030</p>

                <div className="sizes">
                  <p className="sizes__title">Размеры в наличии:</p>

                  <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                </div>
              </div>
            </a>
            <a className="item-list__item-card item" href="product-card-desktop.html">
              <div className="item-pic">
                <img className="item-pic-6"
                  src="img/catalogue-pics/product-catalogue__item-6.png"
                  alt="Полусапоги женские" />

                <div className="product-catalogue__product_favorite">
                  <p></p>
                </div>
                <div className="arrow arrow_left"></div>
                <div className="arrow arrow_right"></div>
              </div>

              <div className="item-desc">
                <h4 className="item-name">Полусапоги женские</h4>

                <p className="item-producer">
                  Производитель:<span className="producer">Pegia</span>
                </p>

                <p className="item-price">10 140</p>

                <div className="sizes">
                  <p className="sizes__title">Размеры в наличии:</p>

                  <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                </div>
              </div>
            </a>
            <a className="item-list__item-card item" href="product-card-desktop.html">
              <div className="item-pic">
                <img className="item-pic-7"
                  src="img/catalogue-pics/product-catalogue__item-7.png"
                  alt="Босоножки женские" />

                <div className="product-catalogue__product_favorite">
                  <p></p>
                </div>
                <div className="arrow arrow_left"></div>
                <div className="arrow arrow_right"></div>
              </div>
              <div className="item-desc">
                <h4 className="item-name">Босоножки женские</h4>

                <p className="item-producer">
                  Производитель:<span className="producer">Baldinini</span>
                </p>

                <p className="item-price">25 020</p>

                <div className="sizes">
                  <p className="sizes__title">
                    Размеры в наличии:</p>

                  <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                </div>
              </div>
            </a>
            <a className="item-list__item-card item" href="product-card-desktop.html">
              <div className="item-pic">
                <img className="item-pic-8"
                  src="img/catalogue-pics/product-catalogue__item-8.png"
                  alt="Туфли женские" />

                <div className="product-catalogue__product_favorite-chosen">
                  <p></p>
                </div>
                <div className="arrow arrow_left"></div>
                <div className="arrow arrow_right"></div>
              </div>
              <div className="item-desc">
                <h4 className="item-name">Туфли женские</h4>

                <p className="item-producer">
                  Производитель:<span className="producer">Baldini</span>
                </p>

                <p className="item-price">
                  18
                                    520</p>

                <div className="sizes">
                  <p className="sizes__title">
                    Размеры в наличии:</p>

                  <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                </div>
              </div>
            </a>
            <a className="item-list__item-card item" href="product-card-desktop.html">
              <div className="item-pic">
                <img className="item-pic-9"
                  src="img/catalogue-pics/product-catalogue__item-9.png"
                  alt="Полуботинки женские" />

                <div className="product-catalogue__product_favorite-chosen">
                  <p></p>
                </div>
                <div className="arrow arrow_left"></div>
                <div className="arrow arrow_right"></div>
              </div>

              <div className="item-desc">
                <h4 className="item-name">
                  Полуботинки
                                    женские</h4>

                <p className="item-producer">
                  Производитель:<span className="producer">Norma J.Baker</span>
                </p>

                <p className="item-price">21 830</p>

                <div className="sizes">
                  <p className="sizes__title">
                    Размеры в наличии:</p>

                  <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                </div>
              </div>
            </a>
            <a className="item-list__item-card item" href="product-card-desktop.html">
              <div className="item-pic">
                <img className="item-pic-10"
                  src="img/catalogue-pics/product-catalogue__item-10.png"
                  alt="Туфли женские" />

                <div className="product-catalogue__product_favorite">
                  <p></p>
                </div>
                <div className="arrow arrow_left"></div>
                <div className="arrow arrow_right"></div>
              </div>

              <div className="item-desc">
                <h4 className="item-name">Туфли женские</h4>

                <p className="item-producer">
                  Производитель:<span className="producer">Norma J.Baker</span>
                </p>

                <p className="item-price">20 830</p>

                <div className="sizes">
                  <p className="sizes__title">Размеры в наличии:</p>

                  <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                </div>
              </div>
            </a>
            <a className="item-list__item-card item" href="product-card-desktop.html">
              <div className="item-pic">
                <img className="item-pic-11" src="img/catalogue-pics/product-catalogue__item-11.png"
                  alt="Ботинки женские" />

                <div className="product-catalogue__product_favorite">
                  <p></p>
                </div>
                <div className="arrow arrow_left"></div>
                <div className="arrow arrow_right"></div>
              </div>
              <div className="item-desc">
                <h4 className="item-name">Ботинки женские</h4>

                <p className="item-producer">
                  Производитель:<span className="producer">Norma J.Baker</span>
                </p>

                <p className="item-price">26 240</p>

                <div className="sizes">
                  <p className="sizes__title">Размеры в наличии:</p>

                  <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                </div>
              </div>
            </a>
            <a className="item-list__item-card item" href="product-card-desktop.html">
              <div className="item-pic">
                <img className="item-pic-12"
                  src="img/catalogue-pics/product-catalogue__item-12.png"
                  alt="Туфли женские" />

                <div className="product-catalogue__product_favorite">
                  <p></p>
                </div>
                <div className="arrow arrow_left"></div>
                <div className="arrow arrow_right"></div>
              </div>
              <div className="item-desc">
                <h4 className="item-name">Туфли женские</h4>

                <p className="item-producer">
                  Производитель:<span className="producer">Vittorio Virgili</span>
                </p>

                <p className="item-price">17 750</p>

                <div className="sizes">
                  <p className="sizes__title">Размеры в наличии:</p>

                  <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                </div>
              </div>
            </a>
            <a className="item-list__item-card item" href="product-card-desktop.html">
              <div className="item-pic">
                <img className="item-pic-13"
                  src="img/catalogue-pics/product-catalogue__item-13.png"
                  alt="Ботинки женские" />

                <div className="product-catalogue__product_favorite">
                  <p></p>
                </div>
                <div className="arrow arrow_left"></div>
                <div className="arrow arrow_right"></div>
              </div>
              <div className="item-desc">
                <h4 className="item-name"> Ботинки женские</h4>

                <p className="item-producer">Производитель:<span className="producer">Loriblu</span>
                </p>

                <p className="item-price">24 700</p>

                <div className="sizes">
                  <p className="sizes__title">Размеры в наличии:</p>

                  <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                </div>
              </div>
            </a>
            <a className="item-list__item-card item" href="product-card-desktop.html">
              <div className="item-pic">
                <img className="item-pic-14"
                  src="img/catalogue-pics/product-catalogue__item-14.png"
                  alt="Босоножки женские" />

                <div className="product-catalogue__product_favorite">
                  <p></p>
                </div>
                <div className="arrow arrow_left"></div>
                <div className="arrow arrow_right"></div>
              </div>
              <div className="item-desc">
                <h4 className="item-name">Босоножки женские</h4>

                <p className="item-producer">Производитель:<span className="producer">Damlax</span>
                </p>

                <p className="item-price">18 520</p>

                <div className="sizes">
                  <p className="sizes__title">Размеры в наличии:</p>

                  <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                </div>
              </div>
            </a>
            <a className="item-list__item-card item" href="product-card-desktop.html">
              <div className="item-pic">
                <img className="item-pic-15"
                  src="img/catalogue-pics/product-catalogue__item-15.png"
                  alt="Балетки женские" />

                <div className="product-catalogue__product_favorite">
                  <p></p>
                </div>
                <div className="arrow arrow_left"></div>
                <div className="arrow arrow_right"></div>
              </div>
              <div className="item-desc">
                <h4 className="item-name">Балетки женские</h4>

                <p className="item-producer">
                  Производитель:<span className="producer">Ballin</span>
                </p>

                <p className="item-price">20 730</p>

                <div className="sizes">
                  <p className="sizes__title">Размеры в наличии:</p>

                  <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                </div>
              </div>
            </a>
          </section>


        </section>
      </main>

      <section className="product-catalogue__overlooked-slider">
        <h3>Вы смотрели:</h3>

        <div className="overlooked-slider">
          <div className="overlooked-slider__arrow overlooked-slider__arrow_left arrow"></div>
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
          <div className="overlooked-slider__arrow overlooked-slider__arrow_right arrow"></div>
        </div>
      </section>
    </div>
  )

}
export default Catalogue;



