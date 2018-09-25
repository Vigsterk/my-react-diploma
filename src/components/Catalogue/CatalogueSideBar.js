import React, { Component } from 'react';
import sidebarColorData from './CatalogueItemsData'

class SideBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hiddenFilters: []
    }
  }

  openerButton = (filterName) => {
    let filterIndex = this.state.hiddenFilters.findIndex((filter) => {
      return filter === filterName;
    });

    if (filterIndex === -1) {
      this.setState({
        hiddenFilters: [...this.state.hiddenFilters, filterName]
      });
    } else {
      this.setState({
        hiddenFilters: this.state.hiddenFilters.filter((item, index) => index !== filterIndex)
      });
    }
  }

  render() {
    const { setFilterParam, setFilterArrayParam, minPrice, maxPrice, filtersValue, clearFilters, setDiscountedParam, discounted } = this.props
    return (
      <section className='sidebar'>
        <section className='sidebar__division'>
          <SideBarCatalogueList
            func={this.openerButton}
            hiddenFilters={this.state.hiddenFilters}
            setFilterParam={setFilterParam}
            data={filtersValue.type}
          />
        </section>

        <div className='separator-150 separator-150-1'></div>
        <section className='sidebar__division'>
          <SideBarPrice
            func={this.openerButton}
            hiddenFilters={this.state.hiddenFilters}
            setFilterParam={setFilterParam}
            maxPrice={maxPrice}
            minPrice={minPrice}
          />
        </section>

        <div className='separator-150 separator-150-2'></div>
        <section className='sidebar__division'>
          <SideBarColor
            func={this.openerButton}
            hiddenFilters={this.state.hiddenFilters}
            setFilterParam={setFilterParam}
          />
        </section>

        <div className='separator-150 separator-150-3'></div>
        <section className='sidebar__division'>
          <SideBarSize
            func={this.openerButton}
            hiddenFilters={this.state.hiddenFilters}
            setFilterArrayParam={setFilterArrayParam}
            data={filtersValue.sizes}
          />
        </section>

        <div className='separator-150 separator-150-4'></div>
        <section className='sidebar__division'>
          <SideBarHeelSize
            func={this.openerButton}
            hiddenFilters={this.state.hiddenFilters}
            setFilterArrayParam={setFilterArrayParam}
            data={filtersValue.heelSize}
          />
        </section>

        <div className='separator-150 separator-150-5'></div>
        <section className='sidebar__division'>
          <SideBarReason
            func={this.openerButton}
            hiddenFilters={this.state.hiddenFilters}
            setFilterParam={setFilterParam}
            data={filtersValue.reason}
          />
        </section>

        <div className='separator-150 separator-150-6'></div>
        <section className='sidebar__division'>
          <SideBarSeason
            func={this.openerButton}
            hiddenFilters={this.state.hiddenFilters}
            setFilterParam={setFilterParam}
            data={filtersValue.season}
          />
        </section>

        <div className='separator-150 separator-150-7'></div>
        <section className='sidebar__division'>
          <SideBarBrand
            func={this.openerButton}
            hiddenFilters={this.state.hiddenFilters}
            setFilterParam={setFilterParam}
            data={filtersValue.brand}
          />
          <label>
            <input
              checked={discounted}
              onChange={() => setDiscountedParam(!discounted)}
              type='checkbox'
              className='checkbox'
              name='checkbox-disc'
            />
            <span className='checkbox-discount'></span> <span className='text-discount'>Со скидкой</span>
          </label>
          <div className='separator-240'></div>
        </section>
        <section className='sidebar__division'>
          <div className='drop-down'>
            <a onClick={clearFilters} ><span className='drop-down-icon'></span>Сбросить</a>
          </div>
        </section>
      </section>
    )
  }
}

