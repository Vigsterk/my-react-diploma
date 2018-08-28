const topMenuData = [
  {
    id: 1,
    title: "Возврат"
  },
  {
    id: 2,
    title: "Доставка и оплата"
  },
  {
    id: 3,
    title: "О Магазине"
  },
  {
    id: 4,
    title: "Контакты"
  },
  {
    id: 5,
    title: "Новости"
  },
]

const mainMenuItems = [
  {
    title: "Акции",
    className: "sales",
    id: 1
  },
  {
    title: "Женская обувь",
    className: "women",
    id: 2
  },
  {
    title: "Мужская обувь",
    className: "men",
    id: 3
  },
  {
    title: "Детская обувь",
    className: "kids",
    id: 4
  },
  {
    title: "Аксессуары",
    className: "accessories",
    id: 5
  },
  {
    title: "Для дома",
    className: "home",
    id: 6
  },
  {
    title: "Бренды",
    className: "brands",
    id: 7
  },
  {
    title: "Новинки",
    className: "new",
    id: 8
  },
]

const droppedMenuItems = [
  {
    title: "Повод:",
    columnID: 1,
    classNamePath: "lists_women",
    data: [
      {
        title: "Офис",
        url: "/catalogue",
        id: "1-1"
      },
      {
        title: "Вечеринка",
        url: "/catalogue",
        id: "1-2"
      },
      {
        title: "Свадьба",
        url: "/catalogue",
        id: "1-3"
      },
      {
        title: "Спорт",
        url: "/catalogue",
        id: "1-4"
      },
      {
        title: "Море",
        url: "/catalogue",
        id: "1-5"
      },
      {
        title: "Дом",
        url: "/catalogue",
        id: "1-6"
      },
      {
        title: "Повседневное",
        url: "/catalogue",
        id: "1-7"
      }
    ]
  },
  {
    title: "Категории:",
    columnID: 2,
    classNamePath: "lists_three-coloumns",
    data: [
      {
        title: "Балетки",
        url: "/catalogue",
        id: "2-1"
      },
      {
        title: "Босоножки",
        url: "/catalogue",
        id: "2-2"
      },
      {
        title: "Ботильоны",
        url: "/catalogue",
        id: "2-3"
      },
      {
        title: "Ботинки",
        url: "/catalogue",
        id: "2-4"
      },
      {
        title: "Ботфорты",
        url: "/catalogue",
        id: "2-5"
      },

      {
        title: "Галоши",
        url: "/catalogue",
        id: "2-6"
      },

      {
        title: "Кеды и кроссовки",
        url: "/catalogue",
        id: "2-7"
      },
      {
        title: "Мокасины",
        url: "/catalogue",
        id: "2-8"
      },
      {
        title: "Полусапоги",
        url: "/catalogue",
        id: "2-9"
      },
      {
        title: "Резиновые сапоги",
        url: "/catalogue",
        id: "2-10"
      },
      {
        title: "Сабо",
        url: "/catalogue",
        id: "2-11"
      },
      {
        title: "Сапоги",
        url: "/catalogue",
        id: "2-12"
      },
      {
        title: "Сникерсы",
        url: "/catalogue",
        id: "2-13"
      },
      {
        title: "Тапочки",
        url: "/catalogue",
        id: "2-14"
      },
      {
        title: "Туфли",
        url: "/catalogue",
        id: "2-15"
      },
      {
        title: "Шлёпанцы и вьетнамки",
        url: "/catalogue",
        id: "2-16"
      }
    ]
  },
  {
    title: "Сезон:",
    columnID: 3,
    classNamePath: "seasons",
    data: [
      {
        title: "Зима",
        url: "/catalogue",
        id: "3-1"
      },
      {
        title: "Весна",
        url: "/catalogue",
        id: "3-2"
      },
      {
        title: "Лето",
        url: "/catalogue",
        id: "3-3"
      },
      {
        title: "Осень",
        url: "/catalogue",
        id: "3-4"
      }
    ]
  },
  {
    title: "Бренды:",
    columnID: 4,
    classNamePath: "brands",
    data: [
      {
        title: "Albano",
        url: "/catalogue",
        id: "4-1"
      },
      {
        title: "Ballin",
        url: "/catalogue",
        id: "4-2"
      },
      {
        title: "Baldinini",
        url: "/catalogue",
        id: "4-3"
      },
      {
        title: "Damlax",
        url: "/catalogue",
        id: "4-4"
      },
      {
        title: "Pegia",
        url: "/catalogue",
        id: "4-5"
      },
      {
        title: "Renzi",
        url: "/catalogue",
        id: "4-6"
      },
      {
        title: "Все",
        url: "/catalogue",
        id: "4-7"
      }
    ]
  }
]


export { mainMenuItems, droppedMenuItems, topMenuData}