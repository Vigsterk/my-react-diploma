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

let headerProfile = document.querySelector('.header-main__pic_profile');
let headerBasket = document.querySelector('.header-main__pic_basket');
headerProfile.onclick = headerHiddenPanelProfileVisibility;
headerBasket.onclick = headerHiddenPanelBasketVisibility;

//Функция видимости меню поиска в шапке
function headerMainSearchVisibility() {
    document.querySelector('.header-main__search').classList.toggle('header-main__search_active');
    document.querySelector('.header-main__pic_search').classList.toggle('header-main__pic_search_is-hidden');

}

let headerSearch = document.querySelector('.header-main__pic_search');
headerSearch.onclick = headerMainSearchVisibility;


//Выпадающее меню главного меню (пока с общим списком для всех пунктов)
function mainSubmenuVisibility() {
    console.log(this.className);
    if (this.className.split(' ')[this.className.split(' ').length-1] === ('main-menu__item_active')) {
        document.querySelector('.dropped-menu').classList.remove('dropped-menu_visible')
        this.classList.remove('main-menu__item_active');
    } else {
        if (document.querySelector('.main-menu__item_active')) {
            document.querySelector('.main-menu__item_active').classList.toggle('main-menu__item_active');
        }
        document.querySelector('.dropped-menu').classList.add('dropped-menu_visible');
        this.classList.toggle('main-menu__item_active');
    }

}

let mainMenuItems = document.querySelectorAll('.main-menu__item');

for (let item of mainMenuItems) {
    item.onclick = mainSubmenuVisibility;
}