/*
 * students.js - Mock database of 40 students with filter functions
 *
 * Copyright © 2025 Michael Abler
 *
 * Licensed under the MIT License. See the LICENSE.md file in the root directory
 * for details.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * @author Michael Abler
 * @see https://github.com/MichaelAblerCode/nextjs_essentials_pagesrouter_rendering
 */

export const students = [
  // Physics: 5 male, 5 female
  {
    ID: "S001",
    firstname: "Anna",
    lastname: "Schmidt",
    gender: "female",
    birthdate: "1998-03-15",
    studysubject: "Physics",
    city: "Munich",
  },
  {
    ID: "S002",
    firstname: "Ben",
    lastname: "Müller",
    gender: "male",
    birthdate: "1997-06-22",
    studysubject: "Physics",
    city: "Vienna",
  },
  {
    ID: "S003",
    firstname: "Clara",
    lastname: "Weber",
    gender: "female",
    birthdate: "1999-01-10",
    studysubject: "Physics",
    city: "Prague",
  },
  {
    ID: "S004",
    firstname: "David",
    lastname: "Fischer",
    gender: "male",
    birthdate: "1996-11-05",
    studysubject: "Physics",
    city: "Madrid",
  },
  {
    ID: "S005",
    firstname: "Emma",
    lastname: "Meyer",
    gender: "female",
    birthdate: "1998-07-19",
    studysubject: "Physics",
    city: "Paris",
  },
  {
    ID: "S006",
    firstname: "Finn",
    lastname: "Schulz",
    gender: "male",
    birthdate: "1997-04-12",
    studysubject: "Physics",
    city: "Rome",
  },
  {
    ID: "S007",
    firstname: "Greta",
    lastname: "Koch",
    gender: "female",
    birthdate: "1999-09-25",
    studysubject: "Physics",
    city: "Munich",
  },
  {
    ID: "S008",
    firstname: "Hannes",
    lastname: "Bauer",
    gender: "male",
    birthdate: "1996-12-30",
    studysubject: "Physics",
    city: "Vienna",
  },
  {
    ID: "S009",
    firstname: "Ida",
    lastname: "Richter",
    gender: "female",
    birthdate: "1998-02-08",
    studysubject: "Physics",
    city: "Prague",
  },
  {
    ID: "S010",
    firstname: "Jonas",
    lastname: "Schäfer",
    gender: "male",
    birthdate: "1997-08-14",
    studysubject: "Physics",
    city: "Madrid",
  },

  // Mathematics: 5 male, 5 female
  {
    ID: "S011",
    firstname: "Klara",
    lastname: "Wagner",
    gender: "female",
    birthdate: "1999-05-03",
    studysubject: "Mathematics",
    city: "Paris",
  },
  {
    ID: "S012",
    firstname: "Lars",
    lastname: "Becker",
    gender: "male",
    birthdate: "1996-10-17",
    studysubject: "Mathematics",
    city: "Rome",
  },
  {
    ID: "S013",
    firstname: "Mia",
    lastname: "Hofmann",
    gender: "female",
    birthdate: "1998-04-29",
    studysubject: "Mathematics",
    city: "Munich",
  },
  {
    ID: "S014",
    firstname: "Noah",
    lastname: "Schröder",
    gender: "male",
    birthdate: "1997-03-11",
    studysubject: "Mathematics",
    city: "Vienna",
  },
  {
    ID: "S015",
    firstname: "Olivia",
    lastname: "Neumann",
    gender: "female",
    birthdate: "1999-06-26",
    studysubject: "Mathematics",
    city: "Prague",
  },
  {
    ID: "S016",
    firstname: "Paul",
    lastname: "Schwarz",
    gender: "male",
    birthdate: "1996-09-08",
    studysubject: "Mathematics",
    city: "Madrid",
  },
  {
    ID: "S017",
    firstname: "Quinn",
    lastname: "Zimmermann",
    gender: "female",
    birthdate: "1998-01-14",
    studysubject: "Mathematics",
    city: "Paris",
  },
  {
    ID: "S018",
    firstname: "Ruben",
    lastname: "Krause",
    gender: "male",
    birthdate: "1997-07-20",
    studysubject: "Mathematics",
    city: "Rome",
  },
  {
    ID: "S019",
    firstname: "Sophie",
    lastname: "Schneider",
    gender: "female",
    birthdate: "1999-02-27",
    studysubject: "Mathematics",
    city: "Munich",
  },
  {
    ID: "S020",
    firstname: "Theo",
    lastname: "Schubert",
    gender: "male",
    birthdate: "1996-12-03",
    studysubject: "Mathematics",
    city: "Vienna",
  },

  // Computer Science: 5 male, 5 female
  {
    ID: "S021",
    firstname: "Ursula",
    lastname: "Fuchs",
    gender: "female",
    birthdate: "1998-08-16",
    studysubject: "Computer Science",
    city: "Prague",
  },
  {
    ID: "S022",
    firstname: "Viktor",
    lastname: "Schreiber",
    gender: "male",
    birthdate: "1997-05-09",
    studysubject: "Computer Science",
    city: "Madrid",
  },
  {
    ID: "S023",
    firstname: "Wanda",
    lastname: "Vogel",
    gender: "female",
    birthdate: "1999-03-22",
    studysubject: "Computer Science",
    city: "Paris",
  },
  {
    ID: "S024",
    firstname: "Xaver",
    lastname: "Wolff",
    gender: "male",
    birthdate: "1996-11-28",
    studysubject: "Computer Science",
    city: "Rome",
  },
  {
    ID: "S025",
    firstname: "Yara",
    lastname: "Schröter",
    gender: "female",
    birthdate: "1998-06-04",
    studysubject: "Computer Science",
    city: "Munich",
  },
  {
    ID: "S026",
    firstname: "Zane",
    lastname: "Fischer",
    gender: "male",
    birthdate: "1997-02-15",
    studysubject: "Computer Science",
    city: "Vienna",
  },
  {
    ID: "S027",
    firstname: "Alma",
    lastname: "Mayer",
    gender: "female",
    birthdate: "1999-07-31",
    studysubject: "Computer Science",
    city: "Prague",
  },
  {
    ID: "S028",
    firstname: "Bruno",
    lastname: "König",
    gender: "male",
    birthdate: "1996-10-23",
    studysubject: "Computer Science",
    city: "Madrid",
  },
  {
    ID: "S029",
    firstname: "Celine",
    lastname: "Schulz",
    gender: "female",
    birthdate: "1998-09-12",
    studysubject: "Computer Science",
    city: "Paris",
  },
  {
    ID: "S030",
    firstname: "Dorian",
    lastname: "Weber",
    gender: "male",
    birthdate: "1997-04-06",
    studysubject: "Computer Science",
    city: "Rome",
  },

  // Medicine: 5 male, 5 female
  {
    ID: "S031",
    firstname: "Elisa",
    lastname: "Bauer",
    gender: "female",
    birthdate: "1999-01-19",
    studysubject: "Medicine",
    city: "Munich",
  },
  {
    ID: "S032",
    firstname: "Felix",
    lastname: "Richter",
    gender: "male",
    birthdate: "1996-08-02",
    studysubject: "Medicine",
    city: "Vienna",
  },
  {
    ID: "S033",
    firstname: "Gina",
    lastname: "Kuhn",
    gender: "female",
    birthdate: "1998-03-27",
    studysubject: "Medicine",
    city: "Prague",
  },
  {
    ID: "S034",
    firstname: "Henry",
    lastname: "Schäfer",
    gender: "male",
    birthdate: "1997-06-13",
    studysubject: "Medicine",
    city: "Madrid",
  },
  {
    ID: "S035",
    firstname: "Iris",
    lastname: "Wagner",
    gender: "female",
    birthdate: "1999-05-08",
    studysubject: "Medicine",
    city: "Paris",
  },
  {
    ID: "S036",
    firstname: "Julian",
    lastname: "Becker",
    gender: "male",
    birthdate: "1996-12-15",
    studysubject: "Medicine",
    city: "Rome",
  },
  {
    ID: "S037",
    firstname: "Kaja",
    lastname: "Hofmann",
    gender: "female",
    birthdate: "1998-02-21",
    studysubject: "Medicine",
    city: "Munich",
  },
  {
    ID: "S038",
    firstname: "Leon",
    lastname: "Schröder",
    gender: "male",
    birthdate: "1997-09-04",
    studysubject: "Medicine",
    city: "Vienna",
  },
  {
    ID: "S039",
    firstname: "Mira",
    lastname: "Neumann",
    gender: "female",
    birthdate: "1999-04-17",
    studysubject: "Medicine",
    city: "Prague",
  },
  {
    ID: "S040",
    firstname: "Nico",
    lastname: "Schwarz",
    gender: "male",
    birthdate: "1996-07-29",
    studysubject: "Medicine",
    city: "Madrid",
  },
];

// Filter functions (unchanged)
export function filterByCity(students, city) {
  return students.filter(
    (student) => student.city.toLowerCase() === city.toLowerCase()
  );
}

export function filterBySubject(students, subject) {
  return students.filter(
    (student) => student.studysubject.toLowerCase() === subject.toLowerCase()
  );
}

export function filterByGender(students, gender) {
  return students.filter(
    (student) => student.gender.toLowerCase() === gender.toLowerCase()
  );
}

export function findById(students, id) {
  return students.find((student) => student.ID === id) || null;
}

export function filterByName(students, name) {
  return students.filter(
    (student) =>
      student.firstname.toLowerCase() === name.toLowerCase() ||
      student.lastname.toLowerCase() === name.toLowerCase()
  );
}
