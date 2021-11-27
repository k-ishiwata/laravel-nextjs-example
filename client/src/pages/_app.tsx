import type { AppProps } from 'next/app'
import { NormalizeCSS, MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'
import { SWRConfig } from 'swr'
import '../styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
    return (
      <>
          <NormalizeCSS />
          <MantineProvider>
              <ModalsProvider>
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
              </ModalsProvider>
          </MantineProvider>
      </>
  )
}

export default App
