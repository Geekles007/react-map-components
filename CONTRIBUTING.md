# Contributing to React Map Components

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## Development Setup

### Prerequisites

- Node.js 18+
- pnpm 8+

### Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/react-map-components.git
   cd react-map-components
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Start the development environment:
   ```bash
   pnpm dev
   ```

## Development Workflow

### Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start Storybook for development |
| `pnpm build` | Build the library |
| `pnpm test` | Run tests |
| `pnpm test:ui` | Run tests with UI |
| `pnpm test:coverage` | Run tests with coverage |
| `pnpm lint` | Lint the code |
| `pnpm lint:fix` | Fix linting issues |
| `pnpm typecheck` | Type check the code |

### Creating a New Component

1. Create a new folder in `src/components/` with the component name
2. Add the following files:
   - `ComponentName.tsx` - The component implementation
   - `ComponentName.test.tsx` - Tests
   - `ComponentName.stories.tsx` - Storybook stories
   - `index.ts` - Exports
3. Export the component from `src/components/index.ts`
4. Export the component from `src/index.ts`

### Writing Tests

We use Vitest and React Testing Library. Ensure all components have:

- Unit tests for props and behavior
- Integration tests for interactions

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run tests with coverage
pnpm test:coverage
```

### Code Style

- We use ESLint and Prettier for code formatting
- Run `pnpm lint:fix` to automatically fix issues
- Follow the existing code patterns

## Submitting Changes

### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `chore:` - Maintenance tasks
- `test:` - Test additions or changes
- `refactor:` - Code refactoring

### Creating a Changeset

For any user-facing changes, create a changeset:

```bash
pnpm changeset
```

Follow the prompts to describe your changes.

### Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Ensure tests pass: `pnpm test`
4. Ensure linting passes: `pnpm lint`
5. Create a changeset if needed
6. Push and create a Pull Request
7. Wait for CI checks and review

## Questions?

Feel free to open an issue for any questions or concerns!
