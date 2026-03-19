export type AppRole = 'admin' | 'ops' | 'artist' | 'viewer';

export const normalizeRole = (role?: string | null): AppRole => {
    if (!role) return 'viewer';
    const roleLower = role.toLowerCase();
    if (['admin', 'superadmin', 'owner'].includes(roleLower)) return 'admin';
    if (['ops', 'manager', 'coordinator', 'ceo'].includes(roleLower)) return 'ops';
    if (['artist', 'performer'].includes(roleLower)) return 'artist';
    return 'viewer';
};

export const ROLE_NAV_ACCESS: Record<AppRole, string[]> = {
    admin: ['/admin', '/admin/*', '/ops', '/ops/*'],
    ops: ['/ops', '/ops/*'],
    artist: ['/ops', '/ops/*'],
    viewer: [],
};

export const ROLE_DEFAULT_ROUTE: Record<AppRole, string> = {
    admin: '/admin',
    ops: '/ops',
    artist: '/ops',
    viewer: '/',
};

export const canAccessRoute = (role: AppRole, route: string) => {
    const allowed = ROLE_NAV_ACCESS[role] || [];
    return allowed.some(pattern => {
        if (pattern.endsWith('/*')) {
            const prefix = pattern.replace('/*', '');
            return route === prefix || route.startsWith(`${prefix}/`);
        }
        return route === pattern;
    });
};
