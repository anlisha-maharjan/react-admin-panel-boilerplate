import Req from "interceptors/TokenInterceptor";

const LocationService = (function () {
  function _getAllLocation() {
    return Req.get(`/api/locations`);
  }
  function _getLocation(id) {
    return Req.get("/api/locations/" + id);
  }
  function _addLocation(data) {
    return Req.post("/api/locations", data);
  }
  function _editLocation(data, id) {
    return Req.put("/api/locations/" + id, data);
  }
  function _deleteLocation(id) {
    return Req.delete("/api/locations/" + id);
  }
  return {
    getAllLocation: _getAllLocation,
    getLocation: _getLocation,
    addLocation: _addLocation,
    editLocation: _editLocation,
    deleteLocation: _deleteLocation,
  };
})();
export default LocationService;
