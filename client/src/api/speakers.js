
const baseUrl = import.meta.env.VITE_SPEAKER_URL;

// Fetch all speakers
export const fetchSpeakers = async () => {
    const res = await fetch(`${baseUrl}`);
    return res;
};

export const addNewSpeaker = async (formData) => {
    const res = await fetch(`${baseUrl}`, {
        method: 'POST',
        body: formData, // No need for headers with FormData
    });
    return res;
};

export const editSpeakerById = async (id, formData) => {
    const res = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        body: formData, // No need for headers with FormData
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

