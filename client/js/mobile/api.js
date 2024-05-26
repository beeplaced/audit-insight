const imageURL = `https://mqsbls9jf2.execute-api.eu-central-1.amazonaws.com/image-analyzer`
//const imageURL = 'http://localhost:8080/upload'
const Authorization = 'eyJraWQiOiJDM0RpblFGN3BvY0lRTHZEUml5N1VMeHpRM1dGSnhNYUdxZE1EbHJwR084PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5M2U0NTg0Mi1kMDAxLTcwMzEtYWQzYS0yZmE3ODRhYWUwYWQiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIHBob25lIG9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXV0aF90aW1lIjoxNzE2NjU1ODc2LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtY2VudHJhbC0xLmFtYXpvbmF3cy5jb21cL2V1LWNlbnRyYWwtMV9aaWRXM2U0UWQiLCJleHAiOjE3MTY3NDIyNzYsImlhdCI6MTcxNjY1NTg3NiwidmVyc2lvbiI6MiwianRpIjoiMjg3YjFkYTEtMmMxYy00NmI4LWIwNDctMzYyYjhiNWY1Yzk3IiwiY2xpZW50X2lkIjoiM2tua3VmamExcGVpb3FtZW01NjYzOHF2OHUiLCJ1c2VybmFtZSI6IjkzZTQ1ODQyLWQwMDEtNzAzMS1hZDNhLTJmYTc4NGFhZTBhZCJ9.Odvr5VIGvM-GE_J0qJqjyuOWbDxcOjwGKUhrvtt-X0Gy_oL67ZAlSXPXgk4CdgtsHmyIFjkkFwcDx0Q84486U1tt5hcchQOf8Kw2sLt5smtNWD433oeyn0sMR-JYTsrpEw72yY5cRg5efap8qEEfsDo0FCUHLqQ0yuDqV2nNAFom0KhAcd5cyyTogNhhh8w8aAumDxTlYZRWg-qtEJGIcQgqR9jHVMLQXqzS6GKNwMgYuhfnQe7IDRNe66bUPJOvAGQk5cF15vSTP9tGiSur5438PQ2qDxs8WKDHI_EXMMLSjemIOqmkhrAEFtw60in4gK70hgtbFgx1eJag3-JoIQ'

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
                    'Access-Control-Allow-Origin':'*',
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