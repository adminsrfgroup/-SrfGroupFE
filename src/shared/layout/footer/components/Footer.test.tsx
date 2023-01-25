import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { storeTest, ThemeAppMock } from '../../../../App.test';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import React from 'react';
import Footer from '../footer';

describe('check all components/function on Footer', () => {
    test('check exist of title SrfGroup', () => {
        render(
            <Provider store={storeTest}>
                <BrowserRouter>
                    <ThemeProvider theme={ThemeAppMock}>
                        <Footer />
                    </ThemeProvider>
                </BrowserRouter>
            </Provider>
        );
        expect(screen.getByTestId('logo-srf-group')).toBeInTheDocument();
    });

    it('check exist of form NewsLetter', () => {
        render(
            <Provider store={storeTest}>
                <BrowserRouter>
                    <ThemeProvider theme={ThemeAppMock}>
                        <Footer />
                    </ThemeProvider>
                </BrowserRouter>
            </Provider>
        );
        expect(screen.getByTestId('form-news-letter')).toBeInTheDocument();
    });
});
