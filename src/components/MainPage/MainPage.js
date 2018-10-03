import React, { Component } from 'react';
import slider from '../js/slider';
import { Slider, SalesNews, AboutUs } from './MainPageData';
import NewDeals from './NewDeals';
import PropTypes from 'prop-types';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      featuredData: null,
      productInfo: null,
      check: false
    };
  };

  static get propTypes() {
    return {
      categories: PropTypes.array,
    }
  };

  componentDidMount() {
    var f = document.querySelector('.slider__pictures'),
      a = f.getElementsByClassName('slider__image'),
      button = f.getElementsByClassName('slider__circles')[0].getElementsByClassName('slider__circle'),
      arrows = f.getElementsByClassName('slider__arrow');
    slider(f, a, button, '4000', '1000', arrows);

    fetch("https://api-neto.herokuapp.com/bosa-noga/featured", {
      method: "GET"
    })
      .then(response => {
        if (200 <= response.status && response.status < 300) {
          return response;
        }
        throw new Error(response.statusText);
      })
      .then(response => response.json())
      .then(data => {
        this.setState({
          featuredData: data.data,
          productInfo: data.data[1],
          check: true,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  availableCategories() {
    const categories = this.props.categories;
    const featuredData = this.state.featuredData;
    return categories.filter(category => featuredData.find(item => item.categoryId === category.id)).sort((a, b) => a.id > b.id);
  };

  render() {
    const { featuredData, productInfo } = this.state;
    return (
      <div className='main-page'>
        <section className="slider">
          <Slider />
        </section>
        {this.state.check && <NewDeals categories={this.availableCategories()} data={featuredData} info={productInfo} />}
        <section className="sales-and-news wave-bottom">
          <h2 className="h2">акции и новости</h2>
          <SalesNews />
        </section>
        <section className="about-us">
          <AboutUs />
        </section>
      </div>
    );
  };
};

export default MainPage;