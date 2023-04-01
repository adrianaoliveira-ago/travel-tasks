import fs from "fs";

export const handler = async (event, context) => {
  const openapi = fs.readFileSync("./openapi.yaml", "utf8");
  return {
    statusCode: 200,
    body: openapi,
    headers: {
      "Content-Type": "text/yaml",
    },
  };
};
