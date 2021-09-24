<?php 
	
	//чтение ошибок
	error_reporting(E_ALL);
	ini_set('display_errors', 1);
	
	$data = $_POST;

	$login_admin = isset($data['login-admin']) ? $data['login-admin'] : null;
	$password_admin = isset($data['password-admin']) ? $data['password-admin'] : null;
	$enter_admin = isset($data['enter-admin']) ? $data['enter-admin'] : null;
	$auth = isset($_COOKIE['auth']) ? $_COOKIE['auth'] : null;

	$success_enter = false;
	$error = '';

	//сброс кук
	// setcookie('auth', true, time());

	if($login_admin and $password_admin and $enter_admin) {
		
		//соединение с базой данных
		$link = mysqli_connect('localhost', 'olgam183_olgam', 'pascalabc123', 'olgam183_users');

		//защита от SQL-инъекций
		$login_admin = trim(mysqli_real_escape_string($link, htmlspecialchars($login_admin)));
		$password_admin = mysqli_real_escape_string($link, htmlspecialchars($password_admin));

		//добавление (смена) логина и пароля
		// $password_admin = md5($password_admin);
		// mysqli_query($link, "INSERT INTO admin SET login_admin='$login_admin', password_admin='$password_admin'");
		// exit();

		//получение логина и пароля из базы данных
		$login_basedata = mysqli_fetch_assoc(mysqli_query($link, "SELECT login_admin FROM admin"))['login_admin'];
		$password_basedata = mysqli_fetch_assoc(mysqli_query($link, "SELECT password_admin FROM admin"))['password_admin'];

		//проверка данных
		if($login_admin!=$login_basedata or md5($password_admin)!=$password_basedata) {
			$error = 'Неверный  логин или пароль';
		} else {
			$success_enter = true;
			setcookie('auth', true, time() + 3600*24*7);
		};
	};

?>

<?php require 'Main-menu.php'?>

	<div class="container row">

		<!-- Мини-корзина -->
		<div class="sidebar-1">
			<div class="inner-sidebar-1">
				<?php require 'Mini-cart.php'?>
				<?php require 'Slider.php'?>
			</div>
		</div>
		<!-- Контент -->
		<div class="content">
			<div class="inner-content panel-admin">

				<h2 class="name-admin-panel">Панель администратора</h2>
	
				<!-- Вход в админку -->
				<?php if(!$success_enter and !$auth) { ?>
					<form class="form-admin" action="" method="POST">
						<i class="fas fa-user-circle"></i>
						<input name="login-admin" type="text" placeholder="Введите логин" required>
						<input name="password-admin" type="password" placeholder="Введите пароль" required>
						<input name="enter-admin" type="submit" value="Войти">
					</form>
					<p class="errors-admin"><?php echo $error ?></p>
				<?php } ?>
				
				<!-- Управление товарами -->
				<?php if($success_enter or $auth) { ?>
					<div class="settings-goods">
						<div class="choose-settings">
							<div id="Add-new-good" class="add-new-good tab-selected">
								<i class="fas fa-plus-circle"></i><br>
								Добавить товар
							</div>
							<div id="Change-good" class="change-good">
								<i class="fas fa-tools"></i><br>
								Изменить товар
							</div>
							<div id="Delete-good" class="delete-good">
								<i class="fas fa-cut"></i><br>
								Удалить товар
							</div>
						</div>
						<form class="form-goods-admin" action="" method="POST" enctype="multipart/form-data" onsubmit="return false">

							<div for-input="name-good" style="display: none;">Имя товара</div>
							<input name="name-good" type="text" placeholder="Введите имя товара" style="display: none;">

							<div for-input="new-name-good">Новое имя товара</div>
							<input name="new-name-good" type="text" placeholder="Введите новое имя товара" style="display: block;">

							<div for-input="cost-good">Стоимость товара</div>
							<input name="cost-good" type="number" placeholder="Введите стоимость товара" style="display: block;">

							<div for-input="mini-categorie">Категория товара</div>
							<select name="mini-categorie" class="select-categories" style="display: block;"></select>
	
							<label for="Img1">Загрузить изображение 1</label>
							<input id="Img1" name="img1" class="img-file1" type="file" accept="image/*" style="display: block;">

							<label for="Img2">Загрузить изображение 2</label>
							<input id="Img2" name="img2" class="img-file2" type="file" accept="image/*" style="display: block;">

							<input class="setting-good" type="submit" value="Добавить товар">
							<p class="message-admin"></p>		
						</form>
					</div>
				<?php } ?>


			</div>
	
			<!-- Поиск товаров-->
			<?php require 'Search-goods.php'?>
		</div>
	</div>
	</div>
	</div>

	<?php  
		//получение всех мини-категорий для select
		echo file_get_contents('Postcart.php');
		echo file_get_contents('Suvenirs.php');
		echo file_get_contents('Toppers.php');
		echo file_get_contents('Money-converts.php');
		echo file_get_contents('Gift-converts.php');
	?>
</body>
</html>

	

