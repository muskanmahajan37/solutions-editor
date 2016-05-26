console.log('\'Allo \'Allo!');

var token = localStorage.getItem('token');
var username = localStorage.getItem('repo').split("/")[0];
var reponame = localStorage.getItem('repo').split("/")[1];

var github = new GitHub({
  token: token,
  auth: "oauth"
});

var repo = github.getRepo(username, reponame);

var options = {
  author: {name: 'Phodal Robot', email: 'robot@phodal.com'},
  committer: {name: 'Phodal Robot', email: 'robot@phodal.com'},
  encode: true
};

var data = {

};

var stringifyData = JSON.stringify(data);

repo.write('master', 'content/' + data.url + '.json', stringifyData, 'Robot: add article ' + data.title, options, function (err, data) {
  if (data.commit) {
    console.log("Commit Success");
  }
});
