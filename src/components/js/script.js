//Видимость блока корзина и профиля в шапке
function headerHiddenPanelProfileVisibility() {
  document.querySelector('.hidden-panel__basket').classList.remove('hidden-panel__basket_visible');
  document.querySelector('.hidden-panel__profile').classList.add('hidden-panel__profile_visible');
  if (document.querySelector('.header-main__pic_basket_menu_is-active')) {
    document.querySelector('.header-main__pic_basket_menu_is-active').classList.toggle('header-main__pic_basket_menu_is-active');
    document.querySelector('.header-main__pic_profile_menu').classList.toggle('header-main__pic_profile_menu_is-active');
  } else {
    document.querySelector('.header-main__hidden-panel').classList.toggle('header-main__hidden-panel_visible');
    document.querySelector('.header-main__pic_profile_menu').classList.toggle('header-main__pic_profile_menu_is-active');
  }
}

function headerHiddenPanelBasketVisibility() {
  document.querySelector('.hidden-panel__profile').classList.remove('hidden-panel__profile_visible');
  document.querySelector('.hidden-panel__basket').classList.add('hidden-panel__basket_visible');
  if (document.querySelector('.header-main__pic_profile_menu_is-active')) {
    document.querySelector('.header-main__pic_basket_menu').classList.toggle('header-main__pic_basket_menu_is-active');
    document.querySelector('.header-main__pic_profile_menu_is-active').classList.toggle('header-main__pic_profile_menu_is-active');
  } else {
    document.querySelector('.header-main__hidden-panel').classList.toggle('header-main__hidden-panel_visible');
    document.querySelector('.header-main__pic_basket_menu').classList.toggle('header-main__pic_basket_menu_is-active');
  }
}

//Функция видимости меню поиска в шапке
function headerMainSearchVisibility() {
  document.querySelector('.header-main__search').classList.toggle('header-main__search_active');
  document.querySelector('.header-main__pic_search').classList.toggle('header-main__pic_search_is-hidden');
}

//Выпадающее меню главного меню (пока с общим списком для всех пунктов)
function mainSubmenuVisibility(event) {
  const target = event.currentTarget;
  if (target.className.split(' ')[target.className.split(' ').length - 1] === ('main-menu__item_active')) {
    document.querySelector('.dropped-menu').classList.remove('dropped-menu_visible')
    target.classList.remove('main-menu__item_active');
  } else {
    if (document.querySelector('.main-menu__item_active')) {
      document.querySelector('.main-menu__item_active').classList.toggle('main-menu__item_active');
    }
    document.querySelector('.dropped-menu').classList.add('dropped-menu_visible');
    target.classList.toggle('main-menu__item_active');
  }

}

export { headerHiddenPanelProfileVisibility, headerHiddenPanelBasketVisibility, headerMainSearchVisibility, mainSubmenuVisibility }