
const baseUrl = import.meta.env.VITE_ATTENDEE_URL;

// Fetch all attendees
export const fetchAttendees = async () => {
    const res = await fetch(`${baseUrl}`);
    return res;
};

// Add a new attendee
export const addNewAttendee = async (attendeeData) => {
    const res = await fetch(`${baseUrl}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attendeeData),
    });
    return res;
};

// Edit Attendee details
export const editAttendeeById = async (id, updatedData) => {
    const res = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
    });
    return res;
};

// Delete an attendee
export const deleteAttendeeById = async (id) => {
    const res = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
    });
    return res;
};

