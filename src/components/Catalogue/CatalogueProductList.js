import React, { Component } from 'react';
import SideBar from "./CatalogueSideBar";
import Pagination from '../Pagination/Pagination';
import PropTypes from 'prop-types';
import ListItem from './CatalogueListItem';

class CatalogueProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pages: '',
      goods: '',
      page: 1,
      sortVal: 'price',
      favoriteKeyData: localStorage.favoriteKey ? JSON.parse(localStorage.favoriteKey) : [],
    };
    this.loadCatalogue(this.props.urlParam);
  };

  static get propTypes() {
    return {
      filterParam: PropTypes.string,
      catalogueParam: PropTypes.object,
      setDiscountedParam: PropTypes.func.isRequired,
      setFilterArrayParam: PropTypes.func.isRequired,
      setFilterParam: PropTypes.func.isRequired,
      filters: PropTypes.object.isRequired,
      filtersValue: PropTypes.object.isRequired,
      clearFilters: PropTypes.func.isRequired,
      urlParam: PropTypes.string
    };
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

  setSortByFilter = (event) => {
    const sortValue = event.currentTarget.value;
    const sortUrlParam = this.props.urlParam ? this.props.urlParam + `&sortBy=${sortValue}` : `sortBy=${sortValue}`;
    this.loadCatalogue(sortUrlParam);
    this.setState({
      urlParam: sortUrlParam,
      sortVal: sortValue,
    });
  };

  pageClick = (page) => (event) => {
    event.preventDefault();
    const pageUrlParam = this.props.urlParam ? this.props.urlParam + `&page=${page}` : `page=${page}`;
    this.loadCatalogue(pageUrlParam);
    this.setState({
      urlParam: pageUrlParam,
      page: page
    });
  };

  arrowClick = (value) => (event) => {
    event.preventDefault();
    const newPageNumber = this.state.page + value;
    if (newPageNumber < 1 || newPageNumber > this.state.pages) return;
    const pageUrlParam = this.props.urlParam ? this.props.urlParam + `&page=${newPageNumber}` : `page=${newPageNumber}`;
    this.loadCatalogue(pageUrlParam);
    this.setState({
      page: newPageNumber
    });
  };

  checkActiveId = (itemID) => {
    const favoriteData = this.state.favoriteKeyData && this.state.favoriteKeyData;
    if (favoriteData.length > 0) {
      const result = favoriteData.find((el) => itemID === el.id);
      return result
    };
  };

  favoriteAdd = (event, itemID) => {
    event.preventDefault();
    const tempFavoriteKeyData = [...this.state.favoriteKeyData];
    const favoriteFilter = this.state.favoriteKeyData.filter((el) => itemID === el.id);
    if (favoriteFilter.length > 0 && favoriteFilter[0].id === itemID) {
      const removeData = this.state.favoriteKeyData.indexOf(favoriteFilter[0]);
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
    const { goods, pages, page, data, sortVal } = this.state;
    const { setDiscountedParam, setFilterArrayParam, setFilterParam, clearFilters, filters, filtersValue, catalogueParam } = this.props;
    return (
      <main className="product-catalogue">
        <SideBar setFilterParam={setFilterParam} setFilterArrayParam={setFilterArrayParam} filtersValue={filtersValue}
          maxPrice={filters.maxPrice} minPrice={filters.minPrice} discounted={filters.discounted} setDiscountedParam={setDiscountedParam} clearFilters={clearFilters} />
        <section className="product-catalogue-content">
          <section className="product-catalogue__head">
            <div className="product-catalogue__section-title">
              <h2 className="section-name">{catalogueParam ? catalogueParam.activeCategory.title : 'Каталог'}</h2>
              <span className="amount">{goods}</span>
            </div>
            <div className="product-catalogue__sort-by">
              <p className="sort-by">Сортировать</p>
              <select
                name="sortBy"
                value={sortVal}
                onChange={this.setSortByFilter}
                id="sorting">
                <option value="popularity">по популярности</option>
                <option value="price">по цене</option>
              </select>
            </div>
          </section>
          {goods === 0 ?
            <section className="product-catalogue__item-list">
              <p className="product-catalogue__item-list_not-found">По вашему запросу товар не найден</p>
            </section> :
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
            </section>}
          {pages && <Pagination page={page} pages={pages} pageClick={this.pageClick} arrowClick={this.arrowClick} />}
        </section>
        <div style={{ clear: 'both' }}></div>
      </main>
    );
  };
};

export default CatalogueProductList;