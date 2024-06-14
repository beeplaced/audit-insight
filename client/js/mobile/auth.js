const AWS_LOGIN_SERVER = `https://applogin.auth.eu-central-1.amazoncognito.com/login?client_id=3knkufja1peioqmem56638qv8u&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https%3A%2F%2Fehscan.com`

const getTokensFromUrl = () => {
    const hash = window.location.hash.substring(1); // Remove the leading #
    const urlParams = new URLSearchParams(hash);
    const tokens = {
        //idToken: urlParams.get('id_token'),
        accessToken: urlParams.get('access_token'),
        //refreshToken: urlParams.get('refresh_token'),
    };
    return tokens;
}

const storeTokens = (tokens) => {
    if (
        //tokens.idToken && 
        tokens.accessToken
        //&& tokens.refreshToken
    ) {
        // Store tokens securely, here using localStorage as an example
        //localStorage.setItem('idToken', tokens.idToken);
        localStorage.setItem('accessToken', tokens.accessToken);
        //localStorage.setItem('refreshToken', tokens.refreshToken);
        console.log('Token in URL')
    } else {
        console.error('Token not found in URL');
    }
}

const checkTokenbyExp = () => {
    const decoded = jwt_decode(localStorage.getItem('accessToken'));
    console.log(decoded);

    const unixTimestamp = decoded.exp;
    const date = new Date(unixTimestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds

    console.log(date.toISOString()); // Outputs in ISO format
    console.log(date.toString()); // Outputs in a human-readable format

    const currentTime = Math.floor(Date.now() / 1000); // Current Unix timestamp in seconds

    if (unixTimestamp > currentTime) {
        console.log("The timestamp is still valid (represents a future date).");
    } else {
        console.log("The timestamp is not valid (represents a past date).");
        window.location = AWS_LOGIN_SERVER
    }
}

export const token = {
    /**
     * Check the validity of aws access tokens and handle user redirection.
     * This function retrieves tokens from the URL, stores them in localStorage, 
     * and then checks for the presence and validity of an access token. If no valid 
     * access token is found, the user is redirected to the login page.
     * * @async
     */ check: async () => {
    
    const tokens = getTokensFromUrl();
    console.log("getTokensFromUrlx", tokens)

    /**
    * Store tokens in localStorage.
    * @param {Object} tokens - The tokens to store.
    */ storeTokens(tokens);

        if (!localStorage || !localStorage.getItem('accessToken')) {
            window.location = AWS_LOGIN_SERVER
            return;
        }
        checkTokenbyExp()

    // /**
    //  * Validate the access token by making an API request.
    //  ** @async
    //  * @returns {Promise<boolean>} True if the token is valid, otherwise false.
    //  */ const token_valid = async () => {
    //             try {
    //                 const url = `${window.location.origin}/auth`;
    //                 const response = await axios.get(url, {
    //                     headers: {
    //                         'accesstoken': localStorage.getItem('accessToken'),
    //                         'Content-Type': 'application/json'
    //                     }
    //                 });
    //                 console.log(response)
    //                 return response?.data?.$metadata?.httpStatusCode === 200;
    //             } catch (error) {
    //                 console.error('Error validating token:', error);
    //                 return false;
    //             }
    //         };
    //         if (!await token_valid()) window.location = AWS_LOGIN_SERVER
    //         console.log('Token validated by cognito')
            return true
        }
    }