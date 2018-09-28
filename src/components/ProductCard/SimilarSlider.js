import React, { Component } from 'react';

class SimilarSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      similarData: null,
      info: null,
      categoryId: this.props.category
    };
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      categoryId: nextProps.category
    });
    this.componentDidMount(nextProps.category);
  };

  componentDidMount(id) {
    let preloadId = this.state.categoryId;
    fetch(`https://api-neto.herokuapp.com/bosa-noga/products?categoryId=${id ? id : preloadId}`, {
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
        this.setState({
          similarData: data.data,
        })
        this.state.similarData && this.checkSimilarId(+this.props.id);
      })
      .catch(error => {
        console.log(error);
      });
  };

  checkSimilarId = (itemId) => {
    const { similarData } = this.state;
    let matchId = similarData.find((item) => itemId === item.id);
    let tempSimilarData = [...similarData];
    let removeMatch = similarData.indexOf(matchId);
    tempSimilarData.splice(removeMatch, 1);
    this.setState({
      similarData: tempSimilarData,
    });
  };

  moveLeft = () => {
    const tempDataArr = [...this.state.similarData];
    let firstItem = tempDataArr.shift();
    tempDataArr.push(firstItem);
    this.setState({
      similarData: tempDataArr,
    });
  };

  moveRight = () => {
    const tempDataArr = [...this.state.similarData];
    let lastItem = tempDataArr.pop();
    tempDataArr.unshift(lastItem);
    this.setState({
      similarData: tempDataArr,
    });
  };

  render() {
    const { similarData } = this.state;
    return (
      this.state.similarData && <section className='product-card__similar-products-slider' >
        <h3>Похожие товары:</h3>
        <div className='similar-products-slider'>
          <div className='similar-products-slider__arrow similar-products-slider__arrow_left arrow' onClick={this.moveLeft}></div>
          {similarData && <ProductFirst data={similarData[0]} />}
          {similarData && <ProductActive data={similarData[1]} />}
          {similarData && <ProductLast data={similarData[2]} />}
          <div className='similar-products-slider__arrow similar-products-slider__arrow_right arrow' onClick={this.moveRight}></div>
        </div>
      </section>
    );
  };
};

class ProductFirst extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className='similar-products-slider__item-list__item-card item'>
        <div className='similar-products-slider__item'>
          <Link to={`/productCard/${data.id}`}>
            <img src={data.images[0]} className={`similar-products-slider__item-pic`} alt='firstPic' />
          </Link>
        </div>
        <ProductInfo data={this.props.data} />
      </div>
    );
  };
};

class ProductActive extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className='similar-products-slider__item-list__item-card item'>
        <div className='similar-products-slider__item'>
          <Link to={`/productCard/${data.id}`}>
            <img src={data.images[0]} className={`similar-products-slider__item-pic`} alt='activePic' />
          </Link>
        </div>
        <ProductInfo data={this.props.data} />
      </div>
    );
  };
};

class ProductLast extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className='similar-products-slider__item-list__item-card item'>
        <div className='similar-products-slider__item'>
          <Link to={`/productCard/${data.id}`}>
            <img src={data.images[0]} className={`similar-products-slider__item-pic`} alt='lastPic' />
          </Link>
        </div>
        <ProductInfo data={this.props.data} />
      </div>
    );
  };
};

class ProductInfo extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className='similar-products-slider__item-desc'>
        <h4 className='similar-products-slider__item-name'>{data.title}</h4>
        <p className='similar-products-slider__item-producer'>Производитель: <span className='producer'>{data.brand}</span></p>
        <p className='similar-products-slider__item-price'>{data.price}</p>
      </div>
    );
  };
};

export default SimilarSlider;