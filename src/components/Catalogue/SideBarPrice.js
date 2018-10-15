import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SideBarPrice extends Component {
  constructor(props) {
    super(props);
    this.circle1 = null;
    this.circle2 = null;
    this.circleContainer = null;
    this.getRefs = {
      circle1: ref => this.circle1 = ref,
      circle2: ref => this.circle2 = ref,
      circleContainer: ref => this.circleContainer = ref
    };

    this.offset = 0;
    this.currentCircleClassName = '';
    this.blankElement = document.createElement('div');

    this.state = {
      circle1Left: 0,
      circle2Left: 215,
      hiddenFilters: this.props.hiddenFilters
    };
  };

  static get propTypes() {
    return {
      func: PropTypes.func.isRequired,
      hiddenFilters: PropTypes.array.isRequired,
      setFilterParam: PropTypes.func.isRequired,
      maxPrice: PropTypes.number.isRequired,
      minPrice: PropTypes.number.isRequired
    };
  };

  handleClick = () => this.props.func('Price');

  componentWillMount() {
    this.updateCirclesPositions(this.props);
  };

  componentWillReceiveProps(nextProps) {
    const { minPrice, maxPrice } = nextProps;
    if (this.props.minPrice !== minPrice || this.props.maxPrice !== maxPrice) {
      this.updateCirclesPositions(nextProps);
    };
  };

  updateCirclesPositions = (nextProps) => {
    const fixedMaxPriceValue = 100000;
    const { minPrice, maxPrice } = nextProps;
    const circle1Left = Math.round(215 * minPrice / fixedMaxPriceValue);
    const circle2Left = Math.round(215 * maxPrice / fixedMaxPriceValue);
    this.setState({ circle1Left, circle2Left });
  };

  onDragStart = (event) => {
    this.currentCircleClassName = event.currentTarget.className;
    this.offset = this.circleContainer.getBoundingClientRect().left + (event.clientX - event.currentTarget.getBoundingClientRect().left);
    event.dataTransfer.setDragImage(this.blankElement, 0, 0);
  }

  onDragOver = (event) => {
    event.preventDefault();
    if (this.currentCircleClassName === 'circle-1') {
      let circle1Left = event.clientX - this.offset;
      if (circle1Left < 0) circle1Left = 0;
      if (circle1Left > this.state.circle2Left) circle1Left = this.state.circle2Left;
      this.setState({ circle1Left });
    }

    if (this.currentCircleClassName === 'circle-2') {
      let circle2Left = event.clientX - this.offset;
      if (circle2Left > 215) circle2Left = 215;
      if (circle2Left < this.state.circle1Left) circle2Left = this.state.circle1Left;
      this.setState({ circle2Left });
    }
  }

  onDragEnd = (event) => {
    if (this.currentCircleClassName === 'circle-1') {
      this.setPriceLimit(this.state.circle1Left, 'minPrice');
    }

    if (this.currentCircleClassName === 'circle-2') {
      this.setPriceLimit(this.state.circle2Left, 'maxPrice');
    }
  }

  setPriceLimit = (circleLeft, priceType) => {
    const fixedMaxPriceValue = 100000;
    const value = Math.round(fixedMaxPriceValue * circleLeft / 215);
    this.props.setFilterParam({ name: priceType, value: +value });
  }

  onChangePriceLimit = (event) => {
    const { name, value } = event.currentTarget;
    if (+value > 100000 || +value < 0) return;
    this.props.setFilter({ name, value: +value })(event);
  }

  render() {
    const { circle1Left, circle2Left, hiddenFilters } = this.state;
    return (
      <section className='sidebar__division'>
        <div className='sidebar__price'>
          <div className='sidebar__division-title'>
            <h3>Цена</h3>
            <div className={hiddenFilters.includes('Price') ? 'opener-up' : 'opener-down'} onClick={this.handleClick}></div>
          </div>
          <div className={hiddenFilters.includes('Price') ? 'hidden' : 'price-slider'}>
            <div
              ref={this.getRefs.circleContainer}
              onDragOver={this.onDragOver}
              className='circle-container'>
              <div
                className='circle-1'
                draggable
                ref={this.getRefs.circle1}
                onDragStart={this.onDragStart}
                onDragEnd={this.onDragEnd}
                style={{ left: `${circle1Left}px` }}>
              </div>
              <div className='line-white'></div>
              <div className='line-colored' style={{ left: `${circle1Left + 12}px`, right: `${215 - circle2Left + 12}px` }} ></div>
              <div
                className='circle-2'
                ref={this.getRefs.circle2}
                draggable
                onDragStart={this.onDragStart}
                onDragEnd={this.onDragEnd}
                style={{ left: `${circle2Left}px` }}>
              </div>
            </div>
            <div className='counter'>
              <input onChange={this.onChangePriceLimit} type='number' name='minPrice' className='input-1' value={this.props.minPrice} />
              <div className='input-separator'></div>
              <input onChange={this.onChangePriceLimit} type='number' name='maxPrice' className='input-2' value={this.props.maxPrice} />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default SideBarPrice;