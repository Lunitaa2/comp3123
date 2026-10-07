let url = "https://www.githubstatus.com/api/v2/status.json";

fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((dataJSONObj) => {
    console.log(dataJSONObj);
    console.log(dataJSONObj.data?.status || dataJSONObj.status.description);
  })
  .catch((error) => {
    console.log(error);
  });

const mockResponse = Promise.resolve({
  ok: true,
  data: {
    status: "operational",
  },
});

mockResponse
  .then((dataJSONObj) => {
    console.log(dataJSONObj);
    console.log(dataJSONObj.data.status);
  })
  .catch((error) => {
    console.log(error);
  });
