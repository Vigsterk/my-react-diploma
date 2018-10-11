import React, { Component } from 'react';
import './style-product-card.css';
import '../css/normalize.css';
import '../css/font-awesome.min.css';
import '../css/style.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class OverlookedSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overlookedData: this.props.overlookedData,
    };
    //console.log('OverLookedSlider Props',this.props)
  };

  static get propTypes() {
    return {
      overlookedData: PropTypes.array
    };
  };

  componentDidUpdate(prevProps) {
    if (this.props.overlookedData !== prevProps.overlookedData) {
      this.setState({
        overlookedData: this.props.overlookedData
      });
    };
  };

  moveLeft = () => {
    const tempDataArr = [...this.state.overlookedData];
    const firstItem = tempDataArr.shift();
    tempDataArr.push(firstItem);
    this.setState({
      overlookedData: tempDataArr,
    });
  };

  moveRight = () => {
    const tempDataArr = [...this.state.overlookedData];
    const lastItem = tempDataArr.pop();
    tempDataArr.unshift(lastItem);
    this.setState({
      overlookedData: tempDataArr,
    });
  };

  render() {
    const { overlookedData } = this.state;
    return (
      <section className="product-card__overlooked-slider">
        <h3>Вы смотрели:</h3>
        <div className="overlooked-slider">
          {overlookedData.length > 5 && <div className="overlooked-slider__arrow overlooked-slider__arrow_left arrow" onClick={this.moveLeft} />}
          <OverlookedItem1 data={overlookedData} />
          <OverlookedItem2 data={overlookedData} />
          <OverlookedItem3 data={overlookedData} />
          <OverlookedItem4 data={overlookedData} />
          <OverlookedItem5 data={overlookedData} />
          {overlookedData.length > 5 && <div className="overlooked-slider__arrow overlooked-slider__arrow_right arrow" onClick={this.moveRight} />}
        </div>
      </section>
    );
  };
};

const OverlookedItem1 = (props) => {
  const item = props.data[0];
  return (
    <div className={`overlooked-slider__item`}>
      {props.data.length > 0 && <Link className={`overlooked-slider__item-link`} to={`/productCard/${item.id}`}>
        <img src={item.images[0]} className={`overlooked-slider__item-pic`} alt="overlookedPic" />
      </Link>}
    </div>
  );
};

const OverlookedItem2 = (props) => {
  const item = props.data[1];
  return (
    <div className={`overlooked-slider__item`}>
      {props.data.length > 1 && <Link className={`overlooked-slider__item-link`} to={`/productCard/${item.id}`}>
        <img src={item.images[0]} className={`overlooked-slider__item-pic`} alt="overlookedPic" />
      </Link>}
    </div>
  );
};

const OverlookedItem3 = (props) => {
  const item = props.data[2];
  return (
    <div className={`overlooked-slider__item`}>
      {props.data.length > 2 && <Link className={`overlooked-slider__item-link`} to={`/productCard/${item.id}`}>
        <img src={item.images[0]} className={`overlooked-slider__item-pic`} alt="overlookedPic" />
      </Link>}
    </div>
  );
};

const OverlookedItem4 = (props) => {
  const item = props.data[3];
  return (
    <div className={`overlooked-slider__item`}>
      {props.data.length > 3 && <Link className={`overlooked-slider__item-link`} to={`/productCard/${item.id}`}>
        <img src={item.images[0]} className={`overlooked-slider__item-pic`} alt="overlookedPic" />
      </Link>}
    </div>
  );
};

const OverlookedItem5 = (props) => {
  const item = props.data[4];
  return (
    <div className={`overlooked-slider__item`}>
      {props.data.length > 4 && <Link className={`overlooked-slider__item-link`} to={`/productCard/${item.id}`}>
        <img src={item.images[0]} className={`overlooked-slider__item-pic`} alt="overlookedPic" />
      </Link>}
    </div>
  );
};

export default OverlookedSlider;