import client from "../client.js"

export const uploadCdrFile = async (file, onProgress) => {
    const archivo_cdr = new FormData();
    archivo_cdr.append("archivo_cdr", file);

    const result = await client.post("cdr/upload", archivo_cdr, {
        onUploadProgress: (evt) => {
            if (onProgress && evt.total){
                onProgress(Math.round((evt.loaded * 100) / evt.total));
            }
        },
    });

    return result.data;
};

export const getCDR = () => client.get("/cdr/call").then(r => r.data);
export const getCDRArchivosControl = () => client.get("/cdr/archivos_control").then(r => r.data);