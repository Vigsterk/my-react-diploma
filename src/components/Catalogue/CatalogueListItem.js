import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeImg: this.props.images
    };
  };

  handleClick = (event) => this.props.func(event, this.props.id);

  itemArrowClickLeft = (event) => {
    event.preventDefault();
    const tempDataArr = [...this.state.activeImg];
    const firstImg = tempDataArr.shift();
    tempDataArr.push(firstImg);
    this.setState({
      activeImg: tempDataArr
    });
  };

  itemArrowClickRight = (event) => {
    event.preventDefault();
    const tempDataArr = [...this.state.activeImg];
    const lastImg = tempDataArr.pop();
    tempDataArr.unshift(lastImg);
    this.setState({
      activeImg: tempDataArr
    });
  };

  render() {
    const { id, title, isActive, brand, price, oldPrice } = this.props;
    return (
      <Link className="item-list__item-card item" to={`/productCard/${id}`}>
        <div className="item-pic">
          <img className="item-pic-img" src={this.state.activeImg[0]} alt={title} />
          <div className='product-catalogue__product_favorite' onClick={this.handleClick}>
            <p className={isActive ? 'product-catalogue__product_favorite-chosen' : 'product-catalogue__product_favorite-icon'} ></p>
          </div>
          <div className="arrow arrow_left" onClick={this.itemArrowClickLeft} ></div>
          <div className="arrow arrow_right" onClick={this.itemArrowClickRight} ></div>
        </div>
        <div className="item-desc">
          <h4 className="item-name">{title}</h4>
          <p className="item-producer">Производитель: <span className="producer">{brand}</span></p>
          <p className="item-price">{price}</p>
          {oldPrice && <p className="item-price old-price"><s>{oldPrice}</s></p>}
        </div>
      </Link>
    );
  };
};
export default ListItem;