import React, { Component } from "react";
import { mainSubmenuVisibility } from "../js/script";

class CategoriesList extends Component {
  handleClick = () => this.props.func(this.props.id, this.props.title);
  render() {
    return (
      <li className="main-menu__item" onClick={mainSubmenuVisibility}>
        {<button className="main-menu__item_button" onClick={this.handleClick}>{this.props.title}</button>}
      </li>
    );
  };
};

export default CategoriesList;