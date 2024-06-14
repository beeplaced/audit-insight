//const crypto = require('crypto');
const { CognitoIdentityProviderClient, GetUserCommand } = require('@aws-sdk/client-cognito-identity-provider');
const cognitoClient = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION });

exports.auth_token = async (accessToken) => {

        const clientId = process.env.COGNITO_CLIENT_ID;
        //const clientSecret = process.env.COGNITO_CLIENT_SECRET;
        const params = {
            AccessToken: accessToken,
            ClientId: clientId,
        };

        const command = new GetUserCommand(params);

        try {
            const data = await cognitoClient.send(command);
            return data;
        } catch (error) {
            console.log(error)
            throw new Error('Invalid token');
        }
    
}