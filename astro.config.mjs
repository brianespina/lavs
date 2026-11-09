// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

import cloudflare from '@astrojs/cloudflare';

/**
 * @typedef {Parameters<NonNullable<Astro.IntegrationHooks['astro:config:setup']>>[0]} ConfigSetupOptions
 */

/**
 * The one route we deliberately own instead of letting Keystatic inject it.
 * See `keystaticOwnAdminRoute` below and docs/cms.md.
 */
const ADMIN_ROUTE = '/keystatic/[...params]';

/**
 * Keystatic's integration unconditionally injects its own admin page at
 * ADMIN_ROUTE, which collides with our override at
 * `src/pages/keystatic/[...params].astro`. That override exists so the admin
 * UI gets a real `<head>` — and therefore a favicon — since the injected page
 * renders none at all.
 *
 * Astro keeps both routes in the manifest and currently serves ours, but only
 * because file-based routes are concatenated ahead of injected ones and the
 * sort is stable. Neither is a guarantee, and Astro warns that the duplicate
 * "will result in a hard error in following versions of Astro".
 *
 * So suppress the injected page route and keep ours. Everything else the
 * integration does is untouched: the vite plugin, the dev-server host pin,
 * `.astro/keystatic-imports.js`, and the `/api/keystatic/[...params]` route.
 *
 * Note `astro:routes:resolved` cannot do this — it receives a mapped copy of
 * the route list, so filtering it has no effect.
 */
function keystaticOwnAdminRoute() {
  const integration = keystatic();
  const setup = integration.hooks['astro:config:setup'];
  if (!setup) {
    throw new Error(
      "The Keystatic integration no longer defines an 'astro:config:setup' hook — " +
        'the admin-route override in astro.config.mjs needs revisiting.',
    );
  }

  return {
    ...integration,
    hooks: {
      ...integration.hooks,
      'astro:config:setup': (/** @type {ConfigSetupOptions} */ options) => {
        let suppressed = 0;
        const result = setup({
          ...options,
          injectRoute: (route) => {
            if (route.pattern === ADMIN_ROUTE) {
              suppressed++;
              return;
            }
            return options.injectRoute(route);
          },
        });
        // If Keystatic ever renames the route, this silently stops working and
        // the collision quietly returns. Make that loud instead.
        if (suppressed !== 1) {
          options.logger.warn(
            `Expected to suppress exactly 1 injected "${ADMIN_ROUTE}" route, but suppressed ${suppressed}. ` +
              `Keystatic may have changed its route; re-check src/pages/keystatic/[...params].astro.`,
          );
        }
        return result;
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react(), markdoc(), keystaticOwnAdminRoute()],
  adapter: cloudflare()
});
