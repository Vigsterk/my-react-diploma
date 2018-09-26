import React, { Component } from 'react';
import SideBar from "./CatalogueSideBar";
import Pagination from '../Pagination/Pagination';
import { Link } from 'react-router-dom';

class CatalogueProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pages: '',
      goods: '',
      page: 1,
      favoriteKeyData: localStorage.favoriteKey ? JSON.parse(localStorage.favoriteKey) : [],
    };
    this.loadCatalogue(this.props.urlParam);
  };

  componentWillUpdate(nextProps) {
    if (this.props.urlParam !== nextProps.urlParam) {
      this.loadCatalogue(nextProps.urlParam);
    };
  };
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
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  pageClick = (page) => (event) => {
    event.preventDefault();
    const pageUrlParam = this.props.urlParam ? this.props.urlParam + `page=${page}` : `page=${page}`;
    this.loadCatalogue(pageUrlParam);
    this.setState({
      page: page
    });
  };

  arrowClick = (value) => (event) => {
    event.preventDefault();
    const newPageNumber = this.state.page + value;
    if (newPageNumber < 1 || newPageNumber > this.state.pages) return;
    const pageUrlParam = this.props.urlParam ? this.props.urlParam + `page=${newPageNumber}` : `page=${newPageNumber}`;
    this.loadCatalogue(pageUrlParam);
    this.setState({
      page: newPageNumber
    });
  }

  checkActiveId(itemID) {
    let favoriteData = this.state.favoriteKeyData && this.state.favoriteKeyData;
    if (favoriteData.length > 0) {
      let result = favoriteData.find((el) => itemID === el.id);
      return result
    };
  };

  favoriteAdd = (event, itemID) => {
    event.preventDefault();
    let tempFavoriteKeyData = [...this.state.favoriteKeyData];
    let favoriteFilter = this.state.favoriteKeyData.filter((el) => itemID === el.id);
    if (favoriteFilter.length > 0 && favoriteFilter[0].id === itemID) {
      let removeData = this.state.favoriteKeyData.indexOf(favoriteFilter[0]);
      tempFavoriteKeyData.splice(removeData, 1);
      this.setState({
        favoriteKeyData: tempFavoriteKeyData
      });
      const serialTempData = JSON.stringify(tempFavoriteKeyData);
      localStorage.setItem("favoriteKey", serialTempData);
    } else {
      tempFavoriteKeyData.push(this.state.data.find((el) => itemID === el.id));
      this.setState({
        favoriteKeyData: tempFavoriteKeyData,
      });
      const serialTempData = JSON.stringify(tempFavoriteKeyData);
      localStorage.setItem("favoriteKey", serialTempData);
    };
  };

  render() {
    const { goods, pages, page, data } = this.state;
    const { setSortByFilter, setDiscountedParam, setFilterArrayParam, setFilterParam, clearFilters, filters } = this.props;
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
    );
  };
};

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeImg: this.props.images
    };
  };

  handleClick = (event) => this.props.func(event, this.props.id);

  itemArrowClickLeft = (event) => {
    event.preventDefault();
    const tempDataArr = [...this.state.activeImg];
    let firstImg = tempDataArr.shift();
    tempDataArr.push(firstImg);
    this.setState({
      activeImg: tempDataArr
    });
  };

  itemArrowClickRight = (event) => {
    event.preventDefault();
    const tempDataArr = [...this.state.activeImg];
    let lastImg = tempDataArr.pop();
    tempDataArr.unshift(lastImg);
    this.setState({
      activeImg: tempDataArr
    });
  };

  render() {
    const { id, title, isActive, brand, price, oldPrice } = this.props;
    return (
      <Link className="item-list__item-card item" to={`/productCard/${id}`}>
        <div className="item-pic">
          <img className="item-pic" src={this.state.activeImg[0]} alt={title} />)
          <div className='product-catalogue__product_favorite' onClick={this.handleClick}>
            <p className={isActive ? 'product-catalogue__product_favorite-chosen' : 'product-catalogue__product_favorite-icon'} ></p>
          </div>
          <div className="arrow arrow_left" onClick={this.itemArrowClickLeft} ></div>
          <div className="arrow arrow_right" onClick={this.itemArrowClickRight} ></div>
        </div>
        <div className="item-desc">
          <h4 className="item-name">{title}</h4>
          <p className="item-producer">Производитель: <span className="producer">{brand}</span></p>
          <p className="item-price">{price}</p>
          {oldPrice && <p className="item-price old-price"><s>{oldPrice}</s></p>}
        </div>
      </Link>
    );
  };
};

export default CatalogueProductList