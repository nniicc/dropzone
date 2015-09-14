<?php

    if(isset($_POST["submit"])) {
        $start = microtime();
        $uploadDir = "uploads/";
        $target_file = $uploadDir . basename($_FILES["upload_files"]["name"]);
        $imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);

        if (move_uploaded_file($_FILES["upload_files"]["tmp_name"], $target_file)) {
            echo microtime() - $start. "etc";
        }
    }

    echo "<pre>";
    print_r($_FILES);
    echo "</pre>";

?>