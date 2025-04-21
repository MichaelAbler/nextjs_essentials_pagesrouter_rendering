/*
 * StudentCard.js - Renders a card with details for a single student
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

export default function StudentCard({
  student,
  linkBase = "/students/idfilterssr",
}) {
  if (!student) return <p>No student found.</p>;

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        margin: "8px",
        borderRadius: "8px",
      }}
    >
      <h3>
        {student.firstname} {student.lastname}
      </h3>
      <p>Gender: {student.gender}</p>
      <p>Birthdate: {student.birthdate}</p>
      <p>Study Subject: {student.studysubject}</p>
      <p>City: {student.city}</p>
      <p>ID: {student.ID}</p>
      <Link href={`${linkBase}/${student.ID}`}>View Details</Link>
    </div>
  );
}
