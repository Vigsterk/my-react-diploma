import React, { Component } from "react";

class ListItem extends Component {
  handleClick = () => this.props.func(this.props.idx);
  render() {
    return (
      <li className={this.props.isActive ? 'new-deals__menu-item new-deals__menu-item_active' : 'new-deals__menu-item'}>
        <button className={this.props.isActive ? 'new-deals__item-button new-deals__item-button_active' : 'new-deals__item-button'} onClick={this.handleClick}>{this.props.title}</button>
      </li>)
  };
};

export default ListItem