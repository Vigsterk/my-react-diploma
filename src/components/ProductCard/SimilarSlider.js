import React, { Component } from 'react';
import { ProductFirst, ProductActive, ProductLast } from './SimilarSliderListItem';
import PropTypes from 'prop-types';

class SimilarSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      similarData: [],
      info: null,
    };
    this.props.categories && this.loadSimilarData(this.props.categories)
  };

  static get propTypes() {
    return {
      categories: PropTypes.object.isRequired,
      id: PropTypes.string.isRequired,
    };
  };

  componentDidUpdate(prevProps) {
    if (this.props.categories !== prevProps.categories) {
      this.loadSimilarData(this.props.categories);
    };
  };

  loadSimilarData = (categories) => {
    fetch(`https://api-neto.herokuapp.com/bosa-noga/products?type=${categories.type}&color=${categories.color}`, {
      method: 'GET'
    })
      .then(response => {
        if (200 <= response.status && response.status < 300) {
          return response;
        }
        throw new Error(response.statusText);
      })
      .then(response => response.json())
      .then(data => {
        this.checkSimilarId(+this.props.id, data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  checkSimilarId = (itemId, similarData) => {
    const matchId = similarData.find((item) => itemId === item.id);
    const tempSimilarData = [...similarData];
    const removeMatch = similarData.indexOf(matchId);
    tempSimilarData.splice(removeMatch, 1);
    this.setState({
      similarData: tempSimilarData,
    });
  };

  moveLeft = () => {
    const tempDataArr = [...this.state.similarData];
    const firstItem = tempDataArr.shift();
    tempDataArr.push(firstItem);
    this.setState({
      similarData: tempDataArr,
    });
  };

  moveRight = () => {
    const tempDataArr = [...this.state.similarData];
    const lastItem = tempDataArr.pop();
    tempDataArr.unshift(lastItem);
    this.setState({
      similarData: tempDataArr,
    });
  };

  render() {
    const { similarData } = this.state;
    return (
      similarData.length > 0 && <section className='product-card__similar-products-slider' >
        <h3>Похожие товары:</h3>
        <div className='similar-products-slider'>
          <div className='similar-products-slider__arrow similar-products-slider__arrow_left arrow' onClick={this.moveLeft}></div>
          {similarData[0] && <ProductFirst data={similarData[0]} />}
          {similarData[1] && <ProductActive data={similarData[1]} />}
          {similarData[2] && <ProductLast data={similarData[2]} />}
          <div className='similar-products-slider__arrow similar-products-slider__arrow_right arrow' onClick={this.moveRight}></div>
        </div>
      </section>
    );
  };
};

export default SimilarSlider;