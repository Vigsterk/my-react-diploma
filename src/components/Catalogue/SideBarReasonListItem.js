import React, { Component } from 'react';

class SideBarReasonListItem extends Component {
  render() {
    const { hiddenFilters, func, isActive, data, idx } = this.props;
    return (
      <li className={hiddenFilters.includes('Reason') ? 'hidden' : 'sidebar-ul-li sidebar__ocassion-list-ul-li'} >
        <button className={isActive ? 'sidebar-button-active' : 'sidebar-button'} onClick={func({ name: 'reason', value: data }, idx)}>{data}</button>
      </li>
    );
  };
};

export default SideBarReasonListItem;