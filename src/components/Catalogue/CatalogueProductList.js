import React, { Component } from 'react';
import SideBar from "./CatalogueSideBar"
import Pagination from '../Pagination/Pagination';
import { NavLink } from 'react-router-dom'

class CatalogueProductList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      pages: '',
      goods: '',
      page: 1,
      favoriteKeyData: localStorage.favoriteKey ? JSON.parse(localStorage.favoriteKey) : [],
    }
    this.loadCatalogue(this.props.urlParam)
  }


  componentWillUpdate(nextProps) {
    if (this.props.urlParam !== nextProps.urlParam) {
      this.loadCatalogue(nextProps.urlParam)
    }
  }
  loadCatalogue = (urlParam) => {
    fetch(`https://api-neto.herokuapp.com/bosa-noga/products?${urlParam}`, {
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
        })
      })
      .catch(error => {
        console.log(error)
      });
  }


  pageClick = (page) => (event) => {
    event.preventDefault();
    this.setState({
      page: page
    });
  }

  arrowClick = (value) => (event) => {
    event.preventDefault();
    const newPageNumber = this.state.page + value;
    if (newPageNumber < 1 || newPageNumber > this.state.pages) return;
    this.setState({
      page: newPageNumber
    });
  }

  checkActiveId(itemID) {
    let favoriteData = this.state.favoriteKeyData && this.state.favoriteKeyData
    if (favoriteData.length > 0) {
      let result = favoriteData.find((el) => itemID === el.id)
      return result
    }
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

  render() {
    const { goods, pages, page, data } = this.state
    const { setSortByFilter, setDiscountedParam, setFilterArrayParam, setFilterParam, clearFilters, filters } = this.props

    return (
      <main className="product-catalogue">
        <SideBar setFilterParam={setFilterParam} setFilterArrayParam={setFilterArrayParam} filtersValue={this.props.filtersValue} maxPrice={filters.maxPrice} minPrice={filters.minPrice} discounted={filters.discounted} setDiscountedParam={setDiscountedParam} clearFilters={clearFilters} />
        <section className="product-catalogue-content">
          <section className="product-catalogue__head">
            <div className="product-catalogue__section-title">
              <h2 className="section-name">{this.props.catalogueParam ? this.props.catalogueParam.activeCategory.title : 'Каталог'}</h2>
              <span className="amount">{goods}</span>
            </div>
            <div className="product-catalogue__sort-by">
              <p className="sort-by">Сортировать</p>
              <select
                name="sortBy"
                value={filters.sortVal}
                onChange={setSortByFilter}
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
          {pages && <Pagination page={page} pages={pages} pageClick={this.pageClick} arrowClick={this.arrowClick} />}
        </section>
        <div style={{ clear: 'both' }}></div>
      </main>
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

export default CatalogueProductList