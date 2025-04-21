/*
 * StudentList.js - Renders a list of students with links to their details
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

export default function StudentList({
  students,
  linkBase = "/students/idfilterssr",
}) {
  if (!students || students.length === 0) return <p>No students found.</p>;

  return (
    <div style={{ paddingTop: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>Matching Students</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(8, 100px)",
          gap: "16px",
          padding: "0",
          listStyle: "none",
        }}
      >
        {students.map((student) => (
          <div key={student.ID} style={{ margin: "8px 0" }}>
            <Link
              href={`${linkBase}/${student.ID}`}
              style={{
                color: "#1a73e8", // Distinct blue color for visibility
                textDecoration: "underline", // Underline to indicate it's a link
                display: "block", // Ensures the link takes the full width
                overflow: "hidden", // Prevents overflow in fixed-width column
                textOverflow: "ellipsis", // Truncates long text
                whiteSpace: "nowrap", // Keeps text in a single line
              }}
            >
              {student.firstname}
              <br /> {student.lastname}
              <br /> ({student.ID})
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
