import React from 'react';
import { render, screen } from '@testing-library/react';
import TopHomeSlides from './TopHomeSlides';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { storeTest } from '../../../App.test';

describe('check all components/function on TopHomeSlides', () => {
    test('check exist of top-home-slides', () => {
        render(
            <Provider store={storeTest}>
                <BrowserRouter>
                    <TopHomeSlides />
                </BrowserRouter>
            </Provider>
        );
        const element = screen.getByTestId('top-home-slides');
        expect(element).toBeInTheDocument();
    });
});
