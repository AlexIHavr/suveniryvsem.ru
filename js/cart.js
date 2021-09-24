

//создания событий открытия категорий с товарами
function openCategory() {

	let categories = document.querySelectorAll('.categories p');
	let main_menu = document.getElementById('Main-menu');

	for(let value of categories) {
		value.onclick = function () {

			if(!value.classList.contains('selected')) {

				document.querySelector('#'+this.parentElement.id+'-info').style.display = 'none';
				for(let value of categories) {
					if(value.classList.contains('selected')) {
						value.classList.remove('selected');
						break;
					};
				};
				this.classList.add('selected');
				main_menu.scrollIntoView(true);
				//выгружаем товары
				loadGoods(this.id);
			}
		}
	};
};





//выгружаем товары
function loadGoods(id) {

	let goods = all_goods;
	let new_goods = all_new_goods;
	let numbers = document.querySelector('.number-pages');
	let inner_content = document.querySelector('.inner-content');
	let limit_goods = settings['limit_goods'];

	//счетчик страниц товаров
	let num_page = 1;

	//очистка товаров из других категорий
	for(let value of document.querySelectorAll('.goods')) {
		value.innerHTML = '';
	};
	for(let value of numbers.children) {
		if(value.innerHTML!='1') {
			value.style.display = 'none';
		}
	};
	numbers.style.display = 'none';
	numbers.children[0].click(); 

	//создание события переключение первой страницы с товарами
	changePage(numbers.firstElementChild);

	//показ товаров на странице
	for(let key in goods) {

		if(goods[key]['id']==id) {

			let div_goods = document.querySelector('.goods[num="'+num_page+'"]');

			if(key) {

				loadGood(div_goods, key, goods, new_goods);

				if(numbers.children[num_page-1].style.display=='none') {
					numbers.style.display = 'flex';
					numbers.children[num_page-1].style.display = 'block';
				};

				//создание новой страницы при достижении лимита
				if(div_goods.children.length==limit_goods) {


					//создание нового номера
					if(!numbers.children[num_page+1]) {
						let div = numbers.children[0].cloneNode(false);
						div.classList.remove('selected');
						div.style.display = 'none';
						div.innerHTML = numbers.children.length+1;
						numbers.appendChild(div);

						//создание события переключение страницы с товарами
						changePage(div);
					};

					//добавление страниц
					num_page++;

					//создание новой страницы товаров
					if(!document.querySelector('.goods[num="'+num_page+'"]')) {
						let clone = div_goods.cloneNode(false);
						clone.style.display = 'none';
						clone.setAttribute('num', num_page);
						inner_content.insertBefore(clone, numbers);
					};
				};
			};
		};
	};

	//если нет товаров выводим сообщение
	if(document.querySelector('.goods').innerHTML == '') {
		document.querySelector('.goods').innerHTML = '<h3>Извините, товаров пока нет :(</h3>';
	}
};




//выгрузка товара на страницу
function loadGood (parrent_goods, name, goods, new_goods) {

	let string = '';
	let class_name = '.'+parrent_goods.getAttribute('class');

	string+='<div class="cart">';
	string+='<h4>' + name + '</h4>';
	string+='<p class="margin-p">' + goods[name]['cost'] + ' руб.'+'</p>';
	string+='<img name-good="'+name+'" class="img-cart" src="' + goods[name]['src'] + '">';
	string+='<br>';
	string+='<button name-good="'+name+'" class="add-cart">В корзину <i class="fa fa-chevron-circle-right"></i> </button>';
	string+='</div>';

	parrent_goods.insertAdjacentHTML('beforeEnd', string);

	//создание события увеличение картинки при ее нажатии
	scaleImg(document.querySelector(class_name+' .img-cart[name-good="'+name+'"]'), goods);

	//создание события добавления товаров в мини-корзину
	addToCart(document.querySelector(class_name+' .add-cart[name-good="'+name+'"]'));

	//добавление label new, если это новый товар
	attachLabelNew(name, new_goods, class_name);

};





//переключение на другою страницу с товарами
function changePage (elem) {

	let main_menu = document.getElementById('Main-menu');

	elem.onclick = function () {

		if(!this.classList.contains('selected')) {

			for(let value of document.querySelectorAll('.numbers')) {
				if(value.classList.contains('selected')) {
					value.classList.remove('selected');
					break;
				};
			};
			this.classList.add('selected');

			for(let value of document.querySelectorAll('.goods')) {
				if(value.style.display=='flex') {
					value.style.display='none';
					break;
				};
			};
			document.querySelector('.goods[num="'+this.innerHTML+'"]').style.display = 'flex';

			main_menu.scrollIntoView(true);
		}
	};
};





//увеличение картинки при ее нажатии
function scaleImg (img, goods) {

	let scale_img = document.getElementById('ScaleImg');
	let wrapper_img = scale_img.parentElement;

	img.onclick = function () {

		let good;
		let string = '';
		let i = 2;

		wrapper_img.style.opacity = '1';
		wrapper_img.style.zIndex = 2;

		good = goods[this.getAttribute('name-good')];
		string += '<img src="' + good['src'] + '">';

		while(i>0) {

			if(good['src'+i]) {
				string += '<img src="' + good['src'+i] + '">';
				i++;
			} else {
				break;
			}
		};

		scale_img.innerHTML = string;
	}
};





