const API = process.env.NEXT_PUBLIC_API_URL;

export async function uploadVideo(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API}/api/conversions/upload`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al subir el video");
    }

    return response.json();
}

export const getConversionStatus = async (id: string) => {
    const response = await fetch(`${API}/api/conversions/${id}`);

    if (!response.ok) {
        throw new Error("Error consultando estado");
    }

    return response.json();
};
