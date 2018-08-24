import React, { Component } from 'react';
import './style-product-card.css';
import { NavLink } from 'react-router-dom'
import SitePath from '../SitePath/SitePath'

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
      productCartActiveSize: "",
      overlookedData: sessionStorage.overlookedKey ? JSON.parse(sessionStorage.overlookedKey) : []
    }
    this.componentDidMount(this.state.id)
    this.props.func(false)
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
    fetch(`https://api-neto.herokuapp.com/bosa-noga/products/${id}`, {
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
        this.overlookedAdd(data.data)
        this.setState({
          data: data.data,
          selectedImage: data.data.images[0],
          productCartDefaultPrice: data.data.price,
          productCartPrice: data.data.price,
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
              to: `/productCard/${this.state.id}`,
              title: data.data.title
            }
          ],
        })
        this.checkActiveId(this.state.data.id)
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
      console.log("Удалён")
      const serialTempData = JSON.stringify(tempFavoriteKeyData);
      localStorage.setItem("favoriteKey", serialTempData);

    } else {
      tempFavoriteKeyData.push(this.state.data)
      console.log("Добавлен", tempFavoriteKeyData)
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
    let result = favoriteData.find((el) => itemID === el.id)
    if (result) {
      this.setState({
        isActive: true
      });
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
    const cartItemProps = {
      id: this.state.data.id,
      size: this.state.productCartActiveSize.size,
      amount: this.state.productCartCount
    }
    const serialCartItemProps = JSON.stringify(cartItemProps)
    const cartIDJson = localStorage.postCartIDKey ? JSON.parse(localStorage.postCartIDKey) : []
    let link = ``;
    if (cartIDJson.products) {
      link = `cart/${cartIDJson.id}`
    } else {
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
        const serialTempData = JSON.stringify(data.data);
        localStorage.setItem("favoriteKey", serialTempData);
        this.props.cartUploader(data.data)
      })
      .catch(error => {
        console.log(error)
      });
  }

  render() {
    return (
      <div>
        <SitePath pathprops={this.state.sitepath} />
        <main className="product-card">
          <section className="product-card-content">
            {this.state.data.title && <h2 className="section-name">{this.state.data.title}</h2>}
            <section className="product-card-content__main-screen">
              {this.state.data.images && <FavoriteSlider data={this.state.data} func={this.changeImage} />}
              <div className="main-screen__favourite-product-pic">
                {this.state.data.images && <img src={this.state.selectedImage} alt={this.state.data.title} />}
                <NavLink to="/" className="main-screen__favourite-product-pic__zoom" />
              </div>
              <div className="main-screen__product-info">
                <div className="product-info-title">
                  <h2>{this.state.data.title}</h2>
                  <div className="in-stock">В наличии</div>
                </div>
                <div className="product-features">
                  <table className="features-table">
                    <tbody>
                      <tr>
                        <td className="left-col">Артикул:</td>
                        <td className="right-col">{this.state.data.sku}</td>
                      </tr>
                      <tr>
                        <td className="left-col">Производитель:</td>
                        <td className="right-col"><NavLink to="/"><span className="producer">{this.state.data.brand}</span></NavLink></td>
                      </tr>
                      <tr>
                        <td className="left-col">Цвет:</td>
                        <td className="right-col">{this.state.data.color}</td>
                      </tr>
                      <tr>
                        <td className="left-col">Материалы:</td>
                        <td className="right-col">{this.state.data.material}</td>
                      </tr>
                      <tr>
                        <td className="left-col">Сезон:</td>
                        <td className="right-col">{this.state.data.season}</td>
                      </tr>
                      <tr>
                        <td className="left-col">Повод:</td>
                        <td className="right-col">{this.state.data.reason}</td>
                      </tr>
                    </tbody>
                  </table>

                </div>
                <p className="size">Размер</p>
                <ul className="sizes">
                  {this.state.data.sizes && this.state.data.sizes.map((item, index) => <ListItem
                    key={index}
                    size={item.size}
                    idx={index}
                    func={this.setProductSize}
                    isActive={this.state.productCartActiveSize.idx === index}
                  />)}
                </ul>
                <div className="size-wrapper">
                  <NavLink to="/"><span className="size-rule"></span><p className="size-table">Таблица размеров</p></NavLink>
                </div>
                <div className="in-favourites-wrapper" onClick={this.favoriteAdd}>
                  <div className={this.state.isActive ? 'favourite-active' : 'favourite'}></div>
                  {this.state.isActive ? <p className="in-favourites">В избранном</p> : <p className="in-favourites">В избранное</p>}
                </div>
                <div className="basket-item__quantity">
                  <div className="basket-item__quantity-change basket-item-list__quantity-change_minus" onClick={this.decrementCount}>-</div>{this.state.productCartCount}
                  <div className="basket-item__quantity-change basket-item-list__quantity-change_plus" onClick={this.incrementCount}>+</div>
                </div>
                <div className="price">{this.state.productCartPrice}₽</div>
                <button className="in-basket in-basket-click" onClick={this.addToCart}>В корзину</button>
              </div>
            </section>
          </section>
        </main>
        {this.state.overlookedData.length > 0 && <OverlookedSlider data={this.state.overlookedData} />}
        {this.state.data.categoryId && <SimilarSlider category={this.state.data.categoryId} id={this.state.id} />}
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

class OverlookedSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      overlookedData: this.props.data,
    }
  }

  moveLeft = () => {
    const tempDataArr = [...this.state.overlookedData]
    let firstItem = tempDataArr.shift()
    tempDataArr.push(firstItem)
    this.setState({
      overlookedData: tempDataArr,
    })
  }

  moveRight = () => {
    const tempDataArr = [...this.state.overlookedData]
    let lastItem = tempDataArr.pop()
    tempDataArr.unshift(lastItem)
    this.setState({
      overlookedData: tempDataArr,
    })
  }



  render() {
    const { overlookedData } = this.state
    return (
      <section className="product-card__overlooked-slider">
        <h3>Вы смотрели:</h3>
        <div className="overlooked-slider">
          <div className="overlooked-slider__arrow overlooked-slider__arrow_left arrow" onClick={this.moveLeft} />
          <OverlookedItem1 data={overlookedData} />
          <OverlookedItem2 data={overlookedData} />
          <OverlookedItem3 data={overlookedData} />
          <OverlookedItem4 data={overlookedData} />
          <OverlookedItem5 data={overlookedData} />
          <div className="overlooked-slider__arrow overlooked-slider__arrow_right arrow" onClick={this.moveRight} />
        </div>
      </section>
    )
  }
}

