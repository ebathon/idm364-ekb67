import { json } from '@sveltejs/kit';

export async function GET({ url }) {
    const city = url.searchParams.get("city") || "New York";
    const serpApiKey = process.env.SERPAPI_KEY; // Securely get API key

    // Check if the API key is missing
    if (!serpApiKey) {
        console.error("SerpAPI key is missing. Set SERPAPI_KEY in environment variables.");
        return json({ error: "SerpAPI key is missing" }, { status: 500 });
    }

    try {
        const apiUrl = `https://serpapi.com/search.json?q=Events+in+${encodeURIComponent(city)}&engine=google_events&api_key=${serpApiKey}`;
        console.log("Fetching from SerpAPI:", apiUrl);

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`SerpAPI request failed with status: ${response.status}`);
        }

        const data = await response.json();

        return json(data, {
            headers: {
                'Access-Control-Allow-Origin': '*', // Allow CORS
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        });
    } catch (error) {
        console.error("Error fetching from SerpAPI:", error);
        return json({ error: "Failed to fetch events" }, { status: 500 });
    }
}
