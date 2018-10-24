import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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

export { ProductFirst, ProductActive, ProductLast };