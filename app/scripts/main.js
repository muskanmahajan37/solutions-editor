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
