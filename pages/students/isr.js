/*
 * isr.js - Displays all students with ISR in four columns of 10
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

import StudentList from "../../components/StudentList";
import { students } from "../../utils/students";

export async function getStaticProps() {
  // Get the current timestamp when the page is generated
  const generatedAt = new Date().toLocaleString();

  return {
    props: { students, generatedAt },
    revalidate: 60, // Regenerate every 60 seconds
  };
}

export default function AllStudentsISRPage({ students, generatedAt }) {
  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "16px" }}>
        All Students (ISR)
      </h1>
      <div>
        <p style={{ marginBottom: "16px" }}>
          This page demonstrates{" "}
          <strong>Incremental Static Regeneration (ISR)</strong>. The student
          list below is prerendered at build time and regenerated every 60
          seconds server-side to reflect any updates to the student data. <br />
          <br />
          The page was last generated at: <strong>{generatedAt}</strong>.<br />
          Refresh page to confirm the regeneration.
        </p>
        <p style={{ marginBottom: "16px", color: "red", fontWeight: "bold" }}>
          Note: The development build does not demonstrate Incremental Static
          Regeneration (ISR) properly. Please use a production build to
          experience this feature as intended. <br />
        </p>
      </div>
      <StudentList students={students} />
    </div>
  );
}
