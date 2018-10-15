import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SideBarReason extends Component {
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

  handleClick = () => this.props.func('Reason');

  sideBarReasonSettings = (param, idx) => (event) => {
    event.preventDefault();
    this.props.setFilterParam(param);
    this.setState({
      isActive: idx
    });
  };

  render() {
    return (
      <div className='sidebar__occasion'>
        <div className='sidebar__division-title'>
          <h3>Повод</h3>
          <div className={this.props.hiddenFilters.includes('Reason') ? 'opener-up' : 'opener-down'} onClick={this.handleClick}></div>
          <ul className={this.props.hiddenFilters.includes('Reason') ? 'hidden' : 'sidebar-ul sidebar__ocassion-list-ul'}>
            {this.props.data.map((reason, index) =>
              <ReasonSideBarListItem
                key={reason}
                data={reason}
                idx={index}
                isActive={this.state.isActive === index}
                func={this.sideBarReasonSettings}
                hiddenFilters={this.props.hiddenFilters}
              />
            )}
          </ul>
        </div>
      </div>
    );
  };
};

class ReasonSideBarListItem extends Component {
  render() {
    const { hiddenFilters, func, isActive, data, idx } = this.props;
    return (
      <li className={hiddenFilters.includes('Reason') ? 'hidden' : 'sidebar-ul-li sidebar__ocassion-list-ul-li'} >
        <button className={isActive ? 'sidebar-button-active' : 'sidebar-button'} onClick={func({ name: 'reason', value: data }, idx)}>{data}</button>
      </li>
    );
  };
};

export default SideBarReason;