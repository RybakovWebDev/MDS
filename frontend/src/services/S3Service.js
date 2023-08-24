import axios from "axios";

export const uploadImage = async (userToken, userID, file) => {
  try {
    const formData = new FormData();
    formData.append("fileInput", file);
    formData.append("userID", userID);
    const uploadResponse = await axios.post(`${process.env.REACT_APP_URI}/api/upload`, formData, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    return uploadResponse.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteImage = async (userToken, userID, fileName) => {
  try {
    const uploadResponse = await axios.delete(`${process.env.REACT_APP_URI}/api/upload/${userID}/${fileName}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return uploadResponse.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
