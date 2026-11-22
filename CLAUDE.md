# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm start` / `ng serve` — dev server. Note: `angular.json` sets the serve port to **8081** (README's mention of 4200 is stale). Expects the backend API at `http://localhost:8080`.
- `npm run build` / `ng build` — production build by default, output to `dist/hardware_today_front_angular`.
- `npm run watch` — incremental development build.
- `npm test` / `ng test` — Karma + Jasmine unit tests in Chrome. Spec files live next to their source (`*.spec.ts`).
  - Run a single spec by narrowing the pattern in `test/**` — there is no test filter flag configured; use Jasmine `fdescribe`/`fit` or temporarily point `tsConfig`/`include` in `tsconfig.spec.json`.
- `ng generate component <path>` — scaffold; `prefix` is `app`.

No lint script is configured (no ESLint). `tsconfig.json` runs `strict` plus `strictTemplates`, `noPropertyAccessFromIndexSignature`, `noImplicitOverride`, `noImplicitReturns`. `.editorconfig` mandates 2-space indent and single quotes in `.ts`.

## Architecture

Angular 19, **standalone components only** — no `NgModule`. `main.ts` calls `bootstrapApplication(AppComponent, appConfig)`; `app.config.ts` provides the router, async animations, and zone change detection with event coalescing.

### HTTP is axios, not Angular `HttpClient`

Every service creates its own axios instance in its constructor:

```ts
this.api = axios.create({ baseURL: environment.apiUrl + '/<resource>', withCredentials: true })
```

Consequences to keep in mind:
- **Auth is cookie-based.** `withCredentials: true` is required on every instance. `AuthService` holds a response interceptor that catches 401, calls `/user/refresh_token`, and replays the request. Interceptors are **per-instance** — a new service does not inherit them.
- Services return raw axios `Promise<AxiosResponse<T>>`. Components read `res.data` / check `res.status == 200` directly, often bridging into RxJS by hand (see `ProductPageComponent`).
- `environment` lives at `src/enviroments/enviroment.ts` (both words misspelled, intentionally consistent). There is a single env file — no `environment.prod.ts`.
- `UserService` currently hardcodes `http://localhost:8080/user` instead of `environment.apiUrl`; prefer `environment` for any new service.

### State management — mixed

- **RxJS `BehaviorSubject`**: `ProductService` owns the product-filter state (`filter$`, `updateFilter`, `updateTerm`, `getSnapshot`) and the product list. `AuthService` exposes `authStatus$`. Subjects are exposed only as `.asObservable()` so consumers cannot call `.next()`.
- **Angular signals**: `NotificationService` (`_notifications = signal<[]>()`, exposed via `.asReadonly()`).
- `ProductFilterService` is an empty stub — filter logic actually lives in `ProductService`.

### Routing & auth gate

`app.routes.ts`: every real route (`gallery`, `product/:id`, `cart`, `orders`, `orders/:id`, `payment`) is guarded by `AuthGuard`; `login` is open; `**` redirects to `login`. `AuthGuard` is a class implementing `CanActivate`, `async canActivate()` awaits `authService.checkAuthStatus()` (a live `GET /user/status` call on every navigation) and redirects to `/login` on failure.

### Feature areas (`src/app/components/<area>/`)

`product`, `cart`, `payment`, `purchase-orders`, `login`, `main` (nav-bar, footer), `utils` (shared: `default-button`, `default-field`, `default-dialog`, `default-spinner`, `password-field`, `Notification/`).

- **Notifications**: `DefaultNotificationComponent` is mounted once in `app.component.html`; it renders `NotificationToastComponent` per entry in `NotificationService.notifications`. Trigger with `notificationService.success/error/warning/info(...)`. Errors are sticky (`duration: 0`) by default.
- **Dialogs**: `DefaultDialogComponent` is a generic Material dialog driven by `DefaultDialogData` — pass `formFields` (see `DialogFormField`) to have it build a `ReactiveForm` on the fly, plus `onConfirm` / `onCancel` / `onThirdAction` callbacks.
- **Cart** has a server-side state machine: carts are `enabled`/named, `changeCartState` hits `toggle-state/{id}`, `runCartStateAction` hits `state-action` with `{ cartToChange, shouldMerge }` for merging carts. `removeProductFromCart` always sends a quantity (1 = decrement, line quantity = remove line).
- **Payment status is real-time**: `WebSocketService` opens a STOMP-over-WebSocket client to a **hardcoded** `ws://localhost:8080/ws` and subscribes to `/topic/payment/{cartId}`. Not driven by `environment`.

### Backend contract

Paginated endpoints return `Page<T>` = `{ content: T[], page: { size, number, totalElements, totalPages } }` (`models/utils/PageModel.ts`). Product listing is `POST /products` with a `FilterModel` body (not a GET with query params).

### Models (`src/app/models/`)

Grouped by domain (`product/`, `cart/`, `user/`, `payment/`, `purchase-order/`, `utils/`). Interface style is inconsistent — some `export default interface`, some named `export interface`. Match the file you are editing.

### Styling

Global: Angular Material `azure-blue` prebuilt theme + `src/styles.css`; Bootstrap 5 is pulled in only for the Karma test build (`angular.json` → `test.options.styles`) and via `bootstrap` in `package.json`. Per-component styles are `.css` (one outlier, `payment-info.component.scss`).

## Conventions

- Commits follow Conventional Commits (`feat:`, `fix:`, `style:`, `chore:`). Work merges to `master` via GitHub PRs.
