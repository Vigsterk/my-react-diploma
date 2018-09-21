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
      <section className="sidebar">
        <section className="sidebar__division">
          <SideBarCatalogueList
            func={this.openerButton}
            hiddenFilters={this.state.hiddenFilters}
            setFilterParam={setFilterParam}
            data={filtersValue.type}
          />
        </section>

        <div className="separator-150 separator-150-1"></div>
        <section className="sidebar__division">
          <SideBarPrice
            func={this.openerButton}
            hiddenFilters={this.state.hiddenFilters}
            setFilterParam={setFilterParam}
            maxPrice={maxPrice}
            minPrice={minPrice}
          />
        </section>

        <div className="separator-150 separator-150-2"></div>
        <section className="sidebar__division">
          <SideBarColor
            func={this.openerButton}
            hiddenFilters={this.state.hiddenFilters}
            setFilterParam={setFilterParam}
          />
        </section>

        <div className="separator-150 separator-150-3"></div>
        <section className="sidebar__division">
          <SideBarSize
            func={this.openerButton}
            hiddenFilters={this.state.hiddenFilters}
            setFilterArrayParam={setFilterArrayParam}
            data={filtersValue.sizes}
          />
        </section>

        <div className="separator-150 separator-150-4"></div>
        <section className="sidebar__division">
          <SideBarHeelSize
            func={this.openerButton}
            hiddenFilters={this.state.hiddenFilters}
            setFilterArrayParam={setFilterArrayParam}
            data={filtersValue.heelSize}
          />
        </section>

        <div className="separator-150 separator-150-5"></div>
        <section className="sidebar__division">
          <SideBarReason
            func={this.openerButton}
            hiddenFilters={this.state.hiddenFilters}
            setFilterParam={setFilterParam}
            data={filtersValue.reason}
          />
        </section>

        <div className="separator-150 separator-150-6"></div>
        <section className="sidebar__division">
          <SideBarSeason
            func={this.openerButton}
            hiddenFilters={this.state.hiddenFilters}
            setFilterParam={setFilterParam}
            data={filtersValue.season}
          />
        </section>

        <div className="separator-150 separator-150-7"></div>
        <section className="sidebar__division">
          <SideBarBrand
            setFilterParam={setFilterParam}
            data={filtersValue.brand}
          />
          <label>
            <input
              checked={discounted}
              onChange={() => setDiscountedParam(!discounted)}
              type="checkbox"
              className="checkbox"
              name="checkbox-disc"
            />
            <span className="checkbox-discount"></span> <span className="text-discount">Со скидкой</span>
          </label>
          <div className="separator-240"></div>
        </section>
        <section className="sidebar__division">
          <div className="drop-down">
            <a onClick={clearFilters} ><span className="drop-down-icon"></span>Сбросить</a>
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

  sideBarTypeSettings = ({ name, value }, idx) => (event) => {
    event.preventDefault()
    this.props.setFilterParam({ name, value })
    this.setState({
      isActive: idx
    })
  }

  render() {
    return (
      <div className="sidebar__catalogue-list">
        <div className="sidebar__division-title">
          <h3>Каталог</h3>
          <div className={this.props.hiddenFilters.includes('CatalogueList') ? 'opener-up' : 'opener-down'} onClick={this.handleClick}></div>
        </div>
        <ul className={this.props.hiddenFilters.includes('CatalogueList') ? 'hidden' : 'sidebar-ul sidebar__catalogue-list-ul'}>
          {this.props.data.map((type, index) =>
            <TypeSideBarListItem
              key={type}
              data={type}
              idx={index}
              isActive={this.state.isActive === index}
              func={this.sideBarTypeSettings}
              hiddenFilters={this.props.hiddenFilters}
            />
          )}
        </ul>
      </div>
    )
  }
}

class TypeSideBarListItem extends Component {
  render() {
    const { hiddenFilters, func, isActive, data, idx } = this.props
    return (
      <li className={hiddenFilters.includes('CatalogueList') ? 'hidden' : "sidebar-ul-li sidebar__catalogue-list-ul-li"} >
        <button className={isActive ? 'sidebar-button-active' : 'sidebar-button'} onClick={func({ name: 'type', value: `${data}` }, idx)}>{data}</button>
      </li>
    )
  }
}

class SideBarPrice extends Component {
  constructor(props) {
    super(props)
    this.state = {
      minPriceValue: this.props.minPrice,
      maxPriceValue: this.props.maxPrice
    }
  }
  handleClick = () => this.props.func('Price')

  setPrice = (value, event) => {
    if (event.target.className === "input-1") {
      this.setState({ minPriceValue: value });
    } else {
      this.setState({ maxPriceValue: value });
    }
  }

