<?php

    echo "<pre>";
    print_r($_FILES);
    print_r($_POST);
    echo "</pre>";

    if(!move_uploaded_file($_FILES['files']['tmp_name'][0], 'uploads/'.$_FILES['files']['name'][0])){
        echo "error";
    }
    echo "success";
?>

