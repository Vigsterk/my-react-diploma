import React, { Component } from 'react';

class SideBarSizeListItem extends Component {
  render() {
    const { data, hiddenFilters, setFilterArrayParam } = this.props;
    return (
      <li className={hiddenFilters.includes('Size') ? 'hidden' : 'sidebar-ul-li sidebar__size-list-ul-li'}>
        <label>
          <input type='checkbox'
            onChange={setFilterArrayParam}
            value={+data}
            name='sizes'
            className='checkbox'
          />
          <span className='checkbox-custom'></span>
          <span className='label'>{data}</span>
        </label>
      </li>
    );
  };
};

export default SideBarSizeListItem;