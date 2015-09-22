(function($){
    'use strict';

    $.fn.dropzone = function(settings){

        var $me = this;

        var options = $.extend({
            width:                  300,                            //width of the div
            height:                 300,                            //height of the div
            progressBarWidth:       300,                            //width of the progress bars
            url:                    '',                             //url for the ajax to post
            filesName:              'files',                        //name for the form submit
            margin:                 0,                              //margin added if needed
            border:                 '2px dashed #ccc',              //border property
            background:             '',
            textColor:              '#ccc',                         //text color
            textAlign:              'center',                       //css style for text-align
            lineHeight:             300,                            //vertical text align
            text:                   'Drop files here to upload',    //text inside the div
            uploadMode:             'single',                       //upload all files at once or upload single files, options: all or single
            progressContainer:      '',                             //progress selector if null one will be created

            dropzoneWraper:         'nniicc-dropzoneParent',        //wrap the dropzone div with custom class
            files:                  null,                           //Access to the files that are droped
            maxFileSize:            '500MB',                        //max file size ['bytes', 'KB', 'MB', 'GB', 'TB']
            allowedFileTypes:       '*',                            //allowed files to be uploaded seperated by ',' jpg,png,gif
            clickToUpload:          true,                           //click on dropzone to select files old way

            //functions
            load:                   null,                           //callback when the div is loaded
            progress:               null,                           //callback for the files procent
            uploadDone:             null,                           //callback for the file upload finished
        }, settings);

        init();

        var xhrDone = {};

        function init(){
            $me.css({
                width: options.width,
                height: options.height,
                border: options.border,
                background: options.background,
                color: options.textColor,
                'text-align': options.textAlign,
                lineHeight: typeof options.lineHeight == "number" ? options.lineHeight + "px" : options.lineHeight
            });

            $me.hover(function() {
                $(this).css("cursor", "pointer");
            }, function() {
                $(this).css("cursor", "default");
            });

            $me.html(options.text);

            $me.wrap('<div class="'+options.dropzoneWraper+'"></div>');
            $("." + options.dropzoneWraper).css('margin', options.margin);
            if(options.progressContainer === ''){
                options.progressContainer = "."+options.dropzoneWraper;
            }

            if(options.clickToUpload){
                $("." + options.dropzoneWraper).append('<form></form>');
                $("."+options.dropzoneWraper).find('form').append('<input type="file" multiple="multiple" name="'+options.filesName+'[]"/>').hide().bind('change', function(event) {
                    $(this).trigger('submit');
                }).on('submit', function(event){
                    event.preventDefault();
                    upload(event.target[0].files);
                    var input = $(this).find('input');

                    input.wrap('<form>').closest('form').get(0).reset();
                    input.unwrap();

                });
            }

            $me.bind({
                dragover: function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    $me.css({
                        color: '#000',
                        'border-color': '#000'
                    });
                },
                dragleave: function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    dragLeave($me);
                },
                drop: function(e){
                    e.preventDefault();
                    dragLeave($me);
                    if(options.url === '') alert('Upload targer not found!! please set it with \'url\' attribute');
                    else
                        upload(e.originalEvent.dataTransfer.files);
                },
                click: function(e){
                    if(options.clickToUpload){
                        if(options.url === '') alert('Upload targer not found!! please set it with \'url\' attribute');
                        else
                            $("." + options.dropzoneWraper).find('input').trigger('click');
                    }
                }
            });


            if(typeof options.load == "function") options.load($me);

            function dragLeave(me){
                var borderColor = options.textColor;
                var borderCheck = options.border.split(" ");
                if(borderCheck.length == 3) borderColor = borderCheck[2];
                $me.css({
                    color: options.textColor,
                    'border-color': borderColor
                });
            }

            function upload(files){
                if(files){
                    options.files = files;
                    $(options.progressContainer).find('.extra-progress-wrapper').remove();
                    var i, formData, xhr;
                    if(options.uploadMode == 'all'){
                        formData = new FormData();
                        xhr = new XMLHttpRequest();

                        for (i = 0; i < files.length; i++) {
                            formData.append(options.filesName + '[]', files[i]);
                        }
                        addProgressBar(0);
                        bindXHR(xhr, 0);


                        xhr.open('post', options.url);
                        xhr.setRequestHeader('Cache-Control', 'no-cache');
                        xhr.send(formData);
                        $(".progress").show();
                    }else if(options.uploadMode == 'single'){
                        for (i = 0; i < files.length; i++) {
                            formData = new FormData();
                            xhr = new XMLHttpRequest();
                            if(!checkFileType(files[i])){
                                addWrongFileField(i);
                                continue;
                            }
                            if(!checkFileSize(files[i])) {
                                addFileToBigField(i);
                                continue;
                            }
                            formData.append(options.filesName + '[]', files[i]);

                            addProgressBar(i);
                            bindXHR(xhr, i);

                            xhr.open('post', options.url);
                            xhr.setRequestHeader('Cache-Control', 'no-cache');
                            xhr.send(formData);
                            $(".progress").show();
                        }
                    }
                }
            }
        }

        function bindXHR(xhr, i){
            $(xhr.upload).bind({
                progress: function(e){
                    if(e.originalEvent.lengthComputable){
                        var percent = e.originalEvent.loaded / e.originalEvent.total * 100;
                        if(typeof options.progress == "function") options.progress(percent, i);
                        else{
                            //var fileName = file.name.trunc(15);
                            $(".progress-"+i).children().css("width", percent+"%").html(percent.toFixed(0)+"%");
                        }
                    }
                }
            });

            xhrDone[i] = false;

            $(xhr).bind({
                readystatechange: function(){
                    if(this.readyState == 4 && this.status == 200){
                        changeXhrDoneStatus(i);
                        $(".progress.progress-"+i).children().removeClass('active');
                    }
                }
            });

            var interval = setInterval(function(){
                if(Object.keys(xhrDone).length > 0){
                    var allOk = {};

                    for(var index in xhrDone){
                        if(xhrDone[index] === true) allOk[index] = true;
                    }

                    if(Object.keys(xhrDone).length == Object.keys(allOk).length){
                        clearInterval(interval);
                        xhrDone = {};
                        if(typeof options.uploadDone == "function") options.uploadDone($me);
                    }
                }
            }, 500);
        }

        function changeXhrDoneStatus(i){
            xhrDone[i] = true;
        }

        function addProgressBar(i){
            $(options.progressContainer)
                .append('<div class="progress progress-'+i+'"></div>')
                .css({'margin': options.margin});
            $(".progress-"+i).css({
                width: options.progressBarWidth,
                margin: '20px 0 0 0',
            }).append('<div class="progress-bar progress-bar-info progress-bar-striped active"></div>').hide();
            $(".progress-" + i).wrap('<div class="extra-progress-wrapper"></div>');
            $(".progress-" + i).parent().append('<span>'+options.files[i].name+'</span>');
        }

        function addFileToBigField(i){
            $(options.progressContainer)
                .append('<div class="progress error-progress-'+i+'"></div>')
                .css('margin', options.margin);
            var file = options.files[i];
            var fileName = file.name.trunc(25);
            $(".error-progress-"+i).css({
                width: options.progressBarWidth,
                margin: '20px 0 0 0'
            }).append('<div class="progress-bar progress-bar-danger progress-bar-striped" style="width:100%">File to big: '+fileName+' ('+formatBytes(file.size)+')</div>');
            $(".error-progress-" + i).wrap('<div class="extra-progress-wrapper"></div>');
        }

        function addWrongFileField(i){
            $(options.progressContainer)
                .append('<div class="progress error-progress-'+i+'"></div>')
                .css('margin', options.margin);
            var file = options.files[i];
            var fileName = file.name.trunc(15);
            var extension = file.name.substr(file.name.lastIndexOf('.') + 1);
            $(".error-progress-"+i).css({
                width: options.progressBarWidth,
                margin: '20px 0 0 0'
            }).append('<div class="progress-bar progress-bar-danger progress-bar-striped" style="width:100%">'+fileName+'('+extension+') is not allowed</div>');
            $(".error-progress-" + i).wrap('<div class="extra-progress-wrapper"></div>');
        }

        function checkFileType(file){
            if (!file.type && file.size%4096 === 0) return false;
            if(options.allowedFileTypes == '*') return true;
            var extension = file.name.substr(file.name.lastIndexOf('.') + 1);

            var allowedTypes = options.allowedFileTypes.replace(' ', '').split(",");

            if($.inArray(extension, allowedTypes) != -1) return true;

            return false;
        }

        function checkFileSize(file){
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

            var sizeType = options.maxFileSize.match(/[a-zA-Z]+/g)[0];
            var sizeValue = options.maxFileSize.match(/\d+/)[0];
            var sizeIndex = $.inArray(sizeType, sizes);

            if(sizeIndex != -1){
                var fileSize = formatBytes(file.size);
                var fileSizeType = fileSize.match(/[a-zA-Z]+/g)[0];
                var fileSizeValue = fileSize.match(/\d+/)[0];

                if(sizeType == fileSizeType){
                    if(parseInt(fileSizeValue) < parseInt(sizeValue)){
                        return true;
                    }
                }else{
                    var fileSizeIndex = $.inArray(fileSizeType, sizes);
                    if(fileSizeIndex > -1){
                        if(parseInt(fileSizeValue) < (parseInt(sizeValue) * ( sizeIndex * 1000))){
                            return true;
                        }
                    }
                }
            }else{
                alert("Incorect max file size definition!! ("+sizes.join(',')+")");
            }

            return false;

        }
        function formatBytes(bytes,decimals) {
           var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
           if (bytes === 0) return '0 Byte';
           var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
           return Math.round(bytes / Math.pow(1024, i), 2) + sizes[i];
        }
        String.prototype.trunc = String.prototype.trunc || function(n){
              return this.length>n ? this.substr(0,n-1)+'&hellip;' : this;
          };

        return $me;
    };

})(jQuery);