//уменьшение картинок при нажатии на блок показа картинок
function hideScaleImg () {

	let scale_img = document.getElementById('ScaleImg'); 

	document.getElementById('WrapperImg').onclick = function () {

		this.style.opacity = '0';
		this.style.zIndex = -2;
		scale_img.innerHTML = '';
	}
};

//добавление товаров в мини-корзину
function addToCart (elem) {

	elem.onclick = function () {

		let x = window.pageXOffset;
		let y = window.pageYOffset;

		//показ уведомления при добавлении товара 
		notifyGood(this.getAttribute('name-good'));

		//показать товар в мини-корзине
		showGood(this.getAttribute('name-good'));

		//подсчет количества товаров в корзине
		acountGoods();

		//исправление проблемы с прокруткой страницы при добавлении товара
		if(document.body.clientWidth>786) {
			window.scrollTo(x,y);
		};	
	};

};




//показ уведомления при добавлении товара 
function notifyGood (name) {

	let note_good = document.getElementById('Note-good');
	let good_added = document.getElementById('Good-added');
	let limit_good = document.getElementById('Limit-good');
	let mini_cart = cart;

	let clone;

	if(!mini_cart[name]||mini_cart[name]['count']<9999) {
		clone = good_added.cloneNode(true);
	} else {
		clone = limit_good.cloneNode(true);
	}
	note_good.style.zIndex = 2;
	clone.style.opacity = 1;
	note_good.insertBefore(clone, note_good.children[0]);

	setTimeout(function () {

		(function animateOpacity () {

			clone.style.opacity-=0.01;

			if(clone.style.opacity>0) {
				requestAnimationFrame(animateOpacity)
			} else {

				setTimeout(function () {
					note_good.removeChild(clone);
					if(note_good.children.length==2) {
						note_good.style.zIndex = -1;
					}
				}, 100)
				clone.style.opacity = 0;
			}
		})();
	}, 500)
};





//показать товар в мини-корзине
function showGood (name, count) {

	let mini_cart = cart;
	let goods = all_goods;
	let main_mini_cart = document.getElementById('Mini-cart');
	let your_cart = document.querySelector('.mini-cart');
	let arrow_up = document.querySelector('.arrow-up');
	let arrow_down = document.querySelector('.arrow-down');
	let string = '';

	//открытие мини-корзины
	if(!Object.keys(mini_cart).length) {
		main_mini_cart.style.display = 'block';
	};

	if(mini_cart[name]) {

		mini_cart[name]['count']++;

		if(mini_cart[name]['count']>=10000) {
			mini_cart[name]['count']=9999;
		};
		document.querySelector('input[name-good="'+name+'"]').value = mini_cart[name]['count'];

	} else {

		string += '<div selected-good="'+name+'">';
		string += '<div class="cart-left">'+name+'</div>';
		string += '<div>-</div>';
		string += '<div class="cart-right">'+'<input type="number" class="in" name-good="'+name+'" value="1">'+' шт.'+'</div>';
		string += '<i class="fa fa-window-close delete" name-good="'+name+'"></i></div>';
		your_cart.insertAdjacentHTML('beforeEnd', string);

		mini_cart[name] = goods[name];

		//введение количества товаров в инпут
		if(count) {
			mini_cart[name]['count'] = count;
			document.querySelector('input[name-good="'+name+'"]').value = count;
		} else {
			mini_cart[name]['count'] = 1;
		};

		//событие изменение количество товара в инпуте
		changeInputMiniCart(name);

		//событие удаление товара из мини-корзины
		deleteGoodFromCart(name)
	};

	//открытие стрелок перемещения по мини-корзине
	if(your_cart.scrollHeight>your_cart.clientHeight) {

		if(your_cart.scrollTop) {
			arrow_up.style.opacity = 1;
		} else {
			arrow_up.style.opacity = 0;
		};

		if(your_cart.clientHeight+your_cart.scrollTop+5<your_cart.scrollHeight) {
			arrow_down.style.opacity = 1;
		} else {
			arrow_down.style.opacity = 0;
		};

		arrow_down.style.display = 'block';
		arrow_up.style.display = 'block';
	};

	localStorage.setItem('cart', JSON.stringify(mini_cart));
};




//изменение количество товара в инпуте
function changeInputMiniCart (name) {

	let mini_cart = cart;

	document.querySelector('input[name-good="'+name+'"]').onchange = function () {


		if(!this.value) {
			this.value = 1
		} else if(this.value>=10000) {
			this.value = 9999;
		} else if(this.value==0) {
			document.querySelector('i.delete[name-good="'+name+'"]').click();
		};

		if(mini_cart[name]) {

			mini_cart[name]['count'] = this.value;

			localStorage.setItem('cart', JSON.stringify(mini_cart));

			//подсчет количества товаров в корзине
			acountGoods();
		}
	};

};





