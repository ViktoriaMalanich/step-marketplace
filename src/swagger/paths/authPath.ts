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
  }
};

export default authPath;
