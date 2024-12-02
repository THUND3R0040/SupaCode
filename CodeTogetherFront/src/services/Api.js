import axios from "axios";

export async function register(user) {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URI}/register`,
      user
    );
    return res;
  } catch (err) {
    return err;
  }
}

export async function login(user) {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URI}/login`, user);
    return res;
  } catch (err) {
    return err;
  }
}

export async function createRoom(room, token) {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URI}/createNewRoom`,
      room,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (err) {
    return err;
  }
}

export async function getEditors(id, token) {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URI}/getEditors/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (err) {
    return err;
  }
}

export async function getViewers(id, token) {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URI}/getViewers/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (err) {
    return err;
  }
}

export async function getRoom(id, token) {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URI}/getRoom/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (err) {
    return err;
  }
}

export async function getToken() {
  try {
    return localStorage.getItem("token");
  } catch (err) {
    return err;
  }
}

export async function getUser() {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch (err) {
    return err;
  }
}

export async function addEditor(roomId, id, token) {
  console.log(id);
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_API_URI}/addEditor/${roomId}`,
      { id: id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (err) {
    return err;
  }
}

export async function addViewer(roomId, id, token) {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_API_URI}/addViewer/${roomId}`,
      { id: id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (err) {
    return err;
  }
}

export async function deleteViewer(roomId, id, token) {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_API_URI}/deleteViewer/${roomId}`,
      { id: id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (err) {
    return err;
  }
}

export async function deleteEditor(roomId, id, token) {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_API_URI}/deleteEditor/${roomId}`,
      { id: id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (err) {
    return err;
  }
}

export async function getUserById(id, token) {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URI}/getUserById/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
    return res;
  } catch (err) {
    return err;
  }
}

export async function getRoomContent(roomId, token) {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URI}/getRoomContent/${roomId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (err) {
    return err;
  }
}