//удаление товара из мини-корзины
function deleteGoodFromCart (name) {

	let mini_cart = cart;
	let main_mini_cart = document.getElementById('Mini-cart');
	let your_cart = document.querySelector('.mini-cart');
	let arrow_up = document.querySelector('.arrow-up');
	let arrow_down = document.querySelector('.arrow-down');

	document.querySelector('i.delete[name-good="'+name+'"]').onclick = function () {

		delete mini_cart[name];
		your_cart.removeChild(document.querySelector('div[selected-good="'+name+'"]'));

		if(!Object.keys(mini_cart).length) {
			main_mini_cart.style.display = 'none';
		};

		//закрытие стрелок перемещения по мини-корзине
		if(your_cart.scrollHeight<=your_cart.clientHeight) {
			arrow_up.style.display = 'none';
			arrow_up.style.opacity = 1;
			arrow_down.style.display = 'none';
			arrow_down.style.opacity = 1;
		};

		localStorage.setItem('cart', JSON.stringify(mini_cart));

		//подсчет количества товаров в корзине
		acountGoods()
	};

};





//показ и скрытие стрелок при скролле мини-корзины
function scrollArrows () {

	let arrow_up = document.querySelector('.arrow-up');
	let arrow_down = document.querySelector('.arrow-down');
	let your_cart = document.querySelector('.mini-cart');

	your_cart.onscroll = function () {

		if(your_cart.scrollTop) {
			arrow_up.style.opacity = 1;
		} else {
			arrow_up.style.opacity = 0;
		};

		if(your_cart.clientHeight+your_cart.scrollTop+5<your_cart.scrollHeight) {
			arrow_down.style.opacity = 1;
		} else {
			arrow_down.style.opacity = 0;
		};
	}
};




//поднятие вверх или вниз мини-корзину с помощью стрелок
function clickArrow () {

	let arrow_up = document.querySelector('.arrow-up');
	let arrow_down = document.querySelector('.arrow-down');
	let your_cart = document.querySelector('.mini-cart');
	let speed_scroll = 50;

	arrow_up.onclick = function () {

		(function animateScrollUp () {

			your_cart.scrollTop -= speed_scroll;
			if(your_cart.scrollTop>0) {
				requestAnimationFrame(animateScrollUp)
			}
		})();

		this.style.opacity = 0;
	};
	arrow_down.onclick = function () {

		(function animateScrollDown () {

			your_cart.scrollTop += speed_scroll;
			if(your_cart.scrollTop+5<your_cart.scrollHeight-your_cart.clientHeight) {
				requestAnimationFrame(animateScrollDown)
			};
		})();

		this.style.opacity = 0;
	};
};




//проверка на присутствие товаров в хранилище и выгрузка из в мини-корзину
function checkMiniCart () {

	let mini_cart = JSON.parse(localStorage.getItem('cart'));
	let goods = all_goods;

	for(let key in mini_cart) {

		//удаление товара из корзины при изменении его название в goods.js
		if(!goods[key]) {
			delete mini_cart[key];
			localStorage.setItem('cart', JSON.stringify(mini_cart));
		} else {
			showGood(key, mini_cart[key]['count'])
		};
	};

	//подсчет суммы товаров в корзине
	acountGoods()
};


//выгрузка товаров на страницу с главной корзиной
function checkMainCart () {

	cart = JSON.parse(localStorage.getItem('cart'));

	let main_cart = cart;
	let goods = all_goods;

	let my_cart = document.querySelector('.my-cart');
	let end_main_cart = document.getElementById('End-main-cart');
	let categories = document.getElementById('Categories');

	//скрытие поиска
	document.getElementById('Search').style.display = 'none';
	categories.style.left = parseFloat(categories.style.left)+122+'px';


	for(let key in main_cart) {
		
		let string = '';
		string += '<div class="buy-good" name-good="'+key+'">'
		string += '<img name-good="'+key+'" class="img-cart" src="' + main_cart[key]['src'] + '">';
		string += '<div class="key-cart">' + key + '</div>';
		string += '<div class="key-cost">' + main_cart[key]['cost'] + ' руб.</div>';
		string += '<i class="fa fa-minus minus" name-good="'+key+'"></i>';
		string += '<span class="valueC">' + '<input type="number" class="in" name-good="' + key  + '" value="'+ main_cart[key]['count'] +'">' + ' шт.' + '</span>'
		string += '<i class="fa fa-plus plus" name-good="'+key+'"></i>';
		string += '<div class="valueD" name-good="'+key+'">'+ (main_cart[key]['count']*1*main_cart[key]['cost']).toFixed()*1 +' руб.' + '</div>';
		string += '<i class="fa fa-minus-circle delete" name-good="'+key+'"></i>';
		string += '</div>'
		end_main_cart.insertAdjacentHTML('beforeBegin', string);

		//создание события увеличение картинки при ее нажатии
		scaleImg(document.querySelector('.img-cart[name-good="'+key+'"]'), goods);

		//создание события увеличения и уменьшение количества товара при нажатии на +
		changeCountGoods(key, main_cart);

		//событие изменение количество товара в инпуте
		changeInputMainCart(key);

		//создание события на удаление товара из корзины
		deleteGoodFromMainCart(key);

		//создание события удаления всех товаров
		deleteAllGoods();

		//создание событий переключения на маил и обратно
		choosePage();

		//создание события валидации данных и отправки на почту
		sendEmail();

	};

	if(!Object.keys(main_cart).length) {
		hideMainCart();
	} else {

		//подсчет суммы стоимости товаров в корзине
		sumGoods()
	};

};