class SideBarCatalogueList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: ''
    }
  }

  handleClick = () => this.props.func('CatalogueList')

  sideBarShoesTypeSettings = ({ name, value }, idx) => (event) => {
    event.preventDefault()
    this.props.setFilterParam({ name, value })
    this.setState({
      isActive: idx
    })
  }

  render() {
    return (
      <div className='sidebar__catalogue-list'>
        <div className='sidebar__division-title'>
          <h3>Каталог</h3>
          <div className={this.props.hiddenFilters.includes('CatalogueList') ? 'opener-up' : 'opener-down'} onClick={this.handleClick}></div>
        </div>
        <ul className={this.props.hiddenFilters.includes('CatalogueList') ? 'hidden' : 'sidebar-ul sidebar__catalogue-list-ul'}>
          {this.props.data.map((shoesType, index) =>
            <ShoesTypeSideBarListItem
              key={shoesType}
              data={shoesType}
              idx={index}
              isActive={this.state.isActive === index}
              func={this.sideBarShoesTypeSettings}
              hiddenFilters={this.props.hiddenFilters}
            />
          )}
        </ul>
      </div>
    )
  }
}

class ShoesTypeSideBarListItem extends Component {
  render() {
    const { hiddenFilters, func, isActive, data, idx } = this.props
    return (
      <li className={hiddenFilters.includes('CatalogueList') ? 'hidden' : 'sidebar-ul-li sidebar__catalogue-list-ul-li'} >
        <button className={isActive ? 'sidebar-button-active' : 'sidebar-button'} onClick={func({ name: 'shoesType', value: `${data}` }, idx)}>{data}</button>
      </li>
    )
  }
}

class SideBarPrice extends Component {
  constructor(props) {
    super(props);
    // ссылки на объекты DOM
    this.circle1 = null;
    this.circle2 = null;
    this.circleContainer = null;
    this.getRefs = {
      circle1: ref => this.circle1 = ref,
      circle2: ref => this.circle2 = ref,
      circleContainer: ref => this.circleContainer = ref
    };

    // параметр, который мы будем вычитать из event.clientX для получения значения style.left текущего круга
    this.offset = 0;
    // названия класса перетаскиваемого круга
    this.currentCircleClassName = '';
    // пустой элемент для отображения вместо 'клона' круга при перетаскивании
    this.blankElement = document.createElement('div');

    this.state = {
      // значение style.left для первого и второго круга
      circle1Left: 0,
      circle2Left: 215,
      hiddenFilters: this.props.hiddenFilters
    }
  }
  handleClick = () => this.props.func('CatalogueList')

