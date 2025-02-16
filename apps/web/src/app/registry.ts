import { loadRemoteModule } from '@angular-architects/module-federation';
import { ENVIRONMENT } from '@environments/environment';
import { appVersion } from '@environments/version';

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const registry: any = {
	panel: (): Promise<any> =>
		loadRemoteModule({
			type: 'module',
			remoteEntry: `${ENVIRONMENT.REMOTE_URLS.PANEL_URL}/remoteEntry.js?v=${appVersion}`,
			exposedModule: './web-components',
		}),
};
