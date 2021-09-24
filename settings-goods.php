<?php 

	$data = $_POST;
	$files = $_FILES;
	$src_images = "GoodsImg/".$data['main-categorie']."/".$data['mini-categorie']."/";

	//запись нового файла goods.js
	$return1 = file_put_contents('js/goods.js', 'let all_goods = '.$data['goods']);

	//перебор данных
	foreach ($data as $key => $value) {

		switch($key) {

			case 'img1_name':

				//перемещение первой картинки на сервер
				$return2 = move_uploaded_file($files['img1']['tmp_name'], $src_images.$data['img1_name']);
			break;

			case 'img2_name':

				//перемещение второй картинки на сервер
				$return3 = move_uploaded_file($files['img2']['tmp_name'], $src_images.$data['img2_name']);
			break;

			case 'img1_src':

				//удаление первой картинки в случае действия удаления товара или его изменения
				$return4 = unlink($data['img1_src']);
			break;

			case 'img2_src':

				//удаление второй картинки в случае действия удаления товара или его изменения
				$return5 = unlink($data['img2_src']);
			break;

			case 'img1_old_src':

				//перемещение первой картинки в случае перемещение товара 
				$return6 = rename($data['img1_old_src'], $data['img1_new_src']);
			break;

			case 'img2_old_src':

				//перемещение первой картинки в случае перемещение товара 
				$return7 = rename($data['img2_old_src'], $data['img2_new_src']);
			break;
		}
	};



	//вывод ошибок
	if(!$return1) {
		echo 'Не удалось записать файл';
	} else if(isset($return2) and !$return2) {
		echo 'Не удалось переместить первую картинку';
	} else if(isset($return3) and !$return3) {
		echo 'Не удалось переместить вторую картинку';
	} else if (isset($return4) and !$return4) {
		echo 'Не удалось удалить первую картинку';
	} else if (isset($return5) and !$return5) {
		echo 'Не удалось удалить вторую картинку';
	} else if (isset($return6) and !$return6) {
		echo 'Не удалось переместить первую картинку в новую категорию';
	} else if (isset($return7) and !$return7) {
		echo 'Не удалось переместить вторую картинку в новую категорию';
	} else {
		echo 1;
	};

	