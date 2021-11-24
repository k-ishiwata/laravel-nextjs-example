import type { AppProps } from 'next/app'
import { NormalizeCSS } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { SWRConfig } from 'swr'
import '../styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
    return (
      <>
          <NormalizeCSS />
          <NotificationsProvider>
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
          </NotificationsProvider>
      </>
  )
}

export default App
