import React, { Component } from "react";
import CategoriesList from './MainMenuCategories';
import PropTypes from 'prop-types';

class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.categories ? this.props.categories : [],
    };
  };

  static get propTypes() {
    return {
      categories: PropTypes.array,
      getActiveCategory: PropTypes.func.isRequired
    };
  };

  componentDidUpdate(prevProps) {
    if (this.props.categories !== prevProps.categories) {
      this.setState({
        data: this.props.categories,
      });
    };
  };

  // Функция инициатор - передаёт активную категорию для записи в стейт родителя
  setActiveCategory = (id, title) => {
    this.props.getActiveCategory(id, title);
  };

  render() {
    return (
      <nav className="main-menu">
        <div className="wrapper">
          <ul className="main-menu__items">
            {this.state.data.map(item =>
              <CategoriesList key={item.id} id={item.id} title={item.title} func={this.setActiveCategory} />
            )}
          </ul>
        </div>
      </nav>
    );
  };
};

export default MainMenu;