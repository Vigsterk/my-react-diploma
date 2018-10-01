import React, { Component } from 'react';

class FavoriteSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteImage: this.props.sliderData.images
    };
  };

  componentDidUpdate(prevProps) {
    if (this.props.sliderData !== prevProps.sliderData) {
      this.setState({
        favoriteImage: this.props.sliderData.images
      });
    };
  };

  arrowUp = () => (event) => {
    event.preventDefault();
    const tempDataArr = [...this.props.sliderData.images];
    let firstItem = tempDataArr.shift();
    tempDataArr.push(firstItem);
    this.setState({
      favoriteImage: tempDataArr,
    });
    this.props.func(tempDataArr);
  };

  arrowDown = () => (event) => {
    event.preventDefault();
    const tempDataArr = [...this.props.sliderData.images];
    let lastItem = tempDataArr.pop();
    tempDataArr.unshift(lastItem);
    this.setState({
      favoriteImage: tempDataArr,
    });
    this.props.func(tempDataArr);
  };

  render() {
    const { sliderData } = this.props;
    const { favoriteImage } = this.state
    return (
      <section className="main-screen__favourite-product-slider" >
        {favoriteImage && <div className="favourite-product-slider">
          <div className="favourite-product-slider__arrow favourite-product-slider__arrow_up arrow-up" onClick={this.arrowUp}></div>
          <FirstImg img={favoriteImage[0]} title={sliderData.title} />
          {favoriteImage[1] && <SecondImg img={favoriteImage[1]} title={sliderData.title} />}
          {favoriteImage[2] && <LastImg img={favoriteImage[2]} title={sliderData.title} />}
          <div className="favourite-product-slider__arrow favourite-product-slider__arrow_down arrow-down" onClick={this.arrowDown}></div>
        </div>}
      </section>
    );
  };
};

const FirstImg = (props) => {
  return (
    <div className="favourite-product-slider__item">
      <img className="favorite-slider-img favourite-product-slider__item-1" src={props.img} alt={props.title} />
    </div>
  );
};

const SecondImg = (props) => {
  return (
    <div className="favourite-product-slider__item">
      <img className="favorite-slider-img favourite-product-slider__item-2" src={props.img} alt={props.title} />
    </div>
  );
};

const LastImg = (props) => {
  return (
    <div className="favourite-product-slider__item">
      <img className="favorite-slider-img favourite-product-slider__item-3" src={props.img} alt={props.title} />
    </div>
  );
};

export default FavoriteSlider;


