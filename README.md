# Video Browser

A React + TypeScript application for browsing a video dataset with real-time filtering by search, release year, and genre.

## Tech Stack

- React
- TypeScript
- Vite
- React Query
- React Router
- Tailwind CSS
- shadcn/ui
- Vitest + React Testing Library

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Other available scripts:

```bash
npm run build
npm run preview
npm run lint
npm run test
npm run test:watch
```

## Data Source

The application fetches data from:

https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json

No backend or API key is required.

---

## Features

- Search videos by **artist** or **title**
- Debounced search input
- Filter by **release year**
- Multi-select **genre** filter
- Filters combine using **AND** logic
- Dynamic year and genre options based on the current search
- Loading, error, and empty states
- Responsive layout (1–3 columns)

---

## Project Structure

```text
src/
├── components/
│   ├── filters/
│   ├── ui/
│   └── video/
├── hooks/
├── services/
├── types/
└── test/
```

---

## Architecture

### Data Fetching

The dataset is fetched once using React Query and cached under a single query key (`["videos"]`). All filtering happens on the client, avoiding additional network requests when filters change.

### Filter State

Filter values are stored in the URL using `useSearchParams`, making them shareable and preserving state on refresh.

### Filtering

Filtering is handled by a single pure `filterVideos` utility that combines:

- search (artist or title)
- selected genres
- selected year

using **AND** logic.

### Search

The search input is debounced (300ms) before updating the filter state to avoid filtering on every keystroke.

---

## Testing

The project uses **Vitest** and **React Testing Library**.

Tests cover:

- `filterVideos`
- `useDebounce`
- `VideoCard`
- `VideoGrid`

Run tests with:

```bash
npm run test
```

---

## Assumptions

- The dataset is small enough to be fetched once and filtered entirely on the client.
- Genre filtering is based on `genre_id` rather than genre name.
- The application consists of a single page, with filter state persisted in the URL.

---

## Future Improvements

- Virtualized list for larger datasets.
- Additional accessibility improvements.
- UI animations and transitions.
- End-to-end tests.
