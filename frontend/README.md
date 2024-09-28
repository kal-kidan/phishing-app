<p align="center">
  <h1 align="center">React JS Authentication Boilerplate</h1>
</p>

## Getting started

### Prerequisites

You need to install on your machine [Node.js](https://nodejs.org) or [Yarn](https://yarnpkg.com).

### Installing dependencies

```bash
npm install
# or
yarn install
```

## Project setup

### Compiles and hot-reloads for development

```bash
# start app open development mode
yarn start
# or
npm run start
```

### Compiles and minifies for production

```bash
yarn build
# or
npm run build
```

### Lints and fixes files
```bash
# show errors
yarn lint
# or
npm run lint

# fix errors
yarn lint:fix
# or
npm run lint:fix
```

### Run your unit tests

```bash
# run tests
yarn test
# or
npm run test

# run tests on watch mode
yarn test:watch
# or
npm run test:watch

# run tests on coverage mode
yarn test:coverage
# or
npm run test:coverage

# run tests on coverage with watch mode
yarn test:coverage:watch
# or
npm run test:coverage:watch
```

## Route types

The route components are based on `<Route />` component of [react-router-dom](https://reactrouter.com/web/guides/quick-start) and receive same props.

### Public route

The route can only be accessed if a user is not authenticated. If accessed after authentication, the user will be redirected `/` route.

```tsx
import { Routes } from 'react-router-dom'
import { PublicRoute } from 'src/router/PublicRoute'

const SampleComponent = () => <div>Sample component</div>

export const Router = () => (
  <Routes>
    <PublicRoute
      path="/login"
      component={SampleComponent}
    />
  </Routes>
)
```

### Private route

The route can only be accessed if a user is authenticated. Use permission props (returned by the API) to access the control.

```tsx
import { Routes } from 'react-router-dom'
import { PrivateRoute } from 'src/router/PrivateRoute'

const SampleComponent = () => <div>Sample component</div>

export const Router = () => (
  <Routes>
    {/*
      allow route access if the user has the permissions
      `users.list` and `users.create`
    */}
    <PrivateRoute
      path="/users"
      component={SampleComponent}
      permissions={['users.list', 'users.create']}
    />
  </Routes>
)
```

### Hybrid route

The route can be accessed if a user is authenticated or not. Use `Route` component.

```tsx
import { Route, Routes } from 'react-router-dom'

const SampleComponent = () => <div>Sample component</div>

export const Router = () => (
  <Routes>
    <Route path="/contact" element={<SampleComponent />} />
  </Routes>
)
```