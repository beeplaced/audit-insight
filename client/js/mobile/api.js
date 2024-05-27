const imageURL = `https://mqsbls9jf2.execute-api.eu-central-1.amazonaws.com/image-analyzer`
//const imageURL = 'http://localhost:8080/upload'
const Authorization = 'eyJraWQiOiJDM0RpblFGN3BvY0lRTHZEUml5N1VMeHpRM1dGSnhNYUdxZE1EbHJwR084PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5M2U0NTg0Mi1kMDAxLTcwMzEtYWQzYS0yZmE3ODRhYWUwYWQiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtY2VudHJhbC0xLmFtYXpvbmF3cy5jb21cL2V1LWNlbnRyYWwtMV9aaWRXM2U0UWQiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiIza25rdWZqYTFwZWlvcW1lbTU2NjM4cXY4dSIsImV2ZW50X2lkIjoiMGZhNDBhZTMtMmNiNC00NGIxLThkYmItMzAzZjMwNGI2MzM5IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiBwaG9uZSBvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImF1dGhfdGltZSI6MTcxNjgxNzk1MiwiZXhwIjoxNzE2OTA0MzUyLCJpYXQiOjE3MTY4MTc5NTIsImp0aSI6IjAwMmE2OTgxLTI0NWYtNDc2Ny05OGY3LTliYzI3OWNlOTVhMSIsInVzZXJuYW1lIjoiOTNlNDU4NDItZDAwMS03MDMxLWFkM2EtMmZhNzg0YWFlMGFkIn0.JJNzVsfQJkvYv4Yrr77Qbt1SoDNz76gv4GQYF1gCMAQB5oRub4g8WE9PknxF27h939ZXl7Xx3zwA65FltoxTIoDGsP9oGmjs-Y2FRKbhZcIOlWCMivift0yEALfsPtLflYaegoqRD3i4D06Q3e6ffA-rY1x5dyvlHbCfLLSF58LCuTX-vLZ29-N5RdsqSoykdslMASM-pRXNaIGceTgshQhWVQz5Zath6mTB3w6PuLPWqU6C5jBNa922bdBVDE3dssuVkPuAh7rV5N1lYSO6ATkJWnPXHa0tbtXlO4nRvDB0rnSKv2tXFnT7AXI7W4TOK57L9el_Omob6nAk4nRusg'

export class API {

    constructor(params) {
        const { context, segment } = params
        this.context = context
        this.segment = segment.toUpperCase()
    }

    SEND_IMG = async (file) => {
        try {
            const formData = new FormData();
            formData.append('context', this.context);
            formData.append('segment', this.segment);
            formData.append('file', file);

            // Send FormData to the server
            const response = await axios.post(imageURL, formData, {
                headers: {
                    'Authorization': Authorization,
                    // 'Access-Control-Allow-Origin':'*',
                    'Content-Type': 'multipart/form-data'
                },
                validateStatus: function () {
                    return true;
                }
            });

            // Log response for debugging
            console.log('Response:', response);

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
                    context: textData,
                    segment: this.segment
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