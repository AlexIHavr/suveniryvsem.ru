<?php require 'online.php' ?>

<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<!-- установка размера сайта в мобильной версии -->
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Открытки, сувениры и подарки</title>
	<!-- описание сайта при поиске -->
	<meta name="keywords" content="Открытки, сувениры, подарки">
	<meta name="description" content="Ни один визит в гости не обходится без подарка. И порой бывает очень трудно определиться с выбором. Вы отчаялись искать подарок и не знаете, что купить?. Вам нужен практичный, симпатичный и недорогой сувенир?. То Вы на правильном пути!<">
	<!-- стили сайта -->
	<link rel="stylesheet" href="css/Basis.css">
	<link rel="stylesheet" href="css/menu.css">
	<link rel="stylesheet" href="css/cart.css">
	<!-- значки сайта -->
	<link rel="stylesheet" href="css/font-awesome.css">
	<!-- скрипты сайта -->
	<script type="text/javascript" src="js/Basic.js"></script>
	<script type="text/javascript" src="js/goods.js"></script>
	<script type="text/javascript" src="js/old_goods.js"></script>
  	<script type="text/javascript" src="js/menu.js"></script>
  	<script type="text/javascript" src="js/cart.js"></script>
</head>
<body style="min-width: 1270px">

	<div id="wrapper">
		<!-- Логотип -->
		<div class="log">
			<div id="Log"></div>
		</div>

		<!-- Блок увеличенных картинок -->
		<div id="WrapperImg">
			<div id="ScaleImg"></div>
		</div>

		<!-- Уведомление о добавленном товаре -->
		<div id="Note-good">
			<div id="Good-added">
				<i class="fas fa-plus-circle"></i>  Товар добавлен
			</div>
			<div id="Limit-good">
				<i class="fas fa-exclamation-circle"></i>  Слишком много товаров
			</div>
		</div>

		<!-- Ленточка для новых товаров -->
		<div id="Tape-new"></div>
		
		<!-- Прелодер -->
		<div id="Preloader" class="loader-request"></div>


		<div class="wrapper2">
			<!-- Главное меню -->
			<div class="header">
				<div id="Main-menu">
					<div id="Main-tab">
						<i class="fa fa-home"></i><br>Главная
					</div>
					<div id="Goods-tab">
						<i class="fas fa-arrow-circle-down arrow" style="transform: rotate(0deg);"></i><br>Товары		
					</div>
					<div id="Contacts-tab">
						<i class="fa fa-phone-square"></i><br>Контакты
					</div>
					<div id="Deliver-tab">
						<i class="fa fa-suitcase"></i><br>Доставка
					</div>
					<div id="Company-tab">
						<i class="fa fa-info-circle"></i><br>О компании
					</div>
				</div>
				<div id="Search">
					<i class="fas fa-search"></i><br>
					<input  id="Forsearch" type="search" placeholder="Поиск товаров">
				</div>

				<!-- Ссылка на панель администратора -->
				<div>
					<a class="go-to-admin" href="/Admin">
						<i class="fas fa-user-circle"></i>
					</a>
				</div>
			</div>
			<div id="Categories">
				<div id="Postcart">
					<i class="fa fa-heart"></i>
					<div class="name-categorie">Открытки ручной работы</div>
				</div>
				<div id="Suvenirs">
					<i class="fa fa-star"></i>
					<div class="name-categorie">Сувениры из дерева</div>
				</div>
				<div id="Toppers">
					<i class="fa fa-tree"></i>
					<div class="name-categorie">Топперы</div>
				</div>
				<div id="Money-converts">
					<i class="fa fa-envelope"></i>
					<div class="name-categorie">Конверты для денег</div>
				</div>
				<div id="Gift-converts">
					<i class="fa fa-gift"></i>
					<div class="name-categorie">Подарочные конверты</div>
				</div>
			</div>