//изменение количества товара при нажатии на + или -
function changeCountGoods (name, main_cart) {

	document.querySelector('i.plus[name-good="'+name+'"]').onclick = function () {

		main_cart[name]['count']++;

		if(main_cart[name]['count']>=10000) {
			main_cart[name]['count'] = 9999;
			notifyGood(name)
		};
		safeChangesGoods(name)
	};

	document.querySelector('i.minus[name-good="'+name+'"]').onclick = function () {

		main_cart[name]['count']--;

		if(main_cart[name]['count']==0) {
			document.querySelector('i.delete[name-good="'+name+'"]').click();
		} else {
			safeChangesGoods(name)
		}
	};
};


//применение изменений при нажатии на кнопки изменения товара
function safeChangesGoods (name) {

	let main_cart = cart;

	document.querySelector('input[name-good="'+name+'"]').value = main_cart[name]['count'];
	document.querySelector('.valueD[name-good="'+name+'"]').innerHTML = (main_cart[name]['count']*1*main_cart[name]['cost']).toFixed()*1+' руб.';

	//подсчет суммы стоимости товаров в корзине
	sumGoods()

	localStorage.setItem('cart', JSON.stringify(main_cart));
};





//изменение количества товара в инпуте (для главной корзины)
function changeInputMainCart (name) {

	let main_cart = cart;

	document.querySelector('input[name-good="'+name+'"]').onchange = function () {

		if(!this.value) {
			this.value = 1
		} else if(this.value>=10000) {
			this.value = 9999;
		} else if(this.value==0) {
			document.querySelector('i.delete[name-good="'+name+'"]').click();
		};

		if(main_cart[name]) {
			main_cart[name]['count'] = this.value;

			//применение изменений
			safeChangesGoods(name);
		};
	};
};





function deleteGoodFromMainCart (name) {

	let main_cart = cart;
	let my_cart = document.querySelector('.my-cart');

	document.querySelector('i.delete[name-good="'+name+'"]').onclick = function () {

		delete main_cart[name];
		my_cart.removeChild(document.querySelector('.buy-good[name-good="'+name+'"]'));

		//скрытие корзины при удалении последнего товара
		if(!Object.keys(main_cart).length) {
			hideMainCart();
		} else {

			//подсчет суммы стоимости товаров в корзине
			sumGoods()
		}

		localStorage.setItem('cart', JSON.stringify(main_cart));

	};
};








//скрытие корзине при отсутствие товаров в ней
function hideMainCart () {

	let empty_main_cart = document.getElementById('Empty-main-cart');
	let other_div = document.querySelectorAll('.my-cart > div:not(#Empty-main-cart)');
	let button_cart1 = document.querySelector('.button-cart1');

	for(let value of other_div) {
		value.style.display = 'none';
	};
	button_cart1.style.display = 'none';
	empty_main_cart.style.display = 'block';

};



//удаление всех товаров в корзине
function deleteAllGoods () {

	document.querySelector('.remove').onclick = function () {

		for(let value of document.querySelectorAll('i.delete')) {
			value.onclick();
		};
	};
};




//подсчет суммы стоимости товаров в корзине
function sumGoods () {

	let main_cart = cart;

	let key_sum = document.querySelector('.key-sum');
	let sum = 0;

	for(let key in main_cart) {
		sum+=(main_cart[key]['count']*1*main_cart[key]['cost']).toFixed()*1;
	};
	key_sum.innerHTML = sum+' руб.'
};



//подсчет количества товаров в корзине
function acountGoods () {

	let mini_cart = cart;
	let sum_goods = document.getElementById('Sum-goods');
	let sum = 0;

	for(let key in mini_cart) {
		sum+=mini_cart[key]['count']*1;
	};

	sum_goods.innerHTML = sum;
};





//переключение на страницу майла и обратно
function choosePage () {

	let button_cart1 = document.querySelector('.button-cart1');
	let button_cart2 = document.querySelector('.button-cart2');
	let my_cart = document.querySelector('.my-cart');
	let form = document.querySelector('.form');
	let point1 = document.querySelector('.point1');
	let point2 = document.querySelector('.point2');

	button_cart1.onclick = function () {

		button_cart1.style.display = 'none';
		button_cart2.style.display = 'block';

		my_cart.style.display = 'none';
		form.style.display = 'block';

		point1.classList.add('change-grey');
		point2.classList.remove('change-grey');

		point2.style.background = 'white';
	};

	button_cart2.onclick = function () {

		button_cart1.style.display = 'block';
		button_cart2.style.display = 'none';

		my_cart.style.display = 'block';
		form.style.display = 'none';

		point1.classList.remove('change-grey');
		point2.classList.add('change-grey');

		point2.style.background = '#E6E6E6';
	}

};





