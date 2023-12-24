import { message } from "antd";
import SessionManager from "../Auth/SessionManager";
import { BASE_URL } from "./Settings";

export function getData(endPoint) {
  let token = SessionManager.getToken();
  let payload = {
    method: "GET",
    headers: {
      "access-control-allow-origin": "*",
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return fetch(BASE_URL + endPoint, payload)
    .then(function (response) {
      if (!response.ok) {
        // console.log(response);
        if (response.status === 401) {
          message.error("Yetkisiz Erişim");
          window.location.href = "/sign-in";
        }
       else if (response.status === 403) {
          message.error("Bu Sayfaya Yetkiniz Bulunmamaktadır.!");
          window.location.href = "/";
        }
      }
      return response.json();
    })
    .then(function (result) {
      return result;
    })
    .catch(function (error) {
      console.log(error);
      message.error("Veri Çekilemedi. Hata : "+ error);
    });
}

export function postDataForLogin(type, userData) {
  //let BaseURL = "https://localhost:7142/";
  let payload = {
    method: "POST",
    headers: {
      "access-control-allow-origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };
  console.log(BASE_URL + type, payload);
  return fetch(BASE_URL + type, payload)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      return result;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export function postData(endPoint, inputObj) {
  let token = SessionManager.getToken();
  let payload = {
    method: "POST",
    headers: {
      "access-control-allow-origin": "*",
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(inputObj),
  };
  return fetch(BASE_URL + endPoint, payload)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      return result;
    })
    .catch(function (error) {
      console.log(error);
      message.error("Hata Oluştu. Hata : "+ error);
    });
}

export function deleteData(endPoint) {
  let token = SessionManager.getToken();
  let payload = {
    method: "DELETE",
    headers: {
      "access-control-allow-origin": "*",
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return fetch(BASE_URL + endPoint, payload)
    .then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(function (result) {
      return result;
    })
    .catch(function (error) {
      console.log(error);
      message.error("Hata Oluştu. Hata : "+ error);
    });
}

export function putData(endPoint, obj) {
  let token = SessionManager.getToken();
  let payload = {
    method: "PUT",
    headers: {
      "access-control-allow-origin": "*",
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(obj),
  };
  return fetch(BASE_URL + endPoint, payload)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      return result;
    })
    .catch(function (error) {
      console.log(error);
      message.error("Hata Oluştu. Hata : "+ error);
    });
}
