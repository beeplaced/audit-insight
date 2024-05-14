const imageURL = `https://mqsbls9jf2.execute-api.eu-central-1.amazonaws.com/image-analyzer`

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

    const response = await axios.post(imageURL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
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