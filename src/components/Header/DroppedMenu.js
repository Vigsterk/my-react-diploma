import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

class DroppedMenu extends Component {

  static get propTypes() {
    return {
      filters: PropTypes.object.isRequired,
      filterLoader: PropTypes.func,
      activeCategory: PropTypes.object,
    };
  };

  getMenuItems = (type) => {
    const { filters, activeCategory, filterLoader } = this.props;
    if (!filters || !filters[type]) {
      return null;
    } else {
      return filters[type].map(name => (
        <li key={name} className="dropped-menu__item">
          <Link to={`/catalogue/`} onClick={filterLoader({ activeCategory, type, name })}>{name}</Link>
        </li>
      ));
    }
  };

  render() {
    return (
      <div className="dropped-menu">
        <div className="wrapper">
          <div className="dropped-menu__lists dropped-menu__lists_women">
            <h3 className="dropped-menu__list-title">Повод:</h3>
            <ul className="dropped-menu__list">
              {this.getMenuItems('reason')}
            </ul>
          </div>
          <div className="dropped-menu__lists">
            <h3 className="dropped-menu__list-title">Категории:</h3>
            <ul className="dropped-menu__list">
              {this.getMenuItems('type')}
            </ul>
          </div>
          <div className="dropped-menu__lists">
            <h3 className="dropped-menu__list-title">Сезон:</h3>
            <ul className="dropped-menu__list">
              {this.getMenuItems('season')}
            </ul>
          </div>
          <div className="dropped-menu__lists dropped-menu__lists_three-coloumns">
            <h3 className="dropped-menu__list-title">Бренды:</h3>
            <ul className="dropped-menu__list">
              {this.getMenuItems('brand')}
            </ul>
          </div>
        </div>
      </div>
    );
  };
};

export default DroppedMenu;