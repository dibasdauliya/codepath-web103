import { request } from "../utilities/api";

const exteriorsAPI = "http://localhost:3000/api/exteriors";
const roofsAPI = "http://localhost:3000/api/roofs";
const wheelsAPI = "http://localhost:3000/api/wheels";
const interiorsAPI = "http://localhost:3000/api/interiors";

const fetchExteriors = () => request(exteriorsAPI);
const fetchExteriorById = (id) => request(`${exteriorsAPI}/${id}`);

const fetchRoofs = () => request(roofsAPI);
const fetchRoofById = (id) => request(`${roofsAPI}/${id}`);

const fetchWheels = () => request(wheelsAPI);
const fetchWheelsById = (id) => request(`${wheelsAPI}/${id}`);

const fetchInteriors = () => request(interiorsAPI);
const fetchInteriorById = (id) => request(`${interiorsAPI}/${id}`);

export default {
  fetchExteriors,
  fetchExteriorById,
  fetchRoofs,
  fetchRoofById,
  fetchWheels,
  fetchWheelsById,
  fetchInteriors,
  fetchInteriorById,
};
