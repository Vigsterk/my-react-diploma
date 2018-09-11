import React, { Component } from 'react';
import './style-product-card.css';
import { NavLink } from 'react-router-dom'
import SitePath from '../SitePath/SitePath'
import OverlookedSlider from "./OverlookedSlider"

class ProductCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sitepath: [],
      data: [],
      selectedImage: [],
      id: props.match.params.id,
      favoriteKeyData: localStorage.favoriteKey ? JSON.parse(localStorage.favoriteKey) : [],
      isActive: false,
      productCartCount: 1,
      productCartPrice: "",
      productCartDefaultPrice: "",
      productCartActiveSize: {
        idx: "",
        size: ""
      },
      overlookedData: sessionStorage.overlookedKey ? JSON.parse(sessionStorage.overlookedKey) : []
    }
    if (this.props.status === true) {
      this.props.func(false)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.setState({
        id: this.props.match.params.id,
      })
      this.componentDidMount(this.props.match.params.id)
    }
  }

  componentDidMount(id) {
    let preloadId = this.state.id
    fetch(`https://api-neto.herokuapp.com/bosa-noga/products/${id ? id : preloadId}`, {
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
        console.log(data.data.sizes[0])
        this.overlookedAdd(data.data)
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
              to: "/",
              title: "Главная"
            },
            {
              to: "/catalogue",
              title: data.data.type
            },
            {
              to: `/productCard/${id}`,
              title: data.data.title
            }
          ],
        })
        this.checkActiveId(id)
      })
      .catch(error => {
        console.log(error)
      });
  }

  changeImage = data => {
    this.setState({
      selectedImage: data[0]
    })
  }

  overlookedAdd = (itemData) => {
    const { overlookedData } = this.state
    const overlookedTempData = [...overlookedData]
    let overlookedFilter = overlookedData.find((item) => itemData.id === item.id);
    if (!overlookedFilter) {
      overlookedTempData.push(itemData)
      this.setState({
        overlookedData: overlookedTempData
      })
      const serialTempData = JSON.stringify(overlookedTempData);
      sessionStorage.setItem("overlookedKey", serialTempData)
    };
  }

  favoriteAdd = (event) => {
    event.preventDefault()
    let favoriteFilter = this.state.favoriteKeyData.filter((item) => this.state.data.id === item.id);
    let tempFavoriteKeyData = [...this.state.favoriteKeyData]
    if (favoriteFilter.length > 0 && favoriteFilter[0].id === this.state.data.id) {
      let removeData = this.state.favoriteKeyData.indexOf(favoriteFilter[0])
      tempFavoriteKeyData.splice(removeData, 1)
      this.setState({
        favoriteKeyData: tempFavoriteKeyData,
        isActive: false
      })
      const serialTempData = JSON.stringify(tempFavoriteKeyData);
      localStorage.setItem("favoriteKey", serialTempData);
    } else {
      tempFavoriteKeyData.push(this.state.data)
      this.setState({
        favoriteKeyData: tempFavoriteKeyData,
        isActive: true
      });
      const serialTempData = JSON.stringify(tempFavoriteKeyData);
      localStorage.setItem("favoriteKey", serialTempData);
    };
  }

  checkActiveId(itemID) {
    let favoriteData = this.state.favoriteKeyData && this.state.favoriteKeyData
    if (favoriteData.length > 0) {
      let result = favoriteData.find((el) => itemID === el.id)
      if (result) {
        this.setState({
          isActive: true
        });
      };
    }
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
    let tempPrice = this.state.productCartPrice
    if (tempCount > 1) {
      tempCount -= 1
    };
    if (tempPrice > this.state.productCartDefaultPrice) {
      tempPrice -= this.state.productCartDefaultPrice
    }
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
    })
  }

  addToCart = () => {
    const { data, productCartActiveSize, productCartCount } = this.state
    const cartItemProps = {
      id: data.id,
      size: productCartActiveSize.size,
      amount: productCartCount
    }
    const serialCartItemProps = JSON.stringify(cartItemProps)
    const cartIDJson = localStorage.postCartIDKey && JSON.parse(localStorage.postCartIDKey)
    console.log("cartIDJson", cartIDJson)
    let link = ``;
    if (cartIDJson) {
      link = `cart/${cartIDJson.id}`
    } else {
      console.log("create cart")
      link = `cart/`
    }

    fetch(`https://api-neto.herokuapp.com/bosa-noga/${link}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: serialCartItemProps
    })
      .then(response => {
        if (200 <= response.status && response.status < 300) {
          return response;
        }
        throw new Error(response.statusText);
      })
      .then(response => response.json())
      .then(data => {
        console.log(data.data)
        const serialTempData = JSON.stringify(data.data);
        localStorage.setItem("postCartIDKey", serialTempData);
        this.props.cartUploader(data.data)
      })
      .catch(error => {
        console.log(error)
      });
  }

  render() {
    const { data, selectedImage, sitepath, productCartActiveSize, isActive, productCartPrice, productCartCount, overlookedData, id } = this.state
    return (
      <div>
        <SitePath pathprops={sitepath} />
        <main className="product-card">
          <section className="product-card-content">
            {data.title && <h2 className="section-name">{data.title}</h2>}
            <section className="product-card-content__main-screen">
              {data.images && <FavoriteSlider data={data} func={this.changeImage} />}
              <div className="main-screen__favourite-product-pic">
                {data.images && <img src={selectedImage} alt={data.title} />}
                <NavLink to="/" className="main-screen__favourite-product-pic__zoom" />
              </div>
              <div className="main-screen__product-info">
                <div className="product-info-title">
                  <h2>{data.title}</h2>
                  <div className="in-stock">В наличии</div>
                </div>
                <div className="product-features">
                  <table className="features-table">
                    <tbody>
                      <tr>
                        <td className="left-col">Артикул:</td>
                        <td className="right-col">{data.sku}</td>
                      </tr>
                      <tr>
                        <td className="left-col">Производитель:</td>
                        <td className="right-col"><NavLink to="/"><span className="producer">{data.brand}</span></NavLink></td>
                      </tr>
                      <tr>
                        <td className="left-col">Цвет:</td>
                        <td className="right-col">{data.color}</td>
                      </tr>
                      <tr>
                        <td className="left-col">Материалы:</td>
                        <td className="right-col">{data.material}</td>
                      </tr>
                      <tr>
                        <td className="left-col">Сезон:</td>
                        <td className="right-col">{data.season}</td>
                      </tr>
                      <tr>
                        <td className="left-col">Повод:</td>
                        <td className="right-col">{data.reason}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="size">Размер</p>
                <ul className="sizes">
                  {data.sizes && data.sizes.map((item, index) => <ListItem
                    key={index}
                    size={item.size}
                    idx={index}
                    func={this.setProductSize}
                    isActive={productCartActiveSize.idx === index}
                  />)}
                </ul>
                <div className="size-wrapper">
                  <NavLink to="/"><span className="size-rule"></span><p className="size-table">Таблица размеров</p></NavLink>
                </div>
                <div className="in-favourites-wrapper" onClick={this.favoriteAdd}>
                  <div className={isActive ? 'favourite-active' : 'favourite'}></div>
                  {isActive ? <p className="in-favourites">В избранном</p> : <p className="in-favourites">В избранное</p>}
                </div>
                <div className="basket-item__quantity">
                  <div className="basket-item__quantity-change basket-item-list__quantity-change_minus" onClick={this.decrementCount}>-</div>{productCartCount}
                  <div className="basket-item__quantity-change basket-item-list__quantity-change_plus" onClick={this.incrementCount}>+</div>
                </div>
                <div className="price">{productCartPrice}₽</div>
                <button className="in-basket in-basket-click" onClick={this.addToCart}>В корзину</button>
              </div>
            </section>
          </section>
        </main>
        {overlookedData.length > 0 && <OverlookedSlider data={overlookedData} />}
        {data.categoryId && <SimilarSlider category={data.categoryId} id={id} />}
      </div>
    )
  }
}

class ListItem extends Component {
  handleClick = () => this.props.func(this.props.idx, this.props.size)
  render() {
    return (
      <li className={this.props.isActive ? "active" : "not-active"} onClick={this.handleClick}>{this.props.size}</li>
    )
  }
}

class FavoriteSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      favorite: this.props.data,
      favoriteImage: this.props.data.images,
      func: this.props.func
    }
  }

  arrowUp = () => {
    const tempDataArr = [...this.state.favoriteImage]
    let firstItem = tempDataArr.shift()
    tempDataArr.push(firstItem)
    this.setState({
      favoriteImage: tempDataArr,
    })
    this.state.func(tempDataArr)
  }

  arrowDown = () => {
    const tempDataArr = [...this.state.favoriteImage]
    let firstItem = tempDataArr.shift()
    tempDataArr.push(firstItem)
    this.setState({
      favoriteImage: tempDataArr,
    })
    this.state.func(tempDataArr)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      favorite: nextProps.data,
      favoriteImage: nextProps.data.images,
    });
  }

  render() {
    const { favoriteImage, favorite } = this.state
    return (
      <section className="main-screen__favourite-product-slider" >
        <div className="favourite-product-slider">
          <div className="favourite-product-slider__arrow favourite-product-slider__arrow_up arrow-up" onClick={this.arrowUp}></div>
          <FirstImg img={favoriteImage[0]} title={favorite.title} />
          {favoriteImage[1] && <SecondImg img={favoriteImage[1]} title={favorite.title} />}
          {favoriteImage[2] && <LastImg img={favoriteImage[2]} title={favorite.title} />}
          <div className="favourite-product-slider__arrow favourite-product-slider__arrow_down arrow-down" onClick={this.arrowDown}></div>
        </div>
      </section>
    )
  }
}

const FirstImg = (props) => {
  return (
    <div className="favourite-product-slider__item">
      <img className="favorite-slider-img favourite-product-slider__item-1" src={props.img} alt={props.title} />
    </div>
  )
}

const SecondImg = (props) => {
  return (
    <div className="favourite-product-slider__item">
      <img className="favorite-slider-img favourite-product-slider__item-2" src={props.img} alt={props.title} />
    </div>
  )
}

const LastImg = (props) => {
  return (
    <div className="favourite-product-slider__item">
      <img className="favorite-slider-img favourite-product-slider__item-3" src={props.img} alt={props.title} />
    </div>
  )
}


class SimilarSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      similarData: null,
      info: null,
      categoryId: this.props.category
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      categoryId: nextProps.category
    });
    this.componentDidMount(nextProps.category)
  }

  componentDidMount(id) {
    let preloadId = this.state.categoryId
    fetch(`https://api-neto.herokuapp.com/bosa-noga/products?categoryId=${id ? id : preloadId}`, {
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
          similarData: data.data,
        })
        this.state.similarData && this.checkSimilarId(+this.props.id)
      })
      .catch(error => {
        console.log(error)
      });
  }

  checkSimilarId = (itemId) => {
    const { similarData } = this.state
    let matchId = similarData.find((item) => itemId === item.id)
    let tempSimilarData = [...similarData]
    let removeMatch = similarData.indexOf(matchId)
    tempSimilarData.splice(removeMatch, 1)
    this.setState({
      similarData: tempSimilarData,
    })
  }

  moveLeft = () => {
    const tempDataArr = [...this.state.similarData]
    let firstItem = tempDataArr.shift()
    tempDataArr.push(firstItem)
    this.setState({
      similarData: tempDataArr,
    })
  }

  moveRight = () => {
    const tempDataArr = [...this.state.similarData]
    let lastItem = tempDataArr.pop()
    tempDataArr.unshift(lastItem)
    this.setState({
      similarData: tempDataArr,
    })
  }

  render() {
    const { similarData } = this.state
    return (
      this.state.similarData && <section className="product-card__similar-products-slider" >
        <h3>Похожие товары:</h3>
        <div className="similar-products-slider">
          <div className="similar-products-slider__arrow similar-products-slider__arrow_left arrow" onClick={this.moveLeft}></div>
          {similarData && <ProductFirst data={similarData[0]} />}
          {similarData && <ProductActive data={similarData[1]} />}
          {similarData && <ProductLast data={similarData[2]} />}
          <div className="similar-products-slider__arrow similar-products-slider__arrow_right arrow" onClick={this.moveRight}></div>
        </div>
      </section>
    )
  }
}

