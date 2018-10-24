import React, { Component } from "react";
import topMenuData from "./HeaderData";
import { Link } from "react-router-dom";

class TopMenu extends Component {
  render() {
    return (
      <div className="top-menu">
        <div className="wrapper">
          <ul className="top-menu__items">
            {topMenuData.map(item =>
              <li key={item.id} className="top-menu__item">
                <Link to="/">{item.title}</Link>
              </li>)}
          </ul>
        </div>
      </div>
    );
  };
};

export default TopMenu;