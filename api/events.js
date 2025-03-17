export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        // Example static response (Replace with actual API logic)
        res.status(200).json({
            events_results: [
                {
                    title: "Sample Event",
                    link: "https://example.com/event",
                    thumbnail: "https://placehold.co/150",
                    date: { when: "March 20, 2025" },
                    description: "This is a sample event description."
                }
            ]
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
