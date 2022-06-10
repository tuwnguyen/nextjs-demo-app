import axios from "axios";

export const post = async (uri: string, data?: any, config?: any) => {
  try {
    return await axios.post(uri, data, config);
  } catch (e: any) {
    if (e.response.status === 401) {
      window.location.replace("/signout");
    } else {
      throw e;
    }
  }
};  

export const get = async (uri: string, config?: any) => {
  try {
    return await axios.get(uri, config);
  } catch (e: any) {
    if (e.response.status === 401) {
      window.location.replace("/signout");
    } else {
      throw e;
    }
  }
};

export const put = async (uri: string, data?: any, config?: any) => {
  try {
    return await axios.put(uri, data, config);
  } catch (e: any) {
    if (e.response.status === 401) {
      window.location.replace("/signout");
    } else if (e.response.status === 409) {
      window.location.reload();
    } else {
      throw e;
    }
  }
};

export const deletes = async (uri: string, config?: any) => {
  try {
    return await axios.delete(uri, config);
  } catch (e: any) {
    if (e.response.status === 401) {
      window.location.replace("/signout");
    } else {
      throw e;
    }
  }
};

export const patch = async (uri: string, data?: any, config?: any) => {
  try {
    return await axios.patch(uri, data, config);
  } catch (e: any) {
    if (e.response.status === 401) {
      window.location.replace("/signout");
    } else if (e.response.status === 409) {
      window.location.reload();
    } else {
      throw e;
    }
  }
};
