import React, { Component } from 'react';
import sidebarColorData from './CatalogueItemsData';
import SideBarColorListItem from './SideBarColorListItem';
import PropTypes from 'prop-types';

class SideBarColor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: ''
    };
  };

  static get propTypes() {
    return {
      func: PropTypes.func.isRequired,
      hiddenFilters: PropTypes.array.isRequired,
      setFilterParam: PropTypes.func.isRequired,
    };
  };

  handleClick = () => this.props.func('Color');

  sideBarColorSettings = ({ name, value }, idx) => (event) => {
    event.preventDefault();
    this.props.setFilterParam({ name, value });
    this.setState({
      isActive: idx
    });
  };

  render() {
    return (
      <div className='sidebar__color'>
        <div className='sidebar__division-title'>
          <h3>Цвет</h3>
          <div className={this.props.hiddenFilters.includes('Color') ? 'opener-up' : 'opener-down'} onClick={this.handleClick}></div>
        </div>
        <ul className={this.props.hiddenFilters.includes('Color') ? 'hidden' : 'sidebar-ul sidebar__color-list-ul'}>
          {sidebarColorData.map((item, index) =>
            <SideBarColorListItem
              key={item.color}
              data={item}
              idx={index}
              isActive={this.state.isActive === index}
              func={this.sideBarColorSettings}
              hiddenFilters={this.props.hiddenFilters}
            />
          )}
        </ul>
      </div>
    );
  };
};

export default SideBarColor;