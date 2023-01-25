import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { currentUserMock, storeTest, ThemeAppMock } from '../../../App.test';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import Header from './header';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

describe('check all components/function on Header', () => {
    test('check exist of title SrfGroup', () => {
        render(
            <Provider store={storeTest}>
                <BrowserRouter>
                    <ThemeProvider theme={ThemeAppMock}>
                        <Header
                            isAuthenticated={false}
                            currentUser={currentUserMock}
                            parentCallbackLogout={(event: any) => null}
                            parentCallbackRightMenuMobile={(event: any) => null}
                            parentCallbackMenuMobile={(event: any) => null}
                            currentLocale={'fr'}
                            onLocaleChange={null}
                            nbeNotificationsNotSee={null}
                            parentCallbackDarkMode={(event: any, checked: boolean) => null}
                            nbeMessagesNotRead={0}
                            nbeCarts={0}
                        />
                    </ThemeProvider>
                </BrowserRouter>
            </Provider>
        );
        expect(screen.getByText('SrfGroup')).toBeInTheDocument();
    });
});
