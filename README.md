Dropzone
==========

Dropzone is a jQuery plugin for a simple drag and drop file uploader. It allows you to drag and drop any file into the dropzone, you can click on the dropzone and simply select the files you wish to upload.

Requirements
==========

* [jQuery](http://jquery.com) (>= 1.11.0)
* [Bootstrap](http://getbootstrap.com/) (>= 3.5)

Demo
==========
  Demo at: http://jsfiddle.net/nniicc/csn8Lpwe/


Basic usage
==========

```html
<div class="dropzone"></div>
```
```js
<script type="text/javascript">
  $(".dropzone").dropzone({
    url: 'upload.php' //required filed
  })
</script>
```

Options
==========
- `width` - width of the dropzone
- `height` - height of the dropzone
- `progressBarWidth` - width of the progress bar
- `url` - link to the file you wish to send the files
- `filesName` - name of the input[file] name //<input type="file" name="{filesName}"
- `margin` - margin added if needed
- `border` - border property
- `background` - background property
- `textColor` - color property
- `textAlign` - text-align property
- `text` - text inside the div
- `uploadMode` - upload all files at once or upload single files, options: all or single
- `progressContainer` - progress selector if null one will be created
- `dropzoneWraper` - wrap the dropzone div with custom class
- `files` - access to the files that are droped
- `maxFileSize` - max file size ['bytes', 'KB', 'MB', 'GB', 'TB'], 100MB default
- `allowedFileTypes` - allowed files to be uploaded seperated by ',' jpg,png,gif
- `clickToUpload` - click on dropzone to select files old way
- `showTimer` - show timer for each upload progress to time the upload
- `removeComplete` - removes complete progresssed //default: true
- `preview` - Shows the current image on the dropzone, no upload
- `params` - extra paramenters for uploading

Callbacks
==========
- `load` - fires when the div is created, returns this
- `progress` - fires when the files are being uploaded and returns the prcent and the index of the file
- `uploadDone` - fires when all files have been uploaded
- `success` - fires when a single files is uploaded and get the response back, then the index of the progress
- `error` - fires when there is a error in the upload
- `previewDone` - fires when the preview imagesis rendered


Methods
==========
-`updateParams`
```js
    $('.dropzone').dropzone('updateParams', {action: 'newAction'});
```

Changes
==========
#### added params support, a few fixes, add updateParams method (2015-12-31)
#### few updates, fixes and added preview support and success callback (2015-12-14)
#### first version (2015-09-14)


Copyright © Marko Kuhar
