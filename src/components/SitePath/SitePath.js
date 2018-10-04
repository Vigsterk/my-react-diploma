import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

class SitePath extends Component {

  static get propTypes() {
    return {
      filterParam: PropTypes.object,
      filterParamFunc: PropTypes.func,
      pathprops: PropTypes.array
    };
  };

  render() {
    const { filterParamFunc, filterParam } = this.props
    const activeCategory = filterParam ? filterParam.activeCategory : null
    return (
      <div className="site-path">
        <ul className="site-path__items">
          {this.props.pathprops.map(item =>
            <li key={item.title} className="site-path__item"><Link to={item.to} onClick={activeCategory && filterParamFunc({ activeCategory })}>{item.title}</Link></li>
          )}
        </ul>
      </div>
    )
  }
}
export default SitePath