// Task7_StudentSearch.js
// Run: node Task7_StudentSearch.js
// Then visit: http://localhost:3000/students           (all students)
//             http://localhost:3000/students?name=Ali  (search by name)

const express = require('express');
const app = express();
const PORT = 3000;

const students = [
  { id: 1, name: "Ali", semester: 5 },
  { id: 2, name: "Sara", semester: 3 },
  { id: 3, name: "Ahmed", semester: 7 },
  { id: 4, name: "Fatima", semester: 2 },
  { id: 5, name: "Ali Hassan", semester: 4 },
];

// Route: GET /students
// Optional query param: ?name=Ali
app.get('/students', (req, res) => {
  const nameQuery = req.query.name;

  if (!nameQuery) {
    return res.json(students);
  }

  const results = students.filter(s =>
    s.name.toLowerCase().includes(nameQuery.toLowerCase())
  );

  if (results.length === 0) {
    return res.status(404).json({ message: "No student found" });
  }

  res.json(results);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Try: http://localhost:${PORT}/students`);
  console.log(`Try: http://localhost:${PORT}/students?name=Ali`);
  console.log(`Try: http://localhost:${PORT}/students?name=xyz  (no match)`);
});
