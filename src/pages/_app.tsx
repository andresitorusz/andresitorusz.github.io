import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import { SiteLayout } from 'components/layout';
import 'styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SiteLayout>
        <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
          <motion.div
            key={router.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </SiteLayout>
    </ThemeProvider>
  );
}
