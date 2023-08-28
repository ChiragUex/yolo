const Base64Converter = (file) => {

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result; // Extract Base64 string after the comma
      resolve(base64String);
    };

    reader.onerror = (error) => {
      console.log("Error: ", error);
      reject(error); // Reject the Promise in case of an error.
    };

    reader.readAsDataURL(file);
  });
    }

export default Base64Converter;

  // console.log("test base64 : ",file);
  //   let imageBase64 = [];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //       imageBase64.push(reader.result); 
  //       console.log("base 64 : ",imageBase64,reader.result)
  //   };
  //   reader.onerror = (error) => {
  //     console.log("Base 64 Error: ", error);
  //   };
  //   return imageBase64;