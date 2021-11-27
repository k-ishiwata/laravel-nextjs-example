import type { AppProps } from 'next/app'
import { NormalizeCSS, MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { SWRConfig } from 'swr'
import { ToastContainer } from 'react-toastify'
import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

const App = ({ Component, pageProps }: AppProps) => {
    return (
      <>
          <NormalizeCSS />
          <MantineProvider>
              <ModalsProvider>
                  <SWRConfig
                      value={{
                          // エラー時リトライ回数
                          errorRetryCount: 0,
                          // windowフォーカス時再取得しない
                          revalidateOnFocus: false
                      }}
                  >
                      <Component {...pageProps} />
                  </SWRConfig>
              </ModalsProvider>
          </MantineProvider>
          <ToastContainer
              position="bottom-right"
              autoClose={2000}
              hideProgressBar
              style={{ fontSize: 14, fontWeight: 'bold' }}
          />
      </>
  )
}

export default App
