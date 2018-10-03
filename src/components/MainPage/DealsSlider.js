import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.setState({
        data: this.props.data
      });
    };
  };

  favoriteAdd = (event, itemID) => {
    event.preventDefault();
    let tempFavoriteKeyData = [...this.state.favoriteKeyData];
    let favoriteFilter = this.state.favoriteKeyData.filter((el) => itemID === el.id);
    if (favoriteFilter.length > 0 && favoriteFilter[0].id === itemID) {
      let removeData = this.state.favoriteKeyData.indexOf(favoriteFilter[0]);
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
    let firstItem = tempDataArr.shift();
    tempDataArr.push(firstItem);
    this.setState({
      data: tempDataArr,
    });
    this.props.infoFunc(tempDataArr[1]);
  };

  moveRight = () => {
    const tempDataArr = [...this.state.data];
    let lastItem = tempDataArr.pop();
    tempDataArr.unshift(lastItem);
    this.setState({
      data: tempDataArr,
    });
    this.props.infoFunc(tempDataArr[1]);
  };

  checkActiveId(itemID) {
    let favoriteData = this.state.favoriteKeyData && this.state.favoriteKeyData;
    if (favoriteData.length > 0) {
      let result = favoriteData.find((el) => itemID === el.id);
      return result;
    };
  };

  render() {
    return (
      <div className="new-deals__slider">
        <div className="new-deals__arrow new-deals__arrow_left arrow" onClick={this.moveLeft}></div>
        <ProductFirst images={this.state.data[0].images[0]} id={this.state.data[0].id} />
        <ProductActive
          images={this.state.data[1].images[0]}
          func={this.favoriteAdd}
          id={this.state.data[1].id}
          isActive={this.checkActiveId(this.state.data[1].id)}
        />
        <ProductLast images={this.state.data[2].images[0]} id={this.state.data[2].id} />
        <div className="new-deals__arrow new-deals__arrow_right arrow" onClick={this.moveRight}></div>
      </div>
    );
  };
};

const ProductFirst = (props) => {
  return (
    <div className="new-deals__product new-deals__product_first">
      <Link className="new-deals__product_link" to={`productCard/${props.id}`}>
        <img className="new-deals__product_first_img" src={props.images} alt={"lastProduct"} />
      </Link>
    </div>
  );
};

class ProductActive extends Component {
  handleClick = (event) => this.props.func(event, this.props.id);
  render() {
    return (
      <div>
        <div className="new-deals__product new-deals__product_active">
          <Link className="new-deals__product_link" to={`productCard/${this.props.id}`}>
            <img className="new-deals__product_active_img" src={this.props.images} alt={"ActiveProduct"} />
          </Link>
          <div className={this.props.isActive ? "new-deals__product_favorite-chosen" : "new-deals__product_favorite"} onClick={this.handleClick}></div>
        </div>
      </div>
    );
  };
};

const ProductLast = (props) => {
  return (
    <div className="new-deals__product new-deals__product_last">
      <Link className="new-deals__product_link" to={`productCard/${props.id}`}>
        <img className="new-deals__product_last_img" src={props.images} alt={"LastProduct"} />
      </Link>
    </div>
  );
};

export default DealsSlider;