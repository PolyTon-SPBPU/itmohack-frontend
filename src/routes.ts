import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from '@vkontakte/vk-mini-apps-router';

export const DEFAULT_ROOT = 'default_root';

export const DEFAULT_VIEW = 'default_view';

export const HOME_PANELS = {
  TASKS: 'tasks',
  SHOP: 'shop',
  LEADERBOARD: "leaderboard",
} as const;

export const APP_PANELS = {
  INTERESTS: 'interests',
  HOME: 'home',
  TASK: "task",
  PROFILE: 'profile',
  SETTINGS: 'settings',
} as const;

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(APP_PANELS.HOME, `/`, []),
      createPanel(APP_PANELS.INTERESTS, `/${APP_PANELS.INTERESTS}`, []),
      createPanel(APP_PANELS.TASK, `/${APP_PANELS.TASK}`, []),
      createPanel(APP_PANELS.PROFILE, `/${APP_PANELS.PROFILE}`, []),
      createPanel(APP_PANELS.SETTINGS, `/${APP_PANELS.SETTINGS}`, []),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
