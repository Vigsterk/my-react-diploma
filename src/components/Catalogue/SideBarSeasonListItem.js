import React, { Component } from 'react';

class SideBarSeasonListItem extends Component {
  render() {
    const { hiddenFilters, func, isActive, data, idx } = this.props;
    return (
      <li className={hiddenFilters.includes('Season') ? 'hidden' : 'sidebar-ul-li sidebar__season-list-ul-li'} >
        <button className={isActive ? 'sidebar-button-active' : 'sidebar-button'} onClick={func({ name: 'season', value: data }, idx)}>{data}</button>
      </li>
    );
  };
};

export default SideBarSeasonListItem;