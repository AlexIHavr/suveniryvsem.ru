//корзина
let cart = {};

//новые товары
let all_new_goods = {};

//настройки сайта
let settings = {
	'limit_goods': 30,
	'language': 'ru',
	'selected_categorie': 'Main-tab'
};

window.onload = function () {

	//запрет на drag
	document.querySelector('body').ondragstart = function (e) {
		e.preventDefault();
	};

	//в скрипте cart.js

	//определение новых товаров на сайте
	setNewGoods();



	//в скрипте menu.js

	//установка позиционирование элементов
	setPositionElements();

	//события выбора вкладок в главном меню
	mainMenuSelect();

	//событие поиска при введении в инпут поиска
	searchGoods();





	//в скрипте cart.js


	//только для главной страницы и главной корзины
	if(!document.querySelector('.categories') && !document.querySelector('.panel-admin')) {

		//включение слайдера показа новых товаров
		sliderNewGoods()
	};

	if(document.getElementById('Mini-cart')) {

		//проверка на присутствие товаров в хранилище и выгрузка из в мини-корзину
		checkMiniCart();

		//событие показа и скрытие стрелок при скролле
		scrollArrows();

		//событие нажатия на стрелки для поднятия или опускания мини-корзины
		clickArrow();

	} else {

		//выгрузка товаров на страницу с главной корзиной
		checkMainCart();
	};

	if(document.querySelector('.panel-admin')) {

		//управление товарами в админке
		controlGoodsImAdmin();
	};

	//создания событий открытия категорий с товарами
	openCategory();

	//создание события уменьшение картинок
	hideScaleImg();

};



//выбор рандомного целого числа от минимального до максимального
Math.randomNumber = function (min, max) {
	return Math.floor(Math.random()*(max - min + 1))+min;
};

//итерация объекта с помощью for-of
Object.prototype[Symbol.iterator] = function *() {
	for(let key in this) {
		yield this[key];
	}
};