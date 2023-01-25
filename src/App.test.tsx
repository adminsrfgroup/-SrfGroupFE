import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { App } from './App';
import { IUser } from './shared/model/user.model';
import { initialState as initialStateCategory } from './main-features/category/store/initial.state';
import { initialState as initialStateAddress } from './main-features/address/store/initial.state';
import { initialState as initialStateHome } from './main-features/home/store/initial.state';
import { initialState as initialStateFooter } from './shared/layout/footer/store/initial.state';
import { initialState as initialStateCommon } from './core/config/store/common/initial.state';
import { initialState as initialStateOffer } from './main-features/offer/store/initial.state';
import createTheme from '@mui/material/styles/createTheme';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

export const ThemeAppMock = createTheme({
    typography: {
        allVariants: {
            fontFamily: 'NotoSansArabic',
        },
    },
    palette: {
        mode: 'dark',
        neutral: {
            main: 'rgb(63 63 64)',
            contrastText: '#fff',
        },
    },
});
export const currentUserMock = {};
export const storeTest = mockStore({
    user: {
        login: {
            token: '',
            loading: false,
            loginWithGoogleOneTapSuccess: false,
        },
        session: {
            isAuthenticated: false,
            token: '',
            currentUser: {},
            nbeNotificationsNotRead: 0,
            nbeMessagesNotRead: 0,
            nbeCarts: 0,
            oneSignalId: '',
            loading: false,
        },
        register: {
            loading: false,
            addSuccess: false,
            errorMessage: null,
        },
        activationAccount: {
            loading: false,
            activation: false,
        },
        locale: {
            currentLocale: 'fr',
        },
        account: {
            loadingPassword: false,
            updateSuccessPassword: false,
            entityUpdateInfos: {} as IUser,
            loadingUpdateInfos: false,
            updateSuccessInfos: false,
            loadingUpdateAvatar: false,
            updateSuccessAvatar: false,
            entityUpdateAvatar: {},
        },
        profile: {
            loading: false,
            entity: {} as IUser,
            loadingReport: false,
            reportSuccess: false,
        },
        password: {
            loadingResetInit: false,
            resetInitSuccess: false,
            loadingResetFinish: false,
            resetFinishSuccess: false,
        },
        websocket: {
            listConnectedUsers: [],
        },
    },
    newsLetter: initialStateFooter,
    common: initialStateCommon,
    home: initialStateHome,
    category: initialStateCategory,
    address: initialStateAddress,
    offer: initialStateOffer,
});

describe('check all components/function on App', () => {
    it('check exit of button ScrollTop', () => {
        render(
            <Provider store={storeTest}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        );
        expect(screen.getByTestId('scroll-top-element')).toBeInTheDocument();
    });

    test('check exist of back-to-top-anchor', () => {
        render(
            <Provider store={storeTest}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        );
        expect(screen.getByTestId('back-to-top-anchor')).toBeInTheDocument();
    });
});
