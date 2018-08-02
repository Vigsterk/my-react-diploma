import React, { Component } from 'react';
import './style-favorite.css';
import SitePath from '../SitePath/SitePath';
import { NavLink } from 'react-router-dom'

class Favorite extends Component {
  constructor(props) {
    super(props)
    console.log(localStorage)
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
      favoriteData: JSON.parse(localStorage.getItem("favoriteKey"))
    }

  }
  componentDidMount() {
    this.props.func(false)
  }

  favoriteRemove = (event, itemID) => {
    event.preventDefault()
    let favoriteFilter = this.state.favoriteData.filter((el) => itemID === el.id);
    let tempData = this.state.favoriteData.indexOf(favoriteFilter[0])
    let tempFavoriteData = [...this.state.favoriteData]
    tempFavoriteData.splice(tempData, 1)
    this.setState({
      favoriteData: tempFavoriteData
    })
    localStorage.setItem("favoriteKey", tempFavoriteData);
  }

  render() {
    console.log(this.state.favoriteData)
    return (
      <div className="wrapper wrapper_favorite">
        <SitePath pathprops={this.state.sitepath} />
        <main className="product-catalogue product-catalogue_favorite">
          <section className="product-catalogue__head product-catalogue__head_favorite">
            <div className="product-catalogue__section-title">
              <h2 className="section-name">В вашем избранном</h2>
              <span className="amount amount_favorite">{this.state.favoriteData.length}</span>
            </div>
            <SortBy />
          </section>
          <section className="product-catalogue__item-list product-catalogue__item-list_favorite">
            {this.state.favoriteData.length > 0 && this.state.favoriteData.map(items =>
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