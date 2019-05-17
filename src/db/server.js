var filter = require("rxjs/operators");
var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var md5 = require("md5");

var coursesUrl = "./courses.json";
var authorsUrl = "./authors.json";
var usersUrl = "./users.json";

var app = express();
var router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

app.use("/", router);
var jsonParser = bodyParser.json();

var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS, DELETE");
  res.header("Access-Control-Allow-Headers", "*");
  next();
};

app.use(express.static(__dirname + "/public"), allowCrossDomain);

app.listen(3000, () => {
  console.log("Server started!");
});

app.get("/api/courses", function(req, res) {
  var searchInput = null;
  searchInput = req.query.searchInput;
  var content = fs.readFileSync(coursesUrl, "utf8");
  var courses = new Array();
  var parsedData = JSON.parse(content);

  if (!searchInput) {
    res.send(parsedData);
  } else {
    const coursesSearching = filterItemsBySearch(searchInput, parsedData);
    if (coursesSearching.length == 0) {
      res.status(404).send();
    } else {
      courses = sortCourses(coursesSearching);
      res.send({ courses: courses });
    }
  }
});

app.get("/api/courses/:id", function(req, res) {
  var idGet = req.params.id;
  var content = fs.readFileSync(coursesUrl, "utf8");
  var courses = new Array();
  var parsedData = JSON.parse(content);

  courses = parsedData.courses.filter(course => {
    return course.name == idGet;
  });

  if (courses.length != 0) {
    res.send({ courses: courses });
  } else {
    res.status(404).send();
  }
});

app.post("/api/courses", jsonParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);

  var courseName = req.body.name;
  var courseDate = req.body.date;
  var courseDuration = req.body.duration;
  var courseDescription = req.body.description;
  var courseAuthors = req.body.authors;
  var course = {
    name: courseName,
    date: courseDate,
    duration: courseDuration,
    description: courseDescription,
    authors: courseAuthors
  };

  var data = fs.readFileSync(coursesUrl, "utf8");
  var parsedData = JSON.parse(data);

  var id = Math.max.apply(
    Math,
    parsedData.courses.map(function(o) {
      return o.id;
    })
  );
  course.id = id + 1;
  parsedData.courses.push(course);
  var data = JSON.stringify(parsedData);
  fs.writeFileSync(coursesUrl, data);
  res.send({ courses: course });
});

app.put("/api/courses", jsonParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);

  var courseId = req.body.id;
  var courseName = req.body.name;
  var courseDate = req.body.date;
  var courseDuration = req.body.duration;
  var courseDescription = req.body.description;
  var courseAuthors = req.body.authors;

  var data = fs.readFileSync(coursesUrl, "utf8");
  var parsedData = JSON.parse(data);

  const course = parsedData.courses.find(course => {
    return course.id == courseId;
  });

  if (course) {
    course.name = courseName;
    course.date = courseDate;
    course.duration = courseDuration;
    course.description = courseDescription;
    course.authors = courseAuthors;
    var data = JSON.stringify(parsedData);
    fs.writeFileSync(coursesUrl, data);
    res.send( course );
  } else {
    res.status(404).send("Курс не был изменен");
  }
});

app.delete("/api/courses/:id", function(req, res) {
  var idDeleted = req.params.id;
  var data = fs.readFileSync(coursesUrl, "utf8");
  var index = -1;
  var parsedData = JSON.parse(data);

  index = parsedData.courses.findIndex(course => {
    return course.id == idDeleted;
  });

  if (index !== -1) {
    var courseForDelete = parsedData.courses.splice(index, 1);
    var data = JSON.stringify({ courses: parsedData.courses });
    fs.writeFileSync(coursesUrl, data);
    res.send(data);
  } else {
    res.status(404).send();
  }
});

app.get("/api/authors", function(req, res) {
  var content = fs.readFileSync(authorsUrl, "utf8");
  var parsedData = JSON.parse(content);

  if (parsedData.authors.length != 0) {
    res.send(parsedData);
  } else {
    res.status(404).send("Нет авторов!");
  }
});

app.get("/api/users", function(req, res) {
  var content = fs.readFileSync(usersUrl, "utf8");
  var parsedData = JSON.parse(content);

  if (parsedData.users.length != 0) {
    res.send(parsedData);
  } else {
    res.status(404).send("Нет пользователей!");
  }
});

app.post("/api/users", jsonParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);

  var userLogin = req.body.login;
  var userPassword = md5(req.body.password);

  var content = fs.readFileSync(usersUrl, "utf8");
  var parsedData = JSON.parse(content);

  if (!userLogin) {
    res.send(parsedData);
  } else {
    const userSearching = parsedData.users.find(user => {
      return user.login == userLogin && user.password == userPassword;
    });
    if (!userSearching) {
      res.status(404).send("Нет такого пользователя!");
    } else {
      res.send(userSearching);
    }
  }
});

app.post("/api/user", jsonParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);

  var userLogin = req.body.login;
  var userPassword = req.body.password;
  var user = {
    login: userLogin,
    password: md5(userPassword)
  };

  var data = fs.readFileSync(usersUrl, "utf8");
  var parsedData = JSON.parse(data);

  const userSearching = parsedData.users.find(user => {
    return user.login == userLogin && user.password == userPassword;
  });
  if (userSearching) {
    res.status(404).send("Такой пользователь уже существует!");
  } else {
    var id = Math.max.apply(
      Math,
      parsedData.users.map(function(o) {
        return o.id;
      })
    );
    user.id = id + 1;
    parsedData.users.push(user);
    var data = JSON.stringify(parsedData);
    fs.writeFileSync(usersUrl, data);
    res.send(user);
  }
});

const filterItemsBySearch = (searchInput, parsedData) => {
  return parsedData.courses.filter(
    el => el.name.toLowerCase().indexOf(searchInput.toLowerCase()) > -1
  );
};

function sortCourses(courses) {
  courses.sort(function(a, b) {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });
  return courses;
}
