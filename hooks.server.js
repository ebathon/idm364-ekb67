/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ resolve, event }) => {
    
    // Apply CORS headers for API routes
    if (event.url.pathname.startsWith('/api')) {
        
        // Handle preflight requests for CORS
        if (event.request.method === 'OPTIONS') {
            return new Response(null, {
                headers: {
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                }
            });
        }
    }

    // Process the request
    const response = await resolve(event);

    // Add CORS header for API responses
    if (event.url.pathname.startsWith('/api')) {
        response.headers.append('Access-Control-Allow-Origin', '*');
    }

    return response;
};
