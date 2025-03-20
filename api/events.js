export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  
  try {
    const city = req.query.city || "New York";
    
    console.log(`Providing local mock events for: ${city}`);
    
    // Mock data with placeholder image URLs that will work regardless of environment
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
          thumbnail: "/events/music1.jpg",
          description: "Don't miss the hip-hop star's latest tour with special guests",
          date: { when: "This Weekend" }
        },
        {
          title: `Sabrina Carpenter`,
          link: "https://example.com/event2",
          thumbnail: "/events/music2.jpg",
          description: "Pop sensation performing her chart-topping hits live",
          date: { when: "March 20-25" }
        },
        {
          title: `Kendrick Lamar`,
          link: "https://example.com/event3",
          thumbnail: "/events/music3.jpg",
          description: "Grammy-winning rapper brings his electrifying show to town",
          date: { when: "Next Month" }
        },
        {
          title: `Chappell Roan`,
          link: "https://example.com/event4",
          thumbnail: "/events/music4.jpg",
          description: "Rising star performing songs from her latest album",
          date: { when: "April 10-12" }
        },
        {
          title: `Ja Rule`,
          link: "https://example.com/event5",
          thumbnail: "/events/music5.png",
          description: "Legendary hip-hop artist performing his classic hits",
          date: { when: "April 30" }
        }
      ]
    };
    
    res.status(200).json({
      events_results: mockData.events_results,
      events2_results: mockData2.events2_results
    });
    
  } catch (error) {
    console.error("Error in events API:", error);
    res.status(500).json({ 
      error: "Failed to fetch events", 
      events_results: [],
      events2_results: []
    });
  }
}