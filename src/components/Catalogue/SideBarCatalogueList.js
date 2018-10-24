import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SideBarCatalogueListItem from './SideBarCatalogueListItem';

class SideBarCatalogueList extends Component {
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

  handleClick = () => this.props.func('CatalogueList');

  sideBarShoesTypeSettings = ({ name, value }, idx) => (event) => {
    event.preventDefault();
    this.props.setFilterParam({ name, value });
    this.setState({
      isActive: idx
    });
  };

  render() {
    return (
      <div className='sidebar__catalogue-list'>
        <div className='sidebar__division-title'>
          <h3>Каталог</h3>
          <div className={this.props.hiddenFilters.includes('CatalogueList') ? 'opener-up' : 'opener-down'} onClick={this.handleClick}></div>
        </div>
        <ul className={this.props.hiddenFilters.includes('CatalogueList') ? 'hidden' : 'sidebar-ul sidebar__catalogue-list-ul'}>
          {this.props.data.map((shoesType, index) =>
            <SideBarCatalogueListItem
              key={shoesType}
              data={shoesType}
              idx={index}
              isActive={this.state.isActive === index}
              func={this.sideBarShoesTypeSettings}
              hiddenFilters={this.props.hiddenFilters}
            />
          )}
        </ul>
      </div>
    );
  };
};

export default SideBarCatalogueList;