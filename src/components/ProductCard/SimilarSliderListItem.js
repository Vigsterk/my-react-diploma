import React, { Component } from 'react';
import ProductInfo from './SimilarSliderProductInfo';
import { Link } from 'react-router-dom';

class ProductFirst extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className='similar-products-slider__item-list__item-card item'>
        <div className='similar-products-slider__item'>
          <Link to={`/productCard/${data.id}`}>
            <img src={data.images[0]} className={`similar-products-slider__item-pic`} alt='firstPic' />
          </Link>
        </div>
        <ProductInfo data={this.props.data} />
      </div>
    );
  };
};

class ProductActive extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className='similar-products-slider__item-list__item-card item'>
        <div className='similar-products-slider__item'>
          <Link to={`/productCard/${data.id}`}>
            <img src={data.images[0]} className={`similar-products-slider__item-pic`} alt='activePic' />
          </Link>
        </div>
        <ProductInfo data={this.props.data} />
      </div>
    );
  };
};

class ProductLast extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className='similar-products-slider__item-list__item-card item'>
        <div className='similar-products-slider__item'>
          <Link to={`/productCard/${data.id}`}>
            <img src={data.images[0]} className={`similar-products-slider__item-pic`} alt='lastPic' />
          </Link>
        </div>
        <ProductInfo data={this.props.data} />
      </div>
    );
  };
};

export { ProductFirst, ProductActive, ProductLast };