//проверка валидации данных и отправка данных на почту
function sendEmail () {

	let button = document.querySelector('.send-email');

	let company = document.getElementById('company');
	let name = document.getElementById('name');
	let mail = document.getElementById('mail');
	let adress = document.getElementById('adress');
	let phone = document.getElementById('phone');
	let comment = document.getElementById('comment');
	let preloader = document.getElementById('Preloader');
	let all_form_input = document.querySelectorAll('.form input');
	let success_send = document.querySelector('.success-send');
	let error_send = document.querySelector('.error-send');
	let form = document.querySelector('.form');
	let my_cart = document.querySelector('.my-cart');
	let button_cart1 = document.querySelector('.button-cart1');
	let button_cart2 = document.querySelector('.button-cart2');
	let success;
	let first_load;

	button.onclick = function () {


		//при первой отправке включаем валидацию данных
		if(!first_load) {

			for(let value of all_form_input) {

				value.onfocus = function () {

					if(this.classList.contains('error')) {
						this.classList.remove('error');
						this.parentElement.removeChild(this.parentElement.children[0]);
					}
				}
			};

			for(let value of [name, mail, adress]) {

				value.onblur = function () {

					//проверка правильности введенных данных в инпут
					checkCorrectData(this);
				}
			};
			first_load = true;
		};

		checkCorrectData(name);
		checkCorrectData(mail);
		checkCorrectData(adress);

		for(let value of all_form_input) {

			if(value.classList.contains('error')) {
				success = false;
				break;
			} else {
				success = true;
			}
		};




		//при правильности всех данных отправляем майл
		if(success) {

			let request = new XMLHttpRequest();
			let contacts = {
				'company': company.value,
				'name': name.value,
				'mail': mail.value,
				'adress': adress.value,
				'phone': phone.value,
				'comment': comment.value,
				'cart': cart
			};

			request.open('POST', '/mail.php');
			request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			request.send('contacts='+encodeURIComponent(JSON.stringify(contacts)));


			//эмуляция загрузки запроса
			preloader.style.display = 'block';
			preloader.style.animationPlayState = 'running';


			request.onload = function() {

				form.style.display = 'none';
				my_cart.style.display = 'none';
				button_cart1.style.display = 'none';
				button_cart2.style.display = 'none';

				if(request.status==200) {
					success_send.style.display = 'block';
				} else {
					error_send.style.display = 'block';
					console.log(request.responseText);
				};

				//скрытие прелоадера
				preloader.style.display = 'none';
				preloader.style.animationPlayState = 'paused';


			};
			

		 
		}


	};

};




//проверка правильности введенных данных в инпут
function checkCorrectData (elem) {

	let pattern_mail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;

	if(!elem.classList.contains('error')) {

		if(!elem.value.trim()) {

			elem.classList.add('error');
			elem.parentElement.insertAdjacentHTML('afterBegin', '<p class="nfild1">Обязательное поле!</p>');

		} else if(elem.id=='mail') {

			//проверка на правильный майл
			if(!pattern_mail.test(elem.value)) {

				elem.classList.add('error');
				elem.parentElement.insertAdjacentHTML('afterBegin', '<p class="check-email">Email заполнен некорректно. Пример: IvanSidorov@mail.ru</p>');
			}
		}
	};
};









//определение новых товаров на сайте
function setNewGoods () {

	let new_goods = all_new_goods;
	let goods = all_goods;

	let old_goods = all_old_goods;

	let now_data = Date.now();

	//время окончания действия новых товаров
	let day_for_end = 7;
	let delta_time = day_for_end*24*3600*1000;

	let data_new_goods = {};

	if(localStorage.getItem('data_new_goods')) {
		data_new_goods = JSON.parse(localStorage.getItem('data_new_goods'))
	};

	for(let key in goods) {

		if(!old_goods[key]) {

			if(!data_new_goods[key]) {
				data_new_goods[key] = Date.now();
				new_goods[key] = goods[key]
			} else {

				//всегда достуно 10 новых товаром минимум
				if(Object.keys(new_goods).length>=10) {

					if(now_data-data_new_goods[key]<delta_time) {
						new_goods[key] = goods[key]
					}
				} else {

					new_goods[key] = goods[key]
				}
			}

		}
	};

	localStorage.setItem('data_new_goods', JSON.stringify(data_new_goods));
};




//прикрепление label new на новый товар
function attachLabelNew (name, new_goods, class_name) {

	if(new_goods[name]) {

		let clone = document.getElementById('Tape-new').cloneNode();

		document.querySelector(class_name+' .add-cart[name-good="'+name+'"]').parentElement.appendChild(clone);

		clone.style.display = 'block';
	}
};






