export type AmplifyDependentResourcesAttributes = {
  "auth": {
    "fanamplifyreactauth": {
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "UserPoolId": "string",
      "UserPoolArn": "string",
      "UserPoolName": "string",
      "AppClientIDWeb": "string",
      "AppClientID": "string"
    }
  },
  "storage": {
    "uploadbucket": {
      "BucketName": "string",
      "Region": "string"
    }
  },
  "function": {
    "uploadFunction": {
      "Name": "string",
      "Arn": "string",
      "Region": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string"
    }
  },
  "api": {
    "uploadAPI": {
      "RootUrl": "string",
      "ApiName": "string",
      "ApiId": "string"
    }
  }
}