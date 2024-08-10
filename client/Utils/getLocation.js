// Utils/getLocation.js

export function getLocation(successCallback, errorCallback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        
        successCallback(position);
      },
      (error) => {
        errorCallback(error);
      }
    );
  } else {
    errorCallback(new Error("Geolocation is not supported by this browser."));
  }
}
