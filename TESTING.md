# 🧪 Guide des tests - World Cup 2026

## Vue d'ensemble

Ce projet utilise **Vitest** pour les tests unitaires avec une architecture monorepo multi-packages.

**Total : 105 tests** répartis sur 3 packages :
- `apps/fr` : 11 tests (middleware, API, utils)
- `packages/ui` : 68 tests (composants React)
- `packages/data` : 26 tests (helpers, constants, routes)

---

## 🚀 Commandes

### Lancer tous les tests
```bash
npm test
```

### Tests par package
```bash
npm run test:fr        # apps/fr → 11 tests
npm run test:ui        # packages/ui → 68 tests
npm run test:data      # packages/data → 26 tests
```

### Mode watch (développement)
```bash
cd apps/fr && npx vitest
cd packages/ui && npx vitest
cd packages/data && npx vitest
```

---

## 📁 Structure des tests

```
worldcup2026/
├── apps/fr/__tests__/               # Tests app Next.js
│   ├── middleware.test.ts           # 4 tests
│   ├── rate-limit.test.ts           # 3 tests
│   ├── newsletter.test.ts           # 3 tests
│   └── calendar.test.ts             # 1 test
│
├── packages/ui/__tests__/           # Tests composants UI
│   ├── stat-card.test.tsx           # 7 tests
│   ├── match-card.test.tsx          # 17 tests
│   ├── button.test.tsx              # 22 tests
│   ├── flag.test.tsx                # 5 tests
│   ├── card.test.tsx                # 9 tests
│   └── breadcrumb.test.tsx          # 8 tests
│
└── packages/data/__tests__/         # Tests data/utils
    ├── route-mapping.test.ts        # 14 tests
    └── constants.test.ts            # 12 tests
```

---

## ⚙️ Configuration Vitest

### `apps/fr/vitest.config.ts`
```typescript
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: {
      '@repo/data': path.resolve(__dirname, '../../packages/data/src'),
      '@repo/ui': path.resolve(__dirname, '../../packages/ui/src'),
    },
  },
})
```

### `packages/ui/vitest.config.ts`
```typescript
import { defineConfig } from 'vitest/config'
import path from 'path'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: {
      '@repo/data': path.resolve(__dirname, '../data/src'),
      '@repo/ui': path.resolve(__dirname, './src'),
    },
  },
})
```

### `packages/data/vitest.config.ts`
```typescript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
  },
})
```

---

## 🔧 Setup

### Setup files (`vitest.setup.ts`)
```typescript
import '@testing-library/jest-dom'
```

Permet d'utiliser les matchers comme :
- `toBeInTheDocument()`
- `toHaveClass()`
- `toHaveAttribute()`
- etc.

---

## 📝 Écrire des tests

### Test d'un composant UI

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MyComponent } from '../src/my-component'

describe('MyComponent', () => {
  it('renders with props', () => {
    render(<MyComponent title="Hello" />)
    
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
  
  it('applies className', () => {
    const { container } = render(<MyComponent className="custom" />)
    
    expect(container.firstChild).toHaveClass('custom')
  })
})
```

### Mocker Next.js Link

```typescript
import { vi } from 'vitest'

vi.mock('next/link', () => ({
  default: ({ children, href, className }: any) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}))
```

### Test d'une fonction utilitaire

```typescript
import { describe, it, expect } from 'vitest'
import { myFunction } from '../src/utils'

describe('myFunction', () => {
  it('returns correct value', () => {
    const result = myFunction('input')
    
    expect(result).toBe('expected output')
  })
  
  it('handles edge cases', () => {
    expect(myFunction('')).toBe('')
    expect(myFunction(null)).toBe(null)
  })
})
```

---

## 🎯 Bonnes pratiques

### Nommage des tests
- **✅ Bon :** `it('renders team names and flags', ...)`
- **❌ Éviter :** `it('test 1', ...)`

### Organisation
- Un fichier de test par composant/module
- Grouper les tests avec `describe()`
- Tests atomiques et indépendants

### Coverage
- Tester les cas normaux ET les edge cases
- Tester les variants de props
- Tester les interactions utilisateur (click, hover, etc.)

### Mocking
- Ne mocker que le strict nécessaire
- Préférer les vrais composants quand possible
- Documenter les mocks complexes

---

## 🐛 Débogage

### Afficher le DOM rendu
```typescript
import { render } from '@testing-library/react'

const { debug } = render(<MyComponent />)
debug() // Affiche le HTML dans la console
```

### Afficher une erreur précise
```bash
cd packages/ui
npx vitest run button.test.tsx --reporter=verbose
```

### Mode watch avec UI
```bash
cd packages/ui
npx vitest --ui
```

---

## 📚 Ressources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [@testing-library/jest-dom matchers](https://github.com/testing-library/jest-dom)

---

**Dernière mise à jour : 2026-02-20**  
**Maintenu par : Hugo 🚀 QA Agent**
