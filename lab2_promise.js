/*
purpose act as api developer and create a new promise
*/

const myPromise = new Promise((resolve, reject) => {
  let isRegistered = true;

  setTimeout(() => {
    if (isRegistered) {
      const gamesJSON = {
        monday: "leafs",
        tuesday: "raptors",
      };
      let gamesJSONstr = JSON.stringify(gamesJSON);
      resolve(gamesJSONstr);
    } else {
      reject("you must be a registered member first!");
    }
  }, 2000);
});

// Consuming the promise to match your target console output
myPromise
  .then((gamesJSONstr) => {
    console.log(gamesJSONstr);
    const gamesObj = JSON.parse(gamesJSONstr);
    console.log(gamesObj);
  })
  .catch((error) => {
    console.log(error);
  });

console.log("bob");
