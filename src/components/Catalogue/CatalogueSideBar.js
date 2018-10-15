import React, { Component } from 'react';
import SideBarCatalogueList from './SideBarCatalogueList';
import SideBarPrice from './SideBarPrice';
import SideBarColor from './SideBarColor';
import SideBarSize from './SideBarSize';
import SideBarHeelSize from './SideBarHeelSize';
import SideBarReason from './SideBarReason';
import SideBarSeason from './SideBarSeason';
import SideBarBrand from './SideBarBrand';
import PropTypes from 'prop-types';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hiddenFilters: []
    };
    //console.log(this.props)
  };

  static get propTypes() {
    return {
      setFilterParam: PropTypes.func.isRequired,
      setFilterArrayParam: PropTypes.func.isRequired,
      filtersValue: PropTypes.object.isRequired,
      maxPrice: PropTypes.number.isRequired,
      minPrice: PropTypes.number.isRequired,
      discounted: PropTypes.bool.isRequired,
      setDiscountedParam: PropTypes.func.isRequired,
      clearFilters: PropTypes.func.isRequired
    };
  };

  openerButton = (filterName) => {
    const filterIndex = this.state.hiddenFilters.findIndex((filter) => {
      return filter === filterName;
    });
    if (filterIndex === -1) {
      this.setState({
        hiddenFilters: [...this.state.hiddenFilters, filterName]
      });
    } else {
      this.setState({
        hiddenFilters: this.state.hiddenFilters.filter((item, index) => index !== filterIndex)
      });
    };
  };

  render() {
    const { setFilterParam, setFilterArrayParam, minPrice, maxPrice, filtersValue, clearFilters, setDiscountedParam, discounted } = this.props;
    const { hiddenFilters } = this.state;
    return (
      <section className='sidebar'>
        <section className='sidebar__division'>
          <SideBarCatalogueList
            func={this.openerButton}
            hiddenFilters={hiddenFilters}
            setFilterParam={setFilterParam}
            data={filtersValue.type}
          />
        </section>
        <div className='separator-150 separator-150-1'></div>
        <section className='sidebar__division'>
          <SideBarPrice
            func={this.openerButton}
            hiddenFilters={hiddenFilters}
            setFilterParam={setFilterParam}
            maxPrice={maxPrice}
            minPrice={minPrice}
          />
        </section>
        <div className='separator-150 separator-150-2'></div>
        <section className='sidebar__division'>
          <SideBarColor
            func={this.openerButton}
            hiddenFilters={hiddenFilters}
            setFilterParam={setFilterParam}
          />
        </section>
        <div className='separator-150 separator-150-3'></div>
        <section className='sidebar__division'>
          <SideBarSize
            func={this.openerButton}
            hiddenFilters={hiddenFilters}
            setFilterArrayParam={setFilterArrayParam}
            data={filtersValue.sizes}
          />
        </section>
        <div className='separator-150 separator-150-4'></div>
        <section className='sidebar__division'>
          <SideBarHeelSize
            func={this.openerButton}
            hiddenFilters={hiddenFilters}
            setFilterArrayParam={setFilterArrayParam}
            data={filtersValue.heelSize}
          />
        </section>
        <div className='separator-150 separator-150-5'></div>
        <section className='sidebar__division'>
          <SideBarReason
            func={this.openerButton}
            hiddenFilters={hiddenFilters}
            setFilterParam={setFilterParam}
            data={filtersValue.reason}
          />
        </section>
        <div className='separator-150 separator-150-6'></div>
        <section className='sidebar__division'>
          <SideBarSeason
            func={this.openerButton}
            hiddenFilters={hiddenFilters}
            setFilterParam={setFilterParam}
            data={filtersValue.season}
          />
        </section>
        <div className='separator-150 separator-150-7'></div>
        <section className='sidebar__division'>
          <SideBarBrand
            func={this.openerButton}
            hiddenFilters={hiddenFilters}
            setFilterParam={setFilterParam}
            data={filtersValue.brand}
          />
          <label>
            <input
              checked={discounted}
              onChange={() => setDiscountedParam(!discounted)}
              type='checkbox'
              className='checkbox'
              name='checkbox-disc'
            />
            <span className='checkbox-discount'></span> <span className='text-discount'>Со скидкой</span>
          </label>
          <div className='separator-240'></div>
        </section>
        <section className='sidebar__division'>
          <div className='drop-down'>
            <a onClick={clearFilters} ><span className='drop-down-icon'></span>Сбросить</a>
          </div>
        </section>
      </section>
    );
  };
};

export default SideBar;