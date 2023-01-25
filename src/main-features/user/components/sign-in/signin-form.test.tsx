import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SignInForm } from './signin-form';

// jest.mock('react-i18next', () => ({
//     // this mock makes sure any components using the translate hook can use it without a warning being shown
//     useTranslation: () => {
//         return {
//             t: (str: string) => str,
//             i18n: {
//                 changeLanguage: () => new Promise(() => {}),
//             },
//         };
//     },
// }));

describe('check all components/function on TopHomeSlides', () => {
    test('rendering and submitting a form', async () => {
        const handleSubmit = jest.fn();
        render(<SignInForm onSubmit={handleSubmit} loading={false} />);
        const user = userEvent.setup();

        await user.type(screen.getByTestId(/email/i), 'john.dee@someemail.com');
        await user.type(screen.getByTestId(/password/i), 'password');

        await user.click(screen.getByTestId('submit'));

        await waitFor(() =>
            expect(handleSubmit).toHaveBeenCalledWith({
                email: 'john.dee@someemail.com',
                password: 'password',
                rememberMe: true,
            })
        );
    });

    test('check required fields of form', async () => {
        // Given
        const handleSubmit = jest.fn();
        render(<SignInForm onSubmit={handleSubmit} loading={false} />);
        const user = userEvent.setup();

        await user.type(screen.getByTestId(/email/i), 'test');
        await user.type(screen.getByTestId(/password/i), 'password');

        // When
        await user.click(screen.getByTestId('submit'));

        // Then
        await waitFor(() =>
            expect(handleSubmit).not.toHaveBeenCalledWith({
                email: '',
                password: '',
                rememberMe: true,
            })
        );
        const emailErrorText = screen.queryByTestId('email-helper-text');
        await waitFor(() => {
            expect(emailErrorText).toBeInTheDocument();
        });
    });
});
