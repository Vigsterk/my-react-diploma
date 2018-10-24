import React, { Component } from 'react';
import './style-catalogue.css';
import SitePath from '../SitePath/SitePath';
import CatalogueProductList from './CatalogueProductList';
import OverlookedSlider from '../ProductCard/OverlookedSlider';
import PropTypes from 'prop-types';

class Catalogue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overlookedData: sessionStorage.overlookedKey ? JSON.parse(sessionStorage.overlookedKey) : [],
      urlParam: this.props.filterParam,
      categoryId: this.props.catalogueParam ? this.props.catalogueParam.activeCategory.id : '',
      shoesType: '',
      color: '',
      sizes: [],
      heelSizes: [],
      minPrice: 0,
      maxPrice: 90000,
      reason: '',
      season: '',
      brand: '',
      search: '',
      discounted: false
    };
    //console.log('catalogProps', this.props)
  };

  static get propTypes() {
    return {
      categories: PropTypes.array,
      catalogueParam: PropTypes.shape({
        activeCategory: PropTypes.shape({
          id: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired
        }),
        selectedCategoriesProps: PropTypes.object.isRequired
      }),
      filters: PropTypes.shape({
        brand: PropTypes.array.isRequired,
        color: PropTypes.array.isRequired,
        heelSize: PropTypes.array.isRequired,
        reason: PropTypes.array.isRequired,
        season: PropTypes.array.isRequired,
        sizes: PropTypes.array.isRequired,
        type: PropTypes.array.isRequired
      }).isRequired,
      filterParam: PropTypes.string
    };
  };

  componentWillUpdate(nextProps, nextState) {
    if (this.state !== nextState) {
      this.catalogueUrlConfigurator(nextProps, nextState);
    };
  };

  updateFilters = (nextProps) => {
    const types = nextProps.catalogueParam.selectedCategoriesProps;
    Object.keys(types).forEach(name => {
      switch (name) {
        case 'reason':
          this.setState({
            reason: name
          });
          break;
        case 'shoesType':
          this.setState({
            shoesType: name
          });
          break;
        case 'season':
          this.setState({
            season: name
          });
          break;
        case 'brand':
          this.setState({
            brand: name
          });
          break;
        case 'search':
          this.setState({
            search: name
          });
          break;
        default:
          break;
      };
    });
  };

  setFilterParam = ({ name, value }) => {
    if (this.state[name] === value) return;
    this.setState({
      [name]: value
    });
  };

  setFilterArrayParam = (event) => {
    const { value, name } = event.currentTarget;
    const filter = this.state[name];
    const index = filter.indexOf(+value);
    if (index === -1) {
      filter.push(+value);
    } else {
      filter.splice(index, 1);
    }
    this.setState({
      [name]: filter
    });
  };

  setDiscountedParam = (param) => {
    this.setState({
      discounted: param
    });
  };

  clearFilters = () => {
    this.setState({
      shoesType: '',
      color: '',
      sizes: [],
      heelSizes: [],
      minPrice: 0,
      maxPrice: 90000,
      reason: '',
      season: '',
      brand: '',
      search: '',
      discounted: false
    });
  };

  catalogueUrlConfigurator = (nextProps, nextState) => {
    const { shoesType, color, categoryId, reason, season, brand, minPrice, maxPrice, search, discounted, sizes, heelSizes } = nextState;
    const sizeParam = sizes.reduce((param, size) => {
      return param + `size[]=${size}&`;
    }, '');
    const heelSizeParam = heelSizes.reduce((param, heelSize) => {
      return param + `heelSize[]=${heelSize}&`;
    }, '');

    const categoryIdParam = categoryId ? `categoryId=${categoryId}&` : '';
    const typeParam = shoesType ? `type=${shoesType}&` : '';
    const colorParam = color ? `color=${color}&` : '';
    const reasonParam = reason ? `reason=${reason}&` : '';
    const seasonParam = season ? `season=${season}&` : '';
    const brandParam = brand ? `brand=${brand}&` : '';
    const minPriceParam = minPrice ? `minPrice=${minPrice}&` : '';
    const maxPriceParam = maxPrice ? `maxPrice=${maxPrice}&` : '';
    const searchParam = search ? `search=${search}&` : '';
    const discountedParam = discounted ? `discounted=${discounted}` : '';

    const urlParam = categoryIdParam + typeParam + colorParam + sizeParam + heelSizeParam + minPriceParam + maxPriceParam + reasonParam + seasonParam + brandParam + searchParam + discountedParam;
    if (this.state.urlParam !== urlParam) {
      this.setState({
        urlParam: urlParam
      });
    };
  };

  render() {
    const { overlookedData, urlParam } = this.state;
    const { filterParam, catalogueParam, filters, filterLoader } = this.props
    const { setSortByFilter, setDiscountedParam, setFilterParam, setFilterArrayParam, state, clearFilters } = this
    return (
      <div>
        <SitePath filterParamFunc={filterLoader}
          filterParam={catalogueParam} mainUrlparam={{ to: '/catalogue/', title: 'Каталог' }} />
        <CatalogueProductList
          filterParam={filterParam}
          catalogueParam={catalogueParam}
          setSortByFilter={setSortByFilter}
          setDiscountedParam={setDiscountedParam}
          setFilterArrayParam={setFilterArrayParam}
          setFilterParam={setFilterParam}
          filters={state}
          filtersValue={filters}
          clearFilters={clearFilters}
          urlParam={urlParam}
        />
        {overlookedData.length > 0 && <OverlookedSlider overlookedData={overlookedData} />}
      </div>
    );
  };
};

export default Catalogue;