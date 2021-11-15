$(document).on('change', '.inputfile', function (e) { // Improved custom file upload widget
  /**
   * Based on code from https://tympanus.net/codrops/2015/09/15/styling-customizing-file-inputs-smart-way/
   * 
   * Improvements: 
   * - Now a single event bound to document instead of manually instantiated per instance
   * - Blocks upload of a file over maximum filesize in bytes
   * 
   */
  const maxfilesize = (501 * 1024 * 1024); // 501 Mb defined in bytes
  var
    $input = $(this), 
    fileLength = this.files[0].size,
    $inputparent = $input.next('label'),
    labelVal = $inputparent.html();
  if (fileLength <= maxfilesize) {
    var fileName = '';
    if (this.files && this.files.length > 1)
      fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
    else if (e.target.value)
      fileName = e.target.value.split('\\').pop();

    if (fileName)
      $inputparent.find('span').html(fileName);
    else
      $inputparent.html(labelVal);
  } else { // File is too large; throw error message then remove input's file
    alert("File too large, please choose another.");
    $(this).val('');
  }
});
// Firefox bug fix
$(document)
  .on('focus', '.inputfile', function() {$(this).addClass('has-focus')})
  .on('blur', '.inputfile', function() {$(this).removeClass('has-focus')});
