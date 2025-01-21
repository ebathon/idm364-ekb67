import axios from 'axios';

const API_BASE_URL = 'https://www.eventbriteapi.com/v3';
const API_TOKEN = 'FYLF3CBPYCM62SFS5ANN'; // Replace with your private token

/**
 * Fetch local venues based on location and radius.
 * @param {string} location - The location address to search venues around.
 * @param {string} within - The radius around the location.
 * @param {number} venueLimit - Number of venues to fetch.
 * @returns {Promise<Array>} List of venue IDs.
 */
async function getNearbyVenues(location = 'Philadelphia', within = '10km', venueLimit = 10) {
    try {
        const response = await axios.get(`${API_BASE_URL}/venues/search/`, {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            params: {
                'location.address': location,
                'location.within': within,
                page_size: venueLimit,
            },
        });

        // Extract and return venue IDs
        return response.data.venues.map(venue => venue.id);
    } catch (error) {
        console.error('Error fetching venues:', error.response ? error.response.data : error.message);
        throw error;
    }
}

/**
 * Fetch events for a specific venue.
 * @param {string} venueId - The venue ID to fetch events for.
 * @param {number} pageSize - Number of events to fetch for each venue.
 * @returns {Promise<Array>} List of events for the venue.
 */
async function getEventsByVenue(venueId, pageSize = 5) {
    try {
        const response = await axios.get(`${API_BASE_URL}/events/search/`, {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            params: {
                'venue.id': venueId,
                sort_by: 'date',
                page_size: pageSize,
            },
        });

        // Extract and return event details
        return response.data.events.map(event => ({
            id: event.id,
            name: event.name.text,
            url: event.url,
        }));
    } catch (error) {
        console.error(`Error fetching events for venue ${venueId}:`, error.response ? error.response.data : error.message);
        return []; // Return empty array if fetching events fails
    }
}

/**
 * Fetch events from venues near a location.
 * @param {string} location - The location address to search venues around.
 * @param {string} within - The radius around the location.
 * @param {number} venueLimit - Number of venues to fetch.
 * @param {number} pageSize - Number of events to fetch for each venue.
 * @returns {Promise<Array>} List of events from nearby venues.
 */
export async function getEventsFromNearbyVenues(location = 'Philadelphia', within = '10km', venueLimit = 10, pageSize = 5) {
    try {
        // Step 1: Fetch nearby venues
        const venueIds = await getNearbyVenues(location, within, venueLimit);

        // Step 2: Fetch events for each venue
        const eventPromises = venueIds.map(venueId => getEventsByVenue(venueId, pageSize));
        const eventsByVenue = await Promise.all(eventPromises);

        // Flatten the array of events and return
        return eventsByVenue.flat();
    } catch (error) {
        console.error('Error fetching events from nearby venues:', error.message);
        throw error;
    }
}
