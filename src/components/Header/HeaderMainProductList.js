import React, { Component } from "react";
import ListItem from './HeaderMainProductListItem';

class ProductList extends Component {
  render() {
    const { loadedCartItems } = this.props;
    return (
      <div className="basket-dropped__product-list product-list">
        {loadedCartItems.length > 0 && loadedCartItems.map(item =>
          <ListItem
            key={`${item.products.id}-${item.size}`}
            id={item.products.id}
            size={item.size}
            title={item.products.title}
            images={item.products.images}
            brand={item.products.brand}
            price={item.products.price * item.amount}
            amount={item.amount}
            func={this.props.removeFunc}
          />
        )}
      </div>
    );
  };
};

export default ProductList;