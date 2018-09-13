import React, { Component } from 'react';
import './style-catalogue.css';
import '../css/normalize.css';
import '../css/font-awesome.min.css';
import '../css/style.css';
import SitePath from '../SitePath/SitePath'
import Pagination from '../Pagination/Pagination';
import { NavLink } from 'react-router-dom'
import sidebarColorData from "./CatalogueItemsData"
import OverlookedSlider from "../ProductCard/OverlookedSlider"

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
          to: this.props.catalogueParam ? `/catalogue/categoryId=${this.props.catalogueParam.id}` : '/catalogue/',
          title: this.props.catalogueParam ? this.props.catalogueParam.title : 'Каталог'
        }],
      data: [],
      dataVault: [],
      page: 1,
      pages: "",
      goods: "",
      favoriteKeyData: localStorage.favoriteKey ? JSON.parse(localStorage.favoriteKey) : [],
      activeFilter: this.props.filterParam,
      sortParam: "price",
      overlookedData: sessionStorage.overlookedKey ? JSON.parse(sessionStorage.overlookedKey) : [],
      //filters
      type: '',
      color: '',
      sizes: [],
      heelSizes: [],
      minPrice: 0,
      maxPrice: 60000,
      reason: '',
      season: '',
      brand: '',
      search: '',
      discounted: false,
    }
  }

  componentDidMount() {
    fetch(`https://api-neto.herokuapp.com/bosa-noga/products?${this.state.activeFilter}`, {
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


  setFilterParam = (param) => (event) => {
    console.log(param)
    if (event) event.preventDefault();
    if (this.state[param.name] === param.value) return;
    this.setState({ [param.name]: param.value });
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
    if (favoriteData.length > 0) {
      let result = favoriteData.find((el) => itemID === el.id)
      return result
    }
  }
  // SideBar вынести в отдельные файлы 
  render() {
    const { minPrice, maxPrice, goods, sitepath, sortParam, data, pages, overlookedData, page } = this.state
    return (
      <div>
        <SitePath pathprops={sitepath} />
        <main className="product-catalogue">
          <SideBar setFilterParam={this.setFilterParam} filters={this.props.filters} maxPrice={maxPrice} minPrice={minPrice} />
          <section className="product-catalogue-content">
            <section className="product-catalogue__head">
              <div className="product-catalogue__section-title">
                <h2 className="section-name">{this.props.catalogueParam ? this.props.catalogueParam.title : 'Каталог'}</h2>
                <span className="amount">{goods}</span>
              </div>
              <div className="product-catalogue__sort-by">
                <p className="sort-by">Сортировать</p>
                <select
                  name="sortBy"
                  value={sortParam}
                  onChange={this.setSortByFilter}
                  id="sorting">
                  <option value="popularity">по популярности</option>
                  <option value="price">по цене</option>
                </select>
              </div>
            </section>
            <section className="product-catalogue__item-list">
              {data.length > 0 && data.map(items =>
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
            </section>
            {pages && <Pagination page={page} pages={pages} func={this.changePage} />}
          </section>
          <div style={{ clear: 'both' }}></div>
        </main>
        {overlookedData.length > 0 && <OverlookedSlider data={overlookedData} />}
      </div>
    )
  }
}

class ListItem extends Component {
  handleClick = (event) => this.props.func(event, this.props.id)
  render() {
    return (
      <NavLink key={this.props.id} className="item-list__item-card item" to={`/productCard/${this.props.id}`}>
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
        </div>
      </NavLink>
    )
  }
}

class SideBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hiddenFilters: []
    }
    console.log(this.props)
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
    const { setFilterParam, minPrice, maxPrice, filters } = this.props
    return (
      <section className="sidebar">
        <section className="sidebar__division">
          <SideBarCatalogueList
            func={this.openerButton}
            hiddenFilters={this.state.hiddenFilters}
            setFilterParam={setFilterParam}
            data={filters.type}
          />
        </section>

        <div className="separator-150 separator-150-1"></div>
        <section className="sidebar__division">
          <SideBarPrice
            func={this.openerButton}
            hiddenFilters={this.state.hiddenFilters}
            setFilterParam={setFilterParam}
            maxPrice={maxPrice}
            minPrice={minPrice}
          />
        </section>

        <div className="separator-150 separator-150-2"></div>
        <section className="sidebar__division">
          <SideBarColor
            func={this.openerButton}
            hiddenFilters={this.state.hiddenFilters}
            setFilterParam={setFilterParam}
          />
        </section>

        <div className="separator-150 separator-150-3"></div>
        <section className="sidebar__division">
          <SideBarSize
            func={this.openerButton}
            hiddenFilters={this.state.hiddenFilters}
            setFilterParam={setFilterParam}
            data={filters.sizes}
          />
        </section>

        <div className="separator-150 separator-150-4"></div>
        <section className="sidebar__division">
          <SideBarHeelSize
            func={this.openerButton}
            hiddenFilters={this.state.hiddenFilters}
            setFilterParam={setFilterParam}
            data={filters.heelSize}
          />
        </section>

        <div className="separator-150 separator-150-5"></div>
        <section className="sidebar__division">
          <SideBarReason
            func={this.openerButton}
            hiddenFilters={this.state.hiddenFilters}
            setFilterParam={setFilterParam}
            data={filters.reason}
          />
        </section>

        <div className="separator-150 separator-150-6"></div>
        <section className="sidebar__division">
          <SideBarSeason
            func={this.openerButton}
            hiddenFilters={this.state.hiddenFilters}
            setFilterParam={setFilterParam}
            data={filters.season}
          />
        </section>

        <div className="separator-150 separator-150-7"></div>
        <section className="sidebar__division">
          <SideBarBrand
            setFilterParam={setFilterParam}
            data={filters.brand}
          />

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
  constructor(props) {
    super(props)
    this.state = {
      isActive: ''
    }
  }

  handleClick = () => this.props.func('CatalogueList')

  sideBarTypeSettings = (param, idx) => (event) => {
    event.preventDefault()
    this.props.setFilterParam(param)
    this.setState({
      isActive: idx
    })
  }

  render() {
    return (
      <div className="sidebar__catalogue-list">
        <div className="sidebar__division-title">
          <h3>Каталог</h3>
          <div className={this.props.hiddenFilters.includes('CatalogueList') ? 'opener-up' : 'opener-down'} onClick={this.handleClick}></div>
        </div>
        <ul className={this.props.hiddenFilters.includes('CatalogueList') ? 'hidden' : 'sidebar-ul sidebar__catalogue-list-ul'}>
          {this.props.data.map((type, index) =>
            <TypeSideBarListItem
              key={type}
              data={type}
              idx={index}
              isActive={this.state.isActive === index}
              func={this.sideBarTypeSettings}
              hiddenFilters={this.props.hiddenFilters}
            />
          )}
        </ul>
      </div>
    )
  }
}

class TypeSideBarListItem extends Component {
  render() {
    const { hiddenFilters, func, isActive, data, idx } = this.props
    return (
      <li className={hiddenFilters.includes('CatalogueList') ? 'hidden' : "sidebar-ul-li sidebar__catalogue-list-ul-li"} >
        <button className={isActive ? 'sidebar-button-active' : 'sidebar-button'} onClick={func({ name: 'type', value: `type=${data}` }, idx)}>{data}</button>
      </li>
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
  constructor(props) {
    super(props)
    this.state = {
      isActive: ''
    }
  }

  handleClick = () => this.props.func('Color')

  sideBarColorSettings = (param, idx) => (event) => {
    event.preventDefault()
    this.props.setFilterParam(param)
    this.setState({
      isActive: idx
    })
  }

  render() {
    return (
      <div className="sidebar__color">
        <div className="sidebar__division-title">
          <h3>Цвет</h3>
          <div className={this.props.hiddenFilters.includes('Color') ? 'opener-up' : 'opener-down'} onClick={this.handleClick}></div>
        </div>
        <ul className={this.props.hiddenFilters.includes('Color') ? 'hidden' : 'sidebar-ul sidebar__color-list-ul'}>
          {sidebarColorData.map((item, index) =>

            <ColorSideBarListItem
              key={item.color}
              data={item}
              idx={index}
              isActive={this.state.isActive === index}
              func={this.sideBarColorSettings}
              hiddenFilters={this.props.hiddenFilters}
            />
          )}
        </ul>
      </div>

    )
  }
}


class ColorSideBarListItem extends Component {
  render() {
    const { hiddenFilters, func, isActive, data, idx } = this.props
    return (
      <li className={hiddenFilters.includes('Color') ? 'hidden' : "sidebar-ul-li sidebar__color-list-ul-li"} >
        <button className={isActive ? 'sidebar-button-active' : 'sidebar-button'} onClick={func({ name: 'color', value: `color=${data.color}` }, idx)}>{data.color}
          <div className={`color ${data.color}`}></div>
          <span className="color-name">{data.colorName}</span>
        </button>
      </li>
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
          {this.props.data.map((size, index) =>

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
            {this.props.data.map((size, index) =>
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

class SideBarReason extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: ''
    }
  }

  handleClick = () => this.props.func('Reason')

  sideBarReasonSettings = (param, idx) => (event) => {
    event.preventDefault()
    this.props.setFilterParam(param)
    this.setState({
      isActive: idx
    })
  }

  render() {
    return (
      <div className="sidebar__occasion">
        <div className="sidebar__division-title">
          <h3>Повод</h3>
          <div className={this.props.hiddenFilters.includes('Reason') ? 'opener-up' : 'opener-down'} onClick={this.handleClick}></div>
        </div>
        <ul className={this.props.hiddenFilters.includes('Reason') ? 'hidden' : "sidebar-ul sidebar__ocassion-list-ul"}>
          {this.props.data.map((reason, index) =>
            <ReasonSideBarListItem
              key={reason}
              data={reason}
              idx={index}
              isActive={this.state.isActive === index}
              func={this.sideBarReasonSettings}
              hiddenFilters={this.props.hiddenFilters}
            />
          )}
        </ul>
      </div>
    )
  }
}

class ReasonSideBarListItem extends Component {
  render() {
    const { hiddenFilters, func, isActive, data, idx } = this.props
    return (
      <li className={hiddenFilters.includes('Reason') ? 'hidden' : "sidebar-ul-li sidebar__ocassion-list-ul-li"} >
        <button className={isActive ? 'sidebar-button-active' : 'sidebar-button'} onClick={func({ name: 'reason', value: `reason=${data}` }, idx)}>{data}</button>
      </li>
    )
  }
}

class SideBarSeason extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: ''
    }
  }

  handleClick = () => this.props.func('Season')

  sideBarSeasonSettings = (param, idx) => (event) => {
    event.preventDefault()
    this.props.setFilterParam(param)
    this.setState({
      isActive: idx
    })
  }

  render() {
    return (
      <div className="sidebar__season">
        <div className="sidebar__division-title">
          <h3>Сезон</h3>
          <div className={this.props.hiddenFilters.includes('Season') ? 'opener-up' : 'opener-down'} onClick={this.handleClick}></div>
          <ul className={this.props.hiddenFilters.includes('Season') ? 'hidden' : "sidebar-ul sidebar__season-list-ul"} >
            {this.props.data.map((season, index) =>
              <SeasonSideBarListItem
                key={season}
                data={season}
                idx={index}
                isActive={this.state.isActive === index}
                func={this.sideBarSeasonSettings}
                hiddenFilters={this.props.hiddenFilters}
              />
            )}
          </ul>
        </div>
      </div>
    )
  }
}

class SeasonSideBarListItem extends Component {
  render() {
    const { hiddenFilters, func, isActive, data, idx } = this.props
    return (
      <li className={hiddenFilters.includes('Season') ? 'hidden' : "sidebar-ul-li sidebar__season-list-ul-li"} >
        <button className={isActive ? 'sidebar-button-active' : 'sidebar-button'} onClick={func({ name: 'season', value: `season=${data}` }, idx)}>{data}</button>
      </li>
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