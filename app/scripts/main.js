function push(data) {
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

  var stringifyData = JSON.stringify(data);

  repo.writeFile('master', 'content/' + data.title + '.json', stringifyData, 'Robot: add article ' + data.title, options, function (err, data) {
    if (data.commit) {
      console.log("Commit Success");
    }
  });
}

var editor = new MediumEditor('.editable', {
  buttonLabels: 'fontawesome',
  extensions: {
    table: new MediumEditorTable()
  },
  toolbar: {
    allowMultiParagraphSelection: true,
    buttons: ['bold', 'italic', 'fontname', 'underline', 'anchor', 'h2', 'h3', 'quote', 'table', 'unorderedlist', 'orderedlist'],
    diffLeft: 0,
    diffTop: -10,
    firstButtonClass: 'medium-editor-button-first',
    lastButtonClass: 'medium-editor-button-last',
    standardizeSelectionStart: false,
    static: false,
    relativeContainer: null,
    align: 'left',
    sticky: false,
    updateOnEmptySelection: false
  }
});

$(document).ready(function () {
  var stacks = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: {
      url: 'assets/stacks.json',
      filter: function (list) {
        console.log(list);
        return $.map(list, function (stack) {
          return {name: stack};
        });
      }
    }
  });
  stacks.initialize();

  $('#tagInput').tagsinput({
    typeaheadjs: {
      name: 'stacks',
      displayKey: 'name',
      valueKey: 'name',
      source: stacks.ttAdapter()
    }
  });
  $('.jumbotron').validator();
  $('form#solution-form').on('submit', function (event) {
    var paramObj = {};
    $.each($('form#solution-form').serializeArray(), function (_, kv) {
      paramObj[kv.name] = kv.value;
    });

    paramObj.content = editor.serialize()['element-0'].value;

    push(paramObj);
    event.preventDefault();
  });
});
