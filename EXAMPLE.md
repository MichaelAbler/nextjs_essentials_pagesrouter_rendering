# Next.js Student Directory: Example Implementation

Copyright (c) 2025 Michael Abler. See [LICENSE.md](../LICENSE.md) for details.

## Introduction

This document, `EXAMPLE.md`, serves as a practical guide to the source code implementation of the Next.js Student Directory demo, which demonstrates rendering and routing techniques using the Next.js Pages Router. The demo is a companion to the theoretical guide provided in [README.MD](README.MD), which explains Server-Side Rendering (SSR), Static Site Generation (SSG), Incremental Static Regeneration (ISR), and Client-Side Rendering (CSR).

For the theoretical foundation, refer to the [README.MD](README.MD). This document focuses on how the source code implements these concepts, providing a directory structure, explanations of supporting components, build instructions, route analysis, and testing guidance.

The demo uses a mock student database and is designed for educational purposes, running locally to showcase Next.js rendering methods. No external APIs or data sources are used.

<div style="text-align: center;">
  <img src="./assets/images/index-snapshot.png" alt="Index Page Snapshot" style="display: block; margin: 0 auto; width: 600px; max-width: 100%; height: auto; border: 2px solid #000;">
  <p><i>Figure 1: Snapshot of the index page, showing the navigation hub with SSR, SSG, ISR, and CSR sections in a grid layout.</i></p>
</div>

## Prerequisites

To run the Student Directory demo, ensure you have the following:

