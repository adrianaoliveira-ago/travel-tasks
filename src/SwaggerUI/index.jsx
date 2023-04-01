import React from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUIComponent = () => {
  // const getOpenApiSpec = async () => {
  //   const response = await fetch('/.netlify/functions/openapi');
  //   const openApiSpec = await response.json();
  //   return openApiSpec;
  // };

  return (
    <div>
      <SwaggerUI url={"/.netlify/functions/openapi"} />
    </div>
  );
};

export default SwaggerUIComponent;
