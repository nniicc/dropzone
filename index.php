<!DOCTYPE html>
<html>
<head>
    <title>PHP File Uploader</title>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" />
    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css" />
    <link rel="stylesheet" type="text/css" href="css/main.css" />
</head>
<body>

    <div class="container">
        <div class="panel panel-info">
            <div class="panel-heading">File Upload Form</div>
            <div class="panel-body">
                <form class="navbar-form" role="search" action="upload.php" method="POST" enctype="multipart/form-data">
                    <div class="input-group">
                        <span class="input-group-btn">
                            <span class="btn btn-primary btn-file">
                                Browse&hellip; <input type="file" multiple="multiple" name="upload_files[]" class="form-control">
                            </span>
                        </span>
                        <input type="text" class="form-control file-text" readonly>
                    </div>
                    <button type="submit" name="submit" class="btn btn-default">Submit</button>
                </form>
                <div class="dropzone"></div>
            </div>
        </div>
        <div class="lal"></div>
    </div>

    <!--<script src="https://code.jquery.com/jquery-2.1.4.js"></script>-->
    <script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/uploader.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
</body>
</html>