import { useEffect, useState } from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { mainTheme as theme } from '../themes/main'
import { Client } from '../classes/Client'
import { ApiProvider } from '../contexts/ApiContext'

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  const [client] = useState(new Client(process.env.NEXT_PUBLIC_API_URL))

  return (
    <>
      <ApiProvider value={{ client }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </ApiProvider>
    </>
  )
}

export default MyApp
