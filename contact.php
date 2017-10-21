<?php

header('Content-Type: application/json');

 if($_POST) {

    $name = trim($_POST['contact-name']);
    $email = trim($_POST['contact-email']);
    $msg = trim($_POST['contact-message']);
    $subject = trim($_POST['contact-subject']);

    //email address settings
    $my_address = "janfrancisisrael@gmail.com";
    $headers = "From: ".$email;
    $message = "Contact name: $name\nContact Email: $email\nContact Message: $msg";
    $to = $my_address;
	
    $result = [];
    $validate = [];
    
    $validate['contact-name'] = ($name != "" ? false: "Name field is required");
    $validate['contact-email'] = (preg_match("/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/", $email) ? false: "Enter a valid email address");
    $validate['contact-subject'] = ( strlen($subject) != "" ? false: "Please Write Subject");
    // $validate['contact-message'] = ( strlen($msg) >= 10  ? false: "Write more than 10 characters");
    $validate = array_filter($validate);

    if($validate){
        $result['Status'] = false;
        $result['Info'] = $validate;
    }
    else{
        $result['Status'] = true;
        mail($to, $subject, $message, $headers);
    }
	
    echo json_encode($result);
}
?>