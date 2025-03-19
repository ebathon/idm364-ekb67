export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    // Mock data with placeholder image URLs that will work regardless of environment
    const mockData = {
        events_results: [
            {
                title: `Music Festival in ${city}`,
                link: "https://example.com/event1",
                thumbnail: "https://placehold.co/400x300?text=Music+Festival",
                description: "Annual music festival featuring local and international artists",
                date: { when: "This Weekend" }
            },
            {
                title: `Art Exhibition in ${city}`,
                link: "https://example.com/event2",
                thumbnail: "https://placehold.co/400x300?text=Art+Exhibition",
                description: "Contemporary art exhibition featuring works from emerging artists",
                date: { when: "March 20-25" }
            },
            {
                title: `Food & Wine Festival in ${city}`,
                link: "https://example.com/event3",
                thumbnail: "https://placehold.co/400x300?text=Food+Festival",
                description: "Celebrate local cuisine and wine from the region",
                date: { when: "Next Month" }
            },
            {
                title: `Tech Conference in ${city}`,
                link: "https://example.com/event4",
                thumbnail: "https://placehold.co/400x300?text=Tech+Conference",
                description: "Annual conference for web developers and designers",
                date: { when: "April 10-12" }
            },
            {
                title: `Citywide scavenger hunt in ${city}`,
                link: "https://example.com/event5",
                thumbnail: "https://placehold.co/400x300?text=Scavenger+Hunt",
                description: "Explore the city with friends in this fun competitive event",
                date: { when: "April 30" }
            }
        ]
    };
   
    const mockData2 = {
        events2_results: [
            {
                title: `Tyler the Creator`,
                link: "https://example.com/event1",
                thumbnail: "https://placehold.co/400x300?text=Tyler",
                description: "Don't miss the hip-hop star's latest tour with special guests",
                date: { when: "This Weekend" }
            },
            {
                title: `Sabrina Carpenter`,
                link: "https://example.com/event2",
                thumbnail: "https://placehold.co/400x300?text=Sabrina",
                description: "Pop sensation performing her chart-topping hits live",
                date: { when: "March 20-25" }
            },
            {
                title: `Kendrick Lamar`,
                link: "https://example.com/event3",
                thumbnail: "https://placehold.co/400x300?text=Kendrick",
                description: "Grammy-winning rapper brings his electrifying show to town",
                date: { when: "Next Month" }
            },
            {
                title: `Chappell Roan`,
                link: "https://example.com/event4",
                thumbnail: "https://placehold.co/400x300?text=Chappell",
                description: "Rising star performing songs from her latest album",
                date: { when: "April 10-12" }
            },
            {
                title: `Ja Rule`,
                link: "https://example.com/event5",
                thumbnail: "https://placehold.co/400x300?text=Ja+Rule",
                description: "Legendary hip-hop artist performing his classic hits",
                date: { when: "April 30" }
            }
        ]
    };
    
    return json({
        events_results: mockData.events_results,
        events2_results: mockData2.events2_results
    });
} catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
