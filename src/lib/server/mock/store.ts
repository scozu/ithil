import { randomUUID } from 'node:crypto';
import type {
	AssetListItem,
	CreateProjectInput,
	Project,
	UploadCompleteInput,
	UpdateAssetInput,
	UpdateProjectInput
} from '$lib/shared/contracts';

const nowIso = () => new Date().toISOString();

const defaultOrgId = 'dev-org-1';

const projects: Project[] = [
	{
		id: 'dev-project-1',
		orgId: defaultOrgId,
		name: 'New Project',
		description: null,
		createdAt: nowIso(),
		updatedAt: nowIso()
	}
];

const assets: AssetListItem[] = [
	{
		id: 'asset-1',
		projectId: 'dev-project-1',
		orgId: defaultOrgId,
		title: 'Title',
		filename: 'asset-1.jpg',
		thumbnailUrl: '/placeholder/asset.svg',
		year: 2025,
		materials: 'Materials',
		dimensions: 'Dimensions',
		createdAt: nowIso()
	},
	{
		id: 'asset-2',
		projectId: 'dev-project-1',
		orgId: defaultOrgId,
		title: 'Title',
		filename: 'asset-2.jpg',
		thumbnailUrl: '/placeholder/asset.svg',
		year: 2025,
		materials: 'Materials',
		dimensions: 'Dimensions',
		createdAt: nowIso()
	},
	{
		id: 'asset-3',
		projectId: 'dev-project-1',
		orgId: defaultOrgId,
		title: 'Title',
		filename: 'asset-3.jpg',
		thumbnailUrl: '/placeholder/asset.svg',
		year: 2025,
		materials: 'Materials',
		dimensions: 'Dimensions',
		createdAt: nowIso()
	},
	{
		id: 'asset-4',
		projectId: 'dev-project-1',
		orgId: defaultOrgId,
		title: 'Title',
		filename: 'asset-4.jpg',
		thumbnailUrl: '/placeholder/asset.svg',
		year: 2025,
		materials: 'Materials',
		dimensions: 'Dimensions',
		createdAt: nowIso()
	},
	{
		id: 'asset-5',
		projectId: 'dev-project-1',
		orgId: defaultOrgId,
		title: 'Title',
		filename: 'asset-5.jpg',
		thumbnailUrl: '/placeholder/asset.svg',
		year: 2025,
		materials: 'Materials',
		dimensions: 'Dimensions',
		createdAt: nowIso()
	},
	{
		id: 'asset-6',
		projectId: 'dev-project-1',
		orgId: defaultOrgId,
		title: 'Title',
		filename: 'asset-6.jpg',
		thumbnailUrl: '/placeholder/asset.svg',
		year: 2025,
		materials: 'Materials',
		dimensions: 'Dimensions',
		createdAt: nowIso()
	}
];

export function listProjects(orgId: string) {
	return projects.filter((project) => project.orgId === orgId);
}

export function getProject(orgId: string, projectId: string) {
	return projects.find((project) => project.orgId === orgId && project.id === projectId) ?? null;
}

export function createProject(orgId: string, input: CreateProjectInput) {
	const project: Project = {
		id: randomUUID(),
		orgId,
		name: input.name,
		description: input.description ?? null,
		createdAt: nowIso(),
		updatedAt: nowIso()
	};

	projects.unshift(project);
	return project;
}

export function updateProject(orgId: string, projectId: string, input: UpdateProjectInput) {
	const existing = getProject(orgId, projectId);
	if (!existing) {
		return null;
	}

	if (input.name !== undefined) existing.name = input.name;
	if (input.description !== undefined) existing.description = input.description ?? null;
	existing.updatedAt = nowIso();

	return existing;
}

export function listAssetsByProject(orgId: string, projectId: string, q?: string) {
	const filtered = assets.filter((asset) => asset.orgId === orgId && asset.projectId === projectId);
	if (!q) {
		return filtered;
	}

	const needle = q.toLowerCase();
	return filtered.filter((asset) => {
		const haystack = `${asset.title} ${asset.materials ?? ''} ${asset.dimensions ?? ''}`.toLowerCase();
		return haystack.includes(needle);
	});
}

export function updateAsset(orgId: string, assetId: string, input: UpdateAssetInput) {
	const existing = assets.find((asset) => asset.orgId === orgId && asset.id === assetId);
	if (!existing) {
		return null;
	}

	if (input.title !== undefined) existing.title = input.title;
	if (input.year !== undefined) existing.year = input.year;
	if (input.materials !== undefined) existing.materials = input.materials;
	if (input.dimensions !== undefined) existing.dimensions = input.dimensions;

	return existing;
}

export function createAssetFromUpload(orgId: string, input: UploadCompleteInput) {
	const asset: AssetListItem = {
		id: randomUUID(),
		projectId: input.projectId,
		orgId,
		title: input.title ?? input.filename,
		filename: input.filename,
		thumbnailUrl: '/placeholder/asset.svg',
		year: input.year ?? null,
		materials: input.materials ?? null,
		dimensions: input.dimensions ?? null,
		createdAt: nowIso()
	};

	assets.unshift(asset);
	return asset;
}
