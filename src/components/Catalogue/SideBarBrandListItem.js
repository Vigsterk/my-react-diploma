import React, { Component } from 'react';

class BrandSideBarListItem extends Component {
  render() {
    const { hiddenFilters, func, isActive, data, idx } = this.props;
    return (
      <li className={hiddenFilters.includes('Brand') ? 'hidden' : 'sidebar-ul-li sidebar__brand-list-ul-li'} >
        <button className={isActive ? 'sidebar-button-active' : 'sidebar-button'} onClick={func({ name: 'brand', value: data }, idx)}>{data}</button>
      </li>
    );
  };
};

export default BrandSideBarListItem;