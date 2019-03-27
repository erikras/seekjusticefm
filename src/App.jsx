import React from 'react';
import { Root, Routes } from 'react-static';
import { Grommet, Box } from 'grommet';
const theme = {
    global: {
        colors: {
            brand: '#890000',
            control: {
                light: '#cc3300',
                dark: '#660000',
            },
        },
        font: {
            family: 'Roboto',
            size: '14px',
            height: '20px',
        },
    },
};
function App() {
    return (<Root>
      <Grommet theme={theme} full>
        <Box fill>
          <Box pad="medium" width="xlarge" alignSelf="center">
            <Routes />
          </Box>
        </Box>
      </Grommet>
    </Root>);
}
export default App;
//# sourceMappingURL=App.jsx.map