const OverlookedItem1 = (props) => {
  const item = props.data[0]
  return (
    <div className={`overlooked-slider__item`}>
      {props.data.length > 0 && <NavLink className={`overlooked-slider__item-link`} to={`/productCard/${item.id}`}>
        <img src={item.images[0]} className={`overlooked-slider__item-pic`} alt="overlookedPic" />
      </NavLink>}
    </div>
  )
}

const OverlookedItem2 = (props) => {
  const item = props.data[1]
  return (
    <div className={`overlooked-slider__item`}>
      {props.data.length > 1 && <NavLink className={`overlooked-slider__item-link`} to={`/productCard/${item.id}`}>
        <img src={item.images[0]} className={`overlooked-slider__item-pic`} alt="overlookedPic" />
      </NavLink>}
    </div>
  )
}

const OverlookedItem3 = (props) => {
  const item = props.data[2]
  return (
    <div className={`overlooked-slider__item`}>
      {props.data.length > 2 && <NavLink className={`overlooked-slider__item-link`} to={`/productCard/${item.id}`}>
        <img src={item.images[0]} className={`overlooked-slider__item-pic`} alt="overlookedPic" />
      </NavLink>}
    </div>
  )
}

const OverlookedItem4 = (props) => {
  const item = props.data[3]
  return (
    <div className={`overlooked-slider__item`}>
      {props.data.length > 3 && <NavLink className={`overlooked-slider__item-link`} to={`/productCard/${item.id}`}>
        <img src={item.images[0]} className={`overlooked-slider__item-pic`} alt="overlookedPic" />
      </NavLink>}
    </div>
  )
}

const OverlookedItem5 = (props) => {
  const item = props.data[4]
  return (
    <div className={`overlooked-slider__item`}>
      {props.data.length > 4 && <NavLink className={`overlooked-slider__item-link`} to={`/productCard/${item.id}`}>
        <img src={item.images[0]} className={`overlooked-slider__item-pic`} alt="overlookedPic" />
      </NavLink>}
    </div>
  )
}

class SimilarSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      similarData: null,
      info: null
    }
  }

  componentDidMount() {
    fetch(`https://api-neto.herokuapp.com/bosa-noga/products?categoryId=${this.props.category}`, {
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

  //Проверка на совпадение товара из карточки с товарами одной категории, функция убирает совпавший элемент
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
    this.setState({

    })
  }

  moveRight = () => {
    const tempDataArr = [...this.state.similarData]
    let lastItem = tempDataArr.pop()
    tempDataArr.unshift(lastItem)
    this.setState({
      similarData: tempDataArr,
    })
    this.setState({

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