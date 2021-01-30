//top level component that is common accross all different pages
//this can be used for keeping the state when navigating between pages
//e.g. is having a global css for related components

//server must be restarted after adding 'pages/_app.js' :(

//global css can only be imported here! why because it affect all elements on page
//eg navigating from homepage would unintentionally affect /posts/first-post

import '../styles/global.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}