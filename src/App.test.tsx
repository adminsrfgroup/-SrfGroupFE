import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { defaultValue, ICategory } from "./shared/model/category.model";
import { ITopHomeSlidesImages } from "./shared/model/top-home-slides-images.model";
import { ISellOffer } from "./shared/model/sell-offer.model";
import { IRentOffer } from "./shared/model/rent-offer.model";
import { defaultValueOFU } from "./shared/model/offer-favorite-user";
import { IOffer } from "./shared/model/offer.model";
import {App} from "./App";
import {IUser} from "./shared/model/user.model";
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

//
test("renders App", () => {
  const store: any = mockStore({
    user: {
      login: {
        token: "",
        loading: false,
        loginWithGoogleOneTapSuccess: false,
      },
      session: {
        isAuthenticated: false,
        token: "",
        currentUser: {},
        nbeNotificationsNotRead: 0,
        nbeMessagesNotRead: 0,
        nbeCarts: 0,
        oneSignalId: "",
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
        currentLocale: "fr",
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
    newsLetter: {
      newsLetter: {
        loading: false,
        entity: {},
        addSuccess: false,
        errorMessage: null,
      }
    },
    common: {
      unauthorized: {
        showUnauthorized:false
      }
    }
  });

  const component = render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );

  // const textProject = screen.getAllByText("SRF");
  // expect(textProject).toBeTruthy();
  // expect(textProject.length).toBeGreaterThan(0); // Array of  HTMLElement
  //
  // // const scrollToTopRouters = component.getByTestId('scroll-to-top-routers');
  // // expect(scrollToTopRouters).toBeInTheDocument();
  //
  const divScrollTop = component.getByTestId("back-to-top-anchor");
  expect(divScrollTop).toBeInTheDocument();
});
