const express = require("express");
const app = express();
app.use(express.json());

let courses = [
  { id: 1, name: "Data Structures", seats: 30 },
  { id: 2, name: "Operating Systems", seats: 25 },
];

let astronauts = [
  { name: "Ayesha Khan", specialization: "Pilot", skillLevel: "Advanced" },
  { name: "Omar Malik", specialization: "Robotics Engineer", skillLevel: "Intermediate" },
  { name: "Zara Ahmed", specialization: "Medical Officer", skillLevel: "Advanced" },
  { name: "Hassan Ali", specialization: "Engineer", skillLevel: "Beginner" },
];

let missions = [];

let books = [
  { id: 1, title: "Clean Code", author: "Robert Martin" },
  { id: 2, title: "Introduction to Algorithms", author: "CLRS" },
];

let requestCount = 0;

const countRequests = (req, res, next) => {
  requestCount++;
  next();
};

const addRequestTime = (req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
};

const validateMission = (req, res, next) => {
  const { missionName, crew } = req.body;
  if (!missionName || !crew) {
    return res.status(400).json("Invalid Request: Required fields missing");
  }
  next();
};

app.use(countRequests);
app.use(addRequestTime);

app.get("/courses", (req, res) => {
  res.json(courses);
});

app.get("/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course not found");
  res.json(course);
});

app.post("/courses", (req, res) => {
  const { id, name, seats } = req.body;
  if (!id || !name || !seats) return res.status(400).send("Missing required fields");
  const course = { id, name, seats };
  courses.push(course);
  res.status(201).json(course);
});

app.put("/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course not found");
  if (req.body.seats !== undefined) course.seats = req.body.seats;
  res.json(course);
});

app.delete("/courses/:id", (req, res) => {
  const index = courses.findIndex((c) => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send("Course not found");
  courses.splice(index, 1);
  res.send("Course deleted");
});

app.get("/astronauts", (req, res) => {
  res.json(astronauts);
});

const skillScore = { Advanced: 50, Intermediate: 30, Beginner: 10 };

app.post("/missions", validateMission, (req, res) => {
  const { missionName, crew } = req.body;

  if (missions.find((m) => m.missionName === missionName)) {
    return res.status(400).send("Mission name already exists");
  }

  for (const name of crew) {
    const astronaut = astronauts.find((a) => a.name === name);
    if (!astronaut) return res.status(404).send(`Astronaut ${name} not found`);
    if (missions.some((m) => m.crew.includes(name))) {
      return res.status(400).send(`Astronaut ${name} is already assigned to another mission`);
    }
  }

  const mission = { missionName, crew };
  missions.push(mission);
  res.status(201).json(mission);
});

app.get("/missions/:missionName", (req, res) => {
  const mission = missions.find((m) => m.missionName === req.params.missionName);
  if (!mission) return res.status(404).send("Mission not found");

  const score = mission.crew.reduce((total, name) => {
    const astronaut = astronauts.find((a) => a.name === name);
    return total + (astronaut ? skillScore[astronaut.skillLevel] || 0 : 0);
  }, 0);

  res.json({ missionName: mission.missionName, crew: mission.crew, missionCapabilityScore: score });
});

app.delete("/missions/:missionName", (req, res) => {
  const index = missions.findIndex((m) => m.missionName === req.params.missionName);
  if (index === -1) return res.status(404).send("Mission not found");
  missions.splice(index, 1);
  res.send(`Mission "${req.params.missionName}" has been successfully cancelled.`);
});

app.get("/stats", (req, res) => {
  res.send(`Total API Requests: ${requestCount}`);
});

app.get("/request-time", (req, res) => {
  res.send(`This request was received at: ${req.requestTime}`);
});

const animalTypeCheck = (req, res, next) => {
  const { animalType } = req.body;
  const valid = ["bird", "mammal", "reptile"];
  if (!animalType || !valid.includes(animalType.toLowerCase())) {
    return res.status(400).json({ error: "Invalid or missing animal type" });
  }
  req.animalType = animalType.toLowerCase();
  next();
};

const severityCheck = (req, res, next) => {
  const { severity } = req.body;
  const valid = ["mild", "moderate", "severe"];
  if (!severity || !valid.includes(severity.toLowerCase())) {
    return res.status(400).json({ error: "Invalid or missing severity level" });
  }
  req.severity = severity.toLowerCase();
  next();
};

const resourceCheck = (req, res, next) => {
  const resources = { teamMembers: 5, vehicles: 2, equipment: true };
  req.resources = resources;
  if (req.severity === "severe" && resources.teamMembers < 4) {
    req.resourceInsufficient = true;
  } else {
    req.resourceInsufficient = false;
  }
  next();
};

const missionOutcome = (req, res, next) => {
  let outcome;
  if (req.resourceInsufficient) {
    outcome = "delayed";
  } else if (req.severity === "severe" && req.animalType === "reptile") {
    outcome = "unsuccessful";
  } else {
    outcome = "success";
  }
  req.outcome = outcome;
  next();
};

const errorHandler = (err, req, res, next) => {
  res.status(500).json({ error: err.message || "Internal server error" });
};

app.post(
  "/rescue-mission",
  animalTypeCheck,
  severityCheck,
  resourceCheck,
  missionOutcome,
  (req, res) => {
    res.json({ message: "Rescue mission processed", outcome: req.outcome });
  }
);

app.use(errorHandler);

app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("Book not found");
  res.json(book);
});

app.post("/books", (req, res) => {
  const { id, title, author } = req.body;
  if (!id || !title || !author) return res.status(400).send("Missing required fields");
  const book = { id, title, author };
  books.push(book);
  res.status(201).json(book);
});

app.put("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("Book not found");
  if (req.body.title) book.title = req.body.title;
  if (req.body.author) book.author = req.body.author;
  res.json(book);
});

app.delete("/books/:id", (req, res) => {
  const index = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send("Book not found");
  books.splice(index, 1);
  res.send("Book deleted");
});

app.listen(3000, () => console.log("Server running on port 3000"));