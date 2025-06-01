export const AuthInput = {
  type: "object",
  properties: {
    email: {
      type: "string",
      example: "vasylLomachenko@ukr.net",
      description: "Email of user",
      required: true
    },
    password: {
      type: "string",
      example: "password",
      description: "Password of user",
      required: true
    },
  }
};

export const AuthResponse = {
  type: "object",
  properties: {
    user: {
      $ref: "#/components/schemas/User"
    },
    accesToken: {
      type: "string",
      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      description: "JWT access token"
    },
    refreshToken: {
      type: "string",
      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      description: "JWT access token"
    }
  }
};


export const AuthRefreshRequest = {
  type: "object",
  required: ["user", "accessToken"],
  properties: {
    user: {
      $ref: "#/components/schemas/User"
    },
    accessToken: {
      type: "string",
      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      description: "JWT access token"
    }
  }
};

