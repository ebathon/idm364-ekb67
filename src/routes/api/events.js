export async function GET({ url }) {
    const city = url.searchParams.get("city") || "New York";
    const apiKey = process.env.VITE_SERPAPI_KEY;

    console.log("🔑 SerpApi API Key:", apiKey); // Debug: Log API key

    if (!apiKey) {
        console.error("🚨 Missing SerpApi API key. Check your .env file.");
        return new Response(JSON.stringify({ error: "API key is missing" }), { status: 500 });
    }

    const serpApiUrl = `https://serpapi.com/search.json?engine=google_events&q=Events+in+${encodeURIComponent(city)}&hl=en&gl=us&api_key=${apiKey}`;
    
    console.log("🌍 Fetching from SerpApi:", serpApiUrl); // Debug: Log API URL

    try {
        const response = await fetch(serpApiUrl);
        const text = await response.text(); // Get raw response text
        console.log("📡 Raw SerpApi Response:", text); // Debugging: Log raw response

        const data = JSON.parse(text); // Convert raw response to JSON

        return new Response(JSON.stringify(data.events_results || []), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error("🚨 API Error:", error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
