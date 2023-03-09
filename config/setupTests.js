/* eslint-disable no-undef */
import React from 'react';
import 'whatwg-fetch'; // fetch for Nodejs
import '@testing-library/jest-dom/extend-expect';

global.React = React;

process.env.BASE_PATH = '/api';

global.insights = {
  chrome: {
    init: () => {},
    identifyApp: () => ({}),
    isBeta: () => true,
    on: () => () => undefined,
    auth: {
      getUser: () =>
        new Promise((resolve) =>
          resolve({
            identity: {
              user: {
                is_org_admin: true,
              },
            },
          })
        ),
      getToken: () => new Promise((resolve) => resolve('token')),
    },
    isProd: () => false,
  },
};

global.innerWidth = 1080;

Element.prototype.scrollTo = () => {};

global.mockApi = () => {
  const mockFn = jest.fn().mockImplementation(
    () =>
      new Promise((res, rej) => {
        mockFn.resolve = res;
        mockFn.reject = rej;
      })
  );

  return mockFn;
};
