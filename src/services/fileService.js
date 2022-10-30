import * as httpRequest from '~/utils/httpRequest';
export const uploadFileImg = async (formData) => {
    try {
        console.log(formData);
        const res = await httpRequest.post('file/images', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        return res;
    } catch (error) {
        return null;
    }
};
