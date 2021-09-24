<?php
		
	$message = '';

	$link = mysqli_connect('localhost', 'olgam183_olgam', 'pascalabc123', 'olgam183_users');

	$count_all_users = mysqli_query($link, "SELECT COUNT(*) AS count_users FROM online_users") or die(mysqli_error($link));
	$arr_count_all_users = mysqli_fetch_assoc($count_all_users);
	$message .= 'Пользователи за все время: '.$arr_count_all_users['count_users'].'<hr>';

	$time_all_users = mysqli_query($link, "SELECT `time` FROM online_users") or die(mysqli_error($link));
	$arr_time_all_users = [];
	while($time = mysqli_fetch_assoc($time_all_users)) {
		$arr_time_all_users[] = $time['time'];
	};

	$count_hour = 0;
	$count_day = 0;
	$current_time = time();
	foreach ($arr_time_all_users as $value) {

		$diff_time = $current_time-strtotime($value);
			
		if($diff_time<60*60) {
			$count_hour++;
		};

		if($diff_time<60*60*24) {
			$count_day++;
		};

	};

	$message .= 'Пользователи за последний час: '.$count_hour.'<hr>';
	$message .= 'Пользователи за последние сутки: '.$count_day;
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
					<div class="inner-content">
						<?php echo $message ?>
					</div>
			
					<!-- Поиск товаров-->
					<?php require 'Search-goods.php'?>
				</div>
		</div>
		</div>
		</div>
	</body>
</html>

