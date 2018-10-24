import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ProductFirst, ProductActive, ProductLast } from './DealsSliderListItem';

class DealsSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      favoriteKeyData: localStorage.favoriteKey ? JSON.parse(localStorage.favoriteKey) : [],
    };
  };

  static get propTypes() {
    return {
      data: PropTypes.array.isRequired,
      infoFunc: PropTypes.func.isRequired
    };
  };

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.setState({
        data: this.props.data
      });
    };
  };

  favoriteAdd = (event, itemID) => {
    //Функция добавит товар в избранное если его там нет и удалит при повторном клике если есть
    event.preventDefault();
    const tempFavoriteKeyData = [...this.state.favoriteKeyData];
    const favoriteFilter = this.state.favoriteKeyData.filter((el) => itemID === el.id);
    if (favoriteFilter.length > 0 && favoriteFilter[0].id === itemID) {
      const removeData = this.state.favoriteKeyData.indexOf(favoriteFilter[0]);
      tempFavoriteKeyData.splice(removeData, 1);
      this.setState({
        favoriteKeyData: tempFavoriteKeyData
      });
      const serialTempData = JSON.stringify(tempFavoriteKeyData);
      localStorage.setItem("favoriteKey", serialTempData);
    } else {
      tempFavoriteKeyData.push(this.state.data.find((el) => itemID === el.id));
      this.setState({
        favoriteKeyData: tempFavoriteKeyData,
      });
      const serialTempData = JSON.stringify(tempFavoriteKeyData);
      localStorage.setItem("favoriteKey", serialTempData);
    };
  };

  moveLeft = () => {
    const tempDataArr = [...this.state.data];
    const firstItem = tempDataArr.shift();
    tempDataArr.push(firstItem);
    this.setState({
      data: tempDataArr,
    });
    this.props.infoFunc(tempDataArr[1]);
  };

  moveRight = () => {
    const tempDataArr = [...this.state.data];
    const lastItem = tempDataArr.pop();
    tempDataArr.unshift(lastItem);
    this.setState({
      data: tempDataArr,
    });
    this.props.infoFunc(tempDataArr[1]);
  };

  checkActiveId(itemID) {
    const favoriteData = this.state.favoriteKeyData && this.state.favoriteKeyData;
    if (favoriteData.length > 0) {
      const result = favoriteData.find((el) => itemID === el.id);
      return result;
    };
  };

  render() {
    const { data } = this.state
    return (
      <div className="new-deals__slider">
        <div className="new-deals__arrow new-deals__arrow_left arrow" onClick={this.moveLeft}></div>
        <ProductFirst images={data[0].images[0]} id={data[0].id} />
        <ProductActive
          images={data[1].images[0]}
          func={this.favoriteAdd}
          id={data[1].id}
          isActive={this.checkActiveId(data[1].id)}
        />
        <ProductLast images={data[2].images[0]} id={data[2].id} />
        <div className="new-deals__arrow new-deals__arrow_right arrow" onClick={this.moveRight}></div>
      </div>
    );
  };
};

export default DealsSlider;