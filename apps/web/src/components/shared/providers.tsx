import { ThemeProvider } from './theme_provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
}
