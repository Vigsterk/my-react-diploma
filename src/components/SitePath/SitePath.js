import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class SitePath extends Component {

  static get propTypes() {
    return {
      sitepathParam: PropTypes.object,
      filterParamFunc: PropTypes.func,
    };
  };

  render() {
    const { filterParamFunc, sitepathParam, filterParam, mainUrlparam } = this.props;
    const activeCategory = filterParam ? {
      id: filterParam.activeCategory.id,
      title: filterParam.activeCategory.title
    } : null;
    const type = sitepathParam ? sitepathParam.type : null;
    const name = sitepathParam ? sitepathParam.name : null;
    console.log(activeCategory, type, name)
    console.log(this.props)
    return (
      <div className="site-path">
        <ul className="site-path__items">
          <li className="site-path__item"><Link to='/'>Главная</Link></li>
          <li className="site-path__item"><Link to={mainUrlparam.to} onClick={activeCategory && filterParamFunc && filterParamFunc({ activeCategory, type, name })}>
            {filterParam ? filterParam.activeCategory.title : mainUrlparam.title}
          </Link></li>
          {sitepathParam && <li className="site-path__item"><Link to={`/productCard/${sitepathParam.id}`}>{sitepathParam.title}</Link></li>}
        </ul>
      </div>
    );
  };
};
export default SitePath;