//включение слайдера показа новых товаров
function sliderNewGoods () {

	let new_goods = all_new_goods;

	let img_slider = document.getElementById('Img-slider');
	let goods_slider = document.getElementById('Goods-slider');
	let arr_new_goods = Object.keys(new_goods);

	for(let key in new_goods) {

		let string = '';
		let href = new_goods[key]['src'].split('/')[1];
		let categorie = document.querySelector('#'+href+' .name-categorie').innerHTML;

		string+='<div class="img-slider">';
		string+='<div class="one-img-slider"><img src="'+new_goods[key]['src']+'"></div>';
		string+='<div class="name-one-slider">'+key+'</div>';
		string+='<a href="'+href+'">'+categorie+'</a>';
		string+='</div>';

		img_slider.insertAdjacentHTML('afterBegin', string);
	};

	// рандомное перемешивание слайдера
	let arr = [];
	for(let i=0; i<arr_new_goods.length; i++) {

		while(isRepeatNumber(arr, i, 1, arr_new_goods.length)) {};
	};

	//задание позиции элементам слайдера после рандома
	let k = 0;
	for(let value of document.querySelectorAll('.img-slider')) {

		value.style.order = arr[k];
		k++;
	};

	let left = 0;
	let max_left = -img_slider.offsetWidth*(arr_new_goods.length-1);
	let back;
	let stop;

	//при наведении на слайдер он остановится
	goods_slider.onmouseenter = function () {
		stop = true;
	};
	//и наоборот
	goods_slider.onmouseleave = function () {
		stop = false;
	};

	// перемещение слайдера
	setInterval(function () {

		if(stop) {
			return 0
		};

		if(left<=max_left) {
			back = true;
		} else if(left==0) {
			back = false;
		};

		if(back) {
			left+=img_slider.offsetWidth;
		} else {
			left-=img_slider.offsetWidth;
		};

		img_slider.style.left = left+'px';
	}, 5000)
};





//проверка на повторяющиеся символы в массиве при рандоме
function isRepeatNumber (arr, i, min, max) {

	let number = Math.randomNumber(min, max);

	for(let value of arr) {

		if(value==number) {
			return 1;
		};
	};

	arr[i] = number;
};









