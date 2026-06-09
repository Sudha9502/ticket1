import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId:
        "us-east-1_ivnjAg55X",

      userPoolClientId:
        "5j7s8bkdp0prh7up6le12d085e",
    },
  },
});