import React, { Component } from 'react';
import './style-favorite.css';
import SitePath from '../SitePath/SitePath';
import { NavLink } from 'react-router-dom'
import Pagination from '../Pagination/Pagination';

class Favorite extends Component {
  constructor(props) {
    super(props)
    const favoriteKeyData = localStorage.favoriteKey ? JSON.parse(localStorage.favoriteKey) : [];
    console.log(favoriteKeyData)
    this.state = {
      sitepath: [
        {
          to: "/",
          title: "Главная"
        },
        {
          to: "/",
          title: "Избранное"
        }],
      favoriteData: favoriteKeyData,
      page: 1,
      pages: Math.ceil(favoriteKeyData.length / 12)
    }
  }

  componentDidMount() {
    this.props.func(false)
  }

  favoriteRemove = (event, itemID) => {
    event.preventDefault()
    let favoriteFilter = this.state.favoriteData.filter((item) => itemID === item.id);
    let tempfavoriteData = [...this.state.favoriteData]
    if (favoriteFilter.length > 0 && favoriteFilter[0].id === itemID) {
      let removeData = this.state.favoriteData.indexOf(favoriteFilter[0])
      tempfavoriteData.splice(removeData, 1)
      this.setState({
        favoriteData: tempfavoriteData,
        isActive: false,
        pages: Math.ceil(tempfavoriteData.length / 12)
      })
      const serialTempData = JSON.stringify(tempfavoriteData);
      localStorage.setItem("favoriteKey", serialTempData);
    }
  }

  GetNoun = (number, one, two, five, none) => {
    number = Math.abs(number);
    number %= 100;
    if (!number) {
      return none;
    }
    if (number >= 5 && number <= 20) {
      return five;
    }
    number %= 10;
    if (number === 1) {
      return one;
    }
    if (number >= 2 && number <= 4) {
      return two;
    }
    return five;
  }

  changePage = (page) => {
    this.setState({
      page: page
    })
  }

  render() {
    return (
      <div className="wrapper wrapper_favorite">
        <SitePath pathprops={this.state.sitepath} />
        <main className="product-catalogue product-catalogue_favorite">
          <section className="product-catalogue__head product-catalogue__head_favorite">
            <div className="product-catalogue__section-title">
              <h2 className="section-name">В вашем избранном</h2>
              <span className="amount amount_favorite">{this.state.favoriteData.length > 0 && this.state.favoriteData.length} {this.GetNoun(this.state.favoriteData.length, 'товар', 'товара', 'товаров', 'нет товаров')}</span>
            </div>
            <SortBy />
          </section>
          <section className="product-catalogue__item-list product-catalogue__item-list_favorite">
            {this.state.favoriteData.length > 0 && this.state.favoriteData.slice((this.state.page - 1) * 12, this.state.page * 12).map(items =>
              <ListItem key={items.id}
                id={items.id}
                title={items.title}
                images={items.images}
                brand={items.brand}
                price={items.price}
                oldPrice={items.oldPrice}
                func={this.favoriteRemove}
              />)}
          </section>
        </main>
        {this.state.pages && <Pagination page={this.state.page} pages={this.state.pages} func={this.changePage} />}
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

class SortBy extends Component {
  render() {
    return (
      <div className="product-catalogue__sort-by">
        <p className="sort-by">Сортировать</p>
        <select id="sorting" name="">
          <option value="">по дате добавления</option>
          <option value="">по размеру</option>
          <option value="">по производителю</option>
        </select>
      </div>
    )
  }
}

export default Favorite