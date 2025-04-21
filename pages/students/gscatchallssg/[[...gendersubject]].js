/*
 * [[...gendersubject]].js - SSG optional catch-all route for gender/subject filtering
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

import StudentList from "../../../components/StudentList";
import {
  filterByGender,
  filterBySubject,
  students,
} from "../../../utils/students";

export async function getStaticPaths() {
  const genders = ["male", "female"];
  const subjects = ["Physics", "Mathematics", "Computer Science", "Medicine"];
  const paths = [{ params: { gendersubject: undefined } }]; // Root path
  genders.forEach((gender) => {
    subjects.forEach((subject) => {
      paths.push({ params: { gendersubject: [gender, subject] } });
    });
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const gendersubject = params?.gendersubject || [];
  const gender = gendersubject[0];
  const subject = gendersubject[1];
  let filteredStudents = students;
  if (gender) filteredStudents = filterByGender(filteredStudents, gender);
  if (subject) filteredStudents = filterBySubject(filteredStudents, subject);
  return {
    props: {
      students: filteredStudents,
      gender: gender || "All",
      subject: subject || "All",
    },
  };
}

export default function GenderSubjectCatchAllPage({
  students,
  gender,
  subject,
}) {
  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Students by Gender and Subject (SSG, Catch-All)</h1>
      <p>
        Filtering by Gender: {gender}, Subject: {subject}
      </p>
      <StudentList students={students} linkBase="/students/idfilterssg" />
    </div>
  );
}
