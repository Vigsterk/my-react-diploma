import React, { Component } from 'react';

class SideBarCatalogueListItem extends Component {
  render() {
    const { hiddenFilters, func, isActive, data, idx } = this.props;
    return (
      <li className={hiddenFilters.includes('CatalogueList') ? 'hidden' : 'sidebar-ul-li sidebar__catalogue-list-ul-li'} >
        <button className={isActive ? 'sidebar-button-active' : 'sidebar-button'} onClick={func({ name: 'shoesType', value: `${data}` }, idx)}>{data}</button>
      </li>
    );
  };
};

export default SideBarCatalogueListItem;