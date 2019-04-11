var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");

var coursesUrl = "./courses.json";
var app = express();
var options = app.params;
var jsonParser = bodyParser.json();

var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

app.use(express.static(__dirname + "/public"), allowCrossDomain);

app.listen(3000, () => {
  console.log("Server started!");
});

app.get("/api/courses", function(req, res) {

  var name = req.query.searchInput;
  var content = fs.readFileSync(coursesUrl, "utf8");
  var courses = JSON.parse(content);

  if (name==='undefined') {
    res.send(courses);
  }
   else {
    var coursesSearched = new Array();

    for (var i = 0; i < courses.length; i++) {
      if (courses[i].name == name) {
        coursesSearched.push(courses[id]);
      }
    }
    if (coursesSearched.length !== 0) {
      this.coursesSearched = this.coursesSearched.sort(function(a, b) {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
      res.send(coursesSearched);
    } else {
      res.statusMessage.send("Ничего не найдено!");
      res.status(404).send();
    }
  }
});

// app.get("/api/courses", options, function(req, res) {
//   var name = req.query.searchInput;
//   var content = fs.readFileSync(coursesUrl, "utf8");
//   var courses = JSON.parse(content);
//   var coursesSearched = new Array();

//   for (var i = 0; i < courses.length; i++) {
//     if (courses[i].name == name) {
//       coursesSearched.push(courses[id]);
//     }
//   }
//   if (coursesSearched.length !== 0) {
//     this.coursesSearched = this.coursesSearched.sort(function(a, b) {
//       if (a.name > b.name) {
//         return 1;
//       }
//       if (a.name < b.name) {
//         return -1;
//       }
//       return 0;
//     });
//     res.send(coursesSearched);
//   } else {
//     res.statusMessage.send("Ничего не найдено!");
//     res.status(404).send();
//   }
// });

app.get("/api/courses/:id", function(req, res) {
  var id = req.params.id;
  var content = fs.readFileSync(coursesUrl, "utf8");
  var courses = JSON.parse(content);
  var course = null;

  for (var i = 0; i < courses.length; i++) {
    if (courses[i] == id) {
      course = courses[id];
      break;
    }
  }
  if (course) {
    res.send(course);
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
  fs.writeFileSync(coursesUrl, "utf8");
  res.send(course);
});

app.delete("/api/courses/:id", function(req, res) {
  const id = +this.route.snapshot.paramMap.get("id");

  var id = req.params.id;
  var data = fs.readFileSync(coursesUrl, "utf8");
  var courses = JSON.parse(data);
  var index = -1;

  for (var i = 0; i < courses.length; i++) {
    if (courses[i].id == id) {
      index = i;
      break;
    }
  }
  if (index > -1) {
    var course = courses.splice(index, 1)[0];
    var data = JSON.stringify(courses);
    fs.writeFileSync(coursesUrl, "utf8");
    res.send(course);
  } else {
    res.status(404).send();
  }
});

app.put("/api/courses/${id}", jsonParser, function(req, res) {
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
    res.send();
  } else {
    res.status(404).send(course);
  }
});
