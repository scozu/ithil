import type { RequestEvent } from '@sveltejs/kit';
import type { AuthSession, AppRole } from './types';

const DEV_FALLBACK_SESSION: AuthSession = {
	userId: 'dev-user-1',
	orgId: 'dev-org-1',
	role: 'owner',
	email: 'dev@ithil.app',
	name: 'Dev Owner'
};

function parseRole(value: string | null): AppRole {
	if (value === 'owner' || value === 'admin' || value === 'editor' || value === 'viewer') {
		return value;
	}

	return 'viewer';
}

export async function getAuthSession(event: RequestEvent): Promise<AuthSession | null> {
	const userId = event.request.headers.get('x-ithil-user-id');
	const orgId = event.request.headers.get('x-ithil-org-id');
	const roleHeader = event.request.headers.get('x-ithil-role');

	if (userId && orgId) {
		return {
			userId,
			orgId,
			role: parseRole(roleHeader)
		};
	}

	// Internal adapter seam for Clerk. Replace this fallback when Clerk middleware is integrated.
	if (process.env.NODE_ENV !== 'production') {
		return DEV_FALLBACK_SESSION;
	}

	return null;
}
