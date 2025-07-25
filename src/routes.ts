/** 
 * The Default Redirect path after logging in
 * @type {string}
*/
export const DEFAULT_LOGIN_REDIRECT = '/dashboard'


/** 
 * The prefix for api authentication routes
 * The routes that starts with this prefix are used for api authentication purposes
 * @type {string}
*/
export const apiAuthPrefix = '/api/auth' //TODO: Change back to /api/auth


/** 
 * Thes routes are used for authentication purposes
 * The route will authenticate the users to /dashboard
 * @type {string}
*/
export const authRoutes = [
    '/login',
    '/register',
    '/error',
    '/onboarding',
    '/password/reset/form'
]

/** 
 * Thes routes dont require authentication
 * The routes are accessible to public
 * @type {string}
*/
export const publicRoutes = [
    '/',
    '/new-verification',
    '/password/reset',
    '/changelog',
    '/blog/[*]',
    '/api/threat-intelligence/[*]',
    '/threat-intelligence',
    '/[*]'  // TEMP FIX: Allow public access to threat intelligence dashboard
]