import type { Handle } from '@sveltejs/kit';
import { getAuthSession } from '$lib/server/auth/provider';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.session = await getAuthSession(event);
	return resolve(event);
};
