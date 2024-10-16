const baseUrl = import.meta.env.VITE_VENUE_URL; 

// Fetch all venues
export const fetchVenues = async () => {
    const res = await fetch(`${baseUrl}`);
    if (!res.ok) {
        throw new Error('Failed to fetch venues');
    }
    return res.json();
};

// Add a new venue
export const addNewVenue = async (venueData) => {
    const res = await fetch(`${baseUrl}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(venueData),
    });
    if (!res.ok) {
        throw new Error('Failed to add venue');
    }
    return res; 
};

// Edit venue details
export const editVenueById = async (id, updatedData) => {
    const res = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
    });
    if (!res.ok) {
        throw new Error('Failed to update venue');
    }
    return res;
};

// Delete a venue
export const deleteVenueById = async (id) => {
    const res = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) {
        throw new Error('Failed to delete venue');
    }
    return res; 
};