  componentWillMount() {
    this.updateCirclesPositions(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { minPrice, maxPrice } = nextProps;
    if (this.props.minPrice !== minPrice || this.props.maxPrice !== maxPrice) {
      this.updateCirclesPositions(nextProps);
    }
  }

  // обновление позиций кругов
  // ширина контейнера 240px, диаметр круга 25px
  updateCirclesPositions = (nextProps) => {
    const fixedMaxPriceValue = 100000
    const { minPrice, maxPrice } = nextProps;
    const circle1Left = Math.round(215 * minPrice / fixedMaxPriceValue);
    const circle2Left = Math.round(215 * maxPrice / fixedMaxPriceValue);
    this.setState({ circle1Left, circle2Left });
  }

  onDragStart = (event) => {
    this.currentCircleClassName = event.currentTarget.className;
    // вычисляем расстояние от левого края окна до левого края слайдера + от левого края круга до точки касания круга указателем мыши
    this.offset = this.circleContainer.getBoundingClientRect().left + (event.clientX - event.currentTarget.getBoundingClientRect().left);
    // выставляем пустой элемент для отображения вместо 'клона' круга при перетаскивании
    event.dataTransfer.setDragImage(this.blankElement, 0, 0);
  }

  onDragOver = (event) => {
    event.preventDefault();
    if (this.currentCircleClassName === 'circle-1') {
      let circle1Left = event.clientX - this.offset;
      if (circle1Left < 0) circle1Left = 0;
      if (circle1Left > this.state.circle2Left) circle1Left = this.state.circle2Left;
      this.setState({ circle1Left });
    }

    if (this.currentCircleClassName === 'circle-2') {
      let circle2Left = event.clientX - this.offset;
      if (circle2Left > 215) circle2Left = 215;
      if (circle2Left < this.state.circle1Left) circle2Left = this.state.circle1Left;
      this.setState({ circle2Left });
    }
  }

  onDragEnd = (event) => {
    if (this.currentCircleClassName === 'circle-1') {
      this.setPriceLimit(this.state.circle1Left, 'minPrice');
    }

    if (this.currentCircleClassName === 'circle-2') {
      this.setPriceLimit(this.state.circle2Left, 'maxPrice');
    }
  }

  setPriceLimit = (circleLeft, priceType) => {
    const fixedMaxPriceValue = 100000
    const value = Math.round(fixedMaxPriceValue * circleLeft / 215);
    this.props.setFilterParam({ name: priceType, value: +value });
  }

  onChangePriceLimit = (event) => {
    const { name, value } = event.currentTarget;
    if (+value > 100000 || +value < 0) return;
    this.props.setFilter({ name, value: +value })(event);
  }

  render() {
    const { circle1Left, circle2Left, hiddenFilters } = this.state;
    return (
      <section className='sidebar__division'>
        <div className='sidebar__price'>
          <div className='sidebar__division-title'>
            <h3>Цена</h3>
            <div className={hiddenFilters.includes('Price') ? 'opener-up' : 'opener-down'} onClick={this.handleClick}></div>
          </div>
          <div className={hiddenFilters.includes('Price') ? 'hidden' : 'price-slider'}>
            <div
              ref={this.getRefs.circleContainer}
              onDragOver={this.onDragOver}
              className='circle-container'>
              <div
                className='circle-1'
                draggable
                ref={this.getRefs.circle1}
                onDragStart={this.onDragStart}
                onDragEnd={this.onDragEnd}
                style={{ left: `${circle1Left}px` }}>
              </div>
              <div className='line-white'></div>
              <div className='line-colored' style={{ left: `${circle1Left + 12}px`, right: `${215 - circle2Left + 12}px` }} ></div>
              <div
                className='circle-2'
                ref={this.getRefs.circle2}
                draggable
                onDragStart={this.onDragStart}
                onDragEnd={this.onDragEnd}
                style={{ left: `${circle2Left}px` }}>
              </div>
            </div>
            <div className='counter'>
              <input onChange={this.onChangePriceLimit} type='number' name='minPrice' className='input-1' value={this.props.minPrice} />
              <div className='input-separator'></div>
              <input onChange={this.onChangePriceLimit} type='number' name='maxPrice' className='input-2' value={this.props.maxPrice} />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

class SideBarColor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: ''
    }
  }

  handleClick = () => this.props.func('Color')

  sideBarColorSettings = ({ name, value }, idx) => (event) => {
    event.preventDefault()
    this.props.setFilterParam({ name, value })
    this.setState({
      isActive: idx
    })
  }

  render() {
    return (
      <div className='sidebar__color'>
        <div className='sidebar__division-title'>
          <h3>Цвет</h3>
          <div className={this.props.hiddenFilters.includes('Color') ? 'opener-up' : 'opener-down'} onClick={this.handleClick}></div>
        </div>
        <ul className={this.props.hiddenFilters.includes('Color') ? 'hidden' : 'sidebar-ul sidebar__color-list-ul'}>
          {sidebarColorData.map((item, index) =>
            <ColorSideBarListItem
              key={item.color}
              data={item}
              idx={index}
              isActive={this.state.isActive === index}
              func={this.sideBarColorSettings}
              hiddenFilters={this.props.hiddenFilters}
            />
          )}
        </ul>
      </div>
    )
  }
}

class ColorSideBarListItem extends Component {
  render() {
    const { hiddenFilters, func, isActive, data, idx } = this.props
    return (
      <li className={hiddenFilters.includes('Color') ? 'hidden' : 'sidebar-ul-li sidebar__color-list-ul-li'} >
        <button className={isActive ? 'sidebar-button-active' : 'sidebar-button'} onClick={func({ name: 'color', value: data.colorName }, idx)}>
          <div className={`color ${data.color}`}></div>
          <span className='color-name'>{data.colorName}</span>
        </button>
      </li>
    )
  }
}

class SideBarSize extends Component {
  handleClick = () => this.props.func('Size')
  render() {
    return (
      <div className='sidebar__size'>
        <div className='sidebar__division-title'>
          <h3>Размер</h3>
          <div className={this.props.hiddenFilters.includes('Size') ? 'opener-up' : 'opener-down'} onClick={this.handleClick}></div>
        </div>
        <ul className={this.props.hiddenFilters.includes('Size') ? 'hidden' : 'sidebar-ul sidebar__size-list-ul'}>
          {this.props.data.map((size, index) =>
            <SizeSideBarListItem
              key={size}
              data={size}
              idx={index}
              hiddenFilters={this.props.hiddenFilters}
              setFilterArrayParam={this.props.setFilterArrayParam}
            />
          )}
        </ul>
      </div>
    )
  }
}

class SizeSideBarListItem extends Component {
  render() {
    const { data, hiddenFilters, setFilterArrayParam } = this.props
    return (
      <li className={hiddenFilters.includes('Size') ? 'hidden' : 'sidebar-ul-li sidebar__size-list-ul-li'}>
        <label>
          <input type='checkbox'
            onChange={setFilterArrayParam}
            value={+data}
            name='sizes'
            className='checkbox'
          />
          <span className='checkbox-custom'></span>
          <span className='label'>{data}</span>
        </label>
      </li>
    )
  }
}

class SideBarHeelSize extends Component {
  handleClick = () => this.props.func('HeelSize')
  render() {
    return (
      <div className='sidebar__heel-height'>
        <div className='sidebar__division-title'>
          <h3>Размер каблука</h3>
          <div className={this.props.hiddenFilters.includes('HeelSize') ? 'opener-up' : 'opener-down'} onClick={this.handleClick}></div>
          <ul className={this.props.hiddenFilters.includes('HeelSize') ? 'hidden' : 'sidebar-ul sidebar__heelSize-list-ul'}>
            {this.props.data.map((size, index) =>
              <HeelSizeSideBarListItem
                key={size}
                data={size}
                idx={index}
                hiddenFilters={this.props.hiddenFilters}
                setFilterArrayParam={this.props.setFilterArrayParam}
              />
            )}
          </ul>
        </div>
      </div>
    )
  }
}

class HeelSizeSideBarListItem extends Component {
  render() {
    const { data, hiddenFilters, setFilterArrayParam } = this.props
    return (
      <li className={hiddenFilters.includes('HeelSize') ? 'hidden' : 'sidebar-ul-li sidebar__heelSize-list-ul-li'}>
        <label>
          <input type='checkbox'
            onChange={setFilterArrayParam}
            value={+data}
            name='heelSizes'
            className='checkbox'
          />
          <span className='checkbox-custom'></span>
          <span className='label'>{data}</span>
        </label>
      </li>
    )
  }
}

class SideBarReason extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: ''
    }
  }

  handleClick = () => this.props.func('Reason')

  sideBarReasonSettings = (param, idx) => (event) => {
    event.preventDefault()
    this.props.setFilterParam(param)
    this.setState({
      isActive: idx
    })
  }

  render() {
    return (
      <div className='sidebar__occasion'>
        <div className='sidebar__division-title'>
          <h3>Повод</h3>
          <div className={this.props.hiddenFilters.includes('Reason') ? 'opener-up' : 'opener-down'} onClick={this.handleClick}></div>
        </div>
        <ul className={this.props.hiddenFilters.includes('Reason') ? 'hidden' : 'sidebar-ul sidebar__ocassion-list-ul'}>
          {this.props.data.map((reason, index) =>
            <ReasonSideBarListItem
              key={reason}
              data={reason}
              idx={index}
              isActive={this.state.isActive === index}
              func={this.sideBarReasonSettings}
              hiddenFilters={this.props.hiddenFilters}
            />
          )}
        </ul>
      </div>
    )
  }
}

