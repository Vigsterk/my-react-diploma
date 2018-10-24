import React, { Component } from "react";
import { Link } from "react-router-dom";

class ListItem extends Component {
  handleClick = () => this.props.func(this.props.id, this.props.size);
  render() {
    const { id, images, title, brand, size, amount, price } = this.props
    return (
      <div className="product-list__item">
        <Link to={`productCard/${id}`} className="product-list__pic_wrap">
          <img className="product-list__pic" src={images[0]} alt={title} />
          <p className="product-list__product">{title}, {brand}, размер: {size}, кол-во:{amount}.ед</p>
        </Link>
        <div className="product-list__fill"></div>
        <div className="product-list__price">
          {price}
          <i className="fa fa-rub" aria-hidden="true"></i>
        </div>
        <div className="product-list__deconste" onClick={this.handleClick}>
          <i className="fa fa-times" aria-hidden="true"></i>
        </div>
      </div>
    );
  };
};

export default ListItem;