# Next.js Essentials: Pages Router Rendering & Routing

Copyright (c) 2025 Michael Abler. See [LICENSE.md](/LICENSE.md) for details.

## Introduction

This document provides a comprehensive guide to rendering and routing in Next.js, a popular React framework for building modern web applications. It focuses on the core rendering methods—Server-Side Rendering (SSR), Static Site Generation (SSG), Incremental Static Regeneration (ISR), and Client-Side Rendering (CSR)—and their associated routing patterns, such as dynamic and prerendered URLs. By explaining key concepts, functions, and practical examples, the document equips developers with the knowledge to implement efficient and scalable page-rendering strategies in Next.js.

This document applies to the Next.js **Pages Router** (using the `pages/` directory for file-based routing). As of April 2025, the Pages Router remains relevant for maintaining and upgrading existing Next.js applications, particularly those built before the App Router’s introduction in Next.js 13. The techniques described (e.g., `getServerSideProps`, `getStaticProps`) are compatible with Next.js versions 9 through 14 and likely later, though the App Router is recommended for new projects. To explore a practical implementation of these rendering and routing techniques, see [Next.js Student Directory: Example Implementation](/EXAMPLE.md), which provides a detailed guide to the Student Directory demo’s source code, including its directory structure, build process, and route analysis. Check the official Next.js documentation for any version-specific changes. For advanced Next.js features that complement rendering and routing—such as API Routes, Middleware, Preview Mode, and Internationalized Routing—refer to the companion document ["Next.js Essentials: Pages Router Advanced Features"](https://github.com/MichaelAbler/nextjs_essentials_pagesrouter_advanced#).

### Target Audience

The document is designed for:

- **Web developers** with an **intermediate understanding of React** (e.g., components, hooks, props, async data fetching) and **basic familiarity with Next.js** (e.g., pages, file-based routing), seeking to learn or deepen their knowledge of Next.js rendering and routing.
- **Intermediate Next.js users** looking for a concise reference on rendering methods, dynamic routes, and best practices.
- **Technical leads or architects** with React and Next.js experience, evaluating rendering strategies for performance, SEO, and scalability in Next.js projects.

Familiarity with React components, asynchronous JavaScript (e.g., `async/await`), and basic Next.js concepts (e.g., pages, routing) is assumed. Beginners new to Next.js or React may benefit from reviewing the official Next.js and React documentation for foundational concepts before diving in.

### Purpose and Motivation

Next.js’s rendering methods (SSR, SSG, ISR, CSR) and routing patterns (static, dynamic, catch-all routes) are often explained in isolation, obscuring their connections. This document addresses this by providing a unified, comprehensive overview, consolidating all key implementation patterns—like `getServerSideProps` for dynamic URLs and `getStaticPaths` with `getStaticProps` for prerendered routes—in one place. Through clear, integrated explanations, it reveals the simplicity of Next.js’s approach. It offers:

- **Holistic clarity**: Full coverage of rendering, routing, and patterns (e.g., ISR with catch-all routes).
- **Decision-making guidance**: Comparisons to select optimal methods for performance, SEO, and data freshness.
- **Actionable insights**: Best practices for blogs, e-commerce, and dashboards.

This guide equips developers to build scalable Next.js applications confidently. For advanced features like API Routes, see ["Next.js Essentials: Pages Router Advanced Features"](https://github.com/MichaelAbler/nextjs_essentials_pagesrouter_advanced#).

# Table of Contents

1. [Server-Side Rendering (SSR) - Dynamic URLs](#1-server-side-rendering-ssr---dynamic-urls)
2. [Static Site Generation (SSG) - Single Prerendered URL](#2-static-site-generation-ssg---single-prerendered-url)
3. [Static Site Generation (SSG) - Multiple Prerendered URLs](#3-static-site-generation-ssg---multiple-prerendered-urls)
4. [Incremental Static Regeneration (ISR)](#4-incremental-static-regeneration-isr)
5. [Client-Side Rendering (CSR)](#5-client-side-rendering-csr)
6. [Comparison of Rendering Methods](#6-comparison-of-rendering-methods)
7. [Client-Side Routing with next/router](#7-client-side-routing-with-nextrouter)
   - [7.1 The useRouter Hook](#71-the-userouter-hook)
   - [7.2 Programmatic Navigation](#72-programmatic-navigation)
   - [7.3 Route Change Events](#73-route-change-events)
   - [7.4 Dynamic Route Preloading](#74-dynamic-route-preloading)
   - [7.5 Client-Side Navigation Optimizations](#75-client-side-navigation-optimizations)
   - [7.6 The Link Component](#76-the-link-component)
   - [7.7 Best Practices for next/router](#77-best-practices-for-nextrouter)
   - [7.8 Use Cases in Context](#78-use-cases-in-context)
8. [Customizing Application and Asset Handling](#8-customizing-application-and-asset-handling)
   - [8.1 Customizing \_document.js](#81-customizing-_documentjs)
   - [8.2 Customizing \_app.js](#82-customizing-_appjs)
   - [8.3 Image Optimization with next/image](#83-image-optimization-with-nextimage)
   - [8.4 Static File Serving](#84-static-file-serving)
   - [8.5 Best Practices for Application and Asset Handling](#85-best-practices-for-application-and-asset-handling)
   - [8.6 Use Cases in Context](#86-use-cases-in-context)

## 1. Server-Side Rendering (SSR) - Dynamic URLs

Dynamic URLs are defined by folder and file names, where file names in square brackets (e.g., `[slug].js`) act as variables. Next.js supports single dynamic parameters, nested dynamic routes, and catch-all routes for flexible URL handling.

**Function Used:**

```javascript
export async function getServerSideProps({ params })
```

- **Input:**
  - `{ params }`: An object containing the dynamic URL parameters.
    - For a file `[slug].js`, `params.slug` holds the URL segment value (e.g., `params.slug = 'post-1'` for `/post-1`).
    - For a nested route `[category]/[id].js`, `params` contains multiple properties (e.g., `params = { category: 'electronics', id: '123' }` for `/electronics/123`).
    - For a catch-all route `[...category].js`, `params.category` is an array of URL segments (e.g., `params.category = ['electronics', 'phones']` for `/electronics/phones`).
    - For an optional catch-all route `[[...category]].js`, `params.category` is either `undefined` for the root path (e.g., `/`) or an array for nested paths (e.g., `params.category = ['electronics', 'phones']` for `/electronics/phones`).
- **Output:**

  - `{ props }`: An object whose properties are passed to the page component.

- **Use Case:**
  - Pages that require real-time data fetching on each request, such as user-specific content, frequently updated pages, or complex routing scenarios like documentation or category pages.

**Examples:**

- **Single Dynamic Route:**

  ```javascript
  // pages/[slug].js
  export async function getServerSideProps({ params }) {
    const data = await fetchData(params.slug);
    return { props: { data } };
  }
  ```

- **Nested Dynamic Route:**

  ```javascript
  // pages/[category]/[id].js
  export async function getServerSideProps({ params }) {
    const data = await fetchData(params.category, params.id);
    return { props: { data } };
  }
  ```

- **Catch-All Route:**

  ```javascript
  // pages/[...category].js
  export async function getServerSideProps({ params }) {
    const data = await fetchData(params.category); // e.g., ['electronics', 'phones']
    return { props: { data } };
  }
  ```

- **Optional Catch-All Route:**

  ```javascript
  // pages/[...category].js
  export async function getServerSideProps({ params }) {
    const data = await fetchData(params.category); // e.g., ['electronics', 'phones']
    return { props: { data } };
  }
  ```

## 2. Static Site Generation (SSG) - Single Prerendered URL

Static pages are prerendered at build time for a single, fixed URL defined by the folder and file name (e.g., `about.js`).

**Function Used:**

```javascript
export async function getStaticProps()
```

- **Input:**

  - None. Data is fetched during the build process to render the page.

- **Output:**

  - `{ props }`: An object whose properties are passed to the page component.

- **Use Case:**
  - Pages with content that doesn’t change often, such as marketing pages or blog posts.

**Example:**

```javascript
// pages/about.js
export async function getStaticProps() {
  const data = await fetchData();
  return { props: { data } };
}
```

## 3. Static Site Generation (SSG) - Multiple Prerendered URLs

Dynamic routes with multiple prerendered pages are defined using placeholders (e.g., `[id].js`) and require specifying which paths to prerender. Next.js supports single dynamic parameters, nested dynamic routes, and catch-all routes for flexible static generation.

**Functions Used:**

```javascript
export async function getStaticPaths()
```

- **Input:**

  - None.

- **Output:**
  - `{ paths, fallback }`:
    - `paths`: An array of objects defining the dynamic parameter values to prerender.
      - For `[id].js`, e.g., `{ params: { id: '1' } }`.
      - For `[category]/[id].js`, e.g., `{ params: { category: 'electronics', id: '123' } }`.
      - For `[...category].js` or `[[...category]].js`, e.g., `{ params: { category: ['electronics', 'phones'] } }` or `{ params: { category: undefined } }` for the root path in optional catch-all routes.
      - The `paths` array supplies `params` to `getStaticProps` for fetching page data. `getStaticPaths` requires `getStaticProps` to provide props to the page component, similar to how standalone `getStaticProps` or `getServerSideProps` props are delivered to the page component.
    - `fallback`: Controls how Next.js handles requests for paths not prerendered at build time:
      - `false`: Returns a 404 error for unknown paths.
      - `true`: Serves a fallback UI (e.g., "Loading...") immediately while generating the page in the background with `getStaticProps`. The page replaces the fallback UI once ready (requires client-side JavaScript). Generated pages are cached.
      - `'blocking'`: Waits to serve the full page until `getStaticProps` completes, showing no fallback UI. Generated pages are cached.
    - **Key Notes on Fallback**:
      - For `fallback: true`, implement a fallback UI in the page component using `router.isFallback` (e.g., `if (router.isFallback) return <div>Loading...</div>`).
      - For `fallback: 'blocking'`, no fallback UI is needed, but users may wait longer.
      - Use `true` for fast responses with a loading state (e.g., e-commerce). Use `'blocking'` for complete pages (e.g., SEO-critical sites).

**Purpose:**
Designates dynamic URLs for prerendering during build time in static generation.

```javascript
export async function getStaticProps({ params })
```

- **Input:**

  - `{ params }`: An object containing the dynamic URL parameters.
    - For `[id].js`, `params.id` holds the value (e.g., `params.id = '1'`).
    - For `[category]/[id].js`, `params` contains multiple properties (e.g., `params = { category: 'electronics', id: '123' }`).
    - For `[...category].js`, `params.category` is an array (e.g., `params.category = ['electronics', 'phones']`).
    - For `[[...category]].js`, `params.category` is `undefined` for the root path or an array for nested paths.

- **Output:**
  - `{ props }`: An object whose properties are passed to the page component.

**Purpose:**
Fetches data for each prerendered page based on the `params`.

**Use Case:**
Pages with dynamic routes (e.g., blog posts, product pages, or documentation) that can be prerendered at build time.

### SSG Fallback and SSR Similarity

When handling non-prerendered paths, SSG with fallback options mimics aspects of Server-Side Rendering (SSR). With fallback: 'blocking', SSG closely resembles SSR by delaying the response until the page is fully generated, serving complete HTML without client-side JavaScript, though it caches the result unlike SSR’s per-request rendering. In contrast, fallback: true prioritizes a fast fallback UI, requiring client-side JavaScript to swap in the content, making it less like SSR. The table below compares these behaviors, highlighting how fallback: 'blocking' aligns more with SSR’s server-driven approach.

| Aspect                     | SSR (`getServerSideProps`)             | `fallback: true`                      | `fallback: 'blocking'`            |
| -------------------------- | -------------------------------------- | ------------------------------------- | --------------------------------- |
| **Rendering Time**         | At request time                        | At request time (background)          | At request time (before response) |
| **Initial Response**       | Full HTML, delayed                     | Fallback UI, immediate                | Full HTML, delayed                |
| **Client-Side JavaScript** | Not required for initial render        | Required to swap fallback to content  | Not required for initial render   |
| **Caching**                | No caching (regenerates every request) | Caches generated page                 | Caches generated page             |
| **User Experience**        | Wait for full page                     | Immediate loading state, then content | Wait for full page                |
| **SEO**                    | Full HTML served directly              | Fallback UI (handled for crawlers)    | Full HTML served directly         |

**Examples:**

- **Single Dynamic Route:**

  ```javascript
  // pages/posts/[id].js
  export async function getStaticPaths() {
    const paths = [{ params: { id: "1" } }, { params: { id: "2" } }];
    return { paths, fallback: false };
  }

  export async function getStaticProps({ params }) {
    const data = await fetchData(params.id);
    return { props: { data } };
  }
  ```

- **Nested Dynamic Route:**

  ```javascript
  // pages/[category]/[id].js
  export async function getStaticPaths() {
    const paths = [{ params: { category: "electronics", id: "123" } }];
    return { paths, fallback: false };
  }

  export async function getStaticProps({ params }) {
    const data = await fetchData(params.category, params.id);
    return { props: { data } };
  }
  ```

- **Catch-All Route:**

  ```javascript
  // pages/[...category].js
  export async function getStaticPaths() {
    const paths = [{ params: { category: ["electronics", "phones"] } }];
    return { paths, fallback: false };
  }

  export async function getStaticProps({ params }) {
    const data = await fetchData(params.category);
    return { props: { data } };
  }
  ```

- **Optional Catch-All Route:**

  ```javascript
  // pages/[[...category]].js
  export async function getStaticPaths() {
    const paths = [
      { params: { category: undefined } }, // Root path
      { params: { category: ["electronics", "phones"] } },
    ];
    return { paths, fallback: false };
  }

  export async function getStaticProps({ params }) {
    const category = params?.category || []; // Handle root path or array
    const data = await fetchData(category);
    return { props: { data } };
  }
  ```

## 4. Incremental Static Regeneration (ISR)

ISR extends SSG (applies to both single and multiple prerendered URLs) by allowing pages to be regenerated in the background after a specified time interval, without requiring a full rebuild.

**Function Used:**

```javascript
export async function getStaticProps()
```

- **Input:**

  - None for single static URLs, or `{ params }` for dynamic routes (same as SSG).

- **Output:**
  - `{ props, revalidate }`:
    - `props`: An object whose properties are passed to the page component.
    - `revalidate`: A number (in seconds) after which `getStaticProps` is rerun to regenerate the page.

**Use Case:**
Pages with static content that needs periodic updates, such as news articles or product listings.

**Example:**

```javascript
// pages/news.js
export async function getStaticProps() {
  const data = await fetchData();
  return {
    props: { data },
    revalidate: 60, // Regenerate every 60 seconds
  };
}
```

## 5. Client-Side Rendering (CSR)

Pages or components fetch data in the browser using client-side JavaScript, typically with React hooks or libraries like SWR.

**Function Used:**

- None (uses client-side APIs like `fetch` or libraries in `useEffect`).

- **Input:** None (data fetching occurs after the page loads in the browser).
- **Output:** None (data is managed in component state).
- **Use Case:** Dynamic, user-specific content like dashboards or real-time feeds.

**Example:**

```javascript
// pages/dashboard.js
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return <div>{data ? data.message : "Loading..."}</div>;
}
```

## 6. Comparison of Rendering Methods

Choosing the right rendering method in Next.js depends on factors like performance, SEO requirements, data freshness, and development complexity. Below is a brief comparison of **Server-Side Rendering (SSR)**, **Static Site Generation (SSG)**, **Incremental Static Regeneration (ISR)**, and **Client-Side Rendering (CSR)** to guide decision-making.

| **Factor**             | **SSR**                                                               | **SSG**                                                                                                                                     | **ISR**                                                               | **CSR**                                                             |
| ---------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **Rendering Location** | Server (on each request)                                              | Build time (static HTML; dynamic routes only with fallback)                                                                                 | Build time + on-demand regeneration                                   | Browser (client-side JavaScript)                                    |
| **Performance**        | Slower initial load (server processing per request); good for SEO     | Fastest initial load (prebuilt HTML); dynamic routes only with fallback may involve on-demand generation; excellent for SEO                 | Fast initial load (like SSG); periodic updates maintain freshness     | Slower initial load (requires client-side fetching); SEO challenges |
| **Data Freshness**     | Real-time (fetched on every request)                                  | Static (data fixed at build time; dynamic routes only with fallback can generate on-demand)                                                 | Periodic updates (regenerates after `revalidate` interval)            | Real-time (fetched in browser)                                      |
| **SEO**                | Excellent (fully rendered HTML)                                       | Excellent (fully rendered HTML; dynamic routes only with fallback handled for crawlers)                                                     | Excellent (fully rendered HTML)                                       | Poor (requires JavaScript execution; needs prerendering for SEO)    |
| **Server Load**        | High (processes every request)                                        | Low (serves static files; dynamic routes only with fallback may trigger on-demand generation)                                               | Low (serves static files, occasional regeneration)                    | Low (data fetching offloaded to client)                             |
| **Use Case**           | User-specific or frequently updated content (e.g., dashboards, feeds) | Static or dynamic content (e.g., blogs, e-commerce with dynamic routes only with fallback)                                                  | Static content with periodic updates (e.g., news, product listings)   | Dynamic, user-specific content (e.g., real-time dashboards)         |
| **Complexity**         | Moderate (requires server-side logic)                                 | Simple (build-time data fetching; dynamic routes only with fallback add slight complexity)                                                  | Moderate (build-time + regeneration logic)                            | Moderate (client-side state management)                             |
| **Trade-Offs**         | Slower load times but ensures fresh data; higher server costs         | Fastest and cheapest for static pages; dynamic routes only with fallback enable dynamic paths but may add latency or client-side JavaScript | Balances speed and freshness but requires careful `revalidate` tuning | Flexible for dynamic data but poor SEO and initial load performance |

**When to Choose**:

- **SSR**: Use for pages requiring real-time data or user-specific content, where SEO is critical (e.g., e-commerce product pages, personalized feeds).
- **SSG**: Ideal for content that rarely changes, prioritizing performance and low server costs (e.g., blog posts, documentation).
- **ISR**: Best for static content needing occasional updates without rebuilding the entire site (e.g., news articles, product catalogs).
- **CSR**: Suitable for highly dynamic, user-specific interfaces where SEO is less critical (e.g., admin dashboards, real-time apps).

**Note**: You can combine methods within a Next.js app (e.g., SSG for marketing pages, SSR for user profiles, CSR for dashboards) to optimize performance and functionality.

## 7. Client-Side Routing with next/router

The `next/router` module powers client-side navigation, dynamic route handling, and URL manipulation in Next.js Pages Router applications. It enables seamless page transitions, programmatic redirects, and access to route parameters or query strings without full page reloads, complementing the server-side rendering methods (SSR, SSG, ISR) and routing patterns (dynamic, static, catch-all) covered in Sections 1–6. This chapter explores `next/router`’s core features—such as the `useRouter` hook, navigation methods, route events, and performance optimizations like dynamic route preloading and shallow routing—through practical examples and best practices.

### 7.1 The useRouter Hook

The `useRouter` hook provides access to the router object in functional components, enabling navigation, parameter retrieval, and route state management. It exposes properties like `pathname` (e.g., `/posts/[id]`), `query` (dynamic parameters and query strings), `asPath` (full URL), and methods like `push`, `replace`, and `prefetch`.

**Key Properties and Methods:**

- `router.pathname`: The current route’s template (e.g., `/posts/[id]`).
- `router.query`: Dynamic parameters (e.g., `{ id: '1' }` for `/posts/1`) and query strings (e.g., `{ tab: 'comments' }` for `?tab=comments`).
- `router.asPath`: The browser’s URL, including query strings (e.g., `/posts/1?tab=comments`).
- `router.push(url, as, options)`: Navigates to a new page, adding to history.
- `router.replace(url, as, options)`: Navigates, replacing the current history entry.
- `router.prefetch(url)`: Preloads a page’s assets for faster navigation.
- `router.isFallback`: Indicates if a fallback page is rendering (SSG with `fallback: true`, see [Section 3](#3-static-site-generation-ssg---multiple-prerendered-urls)).

**Example: Accessing Parameters and Redirecting**

```javascript
// pages/posts/[id].js
import { useRouter } from "next/router";

export default function Post() {
  const router = useRouter();
  const { id } = router.query;

  // Redirect to homepage if no ID
  if (!id && !router.isFallback) {
    router.push("/");
    return null;
  }

  return <h1>Post ID: {id}</h1>;
}
```

- **Notes:**
- `router.query` may be empty during initial render before hydration. Use `router.isReady` or optional chaining (`router.query?.id`) for safety.
- `router.isFallback` is relevant for SSG dynamic routes with fallback: true ([see Section3](#3-static-site-generation-ssg---multiple-prerendered-urls)).

### 7.2 Programmatic Navigation

Programmatic navigation allows developers to redirect users or update URLs using router.push or router.replace. It supports static routes, dynamic routes (e.g., `/posts/[id]`), and query-based URLs, with options like shallow routing to optimize performance.

**Example: Navigating to a Dynamic Route**

```javascript
// pages/index.js
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const goToPost = (id) => {
    router.push(`/posts/${id}`); // Navigate to /posts/1
    // OR: router.push({ pathname: "/posts/[id]", query: { id } });
  };

  return <button onClick={() => goToPost(1)}>View Post 1</button>;
}
```

**Example: Shallow Routing for Query Updates**

```javascript
// pages/search.js
import { useRouter } from "next/router";

export default function Search() {
  const router = useRouter();
  const { query } = router.query;

  const updateSearch = (newQuery) => {
    router.push(
      { pathname: "/search", query: { query: newQuery } },
      undefined,
      { shallow: true } // Avoids re-running getServerSideProps
    );
  };

  return (
    <div>
      <input
        type="text"
        onChange={(e) => updateSearch(e.target.value)}
        placeholder="Search..."
      />
      <p>Current Query: {query || "None"}</p>
    </div>
  );
}
```

**Notes:**

- Use `router.push` for navigations added to history (e.g., user clicks). Use `router.replace` for redirects that replace history (e.g., post-login).
- Shallow routing (`shallow: true`) updates the URL without triggering server-side data fetching, ideal for filters or pagination (see [Section 7.5](#75-client-side-navigation-optimizations)).

### 7.3 Route Change Events

Route change events allow developers to listen to navigation lifecycle events (e.g., routeChangeStart, routeChangeComplete) to manage loading states, analytics, or cleanup. These events are client-side only and integrate with \_app.js (see [Section 8.2](#82-customizing-_appjs)).

**Key Events:**

- `routeChangeStart(url):` Fired when navigation begins.
- `routeChangeComplete(url):` Fired when navigation completes.
- `routeChangeError(err, url):` Fired if navigation fails.
- `beforeHistoryChange(url):` Fired before history updates.

**Example: Loading State**

```javascript
// pages/_app.js
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.events]);

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      <Component {...pageProps} />
    </div>
  );
}
```

**Notes:**

- Clean up event listeners in `useEffect` to prevent memory leaks.
- This complements [Section 8.2](#82-customizing-_appjs)’s discussion of `_app.js` for global behavior.

### 7.4 Dynamic Route Preloading

Dynamic route preloading proactively loads JavaScript bundles and data for dynamic routes (e.g., /posts/[id], [...category].js) to reduce navigation latency. Next.js supports automatic prefetching for `<Link>` components and manual prefetching via router.prefetch.

Key Features:

- **Automatic Prefetching:** In production, Next.js prefetches <Link> hrefs in the viewport (e.g., `<Link href="/posts/1">`).
- **Manual Prefetching:** Use `router.prefetch(url)` for dynamic routes based on user behavior or API data.
- **SSG Integration:** Preloading supports SSG fallback pages (fallback: true or 'blocking', see [Section 3](#3-static-site-generation-ssg---multiple-prerendered-urls)).

**Example: Preloading Dynamic Routes**

```javascript
// pages/index.js
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home({ postIds }) {
  const router = useRouter();

  useEffect(() => {
    // Preload dynamic routes
    postIds.forEach((id) => router.prefetch(`/posts/${id}`));
  }, [router, postIds]);

  return (
    <div>
      {postIds.map((id) => (
        <Link key={id} href={`/posts/${id}`}>
          Post {id}
        </Link>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const postIds = ["1", "2", "3"]; // Example: Fetch from API
  return { props: { postIds } };
}
```

**Notes:**

- Prefetch only high-priority routes to balance bandwidth and performance.
- For SSG, prefetching reduces latency for non-prerendered paths by preparing fallback pages.
- Automatic prefetching is disabled in development mode.

### 7.5 Client-Side Navigation Optimizations

Client-side navigation optimizations enhance performance and responsiveness during navigation, leveraging `next/router` features and Next.js’s architecture. Key techniques include shallow routing, code splitting, caching, and progressive hydration, which minimize latency and server load.

**Key Techniques:**

- **Shallow Routing**: Updates query parameters without re-running `getServerSideProps` or `getStaticProps`, ideal for filters or pagination.
- **Code Splitting**: Uses `next/dynamic` to lazy-load components, reducing bundle sizes for dynamic routes.
- **Caching**: Next.js caches SSG fallback pages or ISR responses for faster subsequent navigations.
- **Progressive Hydration**: Incrementally hydrates SSR/SSG pages, improving interactivity during navigation.

**Example: Shallow Routing for Pagination**

```javascript
// pages/blog.js
import { useRouter } from "next/router";

export default function Blog() {
  const router = useRouter();
  const { page = "1" } = router.query;

  const goToPage = (newPage) => {
    router.push({ pathname: "/blog", query: { page: newPage } }, undefined, {
      shallow: true,
    });
  };

  return (
    <div>
      <p>Current Page: {page}</p>
      <button onClick={() => goToPage(Number(page) + 1)}>Next Page</button>
    </div>
  );
}
```

**Example: Code Splitting with `next/dynamic`**

```javascript
// pages/posts/[id].js
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(
  () => import("../../components/HeavyComponent"),
  {
    loading: () => <p>Loading...</p>,
  }
);

export default function Post({ data }) {
  return (
    <div>
      <h1>Post</h1>
      <HeavyComponent data={data} />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const data = await fetchData(params.id);
  return { props: { data } };
}
```

**Notes:**

- Shallow routing is ideal for SSR or ISR pages with frequent query updates (see [Section 7.2](#72-programmatic-navigation)).
- Code splitting reduces initial load times for complex pages or dynamic routes.
- Progressive hydration is automatic in Next.js but benefits from optimized component design.

### 7.6 The Link Component

**Purpose:** The `next/link` component enables client-side navigation in Next.js Pages Router applications, allowing seamless transitions between pages without full page reloads. It integrates with `next/router` (see Sections [7.1](#71-the-userouter-hook)–[7.5](#75-client-side-navigation-optimizations)) to support static, dynamic, and catch-all routes, enhancing performance through automatic prefetching and compatibility with all rendering methods (SSR, SSG, ISR, CSR).

**Key Features:**

- **Client-Side Transitions:** Wraps anchor tags (`<a>`) to handle navigation via JavaScript, preserving application state and avoiding server requests.
- **Automatic Prefetching:** In production, `Link` prefetches page assets (JavaScript bundles, `getStaticProps`/`getServerSideProps` data) for routes in the viewport, reducing navigation latency (see [Section 7.4](#74-dynamic-route-preloading)).
- **Dynamic Route Support:** Handles parameterized URLs (e.g., `/posts/[id]`) using `href` and `as` props for clean URL rendering.
- **Customization:** Supports props like `replace`, `scroll`, and `prefetch` to control navigation behavior.

**Key Props:**

- `href`: The route path or object (e.g., `/about` or `{ pathname: '/posts/[id]', query: { id: '1' } }`).
- `as`: (Optional) The URL shown in the browser for dynamic routes (e.g., `/posts/1`).
- `replace`: (Boolean) Replaces history instead of pushing (like `router.replace`, see [Section 7.2](#72-programmatic-navigation)).
- `prefetch`: (Boolean) Enables/disables prefetching (default: `true` in production).
- `scroll`: (Boolean) Controls scrolling to the top on navigation (default: `true`).

**Use Case:**

- Navigating between static pages (e.g., homepage to about page).
- Linking to dynamic routes (e.g., blog posts, product pages) with parameters.
- Optimizing navigation performance in SSG or ISR apps via prefetching.

**Examples:**

**Static Route Navigation:**

```javascript
// components/Nav.js
import Link from "next/link";

export default function Nav() {
  return (
    <nav>
      <Link href="/about">
        <a>About</a>
      </Link>
      <Link href="/contact">
        <a>Contact</a>
      </Link>
    </nav>
  );
}
```

**Dynamic Route Navigation:**

```javascript
// pages/index.js
import Link from "next/link";

export default function Home({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/posts/${post.id}`}>
            <a>{post.title}</a>
          </Link>
          {/* OR: Using href/as for legacy dynamic routes */}
          <Link href="/posts/[id]" as={`/posts/${post.id}`}>
            <a>{post.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const posts = await fetchPosts(); // Example: [{ id: "1", title: "Post 1" }]
  return { props: { posts } };
}
```

**Disabling Prefetching:**

```javascript
// pages/index.js
import Link from "next/link";

export default function Home() {
  return (
    <Link href="/low-priority-page" prefetch={false}>
      <a>Low Priority Page</a>
    </Link>
  );
}
```

**Notes:**

- Always wrap an `<a>` tag inside `Link` for accessibility and SEO, as `Link` does not render an anchor tag itself.
- For dynamic routes, `href="/posts/[id]"` with `as="/posts/1"` is optional in modern Next.js; `href="/posts/1"` is simpler and sufficient.
- Prefetching is automatic in production for `Link` components in the viewport but disabled in development to reduce noise.
- Use `replace` for redirects (e.g., post-login) to avoid cluttering browser history.
- For SSG with `fallback: true` or `'blocking'` (see [Section 3](#3-static-site-generation-ssg---multiple-prerendered-urls)), `Link` ensures fallback pages load efficiently by prefetching necessary assets.

**Best Practices:**

- Use `Link` instead of `<a href>` for internal navigation to leverage client-side routing and prefetching.
- Minimize prefetching for low-priority routes by setting `prefetch={false}` to optimize bandwidth.
- Ensure `<a>` tags inside `Link` include meaningful `aria-label` or text for screen readers.
- Test `Link` behavior with JavaScript disabled to verify SSR/SSG compatibility (see [Section 6](#6-comparison-of-rendering-methods)).
- Combine `Link` with `router.prefetch` ([Section 7.4](#74-dynamic-route-preloading)) for programmatically preloading dynamic routes not in the viewport.

**Use Cases in Context:**

- **Blog Navigation:** Use `Link` for navigating to SSG blog posts (`/posts/[id]`) with prefetching for fast transitions.
- **E-commerce:** Link to product pages (`/products/[id]`) with dynamic routes, using `replace` for redirecting invalid IDs.
- **Dashboard Menus:** Use `Link` in CSR dashboards for navigating between user-specific pages, disabling prefetching for rarely accessed routes.

### 7.7 Best Practices for next/router

- **Handle Hydration Safely**: Use `router.isReady` or optional chaining (`router.query?.id`) to avoid undefined values before hydration.
- **Optimize Shallow Routing**: Apply `shallow: true` for query-based interactions to minimize server load, especially in SSR or ISR (see [Section 7.2](#72-programmatic-navigation)).
- **Clean Up Event Listeners**: Remove `router.events` listeners in `useEffect` cleanup to prevent memory leaks.
- **Prioritize Prefetching**: Prefetch high-traffic dynamic routes (e.g., popular posts) to balance bandwidth and latency (see [Section 7.4](#74-dynamic-route-preloading)).
- **Leverage Code Splitting**: Use `next/dynamic` for heavy components in dynamic routes to reduce bundle sizes (see [Section 7.5](#75-client-side-navigation-optimizations)).
- **Test Navigation**: Verify client-side navigation with JavaScript disabled to ensure SSR/SSG compatibility (see [Section 6](#6-comparison-of-rendering-methods)).
- **Use TypeScript**: Define types for `router.query` (e.g., `interface Query { id?: string }`) to catch errors early.

### 7.8 Use Cases in Context

- **Dynamic Filtering**: Use shallow routing to update query parameters for search filters in e-commerce (e.g., `/products?category=electronics`, [Section 7.5](#75-client-side-navigation-optimizations)).
- **Conditional Redirects**: Redirect users in `[id].js` if `router.query.id` is invalid, complementing SSR validation ([Section 1](#1-server-side-rendering-ssr---dynamic-urls)).
- **Loading States**: Show spinners during navigation for dynamic routes (e.g., `[...category].js`) using `router.events` ([Section 7.3](#73-route-change-events)).
- **Preloading Products**: Prefetch product pages (`/products/[id]`) in an e-commerce app for faster navigation ([Section 7.4](#74-dynamic-route-preloading)).
- **Pagination**: Implement next/previous buttons with shallow routing for blog lists (SSG or ISR, [Section 7.5](#75-client-side-navigation-optimizations)).
- **Lazy-Loading Dashboards**: Use `next/dynamic` for CSR dashboards to optimize dynamic route navigation ([Section 7.5](#75-client-side-navigation-optimizations)).

## 8. Customizing Application and Asset Handling

In the Next.js Pages Router, `_document.js` and `_app.js` are special files that allow developers to customize the application’s HTML structure and global behavior. These files are critical for configuring rendering output, managing global state, and ensuring consistent behavior across pages and routes. This section explains their roles, use cases, and practical examples, complementing the rendering methods (SSR, SSG, ISR, CSR) and routing patterns (dynamic, static, catch-all) discussed earlier.

### 8.1 Customizing \_document.js

**Purpose:** `_document.js` customizes the HTML document structure (`<html>`, `<head>`, `<body>`) for all pages rendered by Next.js, affecting SSR, SSG, and ISR output. It runs on the server during initial rendering (and on the client for hydration in some cases), making it ideal for adding global `<meta>` tags, scripts, or custom attributes.

**Key Features:**

- Extends the `Document` class to override the default HTML structure.

- Used for server-side modifications, such as adding language attributes (`<html lang="en">`) or third-party scripts (e.g., Google Analytics).

- Does not support client-side interactivity (e.g., useState, useEffect), as it primarily runs on the server.

**Use Case:**

- Adding SEO metadata (e.g., Open Graph tags) for all pages.

- Including global scripts or styles (e.g., analytics, fonts).

- Customizing the `<body>` or `<html>` attributes for accessibility or localization.

**Example:**

```javascript
// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="A Next.js application" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto"
        />
        {/* Example: Google Analytics script */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXX-Y"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'UA-XXXXX-Y');
            `,
          }}
        />
      </Head>
      <body className="custom-theme">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

**Notes:**

- Place `<meta>` tags and scripts in `<Head>` to ensure they appear in the document’s `<head>`.
- Use `dangerouslySetInnerHTML` cautiously for scripts to avoid XSS vulnerabilities.
- `\_document.js` affects all rendering methods (SSR, SSG, ISR) but is not re-rendered on client-side navigation.

### 8.2 Customizing \_app.js

**Purpose:** `_app.js` customizes the application’s page initialization and rendering process by wrapping every page component. It runs on both the server (for SSR, SSG, ISR) and the client (for CSR and hydration), making it ideal for global layouts, state management, or route transition logic.

**Key Features:**

- Extends the `App` component to override the default page rendering behavior.
- Supports global layouts, CSS imports, and providers (e.g., Redux, ThemeProvider).
- Enables client-side logic, such as handling route changes with `Router.events` or persisting state across pages.
- Receives `Component` (the page component) and `pageProps` (props from `getServerSideProps`, `getStaticProps`, etc.) as props.

**Use Case:**

- Applying a consistent layout across all pages (e.g., navbar, footer).
- Setting up global state management (e.g., Redux, Context API).
- Adding global styles or CSS frameworks (e.g., Tailwind CSS).
- Tracking page views or handling loading states during route transitions.

**Example:**

```javascript
// pages/_app.js
import "../styles/globals.css"; // Global styles
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../components/Layout"; // Custom layout component
import { ThemeProvider } from "styled-components";

const theme = { colors: { primary: "#0070f3" } };

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Example: Track page views on route change
  useEffect(() => {
    const handleRouteChange = (url) => {
      console.log(`Navigated to: ${url}`);
      // Example: Send to analytics
      window.gtag("event", "page_view", { page_path: url });
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
```

**Notes:**

- Import global CSS only in `_app.js`, as Next.js restricts CSS imports in other files to avoid side effects.
- Use `Layout` components to wrap `Component` for consistent UI across routes.
- `pageProps` includes data from `getServerSideProps`, `getStaticProps`, or `getInitialProps`, making it a central hub for passing props to pages.
- Avoid heavy logic in `_app.js` to prevent performance bottlenecks.

### 8.3 Image Optimization with next/image

**Purpose:** The `next/image` component optimizes image delivery in Next.js Pages Router applications, enhancing performance, SEO, and user experience across all rendering methods (SSR, SSG, ISR, CSR). It provides automatic lazy loading, responsive sizing, and format optimization (e.g., WebP), reducing bandwidth usage and improving page load times.

**Key Features:**

- **Automatic Optimization:** Converts images to modern formats (e.g., WebP when supported) and generates multiple resolutions for responsive layouts.
- **Lazy Loading:** Defers offscreen image loading until they enter the viewport, improving initial page load performance.
- **Responsive Images:** Supports `sizes` and `srcSet` for serving appropriately sized images based on device and viewport.
- **Placeholder Support:** Offers blur-up placeholders or empty placeholders for smoother visual loading.
- **Integration with Rendering Methods:** Works seamlessly with SSR, SSG, ISR, and CSR, optimizing images for static and dynamic pages.

**Key Props:**

- `src`: The image source (e.g., `/images/photo.jpg` for static files in `/public`, or an external URL).
- `alt`: Descriptive text for accessibility and SEO (required).
- `width` and `height`: Intrinsic dimensions to prevent layout shift (required for static images, optional for `layout="fill"`).
- `layout`: Controls rendering behavior (e.g., `fixed`, `intrinsic`, `responsive`, `fill`; default: `intrinsic` in Pages Router).
- `sizes`: A hint for responsive image widths (e.g., `100vw` or `50vw`) to optimize `srcSet`.
- `placeholder`: Enables blur-up (`blur`) or empty (`empty`) placeholders (requires `blurDataURL` for blur).
- `quality`: Controls compression level (1–100, default: 75).

**Use Case:**

- Displaying optimized product images in e-commerce apps (SSR or ISR).
- Rendering blog post images with lazy loading in SSG pages.
- Including responsive hero images in marketing pages (SSG or CSR).

**Examples:**

- **Static Image with Responsive Layout:**

```javascript
// pages/about.js
import Image from "next/image";

export default function About() {
  return (
    <div>
      <h1>About Us</h1>
      <Image
        src="/images/team.jpg"
        alt="Our team"
        width={800}
        height={600}
        layout="responsive"
        placeholder="blur"
      />
    </div>
  );
}
```

- **External Image with Fixed Layout:**

```javascript
// pages/post/[id].js
import Image from "next/image";

export default function Post({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <Image
        src={post.imageUrl}
        alt={post.title}
        width={400}
        height={300}
        layout="fixed"
        quality={80}
      />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const post = await fetchPost(params.id); // Example: { title, imageUrl }
  return { props: { post } };
}
```

- **Full-Width Image with Sizes:**

```javascript
// pages/index.js
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Image
        src="/images/hero.jpg"
        alt="Hero banner"
        layout="fill"
        objectFit="cover"
        sizes="100vw"
        placeholder="blur"
      />
    </div>
  );
}
```

**Notes:**

- Static images must be placed in the `/public` directory (e.g., `/public/images/team.jpg`) and referenced without the `/public` prefix (see [Section 8.4](#84-static-file-serving)).
- External images require a configured `images` domain in `next.config.js` (e.g., `images: { domains: ['example.com'] }`) to enable optimization.
- Specify `width` and `height` for static images to prevent Cumulative Layout Shift (CLS), or use `layout="fill"` with a containing element for dynamic sizing.
- The `blur` placeholder requires a `blurDataURL` (auto-generated for static images in Next.js 12+).
- For SSG/ISR, `next/image` optimizes images at build time or during regeneration, while SSR/ Stuart-based caching ensures fast delivery for subsequent requests.

**Best Practices:**

- Always provide descriptive `alt` text for accessibility and SEO compliance.
- Use `sizes` for responsive images to optimize bandwidth (e.g., `sizes="(max-width: 768px) 100vw, 50vw"`).
- Test image loading with JavaScript disabled to ensure SSR/SSG compatibility (see [Section 6](#6-comparison-of-rendering-methods)).
- Minimize external image domains in `next.config.js` to reduce security risks.
- Use `quality` sparingly to balance file size and visual fidelity (e.g., 75–85 for most cases).
- Monitor CLS in performance tools (e.g., Lighthouse) to ensure images don’t cause layout shifts.

**Use Cases in Context:**

- **E-commerce Product Pages:** Use `next/image` with `layout="responsive"` for product images in SSR or ISR pages, optimizing for various screen sizes.
- **Blog Posts:** Lazy-load images in SSG blog posts with `placeholder="blur"` for fast initial loads.
- **Marketing Pages:** Display full-width hero images in SSG pages with `layout="fill"` and `sizes="100vw"` for responsive performance.
- **Dashboards:** Optimize small icons or avatars in CSR dashboards with `layout="fixed"` for minimal bandwidth usage.

### 8.4 Static File Serving

**Purpose:** Next.js Pages Router enables static file serving from the `/public` directory, allowing developers to deliver assets like images, fonts, JSON files, or other resources efficiently. These files are accessible via URL paths and integrate with all rendering methods (SSR, SSG, ISR, CSR), complementing features like `next/image` (see [Section 8.3](#83-image-optimization-with-nextimage)) for optimized asset delivery.

**Key Features:**

- **Simple File Access:** Files in `/public` are served at the root URL (e.g., `/public/images/logo.png` is accessible as `/images/logo.png`).
- **Static Asset Delivery:** Assets are served directly by the Next.js server or CDN (e.g., Vercel), with caching support for performance.
- **Build-Time Inclusion:** Files in `/public` are included in the build output, ensuring availability for static (SSG, ISR) and dynamic (SSR, CSR) pages.
- **No Processing:** Unlike pages or API routes, static files are served as-is, without server-side processing.

**Use Case:**

- Serving images for `next/image` components in SSG or ISR pages (e.g., blog post thumbnails).
- Providing downloadable resources like PDFs or JSON data in SSR pages.
- Including global assets like fonts or favicons for all rendering methods.

**Examples:**

- **Serving an Image for next/image:**

```javascript
// pages/about.js
import Image from "next/image";

export default function About() {
  return (
    <div>
      <h1>About Us</h1>
      <Image src="/images/team.jpg" alt="Team photo" width={800} height={600} />
    </div>
  );
}
```

- **Serving a Downloadable PDF:**

```javascript
// pages/resources.js
export default function Resources() {
  return (
    <div>
      <h1>Resources</h1>
      <a href="/documents/guide.pdf" download>
        Download Guide
      </a>
    </div>
  );
}
```

- **Serving a JSON File for Client-Side Fetching:**

```javascript
// pages/dashboard.js
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/data/config.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return <div>{data ? data.message : "Loading..."}</div>;
}
```

**Notes:**

- Place static files in the `/public` directory at the project root (e.g., `/public/images/team.jpg`).
- URLs omit the `/public` prefix (e.g., use `/images/team.jpg`, not `/public/images/team.jpg`).
- Static files are not processed or transformed by Next.js; use `next/image` for image optimization (see [Section 8.3](#83-image-optimization-with-nextimage)).
- For SSG/ISR, static files are bundled at build time or regeneration, while SSR/CSR accesses them at runtime.
- Avoid storing sensitive data in `/public`, as files are publicly accessible unless restricted by server configuration (e.g., Vercel’s access controls).

**Best Practices:**

- Organize `/public` with clear subdirectories (e.g., `/public/images`, `/public/documents`) for maintainability.
- Use `next/image` for images instead of direct `<img>` tags to leverage optimization (see [Section 8.3](#83-image-optimization-with-nextimage)).
- Set appropriate cache headers (e.g., `Cache-Control: public, max-age=31536000`) in deployment (e.g., Vercel) for static assets to improve performance.
- Test static file accessibility in production to ensure correct paths and availability.
- Minimize the number of static files to reduce build size, especially for SSG/ISR deployments.
- Use versioned filenames (e.g., `logo-v2.png`) or query strings for cache busting when updating assets.

**Use Cases in Context:**

- **Blog Posts:** Serve static images from `/public/images` for SSG blog posts, used with `next/image` for optimization.
- **E-commerce:** Provide product brochures as PDFs in `/public/documents` for SSR product pages.
- **Marketing Pages:** Include favicons or fonts from `/public/assets` in SSG pages, referenced in `_document.js` (see [Section 8.1](#81-customizing-_documentjs)).
- **Dashboards:** Fetch configuration JSON from `/public/data` in CSR dashboards for dynamic settings.

### 8.5 Best Practices for Application and Asset Handling

- **Keep** `_document.js` **lean:** Only include server-side modifications (e.g., `<meta>` tags, scripts). Avoid logic that could be handled in `_app.js` or page components.
- **Optimize** `_app.js` **for Performance:** Minimize re-renders by using memoization or lightweight providers. Heavy global logic can slow down page transitions.
- **Ensure Compatibility with Rendering Methods:**

  - `_document.js` affects SSR, SSG, and ISR equally, as it defines the HTML structure.
  - `_app.js` supports all rendering methods but requires careful handling of `pageProps` to avoid breaking SSR or SSG hydration.

- **Test Client-Side Behavior:** Customizations in `_app.js` (e.g., route change handlers) rely on client-side JavaScript, so test with JavaScript disabled to ensure SSR/SSG fallback works.
- **Use TypeScript for Safety:** Define prop types for `_app.js` (e.g., `AppProps`) and `_document.js` to catch errors early, especially when passing `pageProps`.

### 8.4 Use Cases in Context

- **SEO Optimization:** Use `_document.js` to add Open Graph or Twitter Card meta tags for blog posts (SSG) or product pages (SSR).
- **Consistent UI:** Use `_app.js` to apply a global layout for static marketing pages (SSG) or dynamic dashboards (CSR).
- **Analytics Tracking:** Implement route change tracking in `_app.js` for dynamic routes (e.g., `[slug].js`) or catch-all routes (e.g., `[...category].js`).
- **Theming:** Wrap pages in `_app.js` with a `ThemeProvider` to ensure consistent styling across nested dynamic routes (e.g., `[category]/[id].js`).

## License

Copyright (c) 2025 Michael Abler. Licensed under the [Creative Commons Attribution-NonCommercial-NoDerivs 4.0 International License](https://creativecommons.org/licenses/by-nc-nd/4.0/). You may use and share this document for non-commercial purposes, provided you give appropriate credit and retain the copyright notice. No modifications or derivative works are permitted. See [LICENSE.md](/LICENSE.md) for details.

## References

- See example implementation: [Next.js Student Directory: Example Implementation](./docs/EXAMPLE.md)
