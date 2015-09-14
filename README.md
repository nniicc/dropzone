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
- `url` - link to the file you wish to send the files
- `filesName` - name of the input[file] name //<input type="file" name="{filesName}"
- `margin` - margin added if needed
- `border` - border property
- `background` - background property
- `textColor` - color property
- `textAlign` - text-align property
- `lineHeight` - vertical text align
- `text` - text inside the div
- `uploadMode` - upload all files at once or upload single files, options: all or single
- `progressContainer` - progress selector if null one will be created
- `dropzoneWraper` - wrap the dropzone div with custom class
- `files` - access to the files that are droped
- `maxFileSize` - max file size ['bytes', 'KB', 'MB', 'GB', 'TB'], 100MB default
- `clickToUpload` - click on dropzone to select files old way

Callbacks
==========
- `load` - fires when the div is created, returns this
- `progress` - fires when the files are being uploaded and returns the prcent and the index of the file
- `uploadDone` - fires when all files have been uploaded


TODO
==========
#### Add support for allowed file types

Changes
==========
#### first version (2015-09-14)


Copyright © Marko Kuhar
