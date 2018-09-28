import React, { Component } from 'react';

class FavoriteSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: this.props.data,
      favoriteImage: this.props.data.images,
      func: this.props.func
    };
  };

  arrowUp = () => {
    const tempDataArr = [...this.state.favoriteImage];
    let firstItem = tempDataArr.shift();
    tempDataArr.push(firstItem);
    this.setState({
      favoriteImage: tempDataArr,
    });
    this.state.func(tempDataArr);
  };

  arrowDown = () => {
    const tempDataArr = [...this.state.favoriteImage];
    let lastItem = tempDataArr.pop();
    tempDataArr.unshift(lastItem);
    this.setState({
      favoriteImage: tempDataArr,
    });
    this.state.func(tempDataArr);
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      favorite: nextProps.data,
      favoriteImage: nextProps.data.images,
    });
  };

  render() {
    const { favoriteImage, favorite } = this.state;
    return (
      <section className="main-screen__favourite-product-slider" >
        <div className="favourite-product-slider">
          <div className="favourite-product-slider__arrow favourite-product-slider__arrow_up arrow-up" onClick={this.arrowUp}></div>
          <FirstImg img={favoriteImage[0]} title={favorite.title} />
          {favoriteImage[1] && <SecondImg img={favoriteImage[1]} title={favorite.title} />}
          {favoriteImage[2] && <LastImg img={favoriteImage[2]} title={favorite.title} />}
          <div className="favourite-product-slider__arrow favourite-product-slider__arrow_down arrow-down" onClick={this.arrowDown}></div>
        </div>
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