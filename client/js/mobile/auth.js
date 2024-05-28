function getTokensFromUrl() {
    const hash = window.location.hash.substring(1); // Remove the leading #
    const urlParams = new URLSearchParams(hash);
    console.log(hash, urlParams)
    const tokens = {
        //idToken: urlParams.get('id_token'),
        accessToken: urlParams.get('access_token'),
        //refreshToken: urlParams.get('refresh_token'),
    };
    return tokens;
}

function storeTokens(tokens) {
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

    export const token = {
    /**
     * Check the validity of aws access tokens and handle user redirection.
     * This function retrieves tokens from the URL, stores them in localStorage, 
     * and then checks for the presence and validity of an access token. If no valid 
     * access token is found, the user is redirected to the login page.
     * * @async
     */ check: async () => {
    
    const tokens = getTokensFromUrl();
    /**
    * Store tokens in localStorage.
    * @param {Object} tokens - The tokens to store.
    */ storeTokens(tokens);

        if (!localStorage || !localStorage.getItem('accessToken')) {
            window.location.href = '/login';
            return;
        }

        console.log('Token in localstorage')
    /**
     * Validate the access token by making an API request.
     ** @async
     * @returns {Promise<boolean>} True if the token is valid, otherwise false.
     */ const token_valid = async () => {
                try {
                    const url = `${window.location.origin}/auth`;

                    const response = await axios.get(url, {
                        headers: {
                            'accesstoken': localStorage.getItem('accessToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                    console.log(response)
                    return response?.data?.$metadata?.httpStatusCode === 200;
                } catch (error) {
                    console.error('Error validating token:', error);
                    return false;
                }
            };
            
            if (!await token_valid()) window.location.href = '/login'
            console.log('Token validated by cognito')
            return true
        }
    }