import React, { Component } from 'react';
import './style-catalogue.css';
import SitePath from '../SitePath/SitePath'
import Pagination from '../Pagination/Pagination';
import { NavLink } from 'react-router-dom'
import { sidebarColorData, sidebarOccasionData, sidebarDivisionData, sidebarSizesData, sidebarSeasonsData, sidebarHeelSizesData } from "./CatalogueItemsData"

class Catalogue extends Component {
  constructor(props) {
    super(props)
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
          title: "Мужская обувь" //Передать через пропсы когда будет сделан переход по категориям и фильтрам {"id":12,"title":"Мужская обувь"},{"id":13,"title":"Женская обувь"},{"id":14,"title":"Обувь унисекс"},{"id":15,"title":"Детская обувь"}
        }],
      data: [],
      dataVault: [],
      page: 1,
      pages: "",
      goods: "",
      favoriteKeyData: localStorage.favoriteKey ? JSON.parse(localStorage.favoriteKey) : [],
      sortParam: "price"
    }
  }

  componentDidMount() {
    this.props.func(false)
    fetch(`https://api-neto.herokuapp.com/bosa-noga/products?page=${this.state.page}`, {
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
          data: data.data,
          pages: data.pages,
          goods: data.goods,
          dataVault: this.state.dataVault.concat(data),
        })
      })
      .catch(error => {
        console.log(error)
      });
  }

  setSortByFilter = (event) => {
    const sortValue = event.currentTarget.value
    console.log(sortValue)
    this.setState({
      sortParam: `${sortValue}`
    });
    this.reloadCatalogue(`sortBy=${sortValue}`)
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
      this.reloadCatalogue(`page=${loadPage}`)
    }
  }

  reloadCatalogue = (pageProps) => {
    fetch(`https://api-neto.herokuapp.com/bosa-noga/products?${pageProps}`, {
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
          data: data.data,
          dataVault: this.state.dataVault.concat(data)
        })
      })
      .catch(error => {
        console.log(error)
      });
  }

  favoriteAdd = (event, itemID) => {
    event.preventDefault()
    let tempFavoriteKeyData = [...this.state.favoriteKeyData]
    let favoriteFilter = this.state.favoriteKeyData.filter((el) => itemID === el.id);
    if (favoriteFilter.length > 0 && favoriteFilter[0].id === itemID) {
      let removeData = this.state.favoriteKeyData.indexOf(favoriteFilter[0])
      tempFavoriteKeyData.splice(removeData, 1)
      this.setState({
        favoriteKeyData: tempFavoriteKeyData
      })
      const serialTempData = JSON.stringify(tempFavoriteKeyData)
      localStorage.setItem("favoriteKey", serialTempData);
    } else {
      tempFavoriteKeyData.push(this.state.data.find((el) => itemID === el.id))
      this.setState({
        favoriteKeyData: tempFavoriteKeyData,
      })
      const serialTempData = JSON.stringify(tempFavoriteKeyData)
      localStorage.setItem("favoriteKey", serialTempData);
    }
  }

  checkActiveId(itemID) {
    let favoriteData = this.state.favoriteKeyData && this.state.favoriteKeyData
    let result = favoriteData.find((el) => itemID === el.id)
    return result
  }
  // SideBar и OverlookedSlider, вынести в отдельные файлы 
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
                <span className="amount">{this.state.goods}</span>
              </div>

              <div className="product-catalogue__sort-by">
                <p className="sort-by">Сортировать</p>
                <select
                  name="sortBy"
                  value={this.state.sortParam}
                  onChange={this.setSortByFilter}
                  id="sorting">
                  <option value="popularity">по популярности</option>
                  <option value="price">по цене</option>
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
                  isActive={this.checkActiveId(items.id)}
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
          <div className='product-catalogue__product_favorite' onClick={this.handleClick}>
            <p className={this.props.isActive ? 'product-catalogue__product_favorite-chosen' : 'product-catalogue__product_favorite-icon'} ></p>
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
            <p className="sizes__avalible">8, 10, 12, 14, 15, 16, 18, 20</p>
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
  constructor(props) {
    super(props)
    this.state = {
      hiddenFilters: []
    }
  }

  openerButton = (filterName) => {
    let filterIndex = this.state.hiddenFilters.findIndex((filter) => {
      return filter === filterName;
    });

    if (filterIndex === -1) {
      this.setState({
        hiddenFilters: [...this.state.hiddenFilters, filterName]
      });
    } else {
      this.setState({
        hiddenFilters: this.state.hiddenFilters.filter((item, index) => index !== filterIndex)
      });
    }
  }


  render() {
    return (
      <section className="sidebar">
        <section className="sidebar__division">
          <SideBarCatalogueList
            func={this.openerButton}
            hiddenFilters={this.state.hiddenFilters}
          />
        </section>

        <div className="separator-150 separator-150-1"></div>
        <section className="sidebar__division">
          <SideBarPrice
            func={this.openerButton}
            hiddenFilters={this.state.hiddenFilters}
          />
        </section>

        <div className="separator-150 separator-150-2"></div>
        <section className="sidebar__division">
          <SideBarColor
            func={this.openerButton}
            hiddenFilters={this.state.hiddenFilters}
          />
        </section>

        <div className="separator-150 separator-150-3"></div>
        <section className="sidebar__division">
          <SideBarSize
            func={this.openerButton}
            hiddenFilters={this.state.hiddenFilters}
          />
        </section>

        <div className="separator-150 separator-150-4"></div>
        <section className="sidebar__division">
          <SideBarHeelSize
            func={this.openerButton}
            hiddenFilters={this.state.hiddenFilters}
          />
        </section>

        <div className="separator-150 separator-150-5"></div>
        <section className="sidebar__division">
          <SideBarOcassion
            func={this.openerButton}
            hiddenFilters={this.state.hiddenFilters}
          />
        </section>

        <div className="separator-150 separator-150-6"></div>
        <section className="sidebar__division">
          <SideBarSeason
            func={this.openerButton}
            hiddenFilters={this.state.hiddenFilters}
          />
        </section>

        <div className="separator-150 separator-150-7"></div>
        <section className="sidebar__division">
          <SideBarBrand />

          <label>
            <input type="checkbox" className="checkbox" name="checkbox-disc" />
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

class SideBarCatalogueList extends Component {
  handleClick = () => this.props.func('CatalogueList')
  render() {
    return (
      <div className="sidebar__catalogue-list">
        <div className="sidebar__division-title">
          <h3>Каталог</h3>
          <div className={this.props.hiddenFilters.includes('CatalogueList') ? 'opener-up' : 'opener-down'} onClick={this.handleClick}></div>
        </div>
        <ul className={this.props.hiddenFilters.includes('CatalogueList') ? 'hidden' : 'sidebar-ul sidebar__catalogue-list-ul'}>
          {sidebarDivisionData.map((item, index) => <li className={this.props.hiddenFilters.includes('CatalogueList') ? 'hidden' : "sidebar-ul-li sidebar__catalogue-list-ul-li"} key={index}><NavLink to="/">{item}</NavLink></li>)}
        </ul>
      </div>
    )
  }
}

class SideBarPrice extends Component {
  constructor(props) {
    super(props)
    this.state = {
      minPriceValue: 1000,
      maxPriceValue: 30000
    }
  }
  handleClick = () => this.props.func('Price')

  setPrice = (value, event) => {
    if (event.target.className === "input-1") {
      this.setState({ minPriceValue: value });
    } else {
      this.setState({ maxPriceValue: value });
    }
  }

  render() {
    return (
      <div className="sidebar__price">
        <div className="sidebar__division-title">
          <h3>Цена</h3>
          <div className={this.props.hiddenFilters.includes('Price') ? 'opener-up' : 'opener-down'} onClick={this.handleClick}></div>
        </div>
        <div className={this.props.hiddenFilters.includes('Price') ? 'hidden' : "price-slider"}>
          <div className="circle-container">
            <input type="range" value={this.state.minPriceValue} min='0' max='90000' step='100'
              onChange={(event) => this.setPrice(event.target.value, event)} />
            <div className="circle-1"></div>
            <div className="line-white"></div>
            <div className="line-colored"></div>
            <div className="circle-2"></div>
          </div>

          <div className="counter">
            <input type="text" className="input-1" value={this.state.minPriceValue}
              onChange={(event) => this.setPrice(event.target.value, event)} />
            <div className="input-separator"></div>
            <input type="text" className="input-2" value={this.state.maxPriceValue}
              onChange={(event) => this.setPrice(event.target.value, event)} />

          </div>
        </div>
      </div>
    )
  }
}

class SideBarColor extends Component {
  handleClick = () => this.props.func('Color')
  render() {
    return (
      <div className="sidebar__color">
        <div className="sidebar__division-title">
          <h3>Цвет</h3>
          <div className={this.props.hiddenFilters.includes('Color') ? 'opener-up' : 'opener-down'} onClick={this.handleClick}></div>
        </div>
        <ul className={this.props.hiddenFilters.includes('Color') ? 'hidden' : 'sidebar-ul sidebar__color-list-ul'}>
          {sidebarColorData.map(item => <li className={this.props.hiddenFilters.includes('Color') ? 'hidden' : "sidebar-ul-li sidebar__color-list-ul-li"} key={item.colorId}>
            <NavLink to="/">
              <div className={`color ${item.color}`}></div>
              <span className="color-name">{item.colorName}</span>
            </NavLink>
          </li>)}
        </ul>
      </div>

    )
  }
}

class SideBarSize extends Component {
  handleClick = () => this.props.func('Size')
  render() {
    return (
      <div className="sidebar__size">
        <div className="sidebar__division-title">
          <h3>Размер</h3>
          <div className={this.props.hiddenFilters.includes('Size') ? 'opener-up' : 'opener-down'} onClick={this.handleClick}></div>
        </div>
        <ul className={this.props.hiddenFilters.includes('Size') ? 'hidden' : "sidebar-ul sidebar__size-list-ul"}>
          {sidebarSizesData.map((size, index) =>
            <li className={this.props.hiddenFilters.includes('Size') ? 'hidden' : "sidebar-ul-li sidebar__size-list-ul-li"} key={`${size}${index}`}>
              <label>
                <input type="checkbox" className="checkbox" name={`checkbox-size-${size}`} />
                <span className="checkbox-custom"></span>
                <span className="label">{size}</span>
              </label>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

class SideBarHeelSize extends Component {
  handleClick = () => this.props.func('HeelSize')
  render() {
    return (
      <div className="sidebar__heel-height">
        <div className="sidebar__division-title">
          <h3>Размер каблука</h3>
          <div className={this.props.hiddenFilters.includes('HeelSize') ? 'opener-up' : 'opener-down'} onClick={this.handleClick}></div>
          <ul className={this.props.hiddenFilters.includes('HeelSize') ? 'hidden' : "sidebar-ul sidebar__heelSize-list-ul"}>
            {sidebarHeelSizesData.map((size, index) =>
              <li className={this.props.hiddenFilters.includes('HeelSize') ? 'hidden' : "sidebar-ul-li sidebar__heelSize-list-ul-li"} key={`${size}${index}`}>
                <label>
                  <input type="checkbox" className="checkbox" name={`checkbox-size-${size}`} />
                  <span className="checkbox-custom"></span>
                  <span className="label">{size}</span>
                </label>
              </li>
            )}
          </ul>
        </div>
      </div>
    )
  }
}

class SideBarOcassion extends Component {
  handleClick = () => this.props.func('Ocassion')
  render() {
    return (
      <div className="sidebar__occasion">
        <div className="sidebar__division-title">
          <h3>Повод</h3>
          <div className={this.props.hiddenFilters.includes('Ocassion') ? 'opener-up' : 'opener-down'} onClick={this.handleClick}></div>
        </div>
        <ul className={this.props.hiddenFilters.includes('Ocassion') ? 'hidden' : "sidebar-ul sidebar__ocassion-list-ul"}>
          {sidebarOccasionData.map((item, index) => <li className={this.props.hiddenFilters.includes('Ocassion') ? 'hidden' : "sidebar-ul-li sidebar__ocassion-list-ul-li"} key={index}><NavLink to="/">{item}</NavLink></li>)}
        </ul>
      </div>
    )
  }
}

class SideBarSeason extends Component {
  handleClick = () => this.props.func('Season')
  render() {
    return (
      <div className="sidebar__season">
        <div className="sidebar__division-title">
          <h3>Сезон</h3>
          <div className={this.props.hiddenFilters.includes('Season') ? 'opener-up' : 'opener-down'} onClick={this.handleClick}></div>
          <ul className={this.props.hiddenFilters.includes('Season') ? 'hidden' : "sidebar-ul sidebar__season-list-ul"} >
            {sidebarSeasonsData.map((item, index) => <li className={this.props.hiddenFilters.includes('Season') ? 'hidden' : "sidebar-ul-li sidebar__season-list-ul-li"} key={index}><NavLink to="/">{item}</NavLink></li>)}
          </ul>
        </div>
      </div>
    )
  }
}

class SideBarBrand extends Component {
  render() {
    return (
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
    )
  }
}

export default Catalogue;