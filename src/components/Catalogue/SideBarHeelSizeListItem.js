import React, { Component } from 'react';

class SideBarHeelSizeListItem extends Component {
  render() {
    const { data, hiddenFilters, setFilterArrayParam } = this.props;
    return (
      <li className={hiddenFilters.includes('HeelSize') ? 'hidden' : 'sidebar-ul-li sidebar__heelSize-list-ul-li'}>
        <label>
          <input type='checkbox'
            onChange={setFilterArrayParam}
            value={+data}
            name='heelSizes'
            className='checkbox'
          />
          <span className='checkbox-custom'></span>
          <span className='label'>{data}</span>
        </label>
      </li>
    );
  };
};

export default SideBarHeelSizeListItem;