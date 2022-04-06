import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const fonts = { mono: `'Menlo', monospace` }

const breakpoints = createBreakpoints({ sm: '20em', md: '52em', lg: '64em', xl: '80em' })

const theme = extendTheme(
  withDefaultColorScheme({
    colorScheme: 'Orange.800',
    components: ['Button', 'Badge'],
  }),
  { 
    // colors: { black: '#000000' }, 
    // fonts, 
    breakpoints,
    styles: {
      global: {
        button: {
          _hover: {
            bg: '#CEBFBF',
            color: 'black'
          },
          _focus: {
            boxShadow: 'none !important',

          }
        }
      },
    },
  },
)

export default theme
