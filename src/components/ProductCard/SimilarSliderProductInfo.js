import React, { Component } from 'react';

class ProductInfo extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className='similar-products-slider__item-desc'>
        <h4 className='similar-products-slider__item-name'>{data.title}</h4>
        <p className='similar-products-slider__item-producer'>Производитель: <span className='producer'>{data.brand}</span></p>
        <p className='similar-products-slider__item-price'>{data.price}</p>
      </div>
    );
  };
};

export default ProductInfo;