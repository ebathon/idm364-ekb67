exports.handler = async (event) => {
    const city = event.queryStringParameters.city || "New York";

    try {
        const apiUrl = `https://serpapi.com/search.json?q=Events+in+${encodeURIComponent(city)}&engine=google_events&api_key=${process.env.SERPAPI_KEY}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`SerpAPI request failed with status: ${response.status}`);
        }

        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error("Error fetching events:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch events" }),
        };
    }
};
