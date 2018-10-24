import React, { Component } from 'react';

class FirstImg extends Component {
  handleClick = () => this.props.selectImg(0)
  render() {
    const { img, title } = this.props
    return (
      <div className="favourite-product-slider__item">
        <img className="favorite-slider-img favourite-product-slider__item-1" src={img} alt={title} onClick={this.handleClick} />
      </div>
    );
  };
};

class SecondImg extends Component {
  handleClick = () => this.props.selectImg(1)
  render() {
    const { img, title } = this.props
    return (
      <div className="favourite-product-slider__item">
        <img className="favorite-slider-img favourite-product-slider__item-2" src={img} alt={title} onClick={this.handleClick} />
      </div>
    );
  };
};

class LastImg extends Component {
  handleClick = () => this.props.selectImg(2)
  render() {
    const { img, title } = this.props
    return (
      <div className="favourite-product-slider__item">
        <img className="favorite-slider-img favourite-product-slider__item-3" src={img} alt={title} onClick={this.handleClick} />
      </div>
    );
  };
};

export { FirstImg, SecondImg, LastImg };