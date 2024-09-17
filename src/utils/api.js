const baseUrl = "https://mongo-db-spring-boot.onrender.com/api/v2";

const getProjectUrl = (selectedProjectId) => {
  return baseUrl + `/projects/${selectedProjectId}`;
};

const getProjectUserId = (uid) => {
  return baseUrl + `/projects?userId=${uid}`;
};

const getProjectsUrl = () => {
  return baseUrl + `/projects`;
};

export { getProjectUrl, getProjectUserId, getProjectsUrl };
