import * as httpRequest from '~/utils/httpRequest';
export const uploadFileImg = async (formData) => {
    try {
        const res = await httpRequest.post('file/images', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        return res;
    } catch (error) {
        return null;
    }
};

export const downloadFile = async (urlFile) => {
    try {
        const res = await httpRequest.get(urlFile, {
            headers: {
                'Content-Type': 'application/octet-stream',
            },
            responseType: 'blob',
        });

        return res;
    } catch (error) {
        console.log('error', error);
    }
};
