import { json } from '@sveltejs/kit';

export function ok<T>(data: T, status = 200) {
	return json(data, { status });
}

export function fail(code: string, message: string, status = 400, details?: unknown) {
	return json(
		{
			error: {
				code,
				message,
				details
			}
		},
		{ status }
	);
}
