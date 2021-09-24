
//выбор вкладок в главном меню
function mainMenuSelect () {

	let tabs = document.getElementById('Main-menu').children;
	let for_tabs = document.querySelectorAll('.for-tabs');
	let arrow = document.querySelector('#Goods-tab .arrow');
	let categories = document.getElementById('Categories');
	let go_to_cart = document.getElementById('Go-to-cart');
	let local_settings = settings;


	// выбор категории по умолчанию
	if(document.querySelector('.for-tabs')) {
		let selected_categorie;
		if(!JSON.parse(localStorage.getItem('settings'))) {
			localStorage.setItem('settings', JSON.stringify(local_settings));
			selected_categorie = local_settings['selected_categorie'];
		} else {
			selected_categorie = JSON.parse(localStorage.getItem('settings'))['selected_categorie']
		};
		document.getElementById('For-'+selected_categorie).style.display = 'block';
		document.getElementById(selected_categorie).classList.add('tab-selected');
	};



	for(let value of tabs) {
		
		value.onclick = function () {

			if(this.id=='Goods-tab') {

				if(arrow.style.transform=='rotate(0deg)') {
					arrow.style.transform = 'rotate(180deg)';
				} else {
					arrow.style.transform = 'rotate(0deg)';
				}
				
				categories.classList.toggle('show-categories');
				this.classList.toggle('tab-selected');
			} else {

				for(let value of tabs) {
					if(value.classList.contains('tab-selected')&&value.id!='Goods-tab') {
						value.classList.remove('tab-selected');
						break;
					};
				};
				this.classList.add('tab-selected');

				for(let value of for_tabs) {
					if(value.style.display=='block') {
						value.style.display='none';
						break;
					};
				};

				if(document.getElementById('For-'+this.id)) {
					document.getElementById('For-'+this.id).style.display = 'block';
				} else {
					local_settings['selected_categorie'] = this.id;
					localStorage.setItem('settings', JSON.stringify(local_settings));
					document.location.href = '/';
				}
			};
		}
	};

	//переход по ссылкам при клике на категории
	for(let value of categories.children) {

		value.onclick = function () {
			document.location.href = '/'+this.id;
		}
	};


	//переход в главную карзину при нажатии на кнопку оформить заказ
	if(go_to_cart) {

		go_to_cart.onclick = function () {

			document.location.href = '/Cart';
		};
	};
};





//поиск товаров при вводе в инпут поиска
function searchGoods () {

	let goods = all_goods;
	let new_goods = all_new_goods;
	let inner_content = document.querySelector('.inner-content');
	let search_goods = document.getElementById('Search-goods');
	let results_div = document.getElementById('Results');
	let acount_search = document.getElementById('Acount-search');
	let html = document.querySelector('html');
	let limit_goods = settings['limit_goods'];


	document.getElementById('Forsearch').oninput = function () {
		
		if(this.value.trim()) {

			let string_search = this.value.toLowerCase().trim();
			let sum = 0;
			let results = {};
			let max_goods = limit_goods;

			inner_content.style.display='none';
			search_goods.style.display='block';
			results_div.innerHTML = '';

			for(let key in goods) {

				let need_string = key.toLowerCase();

				for(let i=0; i<need_string.length; i++) {

					if(need_string.slice(i, string_search.length+i)==string_search) {

						if(results_div.children.length<limit_goods) {
							loadGood(results_div, key, goods, new_goods);
							addWayGood(key, goods, results_div);
						} else {
							results[key] = goods[key];
						};
						sum++;
						break;
					}
				}
			};

			// результаты поиска
			if(sum) {
				acount_search.innerHTML = 'Найдено товаров - '+sum;
			} else {
				acount_search.innerHTML = 'Товаров не найдено';
			};

			//показ определенного количества товаров при прокрутке
			window.onscroll = function () {

				if(html.scrollTop+html.clientHeight+5>=html.offsetHeight) {

					max_goods+=limit_goods;

					for(let key in results) {

						if(results_div.children.length<max_goods) {
							loadGood(results_div, key, goods, new_goods);
							addWayGood(key, goods, results_div);
							delete results[key]
						} else {
							break;
						}
					};
				};

			};

		} else {
			inner_content.style.display='block';
			search_goods.style.display='none';
		}	
	}
};



//добаление пути товара при поиске
function addWayGood (name, goods, parrent_goods) {

	let href = goods[name]['src'].split('/')[1];
	let categorie = document.querySelector('#'+href+' .name-categorie').innerHTML;

	let string = '<div class="way-good"><a href="'+href+'">'+categorie+'</a></div>';

	document.querySelector('.'+parrent_goods.getAttribute('class')+' .add-cart[name-good="'+name+'"]').parentElement.insertAdjacentHTML('afterBegin', string);
};


//установка позиционирование элементов (КАСТРЫЛЬ!)
function setPositionElements () {

	let categories = document.getElementById('Categories');
	let main_menu = document.getElementById('Main-menu');

	changeSizeElements();

	window.onresize = changeSizeElements;

	//изменение размеров элементов
	function changeSizeElements () {
		categories.style.left = main_menu.offsetLeft+177+'px';
	};
};


//установка размеров объектов в зависимости от параметров экрана
function setScreenSize (arr, styles, screenWidth, screenHeigth) {

	for(let value of arr) {

		if(styles['top']) {
			value.style.top = screenHeigth*styles['top']/755+'px'
		};
		if(styles['bottom']) {
			value.style.bottom = screenHeigth*styles['bottom']/755+'px'
		};
		if(styles['left']) {
			value.style.left = screenWidth*styles['left']/1522+'px';
		};
		if(styles['right']) {
			value.style.right = screenWidth*styles['right']/1522+'px'
		};
		if(styles['width']) {
			value.style.width = screenWidth*styles['width']/1522+'px'
		};
		if(styles['height']) {
			value.style.height = screenHeigth*styles['height']/755+'px'
		};
	};
	
};
