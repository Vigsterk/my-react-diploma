import React, { Component } from 'react';
import PropTypes from 'prop-types';


class SideBarSeason extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: ''
    };
  };

  static get propTypes() {
    return {
      func: PropTypes.func.isRequired,
      hiddenFilters: PropTypes.array.isRequired,
      setFilterParam: PropTypes.func.isRequired,
      data: PropTypes.array.isRequired
    };
  };

  handleClick = () => this.props.func('Season');

  sideBarSeasonSettings = (param, idx) => (event) => {
    event.preventDefault();
    this.props.setFilterParam(param);
    this.setState({
      isActive: idx
    });
  };

  render() {
    return (
      <div className='sidebar__season'>
        <div className='sidebar__division-title'>
          <h3>Сезон</h3>
          <div className={this.props.hiddenFilters.includes('Season') ? 'opener-up' : 'opener-down'} onClick={this.handleClick}></div>
          <ul className={this.props.hiddenFilters.includes('Season') ? 'hidden' : 'sidebar-ul sidebar__season-list-ul'} >
            {this.props.data.map((season, index) =>
              <SeasonSideBarListItem
                key={season}
                data={season}
                idx={index}
                isActive={this.state.isActive === index}
                func={this.sideBarSeasonSettings}
                hiddenFilters={this.props.hiddenFilters}
              />
            )}
          </ul>
        </div>
      </div>
    );
  };
};

class SeasonSideBarListItem extends Component {
  render() {
    const { hiddenFilters, func, isActive, data, idx } = this.props;
    return (
      <li className={hiddenFilters.includes('Season') ? 'hidden' : 'sidebar-ul-li sidebar__season-list-ul-li'} >
        <button className={isActive ? 'sidebar-button-active' : 'sidebar-button'} onClick={func({ name: 'season', value: data }, idx)}>{data}</button>
      </li>
    );
  };
};

export default SideBarSeason;