  render() {
    return (
      <div className="sidebar__price">
        <div className="sidebar__division-title">
          <h3>Цена</h3>
          <div className={this.props.hiddenFilters.includes('Price') ? 'opener-up' : 'opener-down'} onClick={this.handleClick}></div>
        </div>
        <div className={this.props.hiddenFilters.includes('Price') ? 'hidden' : "price-slider"}>
          <div className="circle-container">
            <div className="circle-1" draggable></div>
            <div className="line-white"></div>
            <div className="line-colored"></div>
            <div className="circle-2" draggable></div>
          </div>
          <div className="counter">
            <input type="text" className="input-1" value={this.state.minPriceValue}
              onChange={(event) => this.setPrice(event.target.value, event)} />
            <div className="input-separator"></div>
            <input type="text" className="input-2" value={this.state.maxPriceValue}
              onChange={(event) => this.setPrice(event.target.value, event)} />

          </div>
        </div>
      </div>
    )
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
      <div className="sidebar__color">
        <div className="sidebar__division-title">
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
      <li className={hiddenFilters.includes('Color') ? 'hidden' : "sidebar-ul-li sidebar__color-list-ul-li"} >
        <button className={isActive ? 'sidebar-button-active' : 'sidebar-button'} onClick={func({ name: 'color', value: data.colorName }, idx)}>
          <div className={`color ${data.color}`}></div>
          <span className="color-name">{data.colorName}</span>
        </button>
      </li>
    )
  }
}

class SideBarSize extends Component {
  handleClick = () => this.props.func('Size')
  render() {
    return (
      <div className="sidebar__size">
        <div className="sidebar__division-title">
          <h3>Размер</h3>
          <div className={this.props.hiddenFilters.includes('Size') ? 'opener-up' : 'opener-down'} onClick={this.handleClick}></div>
        </div>
        <ul className={this.props.hiddenFilters.includes('Size') ? 'hidden' : "sidebar-ul sidebar__size-list-ul"}>
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
      <li className={hiddenFilters.includes('Size') ? 'hidden' : "sidebar-ul-li sidebar__size-list-ul-li"}>
        <label>
          <input type="checkbox"
            onChange={setFilterArrayParam}
            value={+data}
            name='sizes'
            className="checkbox"
          />
          <span className="checkbox-custom"></span>
          <span className="label">{data}</span>
        </label>
      </li>
    )
  }
}

class SideBarHeelSize extends Component {
  handleClick = () => this.props.func('HeelSize')
  render() {
    return (
      <div className="sidebar__heel-height">
        <div className="sidebar__division-title">
          <h3>Размер каблука</h3>
          <div className={this.props.hiddenFilters.includes('HeelSize') ? 'opener-up' : 'opener-down'} onClick={this.handleClick}></div>
          <ul className={this.props.hiddenFilters.includes('HeelSize') ? 'hidden' : "sidebar-ul sidebar__heelSize-list-ul"}>
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
      <li className={hiddenFilters.includes('HeelSize') ? 'hidden' : "sidebar-ul-li sidebar__heelSize-list-ul-li"}>
        <label>
          <input type="checkbox"
            onChange={setFilterArrayParam}
            value={+data}
            name='heelSizes'
            className="checkbox"
          />
          <span className="checkbox-custom"></span>
          <span className="label">{data}</span>
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
      <div className="sidebar__occasion">
        <div className="sidebar__division-title">
          <h3>Повод</h3>
          <div className={this.props.hiddenFilters.includes('Reason') ? 'opener-up' : 'opener-down'} onClick={this.handleClick}></div>
        </div>
        <ul className={this.props.hiddenFilters.includes('Reason') ? 'hidden' : "sidebar-ul sidebar__ocassion-list-ul"}>
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
      <li className={hiddenFilters.includes('Reason') ? 'hidden' : "sidebar-ul-li sidebar__ocassion-list-ul-li"} >
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
      <div className="sidebar__season">
        <div className="sidebar__division-title">
          <h3>Сезон</h3>
          <div className={this.props.hiddenFilters.includes('Season') ? 'opener-up' : 'opener-down'} onClick={this.handleClick}></div>
          <ul className={this.props.hiddenFilters.includes('Season') ? 'hidden' : "sidebar-ul sidebar__season-list-ul"} >
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
      <li className={hiddenFilters.includes('Season') ? 'hidden' : "sidebar-ul-li sidebar__season-list-ul-li"} >
        <button className={isActive ? 'sidebar-button-active' : 'sidebar-button'} onClick={func({ name: 'season', value: data }, idx)}>{data}</button>
      </li>
    )
  }
}

class SideBarBrand extends Component {
  render() {
    return (
      <div className="sidebar__brand">
        <h3>Бренд</h3>
        <form action="post" className="brand-search">
          <input type="search"
            className="brand-search"
            id="brand-search"
            placeholder="Поиск" />
          <input type="submit" name=""
            value="" className="submit" />
        </form>
      </div>
    )
  }
}

export default SideBar