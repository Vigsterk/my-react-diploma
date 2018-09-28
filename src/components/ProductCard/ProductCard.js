import React, { Component } from 'react';
import './style-product-card.css';
import { Link } from 'react-router-dom';
import SitePath from '../SitePath/SitePath';
import OverlookedSlider from './OverlookedSlider';
import FavoriteSlider from './FavoriteSlider';
import SimilarSlider from './FavoriteSlider';

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sitepath: [],
      data: [],
      selectedImage: [],
      id: props.match.params.id,
      favoriteKeyData: localStorage.favoriteKey ? JSON.parse(localStorage.favoriteKey) : [],
      isActive: false,
      productCartCount: 1,
      productCartPrice: '',
      productCartDefaultPrice: '',
      productCartActiveSize: {
        idx: '',
        size: ''
      },
      overlookedData: sessionStorage.overlookedKey ? JSON.parse(sessionStorage.overlookedKey) : []
    };
  };

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.setState({
        id: this.props.match.params.id,
      });
      this.componentDidMount(this.props.match.params.id);
    };
  };

  componentDidMount(id) {
    let preloadId = this.state.id
    fetch(`https://api-neto.herokuapp.com/bosa-noga/products/${id ? id : preloadId}`, {
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
        this.setState({
          data: data.data,
          selectedImage: data.data.images[0],
          productCartDefaultPrice: data.data.price,
          productCartPrice: data.data.price,
          productCartActiveSize: {
            idx: 0,
            size: data.data.sizes[0].size
          },
          sitepath: [
            {
              to: '/',
              title: 'Главная'
            },
            {
              to: '/catalogue',
              title: data.data.type
            },
            {
              to: `/productCard/${id}`,
              title: data.data.title
            }
          ],
        });
        this.checkActiveId(id);
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
    let overlookedFilter = overlookedData.find((item) => itemData.id === item.id);
    if (!overlookedFilter) {
      overlookedTempData.push(itemData);
      this.setState({
        overlookedData: overlookedTempData
      });
      const serialTempData = JSON.stringify(overlookedTempData);
      sessionStorage.setItem('overlookedKey', serialTempData);
    };
  };

  favoriteAdd = (event) => {
    event.preventDefault();
    let favoriteFilter = this.state.favoriteKeyData.filter((item) => this.state.data.id === item.id);
    let tempFavoriteKeyData = [...this.state.favoriteKeyData];
    if (favoriteFilter.length > 0 && favoriteFilter[0].id === this.state.data.id) {
      let removeData = this.state.favoriteKeyData.indexOf(favoriteFilter[0]);
      tempFavoriteKeyData.splice(removeData, 1);
      this.setState({
        favoriteKeyData: tempFavoriteKeyData,
        isActive: false
      });
      const serialTempData = JSON.stringify(tempFavoriteKeyData);
      localStorage.setItem('favoriteKey', serialTempData);
    } else {
      tempFavoriteKeyData.push(this.state.data);
      this.setState({
        favoriteKeyData: tempFavoriteKeyData,
        isActive: true
      });
      const serialTempData = JSON.stringify(tempFavoriteKeyData);
      localStorage.setItem('favoriteKey', serialTempData);
    };
  };

  checkActiveId = (itemID) => {
    let favoriteData = this.state.favoriteKeyData && this.state.favoriteKeyData;
    if (favoriteData.length > 0) {
      let result = favoriteData.find((el) => itemID === el.id);
      if (result) {
        this.setState({
          isActive: true
        });
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
    const { data, productCartActiveSize, productCartCount } = this.state;
    const cartItemProps = {
      id: data.id,
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

  render() {
    const { data, selectedImage, sitepath, productCartActiveSize, isActive, productCartPrice, productCartCount, overlookedData, id } = this.state;
    return (
      <div>
        <SitePath pathprops={sitepath} />
        <main className='product-card'>
          <section className='product-card-content'>
            {data.title && <h2 className='section-name'>{data.title}</h2>}
            <section className='product-card-content__main-screen'>
              {data.images && <FavoriteSlider data={data} func={this.changeImage} />}
              <div className='main-screen__favourite-product-pic'>
                {data.images && <img src={selectedImage} alt={data.title} />}
                <Link to='/' className='main-screen__favourite-product-pic__zoom' />
              </div>
              <div className='main-screen__product-info'>
                <div className='product-info-title'>
                  <h2>{data.title}</h2>
                  <div className='in-stock'>В наличии</div>
                </div>
                <div className='product-features'>
                  <table className='features-table'>
                    <tbody>
                      <tr>
                        <td className='left-col'>Артикул:</td>
                        <td className='right-col'>{data.sku}</td>
                      </tr>
                      <tr>
                        <td className='left-col'>Производитель:</td>
                        <td className='right-col'><Link to='/'><span className='producer'>{data.brand}</span></Link></td>
                      </tr>
                      <tr>
                        <td className='left-col'>Цвет:</td>
                        <td className='right-col'>{data.color}</td>
                      </tr>
                      <tr>
                        <td className='left-col'>Материалы:</td>
                        <td className='right-col'>{data.material}</td>
                      </tr>
                      <tr>
                        <td className='left-col'>Сезон:</td>
                        <td className='right-col'>{data.season}</td>
                      </tr>
                      <tr>
                        <td className='left-col'>Повод:</td>
                        <td className='right-col'>{data.reason}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className='size'>Размер</p>
                <ul className='sizes'>
                  {data.sizes && data.sizes.map((item, index) => <ListItem
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
                <button className='in-basket in-basket-click' onClick={this.addToCart}>В корзину</button>
              </div>
            </section>
          </section>
        </main>
        {overlookedData.length > 0 && <OverlookedSlider data={overlookedData} />}
        {data.categoryId && <SimilarSlider category={data.categoryId} id={id} />}
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