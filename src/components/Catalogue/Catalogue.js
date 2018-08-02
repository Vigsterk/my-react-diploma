import React, { Component } from 'react';
import './style-catalogue.css';
import SitePath from '../SitePath/SitePath'
import Pagination from '../Pagination/Pagination';
import { NavLink } from 'react-router-dom'
import { sidebarColorData, sidebarOccasionData, sidebarDivisionData } from "./CatalogueItemsData"

class Catalogue extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      sitepath: [
        {
          to: "/",
          title: "Главная"
        },
        {
          to: "/catalogue",
          title: "Каталог"
        },
        {
          to: "/",
          title: "Мужская обувь" //Какие категории отвечают за выборку мужская/женская и прочие?
        }],
      data: [],
      dataVault: [],
      page: 1,
      pages: "",
      favoriteData: []
    }

  }

  componentDidMount() {
    this.props.func(false)
    fetch(`https://neto-api.herokuapp.com/bosa-noga/products?page=${this.state.page}`, {
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
          pages: data.pages,
          dataVault: this.state.dataVault.concat(data),
        })
      })
      .catch(error => {
        console.log(error)
      });
  }

  changePage = (page) => {
    let loadPage = page;
    this.setState({
      page: loadPage
    })
    let dataVaultFilter = this.state.dataVault.filter((el) => loadPage === el.page);
    if (dataVaultFilter.length > 0) {
      this.setState({
        data: dataVaultFilter[0].data
      })
    } else {
      this.ReloadCatalogue(loadPage)
    }
  }

  ReloadCatalogue = (loadPage) => {
    fetch(`https://neto-api.herokuapp.com/bosa-noga/products?page=${loadPage}`, {
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
          dataVault: this.state.dataVault.concat(data)
        })
      })
      .catch(error => {
        console.log(error)
      });
  }

  favoriteAdd = (event, itemID) => {
    console.log("localStorage now", localStorage)
    console.log("Товар добавлен в избранное", itemID)
    event.preventDefault()
    let tempData = this.state.favoriteData.concat(this.state.data.filter((el) => itemID === el.id))
    this.setState({
      favoriteData: tempData
    })
    let serialfavoriteData = JSON.stringify(tempData);
    localStorage.setItem("favoriteKey", serialfavoriteData);
    console.log("localStorage now", localStorage)
  }

  render() {
    return (
      <div>
        <SitePath pathprops={this.state.sitepath} />
        <main className="product-catalogue">
          <SideBar />
          <section className="product-catalogue-content">
            <section className="product-catalogue__head">
              <div className="product-catalogue__section-title">
                <h2 className="section-name">Женская обувь</h2>
                <span className="amount"> 1 764 товара</span>
              </div>
              <div className="product-catalogue__sort-by">
                <p className="sort-by">Сортировать</p>
                <select name="" id="sorting">
                  <option value="">по популярности</option>
                  <option value="">по размеру</option>
                  <option value="">по производителю</option>
                </select>
              </div>
            </section>
            <section className="product-catalogue__item-list">
              {this.state.data.length > 0 && this.state.data.map(items =>
                <ListItem key={items.id}
                  id={items.id}
                  title={items.title}
                  images={items.images}
                  brand={items.brand}
                  price={items.price}
                  oldPrice={items.oldPrice}
                  func={this.favoriteAdd}
                />
              )}
              <OverlookedSlider />
            </section>
            {this.state.pages && <Pagination page={this.state.page} pages={this.state.pages} func={this.changePage} />}
          </section>
        </main>
      </div>
    )
  }
}

class ListItem extends Component {
  handleClick = (event) => this.props.func(event, this.props.id)
  render() {
    return (
      <NavLink key={this.props.id} className="item-list__item-card item" to={`productCard/${this.props.id}`}>
        <div className="item-pic">
          {this.props.images && this.props.images.map((item, index) =>
            <img key={index} className="item-pic" src={item} alt={this.props.title} />)}
          <div className="product-catalogue__product_favorite" onClick={this.handleClick}>
            <p className="product-catalogue__product_favorite-icon"></p>
          </div>
          <div className="arrow arrow_left" ></div>
          <div className="arrow arrow_right" ></div>
        </div>
        <div className="item-desc">
          <h4 className="item-name">{this.props.title}</h4>
          <p className="item-producer">Производитель: <span className="producer">{this.props.brand}</span></p>
          <p className="item-price">{this.props.price}</p>
          {this.props.oldPrice && <p className="item-price old-price"><s>{this.props.oldPrice}</s></p>}
          <div className="sizes" id="size">
            <p className="sizes__title">Размеры в наличии:</p>
            <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
          </div>
        </div>
      </NavLink>
    )
  }
}


class OverlookedSlider extends Component {
  render() {
    return (
      <section className="product-catalogue__overlooked-slider">
        <h3>Вы смотрели:</h3>
        <div className="overlooked-slider">
          <div className="overlooked-slider__arrow overlooked-slider__arrow_left arrow"></div>
          <div className="overlooked-slider__item overlooked-slider__item-1">
            <NavLink to="/productCard"></NavLink>
          </div>
          <div className="overlooked-slider__item overlooked-slider__item-2">
            <NavLink to="/productCard"></NavLink>
          </div>
          <div className="overlooked-slider__item overlooked-slider__item-3">
            <NavLink to="/productCard"></NavLink>
          </div>
          <div className="overlooked-slider__item overlooked-slider__item-4">
            <NavLink to="/productCard"></NavLink>
          </div>
          <div className="overlooked-slider__item overlooked-slider__item-5">
            <NavLink to="/productCard"></NavLink>
          </div>
          <div className="overlooked-slider__arrow overlooked-slider__arrow_right arrow"></div>
        </div>
      </section>
    )
  }
}

class SideBar extends Component {
  render() {
    return (
      <section className="sidebar">
        <section className="sidebar__division">
          <div className="sidebar__catalogue-list">
            <div className="sidebar__division-title">
              <h3>Каталог</h3>
              <div className="opener-down"></div>
            </div>
            <ul>
              {sidebarDivisionData.map((item, index) => <li key={index}><NavLink to="/">{item}</NavLink></li>)}
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
              {sidebarColorData.map(item => <li key={item.colorId}>
                <NavLink to="/">
                  <div className={`color ${item.color}`}></div>
                  <span className="color-name">{item.colorName}</span>
                </NavLink>
              </li>)}
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
              {sidebarOccasionData.map((item, index) => <li key={index}><NavLink to="/">{item}</NavLink></li>)}
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
            <NavLink to="/"><span className="drop-down-icon"></span>Сбросить</NavLink>
          </div>
        </section>
      </section>
    )
  }
}

export default Catalogue;