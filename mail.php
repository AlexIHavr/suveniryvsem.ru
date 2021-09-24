<?php

	//название сайта
	$name_site = 'suveniryvsem.ru';

	$contacts = json_decode($_REQUEST['contacts'], true);

	//экранирование тегов
	foreach ($contacts as $key => $value) {

		if($key!='cart') {
			$contacts[$key] = strip_tags($value);
		};
	};

	//заголовки
	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
	$headers .= "From: $name_site";

	//данные
	$company = $contacts['company'];
	$name = $contacts['name'];
	$phone = $contacts['phone'];
	$mail = $contacts['mail'];
	$adress = $contacts['adress'];
	$comment = $contacts['comment'];
	$goods = loadGoods();

	//добавление тире в пустые ячейки
	if(empty($company)) {
		$company = '-';
	};
	if(empty($comment)) {
		$comment = '-';
	};

	//письмо
	$message = 
	"<!DOCTYPE HTML>
	<html>
	<head>
		<title>Заказ в магазине</title>
		<meta charset='UTF-8'>
		<meta name='x-apple-disable-message-reformatting'>
		<style>
			html { 
				-webkit-text-size-adjust:none; -ms-text-size-adjust: none;
			}
			table {
				text-align: center;
				border-collapse: collapse;
			}
		</style>
	</head>
	<body style='padding: 0px; margin: 0px;'>

		<table border='0' cellspacing='10' width='100%'>
			<tr>
				<td align='center' style='font-weight: bold; font-size: 27px;'>Контактная информация</td>
			</tr>
			<tr>
				<td align='center'>
					<table border='2' cellspacing='0' cellpadding='10' width='50%'>
						<tr>
							<th>Компания</th>
							<td>$company</td>
						</tr>
						<tr>
							<th>Клиент</th>
							<td>$name</td>
						</tr>
						<tr>
							<th>Телефон</th>
							<td>$phone</td>
						</tr>
						<tr>
							<th>Почта</th>
							<td>$mail</td>
						</tr>
						<tr>
							<th>Адрес доставки</th>
							<td>$adress</td>
						</tr>
						<tr>
							<th>Комментарий</th>
							<td>$comment</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>

		<table border='0' cellspacing='10' width='100%'>
			<tr>
				<td align='center' style='font-weight: bold; font-size: 27px;'>Товары</td>
			</tr>
			<tr>
				<td align='center'>
					<table border='2' cellspacing='0' cellpadding='10' width='70%'>
						<tr>
							<th>Товар</th>
							<th>Наименование</th>
							<th>Количество</th>
							<th>Общая стоимость</th>
						</tr>
						$goods
					</table>
				</td>
			</tr>
		</table>

		<table border='0' cellspacing='10' width='100%'>
			<tr>
				<td align='center' style='font-weight: bold; font-size: 23px;'>Благодарим за заказ!</td>
			</tr>
		</table>
	</body>
	</html>";


	//отправка письма
	mail('olga9036300756@yandex.ru,'.$contacts['mail'], 'Заказ в магазине', $message, $headers);


	//выгрузка товаров
	function loadGoods () {

		global $contacts, $name_site;

		$sum = 0;
		$message = '';
		foreach ($contacts['cart'] as $key=>$elem) {

			$count = $elem['count'];
			$cost = $elem['count']*$elem['cost'];
			$src = $elem['src'];

			$message .=
			"<tr>
				<td><img src='http://$name_site/$src' alt='Картинка не загрузилась' height='150'></td>
				<td>$key</td>
				<td>$count</td>
				<td>$cost руб.</td>
			</tr>";

			$sum+=$cost;

		};

		$message .=
		"<tr>
			<th colspan='3'>Итого</th>
			<th>$sum руб.</th>
		</tr>";

		return $message;
	};

	

