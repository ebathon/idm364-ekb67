// src/routes/api/events/+server.js
import { json } from '@sveltejs/kit';

export function GET({ url }) {
    const city = url.searchParams.get("city") || "New York";
    
    console.log(`Providing local mock events for: ${city}`);
    
    // Mock data replacing SerpAPI
    const mockData = {
        events_results: [
            {
                title: `Music Festival in ${city}`,
                link: "https://example.com/event1",
                thumbnail: "/events/event1.jpg",
                description: "Annual music festival featuring local and international artists",
                date: { when: "This Weekend" }
            },
            {
                title: `Art Exhibition in ${city}`,
                link: "https://example.com/event2",
                thumbnail: "/events/event2.jpg",
                description: "Contemporary art exhibition featuring works from emerging artists",
                date: { when: "March 20-25" }
            },
            {
                title: `Food & Wine Festival in ${city}`,
                link: "https://example.com/event3",
                thumbnail: "/events/event3.png",
                description: "Celebrate local cuisine and wine from the region",
                date: { when: "Next Month" }
            },
            {
                title: `Tech Conference in ${city}`,
                link: "https://example.com/event4",
                thumbnail: "/events/image8.jpg",
                description: "Annual conference for web developers and designers",
                date: { when: "April 10-12" }
            },
            {
                title: `Citywide scavenger hunt in ${city}`,
                link: "https://example.com/event5",
                thumbnail: "/events/event5.jpg",
                description: "Annual conference for web developers and designers",
                date: { when: "April 30" }
            }
        ]
    };
    
    return json(mockData);
}