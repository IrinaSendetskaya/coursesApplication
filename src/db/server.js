var filter = require("rxjs/operators");
var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");

var coursesUrl = "./courses.json";
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

app.get("/api/courses", function(req, res, next) {
  var name = null;
  var name = req.query.searchInput;
  var content = fs.readFileSync(coursesUrl, "utf8");
  var courses = new Array();
  var parsedData = JSON.parse(content);

  if (!name) {
    res.send(parsedData);
  } else {
    const filterItems = name => {
      return parsedData.courses.filter(
        el => el.name.toLowerCase().indexOf(name.toLowerCase()) > -1
      );
    };

    if (!filterItems(name)) {
      res.status(404).send();
    } else {
      courses = filterItems(name);
      courses = courses.sort(function(a, b) {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
      res.send({ courses: courses });
    }
  }
});

app.get("/api/courses/:id", function(req, res) {
  var idGet = req.params.id;
  var content = fs.readFileSync(coursesUrl, "utf8");
  //var courses = JSON.parse(content);
  var course = null;
  var parsedData = JSON.parse(content);

  const filterItems = idGet => {
    return parsedData.courses.find((el) => el.id === idGet);
  };

  if (filterItems(idGet)) {
    res.send({ courses: filterItems(idGet) });
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
    authors: [{ authors: courseAuthors }]
  };

  var data = fs.readFileSync(coursesUrl, "utf8");
  var courses = JSON.parse(data);

  var id = Math.max.apply(
    Math,
    courses.map(function(o) {
      return o.id;
    })
  );
  course.id = id + 1;
  courses.push(course);
  var data = JSON.stringify(courses);
  fs.writeFileSync(coursesUrl, data);
  res.send({ courses: course });
});

app.delete("/api/courses/:id", function(req, res) {
  var idDeleted = req.params.id;
  var data = fs.readFileSync(coursesUrl, "utf8");
  // var courses = JSON.parse(data);
  var index = -1;
  var parsedData = JSON.parse(content);

  const filterItems = id => {
    return parsedData.courses.filter(
      el => (index = el.indexOf(idDeleted)) > -1
    );
  };

  //   for (var i = 0; i < courses.length; i++) {
  //     if (courses[i].id == idDeleted) {
  //       index = i;
  //       break;
  //     }
  //   }
  if (filterItems(idDeleted)) {
    var course = parsedData.splice(index, 1)[0];
    var data = JSON.stringify(parsedData);
    fs.writeFileSync(coursesUrl, data);
    res.send({ courses: course });
  } else {
    res.status(404).send();
  }
});

app.put("/api/courses/:id", jsonParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);

  var courseId = req.params.id;
  var courseName = req.body.name;
  var courseDate = req.body.date;
  var courseDuration = req.body.duration;
  var courseDescription = req.body.description;
  var courseAuthors = req.body.authors;

  var data = fs.readFileSync(coursesUrl, "utf8");
  var courses = JSON.parse(data);
  var course;

  for (var i = 0; i < courses.length; i++) {
    if (courses[i].id == courseId) {
      course = courses[i];
      break;
    }
  }
  if (course) {
    course.name = courseName;
    course.date = courseDate;
    course.duration = courseDuration;
    course.description = courseDescription;
    course.authors = [{ courseAuthors }];
    var data = JSON.stringify(courses);
    fs.writeFileSync(coursesUrl, data);
    res.send(); //??
  } else {
    res.status(404).send(course);
  }
});
