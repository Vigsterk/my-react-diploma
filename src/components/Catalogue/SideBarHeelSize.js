import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
              <HeelSizeSideBarListItem
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

class HeelSizeSideBarListItem extends Component {
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

export default SideBarHeelSize;