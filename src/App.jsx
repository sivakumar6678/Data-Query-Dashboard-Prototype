import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { store } from './store/store';
import theme from './theme';
import Layout from './components/Layout';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
