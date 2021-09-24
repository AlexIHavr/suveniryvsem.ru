	<?php require 'Main-menu.php'?>

		<div class="container row" >

			<!-- Мини-корзина -->
			<div class="sidebar-1">
				<div class="inner-sidebar-1">
					<?php require 'Slider.php'?>
				</div>
			</div>
			
			<div class="content">
				<div class="inner-content">
					<div class="main-cart">
						<!-- Cart -->
						<div class="name-cart">
							<h1>Корзина покупок</h1>
							<div id="Points-main-cart">	
								<div class="point1">Ваша корзина</div>
								<i class="fas fa-arrow-circle-right change"></i>
								<div class="point2 change-grey">Контактная информация</div>
							</div>
						</div><br>
						<div class="my-cart">
							<div id="Intro-main-cart">
								<div class="cart-good">Товар</div>
								<div class="cost-one-good">Стоимость 1 шт.</div>
								<div class="cart-value">Количество</div>
								<div class="cart-price">Общая стоимость</div>
							</div>
							<div id="End-main-cart">
								<a href="Postcart" class="a-key">Страница товаров</a>
								<div class="key-sum2">Итого: </div>
								<div class="key-sum"></div>
								<button class="remove">Удалить все</button>
							</div>
							<div id="Empty-main-cart">
								<div class="span-cart">Корзина пуста</div>
								<div class="span-cart">Добавьте товары в корзину</div>
								<a href="Postcart">Страница товаров</a>
							</div>
						</div>
						<div class="form">
							<p>
								<label for="company">Компания:</label>
								<input name="company" type="text" class="ecompany" id="company" placeholder="Компания">
							</p>
							<p>
								<label for="name" class="name-p">ФИО:</label>
								<input type="text" class="ename" id="name" placeholder="ФИО">
								<i class="fas fa-star-of-life note-star"></i>
							</p>
							<p>
								<label for="mail" class="email-p">Email:</label> 
								<input type="text" class="email" id="mail" placeholder="Email">
								<i class="fas fa-star-of-life note-star"></i>
							</p>
							<p>
								<label for="adress" class="eadress-p">Адрес доставки:</label>
								<input type="text" class="eadress" id="adress" placeholder="Адрес доставки">
								<i class="fas fa-star-of-life note-star"></i>
							</p>
							<p>
								<label for="phone">Телефон:</label> 
								<input type="number" class="ephone" id="phone" placeholder="Телефон">
							</p>
							<p>
								<label for="comment">Комментарий:</label>
								<textarea class="ecomment" id="comment" cols="30" rows="10" placeholder="Комментарий"></textarea>
							</p>
							<p id="Note-star">
								<i class="fas fa-star-of-life for-note-star"></i> - Обязательное полe для заполнения
							</p>
							<p class="button">
								<button class="send-email">Заказать</button>
							</p>
						</div>
						<div class="buttons-cart">
							<button class="button-cart1">Продолжить</button>
							<button class="button-cart2">Назад</button>
						</div>
						<div class="success-send">
							<h2>Спасибо за заказ!</h2>
							<p>Наш менеджер свяжится с вами в ближайшее время.</p>
							<a href="/">Вернуться на главную страницу</a>
						</div>
						<div class="error-send">
							<h2>Заказ не отправлен ):</h2>
							<a href="Cart">Повторите заказ</a>
						</div>
					</div>
					<!-- /Cart -->
				</div>

				<!-- Поиск товаров-->
				<?php require 'Search-goods.php'?>

				
			</div>
		</div>

	</div>
	</div>
</body>
</html>