/*
 * index.js - Navigation hub for the Student Directory demo
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

import Link from "next/link";

export async function getStaticProps() {
  // No dynamic data needed for the index page, but included for SSG consistency
  return {
    props: {}, // Could pass static data if needed
  };
}

export default function IndexPage() {
  const linkStyle = {
    color: "#1a73e8", // Blue color matching StudentList.js and all.js
    textDecoration: "underline", // Underline for visibility
  };

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "24px" }}>
        Student Directory - Next.js Essentials: Pages Router Rendering & Routing
      </h1>
      <p style={{ marginBottom: "16px" }}>
        Welcome to the Student Directory demo showcasing{" "}
        <a
          href="https://github.com/MichaelAblerCode/nextjs_essentials_pagesrouter_rendering/blob/master/README.md"
          style={linkStyle}
          target="_blank"
          rel="noopener noreferrer"
        >
          Next.js Essentials: Pages Router Rendering & Routing
        </a>
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "32px",
          marginBottom: "32px",
        }}
      >
        {/* SSR Section */}
        <section>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px" }}>
            Server-Side Rendering (SSR)
          </h2>
          <ul style={{ listStyle: "disc", paddingLeft: "20px" }}>
            <li style={{ marginBottom: "8px" }}>
              <strong>Single Dynamic Route</strong>: View a single student by
              ID.
              <br />
              Example:{" "}
              <Link href="/students/idfilterssr/S001" style={linkStyle}>
                /students/idfilterssr/S001
              </Link>{" "}
              (Anna Schmidt)
            </li>
            <li style={{ marginBottom: "8px" }}>
              <strong>Nested Dynamic Route</strong>: List students by gender and
              subject.
              <br />
              Example:{" "}
              <Link
                href="/students/gsnestedssr/female/Physics"
                style={linkStyle}
              >
                /students/gsnestedssr/female/Physics
              </Link>
            </li>
            <li>
              <strong>Optional Catch-All Route</strong>: List students by
              optional gender and/or subject.
              <br />
              Examples:
              <ul style={{ listStyle: "circle", paddingLeft: "20px" }}>
                <li>
                  <Link href="/students/gscatchallssr" style={linkStyle}>
                    /students/gscatchallssr
                  </Link>{" "}
                  (All students)
                </li>
                <li>
                  <Link
                    href="/students/gscatchallssr/female/Physics"
                    style={linkStyle}
                  >
                    /students/gscatchallssr/female/Physics
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </section>

        {/* SSG Section */}
        <section>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px" }}>
            Static Site Generation (SSG)
          </h2>
          <ul style={{ listStyle: "disc", paddingLeft: "20px" }}>
            <li style={{ marginBottom: "8px" }}>
              <strong>Single Prerendered URL</strong>: List all students.
              <br />
              Example:{" "}
              <Link href="/students/all" style={linkStyle}>
                /students/all
              </Link>
            </li>
            <li style={{ marginBottom: "8px" }}>
              <strong>Single Dynamic Route</strong>: View a single student by ID
              (prerendered).
              <br />
              Example:{" "}
              <Link href="/students/idfilterssg/S001" style={linkStyle}>
                /students/idfilterssg/S001
              </Link>{" "}
              (Anna Schmidt)
            </li>
            <li style={{ marginBottom: "8px" }}>
              <strong>Nested Dynamic Route</strong>: List students by gender and
              subject (prerendered).
              <br />
              Example:{" "}
              <Link
                href="/students/gsnestedssg/male/Mathematics"
                style={linkStyle}
              >
                /students/gsnestedssg/male/Mathematics
              </Link>
            </li>
            <li>
              <strong>Optional Catch-All Route</strong>: List students by
              optional gender and/or subject (prerendered).
              <br />
              Examples:
              <ul style={{ listStyle: "circle", paddingLeft: "20px" }}>
                <li>
                  <Link href="/students/gscatchallssg" style={linkStyle}>
                    /students/gscatchallssg
                  </Link>{" "}
                  (All students)
                </li>
                <li>
                  <Link
                    href="/students/gscatchallssg/male/Mathematics"
                    style={linkStyle}
                  >
                    /students/gscatchallssg/male/Mathematics
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </section>

        {/* ISR Section */}
        <section>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px" }}>
            Incremental Static Regeneration (ISR)
          </h2>
          <ul style={{ listStyle: "disc", paddingLeft: "20px" }}>
            <li>
              <strong>Single Prerendered URL with Regeneration</strong>: List
              all students, regenerated every 60 seconds.
              <br />
              Example:{" "}
              <Link href="/students/isr" style={linkStyle}>
                /students/isr
              </Link>
            </li>
          </ul>
        </section>

        {/* CSR Section */}
        <section>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px" }}>
            Client-Side Rendering (CSR)
          </h2>
          <ul style={{ listStyle: "disc", paddingLeft: "20px" }}>
            <li>
              <strong>Dynamic Filtering</strong>: Filter students by gender and
              subject in the browser.
              <br />
              Example:{" "}
              <Link href="/students/csr" style={linkStyle}>
                /students/csr
              </Link>
            </li>
          </ul>
        </section>
      </div>
      <footer
        style={{
          marginTop: "32px",
          marginLeft: "auto", // Changed to auto for centering
          marginRight: "auto", // Already auto, kept for clarity
          color: "#555",
          textAlign: "center", // Centers the text content
        }}
      >
        <p>
          See the{" "}
          <a
            href="https://github.com/MichaelAblerCode/nextjs_essentials_pagesrouter_rendering"
            target="_blank"
            style={linkStyle}
            rel="noopener noreferrer"
          >
            GitHub repository
          </a>{" "}
          for source code and contributions. <br />
          Copyright © 2025 Michael Abler.{" "}
          <a href="/LICENSE.md" style={linkStyle} rel="noopener noreferrer">
            LICENSE.md
          </a>{" "}
          for details.
        </p>
      </footer>
    </div>
  );
}
