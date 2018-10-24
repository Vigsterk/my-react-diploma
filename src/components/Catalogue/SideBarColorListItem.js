import React, { Component } from 'react';

class SideBarColorListItem extends Component {
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

export default SideBarColorListItem;