import { error } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export async function load({ params }) {
    // Fix: Use eventID with capital "ID" to match URL parameter
    const eventId = params.eventID;
    
    console.log("Server loader - Event ID from params:", eventId);
    
    // Check if we have an event ID
    if (!eventId) {
        console.log("No event ID provided");
        return {
            event: null
        };
    }
    
    try {
        // Fetch the event data from Supabase using 'id' column
        const { data, error: supabaseError } = await supabase
            .from('happen')
            .select('*')
            .eq('id', eventId)
            .single();
        
        if (supabaseError) {
            console.error('Error fetching event:', supabaseError);
            return {
                event: null
            };
        }
        
        console.log("Server fetched event data:", data);
        return {
            event: data || null
        };
    } catch (err) {
        console.error('Error in loader:', err);
        return {
            event: null
        };
    }
}