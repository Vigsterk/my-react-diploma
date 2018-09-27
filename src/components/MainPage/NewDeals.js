import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import DealsSlider from './DealsSlider'

class NewDeals extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productInfo: this.props.info,
      activeData: null
    }
  }

  loadProductInfo = (param) => {
    this.setState({
      productInfo: param
    })
  }

  setActiveCategory = (idx) => {
    const { categories, data } = this.props
    let activeCategoryFilter = data.filter((item) =>
      categories[idx].id === item.categoryId
    )
    if (activeCategoryFilter.length > 0) {
      this.setState({
        activeData: activeCategoryFilter
      })
    }
  }


  render() {
    return (
      <section className="new-deals wave-bottom">
        <h2 className="h2">Новинки</h2>
        <NewDealsMenu categories={this.props.categories} func={this.setActiveCategory} />
        <DealsSlider data={this.state.activeData ? this.state.activeData : this.props.data} infoFunc={this.loadProductInfo} />
        <ProductInfo info={this.state.productInfo} />
      </section>
    )
  }
}

class NewDealsMenu extends NewDeals {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: "",
    }
  }
  handleClick = (index) => {
    this.props.func(index)
    this.setState({
      activeIndex: index,
    })
  }
  render() {
    const { activeIndex } = this.state
    const { categories } = this.props
    return (
      <div className="new-deals__menu">
        <ul className="new-deals__menu-items">
          {categories.map((item, index) => <ListItem key={item.id}
            url={item.url}
            func={this.handleClick}
            title={item.title}
            isActive={activeIndex === index}
            idx={index} />)}
        </ul>
      </div>
    )
  }
}

class ListItem extends Component {
  handleClick = () => this.props.func(this.props.idx)
  render() {
    return (
      <li className={this.props.isActive ? 'new-deals__menu-item new-deals__menu-item_active' : 'new-deals__menu-item'}>
        <button className={this.props.isActive ? 'new-deals__item-button new-deals__item-button_active' : 'new-deals__item-button'} onClick={this.handleClick}>{this.props.title}</button>
      </li>)
  }
}

const ProductInfo = (props) => {
  return (
    <div className="new-deals__product-info">
      <Link to="productCard" className="h3">{props.info.title}</Link>
      <p>Производитель:
          <span>{props.info.brand}</span>
      </p>
      <h3 className="h3">{props.info.price}₽</h3>
    </div>
  )
}

export default NewDeals