import { Html, Head, Main, NextScript } from 'next/document'
import rocketIcon from '../assets/rocket-icon.png'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap" rel="stylesheet" />
        
        <link rel="shortcut icon" href="/favicon/rocket-icon.png" type="image/x-icon" />
      </Head>
      <body className='bg-app bg-no-repeat bg-cover'>
        <NextScript />
        <Main />
      </body>
    </Html>
  )
}