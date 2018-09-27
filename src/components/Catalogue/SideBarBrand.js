import React, { Component } from 'react';

class SideBarBrand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: ''
    };
  };

  handleClick = () => this.props.func('Season');

  sideBarBrandSettings = (param, idx) => (event) => {
    event.preventDefault();
    this.props.setFilterParam(param);
    this.setState({
      isActive: idx
    });
  };

  render() {
    return (
      <div className='sidebar__brand'>
        <div className='sidebar__division-title'>
          <h3>Бренд</h3>
          <div className={this.props.hiddenFilters.includes('Brand') ? 'opener-up' : 'opener-down'} onClick={this.handleClick}></div>
          <ul className={this.props.hiddenFilters.includes('Brand') ? 'hidden' : 'sidebar-ul sidebar__brand-list-ul'} >
            {this.props.data.map((brand, index) =>
              <BrandSideBarListItem
                key={brand}
                data={brand}
                idx={index}
                isActive={this.state.isActive === index}
                func={this.sideBarBrandSettings}
                hiddenFilters={this.props.hiddenFilters}
              />
            )}
          </ul>
        </div>
      </div>
    );
  };
};

class BrandSideBarListItem extends Component {
  render() {
    const { hiddenFilters, func, isActive, data, idx } = this.props;
    return (
      <li className={hiddenFilters.includes('Brand') ? 'hidden' : 'sidebar-ul-li sidebar__brand-list-ul-li'} >
        <button className={isActive ? 'sidebar-button-active' : 'sidebar-button'} onClick={func({ name: 'brand', value: data }, idx)}>{data}</button>
      </li>
    );
  };
};

export default SideBarBrand;