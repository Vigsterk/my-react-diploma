import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SideBarSizeListItem from './SideBarSizeListItem';

class SideBarSize extends Component {

  static get propTypes() {
    return {
      func: PropTypes.func.isRequired,
      hiddenFilters: PropTypes.array.isRequired,
      setFilterArrayParam: PropTypes.func.isRequired,
      data: PropTypes.array.isRequired
    };
  };

  handleClick = () => this.props.func('Size');

  render() {
    return (
      <div className='sidebar__size'>
        <div className='sidebar__division-title'>
          <h3>Размер</h3>
          <div className={this.props.hiddenFilters.includes('Size') ? 'opener-up' : 'opener-down'} onClick={this.handleClick}></div>
        </div>
        <ul className={this.props.hiddenFilters.includes('Size') ? 'hidden' : 'sidebar-ul sidebar__size-list-ul'}>
          {this.props.data.map((size, index) =>
            <SideBarSizeListItem
              key={size}
              data={size}
              idx={index}
              hiddenFilters={this.props.hiddenFilters}
              setFilterArrayParam={this.props.setFilterArrayParam}
            />
          )}
        </ul>
      </div>
    );
  };
};

export default SideBarSize;