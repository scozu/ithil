import { error } from '@sveltejs/kit';
import type { AuthSession, AppRole } from './types';

const roleRank: Record<AppRole, number> = {
	viewer: 0,
	editor: 1,
	admin: 2,
	owner: 3
};

export function requireSession(session: AuthSession | null | undefined): AuthSession {
	if (!session) {
		throw error(401, 'Authentication required');
	}

	return session;
}

export function requireRole(session: AuthSession | null | undefined, minimumRole: AppRole): AuthSession {
	const resolvedSession = requireSession(session);

	if (roleRank[resolvedSession.role] < roleRank[minimumRole]) {
		throw error(403, 'Insufficient permissions');
	}

	return resolvedSession;
}
