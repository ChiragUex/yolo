import axios from "axios";

export const fetchGooglePlaces = async (searchText) => {
    const instance = axios.create();
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?components=country:US&input=${searchText}&key=`
    const final = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}${process.env.REACT_APP_GOOGLE_MAP}`
    let response = await instance.get(final).catch(() => {return []})
    if (response && response.data) {
      response = JSON.parse(response.data.contents)
      if (response.predictions && response.predictions[0]) {
          return response.predictions;
      } else {
          return [];
      }
    } else {
        return [];
    }

}

export const fetchGooglePlaceDetails = async (place_id) => {
    const instance = axios.create();
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=`
    const final = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}${process.env.REACT_APP_GOOGLE_MAP}`
    let response = await instance.get(final).catch(() => {return null})
    let placeData = {
        address: "",
        zip: "",
        state: "",
        city: "",
        country: ""
    }
    if (response && response.data) {
      response = JSON.parse(response.data.contents)
      if (response && response.result) {
          // console.log("response.data.result", response.data.result)
          placeData.address = response.result.formatted_address;
          for (let item of response.result.address_components) {
              if (item.types[0] === "postal_code" || item.types[0].includes("postal_code")) {
                  placeData.zip = item.long_name;
              }
              if (item.types[0] === "country") {
                  placeData.country = item.long_name;
              }
              if (item.types[0] === "administrative_area_level_1") {
                  placeData.state = item.long_name;
              }
              if (item.types[0] === "administrative_area_level_2") {
                  placeData.city = item.long_name;
              }
          }
          // console.log('placeData', placeData)
          return placeData;
      }
    }

    return placeData;
}
