
const baseUrl = import.meta.env.VITE_EVENT_URL;

// Fetch all events
export const fetchEvents = async () => {
    const res = await fetch(`${baseUrl}`);
    return res;
};

// Add a new event
export const addNewEvent = async (eventData) => {
    const res = await fetch(`${baseUrl}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
    });
    return res;
};

export const getEventById = async (id) => {
    const res = await fetch(`${baseUrl}/${id}`);
    return res;
};



// Edit Event details
export const editEventById = async (id, updatedData) => {
    const res = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
    });
    return res;
};

// Delete an event
export const deleteEventById = async (id) => {
    const res = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
    });
    return res;
};

