export type AppRole = 'owner' | 'admin' | 'editor' | 'viewer';

export interface AuthSession {
	userId: string;
	orgId: string;
	role: AppRole;
	email?: string;
	name?: string;
}
