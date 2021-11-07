import type { AppProps } from 'next/app'
import { NormalizeCSS } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'

function MyApp({ Component, pageProps }: AppProps) {
    return (
      <>
          <NormalizeCSS />
          <NotificationsProvider>
            <Component {...pageProps} />
          </NotificationsProvider>
      </>
  )
}

export default MyApp
