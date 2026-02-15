import { createHash, randomBytes, randomUUID } from 'node:crypto';

export interface MockShareLink {
	id: string;
	orgId: string;
	projectId: string;
	token: string;
	tokenHash: string;
	expiresAt: string;
	allowDownload: boolean;
	createdAt: string;
}

export interface MockExport {
	id: string;
	orgId: string;
	projectId: string;
	status: 'queued' | 'processing' | 'finished' | 'failed';
	blobUrl: string | null;
	createdAt: string;
	updatedAt: string;
}

const shareLinks: MockShareLink[] = [];
const exportsQueue: MockExport[] = [];

function hashToken(token: string) {
	return createHash('sha256').update(token).digest('hex');
}

export function createShareLink(orgId: string, projectId: string, expiresAt: string, allowDownload = false) {
	const token = randomBytes(24).toString('hex');
	const item: MockShareLink = {
		id: randomUUID(),
		orgId,
		projectId,
		token,
		tokenHash: hashToken(token),
		expiresAt,
		allowDownload,
		createdAt: new Date().toISOString()
	};

	shareLinks.unshift(item);
	return item;
}

export function getShareByToken(token: string) {
	const tokenHash = hashToken(token);
	return shareLinks.find((link) => link.tokenHash === tokenHash) ?? null;
}

export function createPdfExport(orgId: string, projectId: string) {
	const exportId = randomUUID();
	const now = new Date().toISOString();
	const item: MockExport = {
		id: exportId,
		orgId,
		projectId,
		status: 'queued',
		blobUrl: null,
		createdAt: now,
		updatedAt: now
	};

	exportsQueue.unshift(item);
	return item;
}

export function getExportById(orgId: string, exportId: string) {
	return exportsQueue.find((item) => item.orgId === orgId && item.id === exportId) ?? null;
}

export function processQueuedExports() {
	const processed: string[] = [];

	for (const item of exportsQueue) {
		if (item.status !== 'queued') continue;

		item.status = 'finished';
		item.blobUrl = `/placeholder/export-${item.id}.pdf`;
		item.updatedAt = new Date().toISOString();
		processed.push(item.id);
	}

	return processed;
}

export function finishExport(orgId: string, exportId: string) {
	const item = exportsQueue.find((entry) => entry.orgId === orgId && entry.id === exportId);
	if (!item) return null;

	item.status = 'finished';
	item.blobUrl = `/placeholder/export-${item.id}.pdf`;
	item.updatedAt = new Date().toISOString();
	return item;
}

export function expireShareLinks(now = new Date()) {
	let count = 0;

	for (let i = shareLinks.length - 1; i >= 0; i -= 1) {
		if (new Date(shareLinks[i].expiresAt) <= now) {
			shareLinks.splice(i, 1);
			count += 1;
		}
	}

	return count;
}
