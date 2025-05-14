
# Food Delivery Hub - Scripts Documentation

This document provides information about all available npm scripts in the project, explaining their purpose and providing usage examples.

## Available Scripts

### Development Scripts

#### `dev`

Starts the development server with hot reloading.

```bash
npm run dev
```

This starts a local development server at `http://localhost:5173` (or another port if 5173 is occupied). The page will automatically reload if you make changes to the code. You will also see any lint errors in the console.

#### `build`

Builds the application for production to the `dist` folder.

```bash
npm run build
```

This bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include hashes for efficient caching.

#### `preview`

Serves the production build locally for preview before deployment.

```bash
npm run build
npm run preview
```

This allows you to test the production build locally before deploying to a hosting service. It starts a local server at `http://localhost:4173` by default.

### Linting and Type Checking

#### `lint`

Runs ESLint to check for code quality issues and formatting problems.

```bash
npm run lint
```

This helps maintain code quality and consistency across the project.

#### `lint:fix`

Automatically fixes ESLint issues where possible.

```bash
npm run lint:fix
```

Use this when you want to automatically fix formatting and code style issues.

#### `type-check`

Runs TypeScript compiler to check for type errors without emitting code.

```bash
npm run type-check
```

This is useful to verify type safety across the codebase without building the project.

### Testing

#### `test`

Runs the test suite using Vitest.

```bash
npm run test
```

This executes all test files in the project, displaying the results in the terminal.

#### `test:watch`

Runs tests in watch mode, automatically re-running when files change.

```bash
npm run test:watch
```

This is useful during development when you're actively working on tests.

#### `test:coverage`

Runs tests and generates a coverage report.

```bash
npm run test:coverage
```

This shows how much of your code is covered by tests, helping identify areas that need more testing.

### Utility Scripts

#### `clean`

Removes the build output directory (`dist`) and any cached files.

```bash
npm run clean
```

Use this to ensure a completely fresh build environment.

#### `format`

Formats code using Prettier according to the project's style rules.

```bash
npm run format
```

This ensures consistent code formatting across the entire codebase.

## Usage Workflows

### Development Workflow

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Make your changes to the code

3. Check for linting issues:
   ```bash
   npm run lint
   ```

4. Fix any linting issues:
   ```bash
   npm run lint:fix
   ```

5. Verify type safety:
   ```bash
   npm run type-check
   ```

6. Run tests to ensure nothing is broken:
   ```bash
   npm run test
   ```

### Production Build Workflow

1. Clean the build directory:
   ```bash
   npm run clean
   ```

2. Build the production version:
   ```bash
   npm run build
   ```

3. Preview the production build locally:
   ```bash
   npm run preview
   ```

4. Deploy the contents of the `dist` directory to your hosting service
