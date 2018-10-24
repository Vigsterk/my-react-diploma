import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SideBarHeelSizeListItem from './SideBarHeelSizeListItem';

class SideBarHeelSize extends Component {

  static get propTypes() {
    return {
      func: PropTypes.func.isRequired,
      hiddenFilters: PropTypes.array.isRequired,
      setFilterArrayParam: PropTypes.func.isRequired,
      data: PropTypes.array.isRequired
    };
  };

  handleClick = () => this.props.func('HeelSize');

  render() {
    return (
      <div className='sidebar__heel-height'>
        <div className='sidebar__division-title'>
          <h3>Размер каблука</h3>
          <div className={this.props.hiddenFilters.includes('HeelSize') ? 'opener-up' : 'opener-down'} onClick={this.handleClick}></div>
          <ul className={this.props.hiddenFilters.includes('HeelSize') ? 'hidden' : 'sidebar-ul sidebar__heelSize-list-ul'}>
            {this.props.data.map((size, index) =>
              <SideBarHeelSizeListItem
                key={size}
                data={size}
                idx={index}
                hiddenFilters={this.props.hiddenFilters}
                setFilterArrayParam={this.props.setFilterArrayParam}
              />
            )}
          </ul>
        </div>
      </div>
    );
  };
};

export default SideBarHeelSize;