import React, { Component } from 'react';
import sidebarColorData from './CatalogueItemsData';

class SideBarColor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: ''
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
            <ColorSideBarListItem
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

class ColorSideBarListItem extends Component {
  render() {
    const { hiddenFilters, func, isActive, data, idx } = this.props;
    return (
      <li className={hiddenFilters.includes('Color') ? 'hidden' : 'sidebar-ul-li sidebar__color-list-ul-li'} >
        <button className={isActive ? 'sidebar-button-active' : 'sidebar-button'} onClick={func({ name: 'color', value: data.colorName }, idx)}>
          <div className={`color ${data.color}`}></div>
          <span className='color-name'>{data.colorName}</span>
        </button>
      </li>
    );
  };
};

export default SideBarColor;