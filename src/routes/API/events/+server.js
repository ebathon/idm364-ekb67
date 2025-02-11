import { json } from '@sveltejs/kit';

export async function GET({ url }) {
    // Get 'city' parameter from query string, use "New York" as default if not provided
    const city = url.searchParams.get("city") || "New York"; 

    try {
        const apiUrl = `https://serpapi.com/search.json?q=Events+in+${encodeURIComponent(city)}&engine=google_events&api_key=3c841f4f01acb1abd48231b81a29ce5b81a5d92648b51779fadbd761cc580fb5`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        return json(data, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        });
    } catch (error) {
        console.error("Error fetching from SerpAPI:", error);
        return json({ error: "Failed to fetch events" }, { status: 500 });
    }
}
