import '../styles/global.css' // these styles are applied automatically to all app pages

// this is top-level component common across all pages
// you can keep state or data here when navigating between pages
export default function App({ Component, pageProps }) {
	return <Component {...pageProps} />
}
