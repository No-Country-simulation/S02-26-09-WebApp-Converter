const API = process.env.NEXT_PUBLIC_API_URL;

//formateamos el tiempo
function formatToHHMMSS(seconds: number): string {
    const hrs = Math.floor(seconds / 3600)
        .toString()
        .padStart(2, "0");

    const mins = Math.floor((seconds % 3600) / 60)
        .toString()
        .padStart(2, "0");

    const secs = Math.floor(seconds % 60)
        .toString()
        .padStart(2, "0");

    return `${hrs}:${mins}:${secs}`;
}

export async function uploadVideo(
    file: File,
    startTime?: number,
    endTime?: number
) {
    const formData = new FormData();
    formData.append("file", file);

    if (startTime !== undefined) {
        const formattedStart = formatToHHMMSS(startTime);
        formData.append("startTime", formattedStart);
    }

    if (endTime !== undefined) {
        const formattedEnd = formatToHHMMSS(endTime);
        formData.append("endTime", formattedEnd);
    }
    const response = await fetch(`${API}/api/conversions/upload`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        const text = await response.text();
        console.log("Error raw response:", text);
        throw new Error("Error al subir el video");
    }

    const data = await response.json();

    if (data.outputUrl) {
        const extension = data.outputUrl.split(".").pop();
        console.log(" EXTENSIÓN VIDEO CONVERTIDO:", extension);
    }

    if (data.outputUrl) {
        try {
            const videoResponse = await fetch(`${API}${data.outputUrl}`, {
                method: "HEAD",
            });

            console.log("Content-Type real:",videoResponse.headers.get("content-type"));
        } catch (error) {
            console.log("No se pudo verificar content-type", error);
        }
    }

    return data;
}

export const getConversionStatus = async (id: string) => {
    const response = await fetch(`${API}/api/conversions/${id}`);

    if (!response.ok) {
        throw new Error("Error consultando estado");
    }

    return response.json();
};
