import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { storeTest } from '../../../../App.test';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import SignIn from './sign-in';

afterAll(() => {
    const google = {};
});
describe('check all components/function on TopHomeSlides', () => {
    test('check Social Media Part', async () => {
        // Given
        const view = render(
            <Provider store={storeTest}>
                <BrowserRouter>
                    <SignIn />
                </BrowserRouter>
            </Provider>
        );
        const signinSocialMedia = screen.getByTestId('signin-social-media');

        // When

        // Then
        expect(view).toBeTruthy();
        expect(signinSocialMedia).toBeInTheDocument();
    });
});