class ReasonSideBarListItem extends Component {
  render() {
    const { hiddenFilters, func, isActive, data, idx } = this.props
    return (
      <li className={hiddenFilters.includes('Reason') ? 'hidden' : 'sidebar-ul-li sidebar__ocassion-list-ul-li'} >
        <button className={isActive ? 'sidebar-button-active' : 'sidebar-button'} onClick={func({ name: 'reason', value: data }, idx)}>{data}</button>
      </li>
    )
  }
}

class SideBarSeason extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: ''
    }
  }

  handleClick = () => this.props.func('Season')

  sideBarSeasonSettings = (param, idx) => (event) => {
    event.preventDefault()
    this.props.setFilterParam(param)
    this.setState({
      isActive: idx
    })
  }

  render() {
    return (
      <div className='sidebar__season'>
        <div className='sidebar__division-title'>
          <h3>Сезон</h3>
          <div className={this.props.hiddenFilters.includes('Season') ? 'opener-up' : 'opener-down'} onClick={this.handleClick}></div>
          <ul className={this.props.hiddenFilters.includes('Season') ? 'hidden' : 'sidebar-ul sidebar__season-list-ul'} >
            {this.props.data.map((season, index) =>
              <SeasonSideBarListItem
                key={season}
                data={season}
                idx={index}
                isActive={this.state.isActive === index}
                func={this.sideBarSeasonSettings}
                hiddenFilters={this.props.hiddenFilters}
              />
            )}
          </ul>
        </div>
      </div>
    )
  }
}

