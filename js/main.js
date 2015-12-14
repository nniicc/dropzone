(function() {

    $(".dropzone").dropzone({
        url: 'upload.php',
        margin: 20,
        success: function(res, index){
            console.log(res, index);
        }
    });

}());