class ProductFirst extends Component {
  render() {
    const { data } = this.props
    return (
      <div className="similar-products-slider__item-list__item-card item">
        <div className="similar-products-slider__item">
          <NavLink to={`/productCard/${data.id}`}>
            <img src={data.images[0]} className={`similar-products-slider__item-pic`} alt="firstPic" />
          </NavLink>
        </div>
        <ProductInfo data={this.props.data} />
      </div>
    )
  }
}

class ProductActive extends Component {
  render() {
    const { data } = this.props
    return (
      <div className="similar-products-slider__item-list__item-card item">
        <div className="similar-products-slider__item">
          <NavLink to={`/productCard/${data.id}`}>
            <img src={data.images[0]} className={`similar-products-slider__item-pic`} alt="activePic" />
          </NavLink>
        </div>
        <ProductInfo data={this.props.data} />
      </div>
    )
  }
}

class ProductLast extends Component {
  render() {
    const { data } = this.props
    return (
      <div className="similar-products-slider__item-list__item-card item">
        <div className="similar-products-slider__item">
          <NavLink to={`/productCard/${data.id}`}>
            <img src={data.images[0]} className={`similar-products-slider__item-pic`} alt="lastPic" />
          </NavLink>
        </div>
        <ProductInfo data={this.props.data} />
      </div>
    )
  }
}

class ProductInfo extends Component {
  render() {
    const { data } = this.props
    return (
      <div className="similar-products-slider__item-desc">
        <h4 className="similar-products-slider__item-name">{data.title}</h4>
        <p className="similar-products-slider__item-producer">Производитель: <span className="producer">{data.brand}</span></p>
        <p className="similar-products-slider__item-price">{data.price}</p>
      </div>
    )
  }
}

export default ProductCard