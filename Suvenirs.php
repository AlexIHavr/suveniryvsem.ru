	<?php require 'Main-menu.php'?>

		<div class="container row">

			<!-- Мини-корзина с категориями -->
			<div class="sidebar-1">
				<div class="inner-sidebar-1">

					<?php require 'Mini-cart.php'?>

					<div id="Suvenirs" class="categories">
						<h3>
							<i class="fa fa-star"></i>
							Сувениры из дерева
							<i class="fa fa-star"></i>
						</h3>
						<p id="Wood-carts">Деревянные открытки</p>
						<p id="Shkatuls">Шкатулки</p>
						<p id="Cupurs">Купюрницы</p>
						<p id="Canz-goods">Канцтовары</p>
						<p id="Magnets">Магниты на холодильник</p>
						<p id="Panno">Панно и тарелки</p>
						<p id="Home-goods">Товары для дома</p>
						<p id="Toys">Игрушки</p>
						<p id="New-year">Новый год</p>
						<p id="Diffrent">Разные</p>
					</div>
				</div>
			</div>

			<div class="content">
				<div class="inner-content">

					<div id="Suvenirs-info" class="info">
						<div style="text-indent: 40px">В данной категории представлены <span style="font-weight: bold">Сувениры из дерева</span>, сделанные из натурального материала, которые все больше и больше завоевывают сердца людей и прочно входят в нашу жизнь.<br></div>
						<div style="text-indent: 40px; margin-top: 10px">Вы не знаете, как красиво подарить деньги или поблагодарить человека шоколадом за проявленное к Вам внимание? Сейчас этот вопрос решен. Мы предлагаем <span style="font-weight: bold">Купюрницы</span> (деревянные конверты), которые подойдут к любому случаю. Если среди наших вариантов Вы не найдете нужного, мы сделаем для Вас на <span style="font-weight: bold">заказ</span> купюрницу с любой надписью и узором.<br></div>
						<div style="text-indent: 40px; margin-top: 10px">Оригинальным и экологически чистым подарком будут изделия, представленные в других разделах. А магниты на холодильник, панно и сувенирные тарелки для Вас мы изготовим с видом Вашего города или любыми Вашими фотографиями.<br>
						<div style="text-indent: 40px; margin-top: 10px">Именные сувениры и подарки изготавливаем на Заказ.</div>
					</div>
				</div>

				<div class="goods" num="1" style="display: flex;"></div>
				<div class="number-pages">
					<div class="numbers selected">1</div>
				</div>

			</div>

			<!-- Поиск товаров-->
			<?php require 'Search-goods.php'?>
		</div>
	</div>
	</div>
</body>
</html>