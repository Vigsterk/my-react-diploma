import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DealsSlider from './DealsSlider';
import NewDealsMenu from './NewDealsMenu';
import PropTypes from 'prop-types';

class NewDeals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeData: null
    };
  };

  static get propTypes() {
    return {
      data: PropTypes.array,
      info: PropTypes.object,
      categories: PropTypes.array.isRequired
    };
  };

  loadProductInfo = (param) => {
    this.setState({
      productInfo: param
    });
  };

  setActiveCategory = (idx) => {
    const { categories, data } = this.props;
    const activeCategoryFilter = data.filter((item) => categories[idx].id === item.categoryId);
    if (activeCategoryFilter.length > 0) {
      this.setState({
        activeData: activeCategoryFilter
      });
    };
  };

  render() {
    return (
      <section className="new-deals wave-bottom">
        <h2 className="h2">Новинки</h2>
        <NewDealsMenu categories={this.props.categories} func={this.setActiveCategory} />
        <DealsSlider data={this.state.activeData ? this.state.activeData : this.props.data} infoFunc={this.loadProductInfo} />
        <ProductInfo info={this.props.info} />
      </section>
    );
  };
};

const ProductInfo = (props) => {
  return (
    <div className="new-deals__product-info">
      <Link to="productCard" className="h3">{props.info.title}</Link>
      <p>Производитель:
          <span>{props.info.brand}</span>
      </p>
      <h3 className="h3">{props.info.price}₽</h3>
    </div>
  );
};

export default NewDeals;