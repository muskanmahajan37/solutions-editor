function push() {
  var token = localStorage.getItem('token');

  var github = new GitHub({
    token: token
  });

  var repo = github.getRepo('phodal', 'solutions-content');

  var options = {
    author: {name: 'Phodal', email: 'h@phodal.com'},
    committer: {name: 'Phodal', email: 'h@phodal.com'},
    encode: true
  };

  var data = {
    title: 'hybird-app'
  };

  var stringifyData = JSON.stringify(data);

  repo.writeFile('master', 'content/' + data.title + '.json', stringifyData, 'Robot: add article ' + data.title, options, function (err, data) {
    if (data.commit) {
      console.log("Commit Success");
    }
  });
}

// push();

$(document).ready(function(){
  $("#tags").tagsinput('items')
});

var editor = new MediumEditor('.editable', {
  extensions: {
    table: new MediumEditorTable()
  },
  toolbar: {
    /* These are the default options for the toolbar,
     if nothing is passed this is what is used */
    allowMultiParagraphSelection: true,
    buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote', 'table'],
    diffLeft: 0,
    diffTop: -10,
    firstButtonClass: 'medium-editor-button-first',
    lastButtonClass: 'medium-editor-button-last',
    standardizeSelectionStart: false,
    static: false,
    relativeContainer: null,
    /* options which only apply when static is true */
    align: 'left',
    sticky: false,
    updateOnEmptySelection: false,
  }
});
