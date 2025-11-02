import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import store from './store.js';
import App from './App.jsx';
import './styles.css';

const theme = createTheme({
	palette: {
		primary: {
			main: '#0066cc', // Disney blue
			light: '#3b9eff', // Disney magical blue
			dark: '#0047ab', // Disney royal blue
		},
		secondary: {
			main: '#ff6b9d', // Disney pink
			light: '#ff9bc8',
			dark: '#cc3568',
		},
		background: {
			default: 'transparent',
			paper: '#ffffff',
		},
	},
	typography: {
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
		h4: {
			fontWeight: 700,
			letterSpacing: '0.5px',
		},
	},
	shape: {
		borderRadius: 12,
	},
});

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
]);

const root = createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<RouterProvider router={router} />
			</ThemeProvider>
		</Provider>
	</React.StrictMode>
);


