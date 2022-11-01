This is a starter template for [Learn Next.js](https://nextjs.org/learn).

# Notes

## General

-   NextJS polyfills `fetch` on client and server
-   **gray-matter**: parse markdown headers
-   **date-fns**: format dates
-   **remark & remark-html**: create HTML from markdown

## Link

-   uses **client-side navigation** (instead of full page refresh with `a`)
-   any `Link` used on the page tells Next to **prefetch** that page
-   used for internal routes
-   does not need `a` child, but does need it if you want to style with `className` or use other attributes
-   allows **code splitting** (Next only serves files relevant to the current page, not the whole app)
-   `legacyBehavior` attribute required to put `a` inside `Link`?

## Image

-   defaults to **lazy load**
-   needs `width` & `height` in correct aspect ratio of image
-   handles image optimization (resizing/compressing/etc)
-   avoids layout shifts

## Head

-   allows you to dictate what goes in `head` tag on each page
-   to customize `html` tag, create **pages/\_document.js** file

## Script

-   can dictate when to load script using `strategy` attribute
-   can run code after script is loaded using `onLoad` attribute

## CSS

-   Next supports CSS/Sass/SCSS **modules**
-   modules are scoped to the component they are used in (`className` you use are randomly generated to avoid conflicts)
-   import styles from module as variable, then access classes by using `styleVariable.className`
-   Next uses **code splitting** for styling modules
-   generated to .css files at build time
-   global CSS can only be imported from **pages/\_app.js**
-   use `classnames` library (`cn`) for toggling classes more easily
-   can configurate PostCSS compiling CSS using top-level **postcss.config.js** (useful if using something like Tailwind)
-   `npm install -D sass` to use **.scss/.sass** modules

## Pre-rendering

-   **pre-rendering** renders app's static HTML (does not require client-side JS)
-   after prerendering, **hydration** is injection of JS code that makes the page interactive (React components are initialized & added to page)
-   **Static Generation**: HTML is generated at build time (fastest method for users, best for static pages that don't change often - can be cached by CDN)
-   **Server-side Rendering**: HTML is generated on each request (can be used if content changes on every request)
-   each page can use a different pre-rendering method
-   dev mode uses Static Generation

## getStaticProps

-   runs at build time (for **Static Generation with Data**)
-   allows to fetch data before statically generating HTML at build time
-   Note: in dev, this runs with each request instead of only at initial build
-   any data returned with property name `props` will be passed to the component as a prop
-   async function
-   get data from external API, file system, or database and pass it to your component to statically generate the HTML **with data**
-   only runs on server side
-   can only be used in **page** files

## getServerSideProps

-   same structure as `getStaticProps(context)`
-   `context` contains request-specific parameters

## Client Side Rendering

-   statically generate (pre-render) part of the page and when page loads, get data from client side using JS
-   good for pages that are not relevant to SEO (private user pages, private user dashboards/profiles, etc) but that also render dynamic data that must be fetched at request time
-   use `SWR` React hook - handles caching, revalidation, focus tracking, etc

## Dynamic Routing

-   files have the form `[paramName]`
-   `getStaticPaths` should return `{paths, fallback: true/false}` where `paths` is an array of objects, where each object contains a property `param` that is an object with the key-value pair of `paramName-paramValue`
-   `getStaticPaths` can get data from anywhere (external API, file system, or database) - it runs on every request in dev mode, runs at build time in production
-   `fallback: false` means any unidentified paths will give 404 page
-   `fallback: true` means: (1) HTML is rendered at build time for all paths returned by `getStaticPaths` (2) no 404 page, fallback page instead on first request which is statically generated (3) subsequent requests to same unidentified path will be served same statically genereated page
-   `getStaticProps` will be given object with `params` inside that has the value of all params on the dynamic route
-   **catch-all routes**: use spread operator in array returned by `getStaticPaths` & `paramName` of each possible `path` must be an array of possible values for `paramName`
-   `useRouter` hook for accessing Next Router
-   **pages/404/js** will be the 404 page

## API Routes

-   create an API endpoint within Next app (serverless function)
-   create function inside **pages/api** folder
-   **DO NOT** fetch API endpoint from `getStaticProps` or `getStaticPaths` (write server-side code inside these functions or call a helper)
-   don't get sent to client (server-side code only)
-   good use case: handling form input to store in database
-   **Preview Mode**: bypass Static Generation
-   can be dynamic

## Deployment

-   **Vercel**: use all default settings
-   **Preview Deployment**: push code to a new branch and create PR to merge to `main` - Vercel will add a preview link as a comment
-   deploying elsewhere: run `npm run build` which builds production app in `.next` folder, then run `npm run start` to start the app
-   can use `"start": "next start -p $PORT"` as npm start script to allow `port` param

## TypeScript NextJS Types

-   `getStaticProps`: `GetStaticProps`
-   `getStaticPaths`: `GetStaticPaths`
-   `getServerSideProps`: `GetServerSideProps`
-   API `req`: `NextApiRequest`
-   API `res`: `NextApiResponse`
-   top level App props: `AppProps`
