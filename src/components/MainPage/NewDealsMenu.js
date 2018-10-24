import React, { Component } from 'react';
import ListItem from './NewDealsMenuListItem';
import PropTypes from 'prop-types';

class NewDealsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: "",
    };
  };
  static get propTypes() {
    return {
      func: PropTypes.func.isRequired
    };
  };

  handleClick = (index) => {
    this.props.func(index);
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    const { activeIndex } = this.state;
    const { categories } = this.props;
    return (
      <div className="new-deals__menu">
        <ul className="new-deals__menu-items">
          {categories.map((item, index) => <ListItem key={item.id}
            url={item.url}
            func={this.handleClick}
            title={item.title}
            isActive={activeIndex === index}
            idx={index} />)}
        </ul>
      </div>
    );
  };
};

export default NewDealsMenu;