class SeasonSideBarListItem extends Component {
  render() {
    const { hiddenFilters, func, isActive, data, idx } = this.props
    return (
      <li className={hiddenFilters.includes('Season') ? 'hidden' : 'sidebar-ul-li sidebar__season-list-ul-li'} >
        <button className={isActive ? 'sidebar-button-active' : 'sidebar-button'} onClick={func({ name: 'season', value: data }, idx)}>{data}</button>
      </li>
    )
  }
}

class SideBarBrand extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: ''
    }
  }

  handleClick = () => this.props.func('Season')

  sideBarBrandSettings = (param, idx) => (event) => {
    event.preventDefault()
    this.props.setFilterParam(param)
    this.setState({
      isActive: idx
    })
  }

  render() {
    return (
      <div className='sidebar__brand'>
        <div className='sidebar__division-title'>
          <h3>Бренд</h3>
          <div className={this.props.hiddenFilters.includes('Brand') ? 'opener-up' : 'opener-down'} onClick={this.handleClick}></div>
          <ul className={this.props.hiddenFilters.includes('Brand') ? 'hidden' : 'sidebar-ul sidebar__brand-list-ul'} >
            {this.props.data.map((brand, index) =>
              <BrandSideBarListItem
                key={brand}
                data={brand}
                idx={index}
                isActive={this.state.isActive === index}
                func={this.sideBarBrandSettings}
                hiddenFilters={this.props.hiddenFilters}
              />
            )}
          </ul>
        </div>
      </div>
    )
  }
}

class BrandSideBarListItem extends Component {
  render() {
    const { hiddenFilters, func, isActive, data, idx } = this.props
    return (
      <li className={hiddenFilters.includes('Brand') ? 'hidden' : 'sidebar-ul-li sidebar__brand-list-ul-li'} >
        <button className={isActive ? 'sidebar-button-active' : 'sidebar-button'} onClick={func({ name: 'brand', value: data }, idx)}>{data}</button>
      </li>
    )
  }
}



export default SideBar