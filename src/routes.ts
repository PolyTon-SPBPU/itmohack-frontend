import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  createModal,
  RoutesConfig,
} from '@vkontakte/vk-mini-apps-router';

export const DEFAULT_ROOT = 'default_root';

export const DEFAULT_VIEW = 'default_view';

export const HOME_PANELS = {
  TASKS: 'tasks',
  SHOP: 'shop',
  LEADERBOARD: "leaderboard",
} as const;

export const MODAL = {
  DONATE: "donate",
  SHOP_ITEM: "shop_item",
  PROFILE_ITEM: "profile_item",
  REGISTER: "register",
  LOGIN: 'login'
} as const;

export const APP_PANELS = {
  HOME: 'home',
  TASK: "task",
  PROFILE: 'profile',
} as const;

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(APP_PANELS.HOME, `/`, [
        createModal(MODAL.LOGIN, `/${MODAL.LOGIN}`, ['user_id']),
        createModal(MODAL.REGISTER, `/${MODAL.REGISTER}`, []),
        createModal(MODAL.DONATE, `/${MODAL.DONATE}`, []),
        createModal(MODAL.SHOP_ITEM, `/${MODAL.SHOP_ITEM}`, [])
      ]),
      createPanel(APP_PANELS.TASK, `/${APP_PANELS.TASK}`, [
      ]),
      createPanel(APP_PANELS.PROFILE, `/${APP_PANELS.PROFILE}`, [
        createModal(MODAL.PROFILE_ITEM, `/${MODAL.PROFILE_ITEM}`, [])
      ]),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
