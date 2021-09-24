	<?php require 'Main-menu.php'?>

		<div class="container row">

			<!-- Мини-меню -->
			<div class="sidebar-1">
				<div class="inner-sidebar-1">

					<?php require 'Mini-cart.php'?>

					<div id="Gift-converts" class="categories">
						<h3>
							<i class="fa fa-gift"></i>
							Подарочные конверты
							<i class="fa fa-gift"></i>
						</h3>
						<p id="Craft-converts">Крафт-конверты</p>
					</div>
				</div>
			</div>

			<div class="content">
				<div class="inner-content">

					<div id="Gift-converts-info" class="info">
						Описание отсутствует.
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
	</div>

</body>
</html>