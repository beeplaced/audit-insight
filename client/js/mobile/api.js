const imageURL = `https://mqsbls9jf2.execute-api.eu-central-1.amazonaws.com/image-analyzer`

export class API {

    constructor(params) {
        const { context, segment } = params
        this.context = context
        this.segment = segment.toUpperCase()
    }

    SEND_IMG = async (file) => {
        try {

            if (!localStorage || !localStorage.getItem('accessToken')) {
                window.location.href = '/login';
                return;
            }

            const Authorization = localStorage.getItem('accessToken')

            const formData = new FormData();
            formData.append('context', this.context);
            formData.append('segment', this.segment);
            formData.append('file', file);

            // Send FormData to the server
            const response = await axios.post(imageURL, formData, {
                headers: {
                    'Authorization': Authorization,
                    'demo': true,
                    // 'Access-Control-Allow-Origin':'*',
                    'Content-Type': 'multipart/form-data'
                },
                validateStatus: function () {
                    return true;
                }
            });
            // Log response for debugging
            console.log('Response:', response);

            if (response.status === 401){
                window.location.href = '/login';
            }

                // Return response data
            return response.data;
        } catch (error) {
            // Handle error
            console.error('Error sending image:', error);
            // Optionally, re-throw the error to be handled by the caller
            throw error;
        }
    };

    SEND_TXT = async (textData) => {
        try {
            const response = await axios.get(imageURL, {
                params: {
                    'Authorization': Authorization,
                    'demo': true,
                    'context': textData,
                    'segment': this.segment
                },
                validateStatus: function () {
                    return true;
                }
            }
            )
            console.log(response)
            return response

        } catch (error) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
    }

}