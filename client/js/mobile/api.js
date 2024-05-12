const imageURL = `https://mqsbls9jf2.execute-api.eu-central-1.amazonaws.com/image-analyzer`

export class API {

    constructor(params) {

        const { context, segment } = params
        this.context = context
        this.header = { context, segment }
    }

CALL = async (file) => {

    try {
        
    const formData = new FormData();
    formData.append('context', this.context);
    formData.append('file', file);

    const response = await axios.post(imageURL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        validateStatus: function (status) {
            // This will accept status code 200 - 299 as successful,
            // as well as 400 specifically.
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
        ret
    }
}
}