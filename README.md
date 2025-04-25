# Next.js Essentials: Pages Router Rendering & Routing

Copyright (c) 2025 Michael Abler. See [LICENSE.md](/LICENSE.md) for details.

## Introduction

This document provides a comprehensive guide to building modern web applications with Next.js, a popular React framework, focusing on the **Pages Router** (using the `pages/` directory for file-based routing). It covers the core pillars of Next.js development: **rendering methods**—Server-Side Rendering (SSR), Static Site Generation (SSG), Incremental Static Regeneration (ISR), and Client-Side Rendering (CSR); **routing patterns**—dynamic, prerendered, and catch-all URLs; **client-side navigation**—using `next/router` for seamless transitions and dynamic route handling; and **application and asset customization**—leveraging `_app.js`, `_document.js`, `next/image`, and static file serving for tailored HTML output and optimized assets. By explaining key concepts, functions (e.g., `getServerSideProps`, `getStaticProps`, `getStaticPaths`, `useRouter`), and practical examples, the document equips developers with the knowledge to implement efficient, scalable, and performant Next.js applications.

As of April 2025, the Pages Router remains relevant for maintaining and upgrading existing Next.js applications, particularly those built before the App Router’s introduction in Next.js 13. The techniques described (e.g., `getServerSideProps`, `getStaticProps`, `useRouter`, `_app.js` customization) are compatible with Next.js versions 9 through 14 and likely later, though the App Router is recommended for new projects. To explore a practical implementation of these techniques, see [Next.js Student Directory: Example Implementation](/EXAMPLE.md), which provides a detailed guide to the Student Directory demo’s source code, including its directory structure, build process, and route analysis. Check the official Next.js documentation for any version-specific changes. For advanced Next.js features that complement this guide—such as API Routes, Middleware, Preview Mode, and Internationalized Routing—refer to the companion document ["Next.js Essentials: Pages Router Advanced Features"](https://github.com/MichaelAbler/nextjs_essentials_pagesrouter_advanced#).

### Target Audience

The document is designed for:

- **Web developers** with an **intermediate understanding of React** (e.g., components, hooks, props, async data fetching) and **basic familiarity with Next.js** (e.g., pages, file-based routing), seeking to master rendering, routing, client-side navigation, and application customization.
- **Intermediate Next.js users** looking for a concise reference on rendering methods, dynamic routes, `next/router`, and best practices for asset optimization.
- **Technical leads or architects** with React and Next.js experience, evaluating strategies for performance, SEO, scalability, and maintainability in Next.js projects.

Familiarity with React components, asynchronous JavaScript (e.g., `async/await`), and basic Next.js concepts (e.g., pages, routing) is assumed. Beginners new to Next.js or React may benefit from reviewing the official Next.js and React documentation for foundational concepts before diving in.

### Purpose and Motivation

Next.js’s rendering methods (SSR, SSG, ISR, CSR), routing patterns (static, dynamic, catch-all), client-side navigation (`next/router`), and customization options (`_app.js`, `_document.js`, `next/image`) are often explained in isolation, obscuring their connections. This document addresses this by providing a unified, comprehensive overview, consolidating all key implementation patterns—like `getServerSideProps` for dynamic URLs, `getStaticPaths` with `getStaticProps` for prerendered routes, `useRouter` for client-side navigation, and `_app.js` for global layouts—in one place. Through clear, integrated explanations, it reveals the simplicity and power of Next.js’s approach. It offers:

- **Holistic clarity**: Full coverage of rendering, routing, client-side navigation, and application customization (e.g., ISR with catch-all routes, shallow routing, image optimization).
- **Decision-making guidance**: Comparisons to select optimal methods for performance, SEO, data freshness, and user experience.
- **Actionable insights**: Best practices for blogs, e-commerce, dashboards, and customized applications.

This guide equips developers to build scalable, performant Next.js applications confidently. For advanced features like API Routes, see ["Next.js Essentials: Pages Router Advanced Features"](https://github.com/MichaelAbler/nextjs_essentials_pagesrouter_advanced#).

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

The `useRouter` hook provides access to the router object in functional components, enabling navigation, parameter retrieval, and route state management. It exposes properties like `pathname` (e.g., `/posts/[id]`), `query` (dynamic parameters and query strings), `asPath` (full URL), and methods like `push`, `replace`, and `prefetch`. Some of their most important application patterns are explained in the following sections. Refer to the official [Next.js documentation](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes) for more details on dynamic routing and the `useRouter` hook.

**Key Properties and Methods**

#### Properties

- **`router.pathname`**

  - **Type**: `string`
  - **Description**: The current route’s template, as defined in the `pages` directory (e.g., `/posts/[id]` for `pages/posts/[id].js`). Identifies the route structure without resolved dynamic values.

- **`router.query`**

  - **Type**: `object`
  - **Description**: Contains dynamic route parameters (e.g., `{ id: '1' }` for `/posts/1`) and query string parameters (e.g., `{ tab: 'comments' }` for `?tab=comments`). May be empty before hydration; use `router.isReady` or optional chaining for safety.

- **`router.asPath`**

  - **Type**: `string`
  - **Description**: The full URL as shown in the browser’s address bar, including query strings (e.g., `?tab=comments`), fragments (e.g., `#section`) and base paths.

- **`router.isFallback`**

  - **Type**: `boolean`
  - **Description**: Indicates if a fallback page is rendering for SSG dynamic routes with `fallback: true` or `fallback: 'blocking'` (see [Section 3](#3-static-site-generation-ssg---multiple-prerendered-urls)).

- **`router.isReady`**

  - **Type**: `boolean`
  - **Description**: Indicates if the router has finished hydrating and `router.query` is fully populated. Ensures safe access to `router.query`.

- **`router.basePath`**

  - **Type**: `string`
  - **Description**: The configured base path for the app (e.g., `/blog`). Defaults to an empty string if not set.

#### Methods

- **`router.push(url, as, options)`**
  - **Signature**: `router.push(url: string | object, as?: string, options?: object) => Promise<boolean>`
- **Description**: Navigates to a new page, adding to the history stack. `url` specifies the route template, `as` sets the browser-facing URL, and `options` includes settings like `{ scroll: false, shallow: true }`. _Note: For dynamic routes, `url` uses the route template (e.g., `/posts/[id]`), and `as` sets the browser URL (e.g., `/posts/1`)._

- **`router.replace(url, as, options)`**

  - **Signature**: `router.replace(url: string | object, as?: string, options?: object) => Promise<boolean>`
  - **Description**: Navigates to a new page, replacing the current history entry otherwise same like `router.push`.

- **`router.prefetch(url)`**

  - **Signature**: `router.prefetch(url: string) => Promise<void>`
  - **Description**: Preloads page assets for faster navigation. Only works in production.

- **`router.back()`**

  - **Signature**: `router.back() => void`
  - **Description**: Navigates to the previous page in the history stack.

- **`router.forward()`**

  - **Signature**: `router.forward() => void`
  - **Description**: Navigates to the next page in the history stack.

- **`router.reload()`**

  - **Signature**: `router.reload() => void`
  - **Description**: Reloads the current page, re-running data fetching and re-rendering.

- **`router.events`**
  - **Type**: `EventEmitter`
  - **Description**: Event emitter for routing events (e.g., `routeChangeStart`, `routeChangeComplete`, `routeChangeError`).

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
- `router.isPreview`, `router.locale`, `router.locales`, and `router.defaultLocale` are relevant only with i18n and preview enabled not covered here inside this document.

### 7.2 Programmatic Navigation

Programmatic navigation allows developers to redirect users or update URLs using `router.push` or `router.replace`. It supports static routes, dynamic routes (e.g., `/posts/[id]`), and query-based URLs, with options like shallow routing to optimize performance.

**Example: Navigating to a Dynamic Route**

```javascript
// pages/index.js
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const goToPost = (id) => {
    router.push("/posts/[id]", `/posts/${id}`); // Navigate to /posts/1
  };

  return <button onClick={() => goToPost(1)}>View Post 1</button>;
}
```

**Example: Shallow Routing for Pagination**

[see 7.5 Client-Side Navigation Optimizations](#75-client-side-navigation-optimizations)

**Notes:**

- Use `router.push` for navigations added to history (e.g., user clicks). Use `router.replace` for redirects that replace history (e.g., post-login).
- Shallow routing (`shallow: true`) updates the URL without triggering server-side data fetching, ideal for filters or pagination (see [Section 7.5](#75-client-side-navigation-optimizations)). _Note: This keeps the URL in sync with client-side state changes, such as UI updates or query parameters, without navigating or refetching data, ensuring the URL reflects the current application state._

### 7.3 Route Change Events

Route change events enable developers to listen to client-side navigation lifecycle events (e.g., `routeChangeStart`, `routeChangeComplete`) to manage loading states, analytics, or cleanup. These events are **client-side only** and are best handled in `_app.js`, which wraps all page components, ensuring consistent behavior across routes (see [Section 8.2](#82-customizing-_appjs)).

**Key Events:**
The `next/router` module emits route change events to signal the lifecycle stages of client-side navigation for a page component in the Next.js Pages Router. These events reflect the status of the page component being rendered or transitioned during navigation:

- `routeChangeStart(url):` Fired when the navigation to a new page component begins, indicating the start of the component’s loading process.
- `routeChangeComplete(url):` Fired when the navigation is complete, and the new page component is fully rendered in the DOM.
- `routeChangeError(err, url):` Fired if an error occurs during navigation, indicating a failure in loading or rendering the page component.
- `beforeHistoryChange(url):` Fired just before the browser’s history is updated, signaling an imminent change in the page component.

These events are emitted by the router’s global event system (`router.events`) but correspond to the lifecycle of the page component being navigated. They track the client-side transition process (e.g., fetching data, rendering, or error handling) for the page component rendered within `_app.js`. Handling these events in `_app.js` is ideal because it:

- Centralizes logic for all page components, avoiding duplicated code in individual pages.

- Ensures consistent UI updates (e.g., loading spinners) across all routes.

- Integrates with global state or providers to propagate navigation status to the component tree.

**Example: React LoadingProvider implementation**

```javascript
// context/LoadingContext.js
import { createContext, useContext } from "react";

// Create the LoadingContext
const LoadingContext = createContext({
  isLoading: false, // Default value
});

// LoadingProvider component to wrap the app or components
export function LoadingProvider({ value, children }) {
  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
}

// Custom hook to access the loading state
export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
```

**Example: Loading State within \_app.js**

```javascript
// pages/_app.js
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { LoadingProvider } from "../context/LoadingContext";
import Layout from "../components/Layout";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setIsLoading(true); // Page component loading
    const handleComplete = () => setIsLoading(false); // Page component rendered
    const handleError = () => setIsLoading(false); // Page component failed

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleError);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleError);
    };
  }, [router.events]);

  return (
    <LoadingProvider value={{ isLoading }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LoadingProvider>
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
    // Manually prefetch dynamic routes to complement <Link> by enabling
    // immediate preloading and supporting off-screen or SSG fallback routes
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

Client-side navigation optimizations in Next.js enhance performance and responsiveness by leveraging `next/router` features and Next.js’s architecture. Techniques like shallow routing, code splitting, caching, and progressive hydration minimize latency, reduce server load, and improve user experience during navigation.

#### Key Features:

- **Shallow Routing**:
  - Updates URL query parameters without re-running `getServerSideProps`, `getStaticProps`, or `getStaticPaths`, ideal for filters, search, or pagination.
  - Executes client-side, avoiding unnecessary server requests or full page reloads. Best for SSR or ISR pages with frequent query updates (e.g., pagination, filters). See also [Section 7.2](#72-programmatic-navigation).
- **Code Splitting**:
  - Next.js provides two types of code splitting:
    - **Route-Based Code Splitting**: Automatically splits code for each page in the `pages` directory (static or dynamic) into separate JavaScript chunks. Only the chunk for the visited route is loaded, reducing initial bundle sizes for both static (e.g., `/posts/about`) and dynamic (e.g., `/posts/[id]`) routes.
    - **Component-Level Code Splitting**: Uses `next/dynamic` to lazy-load specific components, further reducing the initial bundle size by loading components only when needed. Applies to both static and dynamic routes.
  - Ensures efficient loading of only the required code.
- **Caching**: Next.js caches responses for Static Site Generation (SSG) fallback pages or Incremental Static Regeneration (ISR) on the server or edge CDN (by automatically serving appropriate Cache-Control headers). Reduces server load and speeds up client-side navigation by serving pre-rendered pages quickly.
- **Progressive Hydration**:
  - Incrementally hydrates Server-Side Rendered (SSR) or SSG pages, prioritizing visible content to improve interactivity. Automatic in Next.js, enhanced by optimized component design.
- **Preloading/Prefetching**:
  - See [Section 7.4](#74-dynamic-route-preloading) for preloading dynamic routes and [Section 7.6](#76-the-link-component) for prefetching with `<Link>` to anticipate user navigation and load resources in advance.

**Example: Shallow Routing for Pagination**

```javascript
// pages/blog.js
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Blog() {
  const router = useRouter();
  const { page = "1" } = router.query;
  const currentPage = parseInt(page, 10);

  useEffect(() => {
    console.log(`Re-hydrated with page: ${page}`);
  }, [page]);

  const goToPage = (newPage) => {
    if (newPage < 1) return;
    router.push({ pathname: "/blog", query: { page: newPage } }, undefined, {
      shallow: true,
    });
  };

  return (
    <div>
      <h1>Page {currentPage}</h1>
      <button onClick={() => goToPage(currentPage + 1)}>Next</button>
      <p>Shallow routing updates URL and UI client-side.</p>
    </div>
  );
}
```

**Example: Code Splitting with `next/dynamic`**

```javascript
// pages/posts/[id].js
import dynamic from "next/dynamic";

// Dynamically import the HeavyComponent to lazy-load it.
// Reduces the initial bundle size by loading the component only when needed.
const HeavyComponent = dynamic(
  () => import("../../components/HeavyComponent"),
  {
    // Fallback UI shown while the component is loading
    loading: () => <p>Loading...</p>,
    // Optional: Disable server-side rendering for this component if it relies on client-side features
    ssr: false,
  }
);

// The main page component for the dynamic route /posts/[id]
export default function Post({ data }) {
  return (
    <div>
      {/* Page title */}
      <h1>Post Details</h1>
      {/* Render the lazy-loaded HeavyComponent with the fetched data */}
      <HeavyComponent data={data} />
    </div>
  );
}

// Server-side data fetching for the dynamic route
export async function getServerSideProps({ params }) {
  // Fetch data for the specific post using the dynamic 'id' parameter
  // Example: params.id could be '123' for the URL /posts/123
  const data = await fetchData(params.id);

  // Return the fetched data as props to the Post component
  return {
    props: {
      data,
    },
  };
}
```

**Notes:**

- **Shallow Routing**: Best for SSR or ISR pages with frequent query updates (e.g., pagination, filters). See Section 7.2 for SSR/ISR details.
- **Code Splitting**:
  - **Route-Based**: Automatic for all pages (static or dynamic), ensuring only the visited page’s chunk is loaded.
  - **Component-Level**: Achieved with `next/dynamic` for lazy-loading components, applicable to any route type, reducing bundle sizes for complex pages.
- **Progressive Hydration**: Automatic for SSR/SSG pages; optimizing component structure enhances effectiveness.
- **Caching**: Server-side caching (e.g., ISR, SSG fallback) accelerates client-side navigation by serving pre-rendered content.
- **Clarification**: Both static and dynamic routes benefit from automatic route-based code splitting and component-level lazy-loading with `next/dynamic`.

### 7.6 The Link Component

The `next/link` component enables **client-side navigation** in Next.js Pages Router applications, allowing smooth transitions between pages without full page reloads. It integrates with `next/router` (see Sections [7.1](#71-the-userouter-hook)–[7.5](#75-client-side-navigation-optimizations)) to support static, dynamic, and catch-all routes. The `Link` component boosts performance by **automatically prefetching** linked pages' resources in production when they appear in the viewport, and it is compatible with all rendering methods (SSR, SSG, ISR, CSR).

During navigation, `Link` ensures that only the **Page component** (e.g., `pages/index.js` or `pages/about.js`) is swapped, while the **App component**, defined in `_app.js` (see [8.2 Customizing \_app.js](#82-customizing-_appjs)), remains mounted. This preserves shared layout and state, preventing the entire page from being unmounted or reloaded. For further customization of the application structure, refer to [8. Customizing Application and Asset Handling](#8-customizing-application-and-asset-handling).

**Key Features:**

- **Client-Side Transitions:** Renders an anchor tag (`<a>`) internally to handle navigation via JavaScript, preserving application state and avoiding server requests.
- **Automatic Prefetching:** In production, `Link` prefetches page assets (JavaScript bundles, `getStaticProps`/`getServerSideProps` data) for routes in the viewport, reducing navigation latency (see [Section 7.4](#74-dynamic-route-preloading)).
- **Dynamic Route Support:** Handles parameterized URLs (e.g., `/posts/[id]`) using `href` and `as` props for clean URL rendering in the Pages Router. Similar to `router.push` and `router.replace`.
- **Customization:** Supports props like `replace`, `scroll`, and `prefetch` to control navigation behavior.

**Key Props:**

- `href`: The route path or object (e.g., `/about` or `{ pathname: '/posts/[id]', query: { id: '1' } }`).
- `as`: Required for dynamic routes in the Pages Router to specify the URL shown in the browser (e.g., `href="/posts/[id]"`, `as="/posts/1"`). Obsolete for static routes.
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
      {/*Pass-through Props: If you need attributes like title, target, or rel, you can add them directly to Link*/}
      <Link href="/about" target="_blank" rel="noopener noreferrer">
        About
      </Link>
      {/*Styling: To style the links, use className or a styled componen*/}
      <Link href="/contact" className="nav-link">
        Contact
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
          <Link href="/posts/[id]" as={`/posts/${post.id}`}>
            {post.title}
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
      Low Priority Page
    </Link>
  );
}
```

**Notes:**

- Place content directly inside `Link`, as it renders an `<a>` tag internally for accessibility and SEO. Avoid nesting `<a>` tags, as this is deprecated.
- In the Pages Router, `href="/posts/[id]"` with `as="/posts/1"` is required for dynamic routes. In the App Router, `href="/posts/1"` is used, and `as` is obsolete.
- Prefetching is automatic in production for `Link` components in the viewport but disabled in development to reduce noise.
- Use `replace` for redirects (e.g., post-login) to avoid cluttering browser history.
- For SSG with `fallback: true` or `'blocking'` (see [Section 3](#3-static-site-generation-ssg---multiple-prerendered-urls)), `Link` ensures fallback pages load efficiently by prefetching necessary assets.

**Best Practices:**

- Use `Link` instead of `<a href>` for internal navigation to leverage client-side routing and prefetching.
- Minimize prefetching for low-priority routes by setting `prefetch={false}` to optimize bandwidth.
- Ensure the content inside `Link` (e.g., text or components) includes meaningful text or `aria-label` for screen readers, as `Link` renders an `<a>` tag internally.
- Test `Link` behavior with JavaScript disabled to verify SSR/SSG compatibility (see [Section 6](#6-comparison-of-rendering-methods)).
- Combine `Link` with `router.prefetch` ([Section 7.4](#74-dynamic-route-preloading)) for programmatically preloading dynamic routes not in the viewport in the Pages Router.

**Use Cases in Context:**

- **Blog Navigation:** Use `Link` for navigating to SSG blog posts (`/posts/[id]`) with prefetching for fast transitions.
- **E-commerce:** Link to product pages (`/products/[id]`) with dynamic routes, using `replace` for redirecting invalid IDs.
- **Dashboard Menus:** Use `Link` in CSR dashboards for navigating between user-specific pages, disabling prefetching for rarely accessed routes.

### 7.7 Best Practices for next/router

Summary of best practices for using `next/router` effectively in Next.js Pages Router applications:

- **Use as for Clean URLs:** When using router.push or router.replace with dynamic routes, leverage the as parameter to display clean, SEO-friendly URLs instead of query strings (e.g., /post/[id] as /post/123).
- **Handle Hydration Safely**: Use `router.isReady` or optional chaining (`router.query?.id`) to avoid undefined values before hydration.[Section 7.1](#71-the-userouter-hook)
- **Optimize Shallow Routing**: Apply `shallow: true` for query-based interactions to minimize server load, especially in SSR or ISR (see [Section 7.2](#72-programmatic-navigation)).
- **Clean Up Event Listeners**: Remove `router.events` listeners in `useEffect` cleanup to prevent memory leaks. (see [Section 7.3](#73-route-change-events))
- **Prioritize Prefetching**: Prefetch high-traffic dynamic routes (e.g., popular posts) to balance bandwidth and latency (see [Section 7.4](#74-dynamic-route-preloading)).
- **Avoid Over-Prefetching**: While prefetching is great, avoid prefetching low-priority or rarely visited routes to reduce unnecessary bandwidth usage, especially on mobile devices.
- **Leverage Code Splitting**: Use `next/dynamic` for heavy components in dynamic routes to reduce bundle sizes (see [Section 7.5](#75-client-side-navigation-optimizations)).
- **Test Navigation**: Verify client-side navigation with JavaScript disabled to ensure SSR/SSG compatibility (see [Section 6](#6-comparison-of-rendering-methods)).
- **Use TypeScript**: Define types for `router.query` (e.g., `interface Query { id?: string }`) to catch errors early.

### 7.8 Use Cases in Context

The following use cases demonstrate how to apply [`useRouter`](#71-the-userouter-hook), [programmatic navigation](#72-programmatic-navigation), [route change events](#73-route-change-events), [dynamic route preloading](#74-dynamic-route-preloading), [navigation optimizations](#75-client-side-navigation-optimizations), and the [`Link` component](#76-the-link-component) in real-world Next.js applications, integrating with rendering methods (SSR, SSG, ISR, CSR) and routing patterns (static, dynamic, catch-all).

1. **Dynamic Filtering and Pagination ([7.2](#72-programmatic-navigation), [7.5](#75-client-side-navigation-optimizations))**:

   - **Scenario**: Use shallow routing to update query parameters for search filters or pagination in e-commerce or blog lists.
   - **Rendering/Routing**: ISR for `/products`, SSG for `/blog`.

2. **Conditional Redirects ([7.1](#71-the-userouter-hook))**:

   - **Scenario**: Redirect users in `[id].js` if `router.query.id` is invalid, complementing SSR validation.
   - **Rendering/Routing**: SSR for `/posts/[id]`.

3. **Loading States ([7.3](#73-route-change-events))**:

   - **Scenario**: Show spinners during navigation for dynamic or catch-all routes using `router.events`.
   - **Rendering/Routing**: SSR for `[...category].js`.

4. **Preloading Products ([7.4](#74-dynamic-route-preloading))**:

   - **Scenario**: Prefetch product pages (`/products/[id]`) in an e-commerce app for faster navigation.
   - **Rendering/Routing**: ISR for `/products/[id]`.

5. **Lazy-Loading Dashboards ([7.5](#75-client-side-navigation-optimizations))**:

   - **Scenario**: Use `next/dynamic` for CSR dashboards to optimize dynamic route navigation.
   - **Rendering/Routing**: CSR for `/dashboard/[id]`.

6. **Blog Post Navigation ([7.6](#76-the-link-component))**:
   - **Scenario**: Use `Link` for client-side navigation to static pages or dynamic blog posts, leveraging prefetching.
   - **Rendering/Routing**: SSG for `/posts/[slug]`, static for `/about`.

## 8. Customizing Application and Asset Handling

In the Next.js Pages Router, `_document.js` and `_app.js` are special files that allow developers to customize the application’s HTML structure and global behavior. These files are critical for configuring rendering output, managing global state, and ensuring consistent behavior across pages and routes. This section explains their roles, use cases, and practical examples, complementing the rendering methods (SSR, SSG, ISR, CSR) and routing patterns (dynamic, static, catch-all) discussed earlier.

### 8.1 Customizing \_document.js

`_document.js` customizes the HTML document structure (`<html>`, `<head>`, `<body>`) for all pages rendered by Next.js, affecting SSR, SSG, and ISR output. It runs on the server during initial rendering (and on the client for hydration in some cases), making it ideal for adding global `<meta>` tags, scripts, or custom attributes.

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

`_app.js` customizes the application’s page initialization and rendering process by wrapping every page component. It runs on both the server (for SSR, SSG, ISR) and the client (for CSR and hydration), making it ideal for global layouts, state management, providers, and client-side logic like route change event handling [see Section 7.3](#73-route-change-events). By leveraging route change events (`routeChangeStart`, `routeChangeComplete`, `routeChangeError`, `beforeHistoryChange`), developers can manage navigation lifecycle events to enhance user experience with loading states, analytics, or cleanup logic.

**Key Features:**

- Extends the `App` component to override the default page rendering behavior.
- Supports global layouts, CSS imports, and providers (e.g., Redux, custom providers like ThemeProvider or LoadingProvider).
- Enables client-side logic, such as handling route changes with `Router.events` for navigation lifecycle tracking.
- Receives `Component` (the page component) and `pageProps` (props from `getServerSideProps`, `getStaticProps`, etc.) as props.

**Use Case:**

- Applying a consistent layout across all pages (e.g., navbar, footer).
- Setting up global state management (e.g., Redux, Context API).
- Adding global styles or CSS frameworks (e.g., Tailwind CSS).
- Handling route change events for loading spinners, analytics, or error management.
- Tracking client side navigation for analytics or UI updates.

**Example:**

```javascript
// pages/_app.js
import "../styles/globals.css"; // Global styles
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Layout from "../components/Layout"; // Custom layout component
import { ThemeProvider } from "styled-components";
import { LoadingProvider } from "../context/LoadingContext"; // Custom context for loading state

const theme = { colors: { primary: "#0070f3" } };

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Handle route change events for loading state and analytics
  useEffect(() => {
    const handleStart = (url) => {
      setIsLoading(true); // Indicate page component is loading
      console.log(`Navigating to: ${url}`);
    };
    const handleComplete = (url) => {
      setIsLoading(false); // Page component fully rendered
      console.log(`Navigation complete: ${url}`);
      // Example: Send page view to analytics
      window.gtag("event", "page_view", { page_path: url });
    };
    const handleError = (err, url) => {
      setIsLoading(false); // Reset loading on error
      console.error(`Navigation error at ${url}: ${err}`);
    };

    // Subscribe to route change events
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleError);

    // Cleanup event listeners on unmount
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleError);
    };
  }, [router.events]);

  return (
    <ThemeProvider theme={theme}>
      <LoadingProvider value={{ isLoading }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LoadingProvider>
    </ThemeProvider>
  );
}
```

**Notes:**

- Import global CSS only in `_app.js`, as Next.js restricts CSS imports in other files to avoid side effects.
- Use `Layout` components to wrap `Component` for consistent UI across routes.
- `pageProps` includes data from `getServerSideProps`, `getStaticProps`, or `getInitialProps`, making it a central hub for passing props to pages.
- Avoid heavy logic in `_app.js` to prevent performance bottlenecks.
- Route change events are client-side only, not firing during server-side rendering.

### 8.3 Image Optimization with next/image

The `next/image` component optimizes image delivery in Next.js Pages Router applications, enhancing performance, SEO, and user experience across all rendering methods (SSR, SSG, ISR, CSR). It provides automatic lazy loading, responsive sizing, and format optimization (e.g., WebP), reducing bandwidth usage and improving page load times.

**Key Features:**

- **Automatic Optimization:** Converts images to modern formats (e.g., WebP when supported) and generates multiple resolutions for efficient delivery.
- **Lazy Loading:** Defers offscreen image loading until they enter the viewport, improving initial page load performance.
- **Responsive Images:** Supports `sizes` and `srcSet` for serving appropriately sized images based on device and viewport.
- **SrcSet Generation:** Automatically creates a `srcSet` with multiple image sizes for responsive layouts, enabling browsers to select the optimal image based on device resolution and viewport.
- **Placeholder Support:** Offers blur-up placeholders or empty placeholders for smoother visual loading.
- **Integration with Rendering Methods:** Works seamlessly with SSR, SSG, ISR, and CSR, optimizing images for static and dynamic pages.

**Key Props:**

- **`src`**: Path to the image (e.g., `/images/photo.jpg` for static files in `/public`, or an external URL). Supports relative or absolute URLs.
- **`alt`**: Descriptive text for accessibility and SEO. Required for screen readers and search engine indexing.
- **`width`** and **`height`**: Intrinsic image dimensions (in pixels) to prevent layout shifts. Required for static images; optional with `layout="fill"`.
- **`layout`**: Defines rendering behavior:
  - `fixed`: Fixed-size image, no scaling.
  - `intrinsic`: Scales to fit within specified `width` and `height` (default in Pages Router).
  - `responsive`: Scales fluidly based on viewport, requires `sizes`.
  - `fill`: Fills parent container, often used with `objectFit`.
- **`sizes`**: A string (e.g., `100vw`, `50vw`, or `(max-width: 768px) 100vw, 50vw`) guiding responsive image widths for `srcSet` optimization.
- **`placeholder`**: Visual loading effect:
  - `blur`: Displays a blurred low-res preview (requires `blurDataURL`).
  - `empty`: No placeholder (default).
- **`quality`**: Compression level for output images (1–100, default: 75). Higher values increase file size but improve visual fidelity.

#### **Determining Render Size of Image Components**

The rendered size of a Next.js `Image` component is influenced by the `layout` mode, `width` and `height` props, `sizes` prop, parent container's CSS, and viewport size.

| **Layout**   | **What Defines Rendered Size**                                                                                              | **Role of `width`/`height`**                                                              | **Role of `sizes`**                                       |
| ------------ | --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `fixed`      | `width` and `height` props (exact pixels)                                                                                   | Sets exact size                                                                           | Not used (no `srcSet` scaling)                            |
| `intrinsic`  | Up to `width`/`height` (max size), scales down to fit parent container’s width or CSS constraints (e.g., `max-width: 100%`) | Sets max size and aspect ratio; image shrinks proportionally if parent or CSS limits size | Optional (hints display width for `srcSet` optimization)  |
| `responsive` | Viewport or parent size, scaled per aspect ratio                                                                            | Sets aspect ratio                                                                         | Required (specifies display width for `srcSet` selection) |
| `fill`       | Parent container’s CSS dimensions                                                                                           | Optional (sets aspect ratio)                                                              | Optional (rarely used for `srcSet` optimization)          |

_**Note**: The `sizes` prop is a hint provided by the developer/designer based on the understanding of the design’s layout mechanics, to inform the browser of the expected image display width relative to the viewport. It guides the browser’s runtime selection of the most appropriate image from the `srcSet` for optimal performance and quality, but does not control the actual rendered size, which depends on the `layout` mode, `width` and `height` props, parent container CSS, and viewport size, as detailed in the table above._

**Example**: In a responsive blog layout, an image spans the full viewport on mobile (≤ 768px), 75% of the viewport on tablet (769px–1023px), and 33% on desktop (≥ 1024px). The `sizes` prop uses media queries to reflect these breakpoints:

```jsx
<Image
  src="/blog-image.jpg"
  layout="responsive"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1023px) 75vw, 33vw"
/>
```

...translates by NextJS automatically to the following:

```html
<img
  src="/_next/image?url=/images/image.jpg&w=800&q=75"
  srcset="
    /_next/image?url=/images/image.jpg&w=320&q=75 320w,
    /_next/image?url=/images/image.jpg&w=640&q=75 640w,
    /_next/image?url=/images/image.jpg&w=960&q=75 960w
  "
  sizes="(max-width: 768px) 100vw, (max-width: 1023px) 75vw, 33vw"
  width="800"
  height="600"
  style="width: 100%; height: auto;"
  alt="Responsive image"
/>
```

#### **Automatic SrcSet Generation by Next.js**

This table outlines when `srcSet` images are generated for the `next/image` component in Next.js, detailing the timing and process for different rendering methods (SSG, ISR, SSR, CSR) and image sources (static in `/public`, external).

#### Table: When `srcSet` Images Are Generated

| **Rendering Method**                      | **Static Images (in `/public`)**                                                                                                     | **External Images (remote URL)**                                                                                      |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| **Static Site Generation (SSG)**          | **When**: Build-time<br>**Details**: `next build` processes `/public` images, generating `srcSet` (e.g., 320w, 640w) based on props. | **When**: Runtime (on-demand)<br>**Details**: Optimized on first request, needs `images.domains` in `next.config.js`. |
| **Incremental Static Regeneration (ISR)** | **When**: Build-time + On-demand<br>**Details**: Build-time for initial pages; on-demand during revalidation for new/updated images. | **When**: Runtime (on-demand)<br>**Details**: Optimized on request or revalidation, requires `images.domains`.        |
| **Server-Side Rendering (SSR)**           | **When**: Runtime (on-demand)<br>**Details**: Generated per request for `/public` images due to dynamic rendering.                   | **When**: Runtime (on-demand)<br>**Details**: Fetched and optimized per request, needs `images.domains`.              |
| **Client-Side Rendering (CSR)**           | **When**: Runtime (on-demand)<br>**Details**: Generated when component renders in browser, requested from Next.js server.            | **When**: Runtime (on-demand)<br>**Details**: Optimized on component load, requires `images.domains`.                 |

- **Static Images**: Located in `/public` (e.g., `/public/images/photo.jpg`). Optimized at build-time for SSG/ISR (initial build); runtime for SSR/CSR due to dynamic rendering.
- **External Images**: Remote URLs (e.g., `https://example.com/image.jpg`). Always optimized at runtime, requiring `images.domains` in `next.config.js`.
- **Caching**: All `srcSet` images are cached in `.next/cache/images` or edge cache (e.g., Vercel) after generation, cleared on new builds/deployments.
- **Custom Loaders**: Third-party services (e.g., Cloudinary) handle generation at runtime, bypassing Next.js caching.
- **Resolutions**: `srcSet` widths (e.g., 320w, 640w) are based on image size and device needs, consistent across methods.

#### Deployment Considerations for Runtime (On-Demand) `srcSet` Generation

- **Hosting Platform Support**

  - **Vercel**: Native support with edge caching; deploy via CLI/Git, no extra setup.
  - **Non-Vercel**: Requires Node.js server for image processing; static hosts (e.g., Netlify) need custom loader (e.g., Cloudinary). Ensure runtime support for `/_next/image`.

- **Configuration in `next.config.js`**

  - **External Domains**: List production domains in `images.domains` or `remotePatterns` (e.g., `domains: ['example.com']`). Use HTTPS-only patterns for security.
  - **Formats**: Set `images.formats: ['image/webp', 'image/avif']` for modern formats; test browser compatibility.
  - **Custom Loader**: Configure `images.loader` (e.g., Cloudinary) with API credentials; verify rate limits.

- **Caching and CDN Integration**

  - **Caching**: Images cached in `.next/cache/images` or edge cache (Vercel). Use CDN (e.g., Cloudflare) for non-Vercel hosts with `Cache-Control: max-age=31536000`.
  - **Invalidation**: Redeploy or clear cache for updated images; test post-deployment.

- **Network and Latency**
  - **External Images**: Ensure remote hosts are reliable, CORS-compliant, low-latency. Test URLs in production.
  - **Static Images**: Optimize (e.g., pre-compress) in `/public` to reduce processing time. Consider CDN-hosted images for faster runtime fetching.

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

- **Dynamic Image Example**

```javascript
// app/post/[id]/page.js (App Router)
import Image from "next/image";
import { fetchPostFromCMS } from "@/lib/cms";

export default async function Post({ params }) {
  const post = await fetchPostFromCMS(params.id); // Returns { title, image: { url, width, height, alt } }
  return (
    <div>
      <h1>{post.title}</h1>
      <Image
        src={post.image.url}
        alt={post.image.alt}
        width={post.image.width}
        height={post.image.height}
        layout="responsive"
        sizes="(max-width: 768px) 100vw, 50vw"
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

#### 8.4 Static File Serving

Next.js Pages Router enables static file serving from the `/public` directory, allowing developers to deliver assets like images, fonts, SVGs, videos, JSON files, or PDFs efficiently. These files are accessible via URL paths and integrate with all rendering methods (SSR, SSG, ISR, CSR), complementing features like [`next/image`](#83-image-optimization-with-nextimage) for optimized asset delivery.

**Key Features:**

- **Simple File Access**: Files in `/public` are served at the root URL (e.g., `/public/images/logo.png` is accessible as `/images/logo.png`).
- **Static Asset Delivery**: Assets are served directly by the Next.js server or CDN (e.g., Vercel), with caching support for performance.
- **Build-Time Inclusion**: Files in `/public` are included in the build output for SSG/ISR, ensuring availability for static pages, and accessed at runtime for SSR/CSR.
- **No Processing**: Static files are served as-is, without server-side processing, unlike pages or API routes.

**Use Cases:**

- Serving images for [`next/image`](#83-image-optimization-with-nextimage) in SSG or ISR pages (e.g., blog thumbnails).
- Providing downloadable resources like PDFs or CSVs in SSR pages (e.g., product brochures).
- Including global assets like fonts, favicons, or SVGs for branding in all rendering methods.
- Serving configuration JSON or video files for CSR dashboards or media-heavy pages.

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

-**Serving a Downloadable PDF:**

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

-**Serving a JSON File for Client-Side Fetching:**

```javascript
// pages/dashboard.js
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/data/config.json")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch(() => setData({ error: "Config not found" }));
  }, []);

  return <div>{data ? data.message : "Loading..."}</div>;
}
```

- **Serving a Versioned SVG for Cache Busting:**

```javascript
// pages/home.js
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Welcome</h1>
      <Image src="/icons/logo-v2.svg" alt="Logo" width={100} height={100} />
    </div>
  );
}
```

**Notes:**

- Place static files in the `/public` directory at the project root (e.g., `/public/images/team.jpg`).
- URLs omit the `/public` prefix (e.g., use `/images/team.jpg`, not `/public/images/team.jpg`).
- Static files are not processed or transformed; use [`next/image`](#83-image-optimization-with-nextimage) for image optimization.
- For SSG/ISR, static files are bundled at build time or during regeneration; SSR/CSR accesses them at runtime.
- Avoid storing sensitive data in `/public`, as files are publicly accessible unless restricted by server configuration (e.g., Vercel’s access controls or `.htaccess`).
- On static hosts (e.g., Netlify), ensure `/public` files are included in the build output; Node.js servers or CDNs (e.g., Vercel) handle runtime serving.

**Best Practices:**

- **Organize Files**: Use clear subdirectories (e.g., `/public/images`, `/public/documents`, `/public/assets`) for maintainability.
- **Optimize Images**: Use [`next/image`](#83-image-optimization-with-nextimage) instead of `<img>` tags for images to leverage optimization.
- **Set Cache Headers**: Configure `Cache-Control: public, max-age=31536000` in deployment (e.g., Vercel or Cloudflare) for static assets to improve performance.
- **Handle Errors**: Implement fallbacks for missing files (e.g., default image or error message) to enhance user experience.
- **Test Accessibility**: Verify file paths in production to ensure correct serving and CORS compliance for external CDNs.
- **Minimize Build Size**: Limit the number of static files to reduce SSG/ISR build size, especially for large image sets.
- **Use Versioned Assets**: Employ versioned filenames (e.g., `logo-v2.png`) or query strings (e.g., `logo.png?v=2`) for cache busting when updating assets.
- **Secure Sensitive Files**: Restrict access to sensitive `/public` files using server rules (e.g., Vercel’s `vercel.json` or `.htaccess`) or move them to API routes.

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

### 8.6 Use Cases in Context

The following use cases demonstrate how to apply [`_document.js`](#81-customizing-_documentjs), [`_app.js`](#82-customizing-_appjs), [`next/image`](#83-image-optimization-with-nextimage), and [static file serving](#84-static-file-serving) in real-world Next.js applications, integrating with rendering methods (SSR, SSG, ISR, CSR) and routing patterns (static, dynamic, catch-all).

1. **SEO Optimization ([8.1](#81-customizing-_documentjs))**:

   - **Scenario**: Add Open Graph meta tags in `_document.js` for SSG blog posts or SSR product pages to improve social media sharing.
   - **Rendering/Routing**: SSG for `/blog`, SSR for `/products/[id]`.

2. **Consistent UI with Global Layout ([8.2](#82-customizing-_appjs))**:

   - **Scenario**: Use `_app.js` to apply a global layout (e.g., navbar, footer) for static marketing pages or dynamic dashboards.
   - **Rendering/Routing**: SSG for `/about`, CSR for `/dashboard/[id]`.

3. **Analytics Tracking with Route Changes ([8.2](#82-customizing-_appjs))**:

   - **Scenario**: Track page views in `_app.js` for dynamic or catch-all routes using `router.events`.
   - **Rendering/Routing**: SSR for `[slug].js`, ISR for `[...category].js`.

4. **Theming with Global Styles ([8.2](#82-customizing-_appjs))**:

   - **Scenario**: Wrap pages in `_app.js` with a `ThemeProvider` for consistent styling across nested dynamic routes.
   - **Rendering/Routing**: SSR for `[category]/[id].js`.

5. **Optimized Product Images ([8.3](#83-image-optimization-with-nextimage))**:

   - **Scenario**: Use `next/image` with `layout="responsive"` for product images in e-commerce, optimizing load times.
   - **Rendering/Routing**: ISR for `/products/[id]`.

6. **Lazy-Loaded Blog Images ([8.3](#83-image-optimization-with-nextimage))**:

   - **Scenario**: Apply `next/image` with `placeholder="blur"` for blog post images to enhance SSG page performance.
   - **Rendering/Routing**: SSG for `/posts/[slug]`.

7. **Downloadable Resources ([8.4](#84-static-file-serving))**:

   - **Scenario**: Serve PDFs from `/public/documents` for product brochures in SSR product pages.
   - **Rendering/Routing**: SSR for `/products/[id]`.

8. **Static Assets for Branding ([8.4](#84-static-file-serving))**:
   - **Scenario**: Include favicons or fonts from `/public/assets` in SSG marketing pages, referenced in `_document.js`.
   - **Rendering/Routing**: SSG for `/about`.

## License

Copyright (c) 2025 Michael Abler. Licensed under the [Creative Commons Attribution-NonCommercial-NoDerivs 4.0 International License](https://creativecommons.org/licenses/by-nc-nd/4.0/). You may use and share this document for non-commercial purposes, provided you give appropriate credit and retain the copyright notice. No modifications or derivative works are permitted. See [LICENSE.md](/LICENSE.md) for details.

## References

- See example implementation: [Next.js Student Directory: Example Implementation](/EXAMPLE.md)
