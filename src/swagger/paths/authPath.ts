const authPath = {
  "/auth": {
    post: {
      tags: ["Auth"],
      summary: "User login",
      description: "Authorize user and get JWT token",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/AuthInput"
            }
          }
        }
      },
      responses: {
        "201": {
          description: "User authorized successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AuthResponse"
              }
            }
          }
        },
        "400": {
          description: "Invalid email or password",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Login or password are incorrect"
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "/auth/refresh":{
    post: {
      tags: ["Auth"],
      summary: "Updating user tokens",
      description: "Recreating user tokens",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/AuthRefreshRequest"
            }
          }
        }
      },
      responses: {
        "201": {
          description: "New tokens successfully created",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AuthResponse"
              }
            }
          }
        },
        "401": {
          description: "Invalid access token or user data",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "You are not authentificated, please login"
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

export default authPath;
