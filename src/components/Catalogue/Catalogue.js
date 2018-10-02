import React, { Component } from 'react';
import './style-catalogue.css';
import '../css/normalize.css';
import '../css/font-awesome.min.css';
import '../css/style.css';
import SitePath from '../SitePath/SitePath';
import CatalogueProductList from './CatalogueProductList';
import OverlookedSlider from '../ProductCard/OverlookedSlider';
import PropTypes from 'prop-types';

class Catalogue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sitepath: [
        {
          to: '/',
          title: 'Главная'
        },
        {
          to: '/catalogue/',
          title: this.props.catalogueParam ? this.props.catalogueParam.activeCategory.title : 'Каталог'
        }],
      overlookedData: sessionStorage.overlookedKey ? JSON.parse(sessionStorage.overlookedKey) : [],
      urlParam: this.props.filterParam,
      sortVal: 'price',
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
    console.log(this.props)
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

  componentWillMount() {
    this.props.catalogueParam && this.updateFilters(this.props);
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.catalogueParam) {
      if (this.props.catalogueParam.selectedCategoriesProps === nextProps.catalogueParam.selectedCategoriesProps) {
        return;
      } else {
        this.clearFilters();
        this.props.catalogueParam && this.updateFilters(nextProps);
      }
    }

  };

  updateFilters = (nextProps) => {
    const types = nextProps.catalogueParam.selectedCategoriesProps;
    console.log(types)
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

  setSortByFilter = (event) => {
    const sortValue = event.currentTarget.value;
    this.setState({
      sortVal: sortValue,
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
    console.log('run config')
    const { shoesType, color, categoryId, reason, season, brand, minPrice, maxPrice, search, discounted, sortVal, sizes, heelSizes } = nextState;
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
    console.log(seasonParam)
    if (seasonParam === 'season=season&') {
      debugger
    }
    const brandParam = brand ? `brand=${brand}&` : '';
    const minPriceParam = minPrice ? `minPrice=${minPrice}&` : '';
    const maxPriceParam = maxPrice ? `maxPrice=${maxPrice}&` : '';
    const searchParam = search ? `search=${search}&` : '';
    const discountedParam = discounted ? `discounted=${discounted}&` : '';
    const sortParam = sortVal ? `sortBy=${sortVal}&` : '';
    let urlParam = categoryIdParam + typeParam + colorParam + sizeParam + heelSizeParam + minPriceParam + maxPriceParam + reasonParam + seasonParam + brandParam + searchParam + discountedParam + sortParam;
    console.log(urlParam)
    if (this.state.urlParam !== urlParam) {
      this.setState({
        urlParam: urlParam
      });
    };
  };

  componentWillUpdate(nextProps, nextState) {
    if (nextState === this.state) return;
    this.catalogueUrlConfigurator(nextProps, nextState);
  };

  render() {
    const { sitepath, overlookedData, urlParam } = this.state;
    return (
      <div>
        <SitePath pathprops={sitepath} filterParamFunc={this.props.filterLoader}
          filterParam={this.props.catalogueParam} />
        <CatalogueProductList
          filterParam={this.props.filterParam}
          catalogueParam={this.props.catalogueParam}
          setSortByFilter={this.setSortByFilter}
          setDiscountedParam={this.setDiscountedParam}
          setFilterArrayParam={this.setFilterArrayParam}
          setFilterParam={this.setFilterParam}
          filters={this.state}
          filtersValue={this.props.filters}
          clearFilters={this.clearFilters}
          urlParam={urlParam}
        />
        {overlookedData.length > 0 && <OverlookedSlider overlookedData={overlookedData} />}
      </div>
    );
  };
};

export default Catalogue;