import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin', 'cyrillic'] });
import { ConfigProvider } from 'antd';

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>

    <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#000',
          },
        }}
    >
        <Component {...pageProps} />
    </ConfigProvider>
  </>
}
