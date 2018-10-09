import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FavoriteSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteImage: this.props.sliderData.images
    };
    //console.log('Favorite Slider', this.props)
  };

  static get propTypes() {
    return {
      func: PropTypes.func.isRequired,
      sliderData: PropTypes.object.isRequired,
    };
  };

  componentDidUpdate(prevProps) {
    if (this.props.sliderData !== prevProps.sliderData) {
      this.setState({
        favoriteImage: this.props.sliderData.images
      });
    };
  };

  arrowUp = () => {
    const tempDataArr = [...this.state.favoriteImage];
    const firstItem = tempDataArr.shift();
    tempDataArr.push(firstItem);
    this.setState({
      favoriteImage: tempDataArr,
    });
    this.props.func(tempDataArr);
  };

  selectImg = (idx) => {
    const tempDataArr = [...this.state.favoriteImage];
    const selectItem = tempDataArr[idx];
    const firstItem = tempDataArr.shift(selectItem);
    tempDataArr.push(firstItem);
    this.setState({
      favoriteImage: tempDataArr,
    });
    this.props.func(tempDataArr);
  };

  arrowDown = () => {
    const tempDataArr = [...this.state.favoriteImage];
    const lastItem = tempDataArr.pop();
    tempDataArr.unshift(lastItem);
    this.setState({
      favoriteImage: tempDataArr,
    });
    this.props.func(tempDataArr);
  };

  render() {
    const { sliderData } = this.props;
    const { favoriteImage } = this.state;
    return (
      <section className="main-screen__favourite-product-slider" >
        {favoriteImage && <div className="favourite-product-slider">
          <div className="favourite-product-slider__arrow favourite-product-slider__arrow_up arrow-up" onClick={this.arrowUp}></div>
          <FirstImg img={favoriteImage[0]} title={sliderData.title} selectImg={this.selectImg} />
          {favoriteImage[1] && <SecondImg img={favoriteImage[1]} title={sliderData.title} selectImg={this.selectImg} />}
          {favoriteImage[2] && <LastImg img={favoriteImage[2]} title={sliderData.title} selectImg={this.selectImg} />}
          <div className="favourite-product-slider__arrow favourite-product-slider__arrow_down arrow-down" onClick={this.arrowDown}></div>
        </div>}
      </section>
    );
  };
};

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

export default FavoriteSlider;


