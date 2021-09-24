<?php

	// session_start();

	// $link = mysqli_connect('localhost', 'olgam183_olgam', 'pascalabc123', 'olgam183_users');

	// $client  = @$_SERVER['HTTP_CLIENT_IP'];
	// $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
	// $remote  = @$_SERVER['REMOTE_ADDR'];
	 
	// if(filter_var($client, FILTER_VALIDATE_IP)) {
	// 	$ip_user = $client;
	// } else if(filter_var($forward, FILTER_VALIDATE_IP)) {
	// 	$ip_user = $forward;
	// } else {
	// 	$ip_user = $remote;
	// };

	// $check_user = mysqli_query($link, "SELECT ip FROM online_users WHERE ip='$ip_user'") or die(mysqli_error($link));
	// $date = date('Y-m-d H:i:s');

	// if(!mysqli_fetch_assoc($check_user)) {

	// 	mysqli_query($link, "INSERT INTO online_users SET ip='$ip_user', `time`='$date'") or die(mysqli_error($link));
	// 	$_SESSION['set_ip_user'] = true;
	// } else {

	// 	if(!isset($_SESSION['set_ip_user'])) {
	// 		mysqli_query($link, "UPDATE online_users SET `time`='$date' WHERE ip='$ip_user'") or die(mysqli_error($link));
	// 		$_SESSION['set_ip_user'] = true;
	// 	};
	// };
	

