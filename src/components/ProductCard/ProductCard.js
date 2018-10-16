import React, { Component } from 'react';
import './style-product-card.css';
import { Link } from 'react-router-dom';
import SitePath from '../SitePath/SitePath';
import FavoriteSlider from './FavoriteSlider';
import OverlookedSlider from './OverlookedSlider';
import SimilarSlider from './SimilarSlider';
import PropTypes from 'prop-types';

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sitepathParam: null,
      productData: null,
      selectedImage: [],
      id: props.match.params.id,
      favoriteKeyData: localStorage.favoriteKey ? JSON.parse(localStorage.favoriteKey) : [],
      isActive: false,
      productCartCount: 1,
      productCartPrice: null,
      productCartDefaultPrice: null,
      productCartActiveSize: {
        idx: null,
        size: null
      },
      overlookedData: sessionStorage.overlookedKey ? JSON.parse(sessionStorage.overlookedKey) : [],
      activeZoom: false
    };
    // console.log('ProductCart Props',this.props)
  };

  static get propTypes() {
    return {
      cartUploader: PropTypes.func.isRequired,
      catalogueParam: PropTypes.object,
      filterLoader: PropTypes.func.isRequired,
      filterParam: PropTypes.object
    };
  };

  componentDidMount() {
    this.loadProductCartData(this.state.id);
  };

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.setState({
        id: this.props.match.params.id,
      });
      this.loadProductCartData(this.props.match.params.id);
    };
  };

  loadProductCartData = (id) => {
    fetch(`https://api-neto.herokuapp.com/bosa-noga/products/${id}`, {
      method: 'GET'
    })
      .then(response => {
        if (200 <= response.status && response.status < 300) {
          return response;
        };
        throw new Error(response.statusText);
      })
      .then(response => response.json())
      .then(data => {
        this.overlookedAdd(data.data);
        this.checkActiveId(id);
        this.setState({
          productData: data.data,
          selectedImage: data.data.images[0],
          productCartDefaultPrice: data.data.price,
          productCartPrice: data.data.price,
          productCartCount: 1,
          sitepathParam: {
            id: id,
            title: data.data.title,
          }
        });
      })
      .catch(error => {
        console.log(error)
      });
  };

  changeImage = (data) => {
    this.setState({
      selectedImage: data[0]
    });
  };

  overlookedAdd = (itemData) => {
    const { overlookedData } = this.state;
    const overlookedTempData = [...overlookedData];
    const overlookedFilter = overlookedData.find((item) => itemData.id === item.id);
    if (!overlookedFilter) {
      if (overlookedTempData.length > 10) {
        overlookedTempData.shift();
        overlookedTempData.push(itemData);
        this.setState({
          overlookedData: overlookedTempData
        });
      } else {
        overlookedTempData.push(itemData);
        this.setState({
          overlookedData: overlookedTempData
        });
      }
      const serialTempData = JSON.stringify(overlookedTempData);
      sessionStorage.setItem('overlookedKey', serialTempData);
    };
  };

  favoriteAdd = (event) => {
    event.preventDefault();
    const favoriteFilter = this.state.favoriteKeyData.filter((item) => this.state.productData.id === item.id);
    const tempFavoriteKeyData = [...this.state.favoriteKeyData];
    if (favoriteFilter.length > 0 && favoriteFilter[0].id === this.state.productData.id) {
      const removeData = this.state.favoriteKeyData.indexOf(favoriteFilter[0]);
      tempFavoriteKeyData.splice(removeData, 1);
      this.setState({
        favoriteKeyData: tempFavoriteKeyData,
        isActive: false
      });
      const serialTempData = JSON.stringify(tempFavoriteKeyData);
      localStorage.setItem('favoriteKey', serialTempData);
    } else {
      tempFavoriteKeyData.push(this.state.productData);
      this.setState({
        favoriteKeyData: tempFavoriteKeyData,
        isActive: true
      });
      const serialTempData = JSON.stringify(tempFavoriteKeyData);
      localStorage.setItem('favoriteKey', serialTempData);
    };
  };

  checkActiveId = (itemID) => {
    const favoriteData = this.state.favoriteKeyData && this.state.favoriteKeyData;
    if (favoriteData.length > 0) {
      const result = favoriteData.find((el) => +itemID === el.id);
      if (result) {
        this.setState({
          isActive: true
        });
      } else {
        this.setState({
          isActive: false
        })
      };
    };
  };

  incrementCount = () => {
    let tempCount = this.state.productCartCount;
    tempCount += 1;
    let tempPrice = this.state.productCartPrice + this.state.productCartDefaultPrice;
    this.setState({
      productCartCount: tempCount,
      productCartPrice: tempPrice
    });
  };

  decrementCount = () => {
    let tempCount = this.state.productCartCount;
    let tempPrice = this.state.productCartPrice;
    if (tempCount > 1) {
      tempCount -= 1
    };
    if (tempPrice > this.state.productCartDefaultPrice) {
      tempPrice -= this.state.productCartDefaultPrice
    };
    this.setState({
      productCartCount: tempCount,
      productCartPrice: tempPrice
    });
  };

  setProductSize = (index, size) => {
    this.setState({
      productCartActiveSize: {
        idx: index,
        size: size
      }
    });
  };

  addToCart = () => {
    const { productData, productCartActiveSize, productCartCount } = this.state;
    if (productCartActiveSize.size === null) return;
    const cartItemProps = {
      id: productData.id,
      size: productCartActiveSize.size,
      amount: productCartCount
    };
    const serialCartItemProps = JSON.stringify(cartItemProps);
    const cartIDJson = localStorage.postCartIDKey && JSON.parse(localStorage.postCartIDKey);
    let link = ``;
    if (cartIDJson) {
      link = `cart/${cartIDJson.id}`;
    } else {
      link = `cart/`;
    };

    fetch(`https://api-neto.herokuapp.com/bosa-noga/${link}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: serialCartItemProps
    })
      .then(response => {
        if (200 <= response.status && response.status < 300) {
          return response;
        };
        throw new Error(response.statusText);
      })
      .then(response => response.json())
      .then(data => {
        const serialTempData = JSON.stringify(data.data);
        localStorage.setItem('postCartIDKey', serialTempData);
        this.props.cartUploader(data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  zoomProductPic = (event) => {
    event.preventDefault();
    if (this.state.activeZoom) {
      this.setState({ activeZoom: false });
    } else {
      this.setState({ activeZoom: true });
    };
  };

  render() {
    const { productData, selectedImage, productCartActiveSize, isActive, productCartPrice, productCartCount, overlookedData, id, activeZoom, sitepathParam } = this.state;
    return (
      <div>
        <SitePath filterParamFunc={this.props.filterLoader} filterParam={this.props.filterParam}
          sitepathParam={sitepathParam} mainUrlparam={{ to: '/catalogue', title: 'Каталог' }} />
        {productData && <main className='product-card'>
          <section className='product-card-content'>
            <h2 className='section-name'>{productData.title}</h2>
            <section className='product-card-content__main-screen'>
              <FavoriteSlider sliderData={productData} func={this.changeImage} />
              <div className='main-screen__favourite-product-pic'>
                <img className={activeZoom ? 'bigPic' : ''} src={selectedImage} alt={productData.title} onClick={this.zoomProductPic} />
                <figure className='main-screen__favourite-product-pic__zoom' onClick={this.zoomProductPic}></figure>
              </div>
              <div className='main-screen__product-info'>
                <div className='product-info-title'>
                  <h2>{productData.title}</h2>
                  <div className='in-stock'>В наличии</div>
                </div>
                <div className='product-features'>
                  <table className='features-table'>
                    <tbody>
                      <tr>
                        <td className='left-col'>Артикул:</td>
                        <td className='right-col'>{productData.sku}</td>
                      </tr>
                      <tr>
                        <td className='left-col'>Производитель:</td>
                        <td className='right-col'>
                          <span className='producer'>{productData.brand}</span>
                        </td>
                      </tr>
                      <tr>
                        <td className='left-col'>Цвет:</td>
                        <td className='right-col'>{productData.color}</td>
                      </tr>
                      <tr>
                        <td className='left-col'>Материалы:</td>
                        <td className='right-col'>{productData.material}</td>
                      </tr>
                      <tr>
                        <td className='left-col'>Сезон:</td>
                        <td className='right-col'>{productData.season}</td>
                      </tr>
                      <tr>
                        <td className='left-col'>Повод:</td>
                        <td className='right-col'>{productData.reason}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className='size'>Размер</p>
                <ul className='sizes'>
                  {productData.sizes.filter(({ available }) => available).map((item, index) => <ListItem
                    key={index}
                    size={item.size}
                    idx={index}
                    func={this.setProductSize}
                    isActive={productCartActiveSize.idx === index}
                  />)}
                </ul>
                <div className='size-wrapper'>
                  <Link to='/'><span className='size-rule'></span><p className='size-table'>Таблица размеров</p></Link>
                </div>
                <div className='in-favourites-wrapper' onClick={this.favoriteAdd}>
                  <div className={isActive ? 'favourite-active' : 'favourite'}></div>
                  {isActive ? <p className='in-favourites'>В избранном</p> : <p className='in-favourites'>В избранное</p>}
                </div>
                <div className='basket-item__quantity'>
                  <div className='basket-item__quantity-change basket-item-list__quantity-change_minus' onClick={this.decrementCount}>-</div>{productCartCount}
                  <div className='basket-item__quantity-change basket-item-list__quantity-change_plus' onClick={this.incrementCount}>+</div>
                </div>
                <div className='price'>{productCartPrice}₽</div>
                <button className={productCartActiveSize.size != null ? 'in-basket in-basket-click' : 'in-basket_disabled in-basket-click'} onClick={this.addToCart}>В корзину</button>
              </div>
            </section>
          </section>
        </main>}
        {overlookedData.length > 0 && <OverlookedSlider overlookedData={overlookedData} />}
        {productData && <SimilarSlider categories={productData} id={id} />}
      </div>
    );
  };
};

class ListItem extends Component {
  handleClick = () => this.props.func(this.props.idx, this.props.size);
  render() {
    return (
      <li className={this.props.isActive ? 'active' : 'not-active'} onClick={this.handleClick}>{this.props.size}</li>
    );
  };
};

export default ProductCard;