//управление товарами в админке
function controlGoodsImAdmin () {

	let settings_goods = document.querySelector('.settings-goods');

	//настройка товаров
	if(settings_goods) {

		let goods = all_goods;

		let choose_settings_children = document.querySelectorAll('.choose-settings > div');
		let settind_good = document.querySelector('.setting-good');

		let main_categories = document.querySelectorAll('#Categories > div');
		let mini_categories = document.querySelectorAll('.categories');
		let select_categories = document.querySelector('.select-categories');

		let form_goods_admin = document.querySelector('.form-goods-admin');
		let inputs_select_form = form_goods_admin.querySelectorAll('input:not(.setting-good), select');
		let name_good = form_goods_admin.querySelector('[name="name-good"]');
		let new_name_good = form_goods_admin.querySelector('[name="new-name-good"]');
		let cost_good = form_goods_admin.querySelector('[name="cost-good"]');
		let message_admin = document.querySelector('.message-admin');
		let img_file1 = document.querySelector('.img-file1');
		let img_file2 = document.querySelector('.img-file2');

		let preloader = document.getElementById('Preloader');


		//выбор настроек товаров
		chooseSettingGood();

		//заполнение select основными и мини категориями
		fillSelect();

		//настройка товара
		settind_good.onclick = settingGood;








		//выбор операции с товаром
		function chooseSettingGood () {

			choose_settings_children.forEach(value => {
				value.onclick = function () {

					choose_settings_children.forEach(value => {
						value.classList.remove('tab-selected');
					});
					this.classList.toggle('tab-selected');
					message_admin.innerHTML = '';
					form_goods_admin.reset();

					switch(value.id) {

						case 'Add-new-good':
							inputs_select_form.forEach(value => {

								if(value.name=='name-good') {
									value.style.display = 'none';
									value.previousElementSibling.style.display = 'none';
								} else {
									value.style.display = 'block';
									value.previousElementSibling.style.display = 'block';
								}
							});
							settind_good.setAttribute('value', 'Добавить товар');
							settind_good.style.background = '#00DB00';
						break;

						case 'Change-good':
							inputs_select_form.forEach(value => {
								value.style.display = 'block';
								value.previousElementSibling.style.display = 'block';
							});
							settind_good.setAttribute('value', 'Изменить товар');
							settind_good.style.background = '#4594FD';
						break;

						case 'Delete-good':
							inputs_select_form.forEach(value => {

								if(value.name=='name-good') {
									value.style.display = 'block';
									value.previousElementSibling.style.display = 'block';
								} else {
									value.style.display = 'none';
									value.previousElementSibling.style.display = 'none';
								}
							});
							settind_good.setAttribute('value', 'Удалить товар');
							settind_good.style.background = '#FF0000';
						break;

					}
				}
			});
		};


		//заполнение select основными и мини категориями
		function fillSelect () {

			//заполнение select основными категориями
			select_categories.innerHTML = '<option></option>';
			main_categories.forEach(value => {
				select_categories.innerHTML += `<optgroup name="${value.id}" label="${value.querySelector('.name-categorie').innerHTML}"></optgroup>`;
			});

			//заполнение select мини категориями
			select_categories.querySelectorAll('optgroup').forEach((optgroup, index) => {

				mini_categories[index].querySelectorAll('p').forEach(mini_categorie => {
					optgroup.innerHTML += `<option value="${mini_categorie.id}">${mini_categorie.innerHTML}</option>`;
				});
			});
		};


		//настройка товара
		function settingGood() {

			let name_good_value = name_good.value.trim();
			let new_name_good_value = new_name_good.value.trim();
			let cost_good_value = cost_good.value.trim();
			let selected_mini_categorie = select_categories.value;

			let form_data_admit = new FormData(form_goods_admin);
			let selected_main_categorie, format_arr1, format_arr2, img1_name, img2_name;

			let img1 = img_file1.files[0];
			let img2 = img_file2.files[0];


			switch(document.querySelector('.choose-settings > .tab-selected').id) {

				//при нажатии на кнопку - Добавить товар
				case 'Add-new-good':

					//проверка на пустые инпуты
					if(!checkEmptyInput(new_name_good_value, 'Введите новое имя товара')) {return};
					if(!checkEmptyInput(cost_good_value, 'Введите стоимость товара')) {return};
					if(!checkEmptyInput(selected_mini_categorie, 'Введите категорию товара')) {return};
					if(!checkEmptyInput(img1, 'Загрузите первое изображение товара')) {return};

					//проверка на соответствие расширения изображений
					if(!checkValidImg(img1, img2)) {return};

					//проверка на наличие товара
					if(goods[new_name_good_value]) {
						showMessageAdmin('error', 'Введенный товар уже существует');
						return;
					};

					//заполнение переменных
					selected_main_categorie = select_categories[select_categories.selectedIndex].parentElement.getAttribute('name');
					format_arr1 = img1['name'].split('.');
					img1_name = new_name_good_value + "." + format_arr1[format_arr1.length-1];

					//добавление товара
					goods[new_name_good_value] = {
						"cost": cost_good_value,
						"id": selected_mini_categorie,
						"src": `GoodsImg/${selected_main_categorie}/${selected_mini_categorie}/${img1_name}`
					};

					//добавление второй картинки
					if(img2) {
						format_arr2 = img2['name'].split('.');
						img2_name = new_name_good_value + "Second." + format_arr2[format_arr2.length-1];
						goods[new_name_good_value]["src2"] = `GoodsImg/${selected_main_categorie}/${selected_mini_categorie}/${img2_name}`;						
					};

					//отправка данных на сервер
					sendDataAdmin('Товар успешно добавлен')

				break;

				//при нажатии на кнопку - Изменить товар
				case 'Change-good':

					//проверка на пустые инпуты
					if(!checkEmptyInput(name_good_value, 'Введите имя товара')) {return};
					if(!checkEmptyInput([new_name_good_value, cost_good_value, selected_mini_categorie, img1, img2], 'Выберите то, что желаете изменить')) {return};

					//проверка на наличие товара
					if(!goods[name_good_value]) {
						showMessageAdmin('error', 'Введенный товар не существует. Попробуйте обновить страницу');
						return;
					};

					//проверка на соответствие расширения изображений
					if(!checkValidImg(img1, img2)) {return};

					//изменение стоимости товара
					if(cost_good_value) {
						goods[name_good_value]["cost"] = cost_good_value;
					};

					//изменение категории товара
					if(selected_mini_categorie) {

						selected_main_categorie = select_categories[select_categories.selectedIndex].parentElement.getAttribute('name');
						goods[name_good_value]["id"] = selected_mini_categorie;

						//изменение src
						let old_src = goods[name_good_value]["src"];

						let arr_src = old_src.split('/');
						let img1_name_new = arr_src[arr_src.length-1];
						let new_src = `GoodsImg/${selected_main_categorie}/${selected_mini_categorie}/${img1_name_new}`;

						//перезапись src
						goods[name_good_value]["src"] = new_src;

						//добавление путей для перемещение картинки в новую категорию
						form_data_admit.append('img1_old_src', old_src);
						form_data_admit.append('img1_new_src', new_src);
						

						//изменение src2
						if(goods[name_good_value]["src2"]) {

							let old_src2 = goods[name_good_value]["src2"];

							let arr_src2 = old_src2.split('/');
							let img2_name_new = arr_src2[arr_src2.length-1];
							let new_src2 = `GoodsImg/${selected_main_categorie}/${selected_mini_categorie}/${img2_name_new}`;

							//перезапись src
							goods[name_good_value]["src2"] = new_src2;

							//добавление путей для перемещение картинки в новую категорию
							form_data_admit.append('img2_old_src', old_src2);
							form_data_admit.append('img2_new_src', new_src2);
						};

					};

					//изменение первой картинки
					if(img1) {

						//ошибка (нельзя одновременно изменять картинку и категорию)
						if(selected_mini_categorie) {
							showMessageAdmin('error', 'Нельзя одновременно изменять изображение и категорию');
							return;
						};

						//заполнение переменных
						format_arr1 = img1['name'].split('.');
						img1_name = name_good_value + "." + format_arr1[format_arr1.length-1];
						
						//старый src
						let old_src = goods[name_good_value]["src"];

						//создание нового src
						let arr_src = old_src.split('/'); 
						arr_src.pop();
						let new_src = arr_src.join('/') + "/" + img1_name;

						//добавление путей на удаление картинок (в случае разных имен)
						if(old_src!=new_src) {
							form_data_admit.append('img1_src', goods[name_good_value]["src"]);
						};

						//перезапись src
						goods[name_good_value]["src"] = new_src;

						//указываем явно категории
						if(!selected_mini_categorie) {

							selected_main_categorie = arr_src[1];
							selected_mini_categorie = arr_src[2];

							form_data_admit.set('mini-categorie', selected_mini_categorie);
						};
						
					};

					//изменение второй картинки
					if(img2) {

						//ошибка (нельзя одновременно изменять картинку и категорию)
						if(!img1 && selected_mini_categorie) {
							showMessageAdmin('error', 'Нельзя одновременно изменять изображение и категорию');
							return;
						};

						//заполнение переменных
						format_arr2 = img2['name'].split('.');
						img2_name = name_good_value + "Second." + format_arr2[format_arr2.length-1];

						//старый src2
						let old_src2;
						if(goods[name_good_value]["src2"]) {
							old_src2 = goods[name_good_value]["src2"]
						};

						//создание нового src2
						let arr_src2 = goods[name_good_value]["src"].split('/');
						arr_src2.pop();
						let new_src2 = arr_src2.join('/') + "/" + img2_name;

						//добавление путей на удаление картинок (в случае разных имен)
						if(old_src2 && old_src2!=new_src2) {
							form_data_admit.append('img2_src', old_src2);
						};

						//перезапись src2
						goods[name_good_value]["src2"] = new_src2;

						//указываем явно категории
						if(!selected_mini_categorie) {

							selected_main_categorie = arr_src2[1];
							selected_mini_categorie = arr_src2[2];

							form_data_admit.set('mini-categorie', selected_mini_categorie);
						};
						
					};

					//изменение имени товара
					if(new_name_good_value) {
						goods[new_name_good_value] = goods[name_good_value];

						if(new_name_good_value!=name_good_value) {
							delete goods[name_good_value];
						}
					};

					//отправка данных на сервер
					sendDataAdmin('Товар успешно изменен')

				break;

				//при нажатии на кнопку - Удалить товар
				case 'Delete-good':

					//проверка на пустые инпуты
					if(!checkEmptyInput(name_good_value, 'Введите имя товара')) {return};

					//проверка на наличие товара
					if(!goods[name_good_value]) {
						showMessageAdmin('error', 'Введенный товар не существует. Попробуйте обновить страницу');
						return;
					};

					//добавление путей на удаление картинок
					form_data_admit.append('img1_src', goods[name_good_value]["src"]);
					if(goods[name_good_value]["src2"]) {
						form_data_admit.append('img2_src', goods[name_good_value]["src2"]);
					};

					//удаление товара
					delete goods[name_good_value];
					

					//отправка данных на сервер
					sendDataAdmin('Товар успешно удален');
					
				break;
			};




			//отправка данных
			function sendDataAdmin(success_message) {

				//эмуляция загрузки запроса
				preloader.style.display = 'block';
				preloader.style.animationPlayState = 'running';

				form_data_admit.append('main-categorie', selected_main_categorie);

				if(img1_name) {
					form_data_admit.append('img1_name', img1_name);
				};
				if(img2_name) {
					form_data_admit.append('img2_name', img2_name);
				};

				form_data_admit.append('goods', JSON.stringify(goods));

				fetch('../settings-goods.php', {
					method: 'POST',
					body: form_data_admit
				}).then(result => result.text()).then(text => {

					if(text=="1") {
						showMessageAdmin('success', success_message);
					} else {
						showMessageAdmin('error', text);
					};

					//скрытие прелоадера
					preloader.style.display = 'none';
					preloader.style.animationPlayState = 'paused';
				});
			};

		};



		//проверка на незаполненное обязательное поле (или поля) input
		function checkEmptyInput (value, message) {

			if(Array.isArray(value)) {

				let result = value.some(value => {
					if(!value) {
						return false;
					} else {
						return true;
					};
				});

				if(!result) {
					showMessageAdmin('error', message);
				};

				return result;

			} else {

				if(!value) {
					showMessageAdmin('error', message);
					return false;
				} else {
					return true;
				};
			}
		};


		//проверка на соответствие расширения изображений
		function checkValidImg(img1, img2) {

			if(img1&&img1['type'].split('/')[0]!='image') {
				showMessageAdmin('error', 'Первый файл не является изображением');
				return false;
			};
			if(img2&&img2['type'].split('/')[0]!='image') {
				showMessageAdmin('error', 'Второй файл не является изображением');
				return false;
			};

			return true
		}


		//показ сообщения в админке
		function showMessageAdmin(type, message) {

			message_admin.innerHTML = message;

			switch(type) {

				case 'error':
					message_admin.classList.add('error-settings');
					message_admin.classList.remove('success-settings');
				break;

				case 'success':
					message_admin.classList.add('success-settings');
					message_admin.classList.remove('error-settings');
				break;
			}
		};

	};

	//удаляем все контейнеры, кроме основного
	document.querySelectorAll('body > div.container.row').forEach(value => value.remove());

	//скрываем мини-корзину для предотвращения конфликтов
	document.getElementById('Mini-cart').style.display = 'none';

	//включение слайдера показа новых товаров
	sliderNewGoods()
};