- **Node.js**: Version 18 or higher. Install from [nodejs.org](https://nodejs.org).
- **npm**: Included with Node.js, used for dependency management.
- **Git**: To clone the repository. Install from [git-scm.com](https://git-scm.com).
- **Repository**: Clone the project using:

```bash
  git clone https://github.com/MichaelAblerCode/nextjs_essentials_pagesrouter_rendering.git
  cd next_pagesrouter_ssr_ssg_isr_csr
```

Install dependencies after cloning:

```bash
npm install
```

## Directory Structure

The project’s directory structure is organized to demonstrate Next.js rendering methods. Below is a table of key files and their roles, mapped to the corresponding sections in `README.md`.

| Path                                                   | Rendering Method | README.md Section                                                                                                   | Description                                                                |
| ------------------------------------------------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `pages/index.js`                                       | SSG              | [Section 2: SSG - Single Prerendered URL](../README.md#2-static-site-generation-ssg---single-prerendered-url)       | Navigation hub listing links to all rendering routes (SSR, SSG, ISR, CSR). |
| `pages/students/all.js`                                | SSG              | [Section 2: SSG - Single Prerendered URL](../README.md#2-static-site-generation-ssg---single-prerendered-url)       | Displays all 40 students in a table.                                       |
| `pages/students/csr.js`                                | CSR              | [Section 5: CSR](../README.md#5-client-side-rendering-csr)                                                          | Filters students by gender and subject client-side using React hooks.      |
| `pages/students/isr.js`                                | ISR              | [Section 4: ISR](../README.md#4-incremental-static-regeneration-isr)                                                | Lists all students in a four-column grid, regenerating every 60 seconds.   |
| `pages/students/idfilterssr/[ID].js`                   | SSR              | [Section 1: SSR - Dynamic URLs](../README.md#1-server-side-rendering-ssr---dynamic-urls)                            | Shows a single student’s details by ID, server-rendered on demand.         |
| `pages/students/idfilterssg/[ID].js`                   | SSG              | [Section 3: SSG - Multiple Prerendered URLs](../README.md#3-static-site-generation-ssg---multiple-prerendered-urls) | Prerenders student details for all 40 IDs.                                 |
| `pages/students/gsnestedssr/[gender]/[subject].js`     | SSR              | [Section 1: SSR - Dynamic URLs](../README.md#1-server-side-rendering-ssr---dynamic-urls)                            | Filters students by gender and subject, server-rendered.                   |
| `pages/students/gsnestedssg/[gender]/[subject].js`     | SSG              | [Section 3: SSG - Multiple Prerendered URLs](../README.md#3-static-site-generation-ssg---multiple-prerendered-urls) | Prerenders student lists for gender/subject combinations.                  |
| `pages/students/gscatchallssr/[[...gendersubject]].js` | SSR              | [Section 1: SSR - Dynamic URLs](../README.md#1-server-side-rendering-ssr---dynamic-urls)                            | Optional catch-all route for gender/subject filtering, server-rendered.    |
| `pages/students/gscatchallssg/[[...gendersubject]].js` | SSG              | [Section 3: SSG - Multiple Prerendered URLs](../README.md#3-static-site-generation-ssg---multiple-prerendered-urls) | Prerenders optional gender/subject filtering paths.                        |

The project uses a mock database (`utils/students.js`) instead of API routes or external data, keeping the focus on rendering methods.

## Mock Database and Components

The following components and data are supporting elements, not the core focus of the rendering demonstration.

### `utils/students.js`

- **Description**: A mock database containing 40 student objects (20 male, 20 female), each with properties: `firstname`, `lastname`, `gender`, `birthdate`, `studysubject` (Physics, Mathematics, Computer Science, Medicine), `city` (Munich, Vienna, Prague, Madrid, Paris, Rome), and `ID` (S001–S040).
- **Filter Functions**: Includes `filterByCity`, `filterBySubject`, `filterByGender`, `findById`, and `filterByName` for querying data.
- **Role**: Used across routes (e.g., `csr.js` for client-side filtering, `idfilterssr/[ID].js` for single student lookup).
- **Note**: The even distribution (~10 students per subject, ~6–7 per city) supports consistent filtering results.

### `components/StudentList.js`

- **Description**: A reusable React component that renders a list of students in a grid, with each student’s name and ID linking to `/students/idfilterssr/[ID]` (or `/students/idfilterssg/[ID]` for SSG routes).
- **Role**: Used in `isr.js`, `csr.js`, `gsnestedssr/[gender]/[subject].js`, and catch-all routes to display filtered students.
- **Note**: Styled with inline CSS for consistency with the project’s aesthetic.

### `components/StudentCard.js`

- **Description**: A reusable React component that displays a single student’s details (e.g., name, gender, birthdate) in a card format.
- **Role**: Used in `idfilterssr/[ID].js` and `idfilterssg/[ID].js` to show individual student information.
- **Note**: Includes a link to the student’s details page, styled with inline CSS.

These components are secondary to the core focus on rendering methods (SSR, SSG, ISR, CSR) but enable consistent UI across routes.

## Build Instructions

The project can be built and run in development or production modes to demonstrate rendering behaviors.

### Development

- **Purpose**: Run the project locally with hot reloading for development and testing.
- **Steps**:
  1. Install dependencies: `npm install`.
  2. Start the development server with Turbopack: `npm run dev --turbo`.
  3. Access the app at `http://localhost:3000`.
- **Note**: In development mode, ISR pages (e.g., `/students/isr`) regenerate on every request, not respecting the 60-second revalidation.

### Production

- **Purpose**: Build and serve the project to test production behavior, including ISR revalidation.
- **Steps**:
  1. Install dependencies: `npm install`.
  2. Build the project: `npm run build`.
  3. Start the production server: `npm run start`.
  4. Access the app at `http://localhost:3000`.
- **Note**: Production mode enables ISR revalidation (e.g., `/students/isr` regenerates every 60 seconds). The build output (below) shows prerendered and dynamic routes.

The project uses Next.js 15.3.1, React 19.0.0, and a minimal `next.config.js` with `reactStrictMode: true` for strict React behavior.

## Route Analysis

The build output (`npm run build`) lists all routes, their sizes, JavaScript requirements, and revalidation settings, showing how rendering methods from `README.md` are applied during the build. The output below mirrors the Next.js build log, followed by mappings to theoretical sections.

```bash
Route (pages)                                             Size  First Load JS  Revalidate  Expire
┌ ● /                                                  1.38 kB        95.5 kB
├   /_app                                                  0 B        91.7 kB
├ ○ /404                                               2.47 kB        94.2 kB
├ ƒ /api/hello                                             0 B        91.7 kB
├ ● /students/all                                        825 B        94.9 kB
├ ○ /students/csr                                      2.23 kB        96.3 kB
├ ● /students/gscatchallssg/[[...gendersubject]]         781 B        94.8 kB
├   ├ /students/gscatchallssg
├   ├ /students/gscatchallssg/male/Physics
├   ├ /students/gscatchallssg/male/Mathematics
├   └ [+6 more paths]
├ ƒ /students/gscatchallssr/[[...gendersubject]]         778 B        94.8 kB
├ ● /students/gsnestedssg/[gender]/[subject]             775 B        94.8 kB
├   ├ /students/gsnestedssg/male/Physics
├   ├ /students/gsnestedssg/male/Mathematics
├   ├ /students/gsnestedssg/male/Computer Science
├   └ [+5 more paths]
├ ƒ /students/gsnestedssr/[gender]/[subject]             768 B        94.8 kB
├ ● /students/idfilterssg/[ID]                           618 B        94.7 kB
├   ├ /students/idfilterssg/S001
├   ├ /students/idfilterssg/S002
├   ├ /students/idfilterssg/S003
├   └ [+37 more paths]
├ ƒ /students/idfilterssr/[ID]                           618 B        94.7 kB
└ ● /students/isr                                      1.03 kB        95.1 kB          1m      1y
+ First Load JS shared by all                            92 kB
  ├ chunks/framework-2f335d22a7318891.js               57.7 kB
  ├ chunks/main-755337d5b99a197c.js                      32 kB
  └ other shared chunks (total)                        2.32 kB

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses getStaticProps)
ƒ  (Dynamic)  server-rendered on demand
```

**Mapping to README.md Sections**:

- `/` (SSG): [Section 2: SSG - Single Prerendered URL](../README.md#2-static-site-generation-ssg---single-prerendered-url)
- `/students/all` (SSG): [Section 2: SSG - Single Prerendered URL](../README.md#2-static-site-generation-ssg---single-prerendered-url)
- `/students/csr` (Static, CSR): [Section 5: CSR](../README.md#5-client-side-rendering-csr)
- `/students/gscatchallssg/[[...gendersubject]]` (SSG): [Section 3: SSG - Multiple Prerendered URLs](../README.md#3-static-site-generation-ssg---multiple-prerendered-urls)
- `/students/gscatchallssr/[[...gendersubject]]` (SSR): [Section 1: SSR - Dynamic URLs](../README.md#1-server-side-rendering-ssr---dynamic-urls)
- `/students/gsnestedssg/[gender]/[subject]` (SSG): [Section 3: SSG - Multiple Prerendered URLs](../README.md#3-static-site-generation-ssg---multiple-prerendered-urls)
- `/students/gsnestedssr/[gender]/[subject]` (SSR): [Section 1: SSR - Dynamic URLs](../README.md#1-server-side-rendering-ssr---dynamic-urls)
- `/students/idfilterssg/[ID]` (SSG): [Section 3: SSG - Multiple Prerendered URLs](../README.md#3-static-site-generation-ssg---multiple-prerendered-urls)
- `/students/idfilterssr/[ID]` (SSR): [Section 1: SSR - Dynamic URLs](../README.md#1-server-side-rendering-ssr---dynamic-urls)
- `/students/isr` (ISR): [Section 4: ISR](../README.md#4-incremental-static-regeneration-isr)
- `/_app`, `/404`, `/api/hello` (Static/Dynamic): Not covered in `README.md` (infrastructure routes).

**Notes**:

- SSG routes (e.g., `/students/idfilterssg/[ID]`) prerender multiple paths (e.g., 40 IDs, gender/subject combinations) at build time.
- SSR routes (e.g., `/students/idfilterssr/[ID]`) render dynamically, supporting any valid ID.
- ISR (`/students/isr`) combines SSG’s static generation with periodic updates (every 60 seconds, cached for 1 year unless revalidated).

**Shared JavaScript**:

- First Load JS shared by all: 92 kB

  - `chunks/framework-2f335d22a7318891.js`: 57.7 kB
  - `chunks/main-755337d5b99a197c.js`: 32 kB
  - Other shared chunks: 2.32 kB

## Testing Instructions

This section explains how to test the demo’s functionality, starting with the navigation hub (`index.js`) and covering all routes.

### Navigation Hub (`index.js`)

- **Description**: The `index.js` page, accessible at `http://localhost:3000`, serves as the navigation hub. It displays a grid of links to all rendering routes (SSR, SSG, ISR, CSR), organized with SSR/SSG side by side (top row) and ISR/CSR side by side (bottom row). Each link demonstrates a specific rendering method.

- **Snapshot**:
<div style="text-align: center;">
  <img src="./assets/images/index-snapshot.png" alt="Index Page Snapshot" style="display: block; margin: 0 auto; width: 600px; max-width: 100%; height: auto; border: 2px solid #000;">
  <p><i>Figure 2: Snapshot of the CSR page, showing client-side filtering with dropdowns for gender and subject, and a filtered student list with blue, underlined links.</i></p>
</div>

### Steps to Test

1. **Start the Project**:
   - For development:
     ```bash
     npm run dev --turbo
     ```
   - For production (to test ISR):
     ```bash
     npm run build
     npm run start
     ```
2. **Access the Navigation Hub**:
   - Open `http://localhost:3000` in a browser.
   - Verify the grid layout and introductory link to `README.md`.
3. **Test Routes**:
   - Click each link in the navigation hub to test:
     - `/students/all`: SSG, displays all students in a table.
     - `/students/csr`: CSR, filters students by gender and subject (e.g., select “Female” and “Physics”).
     - `/students/isr`: ISR, shows all students in a four-column grid with a timestamp.
     - `/students/idfilterssr/S001`: SSR, shows Anna Schmidt’s details.
     - `/students/idfilterssg/S001`: SSG, prerendered student details.
     - `/students/gsnestedssr/female/Physics`: SSR, filtered student list.
     - `/students/gsnestedssg/male/Mathematics`: SSG, prerendered filtered list.
     - `/students/gscatchallssr`, `/students/gscatchallssr/female/physics`: SSR, all students or filter by gender/subject.
     - `/students/gscatchallssg`, `/students/gscatchallssg/male/Mathematics`: SSG, prerendered all students or filter by gender/subject.
   - Confirm each route loads correctly and displays the expected content. You can also navigate routes by typing URLs in the browser (e.g., `/students/gsnestedssr/male/Physics`, `/students/gsnestedssr/female/Medicine` ).
4. **Check for Errors**:
   - Open the browser console (F12 → Console) to ensure no rendering or hydration errors.
   - Check the terminal for server errors.

### Testing ISR

- **Note**: Incremental Static Regeneration (ISR) for `/students/isr` can only be tested in production mode (`npm run build && npm run start`). In development mode (`npm run dev`), Next.js regenerates ISR pages on every request, ignoring the 60-second revalidation setting.
- **Why**: Next.js’s development server prioritizes fast iteration, running `getStaticProps` on each request for ISR pages. In production, the page is prerendered and only regenerates after the `revalidate` interval (60 seconds for `/students/isr`), updating the timestamp and data.
- **Steps**:
  1. Run `npm run build && npm run start`.
  2. Visit `http://localhost:3000/students/isr`.
  3. Note the timestamp (e.g., “04/18/2025, 12:34:56 PM”).
  4. Refresh within 60 seconds; the timestamp should remain the same.
  5. Wait 60 seconds, refresh, and confirm the timestamp updates.
  6. Optionally, modify `utils/students.js` (e.g., change `S001`’s `firstname` to “Anne”), rebuild, wait 60 seconds, and refresh to verify the update.

## License

Copyright (c) 2025 Michael Abler. Licensed under the [Creative Commons Attribution-NonCommercial-NoDerivs 4.0 International License](https://creativecommons.org/licenses/by-nc-nd/4.0/). You may use and share this document for non-commercial purposes, provided you give appropriate credit and retain the copyright notice. No modifications or derivative works are permitted. See [LICENSE.md](../LICENSE.md) for details.
