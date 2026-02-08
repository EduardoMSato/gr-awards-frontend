# Golden Raspberry Awards Frontend

Aplicacao Angular para consulta de dados do Golden Raspberry Awards, incluindo filmes vencedores, ranking de studios e intervalos de premiacoes de produtores.

## Pre-requisitos

- Node.js 16.x ou 18.x

## Instalacao

```bash
npm install
```

## Executando a Aplicacao

```bash
npm run start
```

Acesse `http://localhost:4200/`. A aplicacao redireciona para o Dashboard por padrao.

## Testes

```bash
# Interativo (watch mode, abre o Chrome)
npm test

# Headless (execucao unica, ideal para CI)
npm run test:headless

# Com coverage report
npm run test:coverage
```

O coverage report e gerado em `coverage/gr-awards-frontend/index.html`.

## Lint e Formatacao

```bash
npm run lint
npm run format
npm run format:check
```

## Build

```bash
npm run build
```

Os artefatos de build sao armazenados no diretorio `dist/`.

## Estrutura do Projeto

```
src/app/
├── core/                          # Services singleton, models, interceptors
│   ├── models/movie.model.ts      # Interfaces TypeScript para respostas da API
│   ├── services/movie.service.ts  # Todas as chamadas da API (5 metodos)
│   └── interceptors/              # HTTP interceptor (injecao da base URL)
├── shared/                        # SharedModule (exports PrimeNG + FormsModule)
├── layout/                        # App shell (HeaderComponent com navegacao)
├── features/
│   ├── dashboard/                 # Lazy-loaded — dashboard com 4 paineis
│   │   └── components/
│   │       ├── years-multiple-winners/
│   │       ├── top-studios/
│   │       ├── producer-win-interval/
│   │       └── winners-by-year/
│   └── movie-list/                # Lazy-loaded — tabela de filmes com paginacao e filtros
├── app-routing.module.ts          # Lazy routes: /dashboard, /movies
├── app.module.ts
└── app.component.ts
```

## Tech Stack

| Camada | Tecnologia |
|---|---|
| Framework | Angular 15 |
| Componentes | PrimeNG 15 (Lara Light Indigo theme) |
| Layout | Tailwind CSS 3 |
| Testes | Jasmine + Karma |
| Qualidade de Codigo | ESLint + Prettier |
| Git Hooks | Husky + lint-staged |

## API

Consome a API REST do Golden Raspberry Awards em `https://challenge.outsera.tech/api/movies`.
