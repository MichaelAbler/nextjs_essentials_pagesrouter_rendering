/*
 * all.js - Displays all students in a table using SSG
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
 * @see https://github.com/MichaelAbler/nextjs_essentials_pagesrouter_rendering
 */

import Link from "next/link";
import { students } from "../../utils/students";

export async function getStaticProps() {
  return {
    props: { students },
  };
}

export default function AllStudentsPage({ students }) {
  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "24px" }}>
        All Students (SSG)
      </h1>
      <p style={{ marginBottom: "16px" }}>
        Below is a table listing all students with their details. Click the ID
        to view more information.
      </p>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid #ccc",
          textAlign: "left",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4" }}>
            <th style={{ padding: "12px", border: "1px solid #ccc" }}>
              First Name
            </th>
            <th style={{ padding: "12px", border: "1px solid #ccc" }}>
              Last Name
            </th>
            <th style={{ padding: "12px", border: "1px solid #ccc" }}>
              Gender
            </th>
            <th style={{ padding: "12px", border: "1px solid #ccc" }}>
              Birthdate
            </th>
            <th style={{ padding: "12px", border: "1px solid #ccc" }}>
              Study Subject
            </th>
            <th style={{ padding: "12px", border: "1px solid #ccc" }}>City</th>
            <th style={{ padding: "12px", border: "1px solid #ccc" }}>ID</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.ID} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "12px", border: "1px solid #ccc" }}>
                {student.firstname}
              </td>
              <td style={{ padding: "12px", border: "1px solid #ccc" }}>
                {student.lastname}
              </td>
              <td style={{ padding: "12px", border: "1px solid #ccc" }}>
                {student.gender}
              </td>
              <td style={{ padding: "12px", border: "1px solid #ccc" }}>
                {student.birthdate}
              </td>
              <td style={{ padding: "12px", border: "1px solid #ccc" }}>
                {student.studysubject}
              </td>
              <td style={{ padding: "12px", border: "1px solid #ccc" }}>
                {student.city}
              </td>
              <td style={{ padding: "12px", border: "1px solid #ccc" }}>
                <Link
                  href={`/students/idfilterssr/${student.ID}`}
                  style={{
                    color: "#1a73e8", // Distinct blue color for visibility
                    textDecoration: "underline", // Underline to indicate it's a link
                    display: "block", // Ensures the link takes the full width
                    overflow: "hidden", // Prevents overflow in fixed-width column
                    textOverflow: "ellipsis", // Truncates long text
                    whiteSpace: "nowrap", // Keeps text in a single line
                  }}
                >
                  {student.ID}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
