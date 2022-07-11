const API = "http://localhost:3333";

const endpoint = (path) => API + path;

const api = async (path, request) => {
  if ( !!request?.body ) request.headers = { "Content-type": "application/json;charset=UTF-8" }  
  return fetch(endpoint(path), request).then((res) => res.json());
};

export const apiVehicles = async ( { method, body, id } ) =>
{
  console.log("body ", body);
  let request = {method}
  if (method === 'POST' || method === 'PATCH') request.body = JSON.stringify(body)
  let endpoint = !!id ? `/vehicles/${id}` : "/vehicles"
  return api(endpoint, request);
};

// const get = async (path: string): Promise<any> => {
//   return fetch(endpoint(path)).then((res) => res.json());
// };
// const post = async (path: string, body: object): Promise<any> => {

//   return fetch(endpoint(path), {
//     method: "POST",
//     body: JSON.stringify(body),
//     headers: {"Content-type": "application/json;charset=UTF-8"}
//   }).then((res) => res.json());
// };
// const patch = async (path: string, body: object): Promise<any> => {
//   return fetch(endpoint(path), {
//     method: "PATCH",
//     body: JSON.stringify(body),
//     headers: {"Content-type": "application/json;charset=UTF-8"}
//   }).then((res) => res.json());
// };
// const destroy = async (path: string): Promise<any> => {
//   return fetch(endpoint(path), {
//     method: "DELETE"
//   }).then((res) => res.json());
// };







// export const getVehicles = async (id:number = -1) => {
//   let endpoint = id > 0 ? `/vehicles/${id}` : "/vehicles"
//   return get(endpoint);
// };
// export const postVehicles = async (body: object) => {
//   return post("/vehicles", body);
// }
// export const patchVehicles = async (id:number, body: object) => {
//   return patch(`/vehicles/${id}`, body);
// }
// export const deleteVehicles = async (id:number) => {
//   return destroy(`/vehicles/${id}`);
// }
