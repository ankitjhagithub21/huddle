
const baseUrl = import.meta.env.VITE_SPEAKER_URL;

// Fetch all speakers
export const fetchSpeakers = async () => {
    const res = await fetch(`${baseUrl}`);
    return res;
};

// Add a new speaker
export const addNewSpeaker = async (speakerData) => {
    const res = await fetch(`${baseUrl}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(speakerData),
    });
    return res;
};

// Edit speaker details
export const editSpeakerById = async (id, updatedData) => {
    const res = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
    });
    return res;
};

// Delete a speaker
export const deleteSpeakerById = async (id) => {
    const res = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
    });
    return res;
};

