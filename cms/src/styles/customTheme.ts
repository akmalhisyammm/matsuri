import { extendTheme, theme } from '@chakra-ui/react';

import '@fontsource/poppins';

const customTheme = extendTheme({
  fonts: {
    ...theme.fonts,
    heading: 'Poppins, sans-serif',
    body: 'Poppins, sans-serif',
  },
});

export default customTheme;
