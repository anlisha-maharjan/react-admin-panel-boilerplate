import Req from "src/interceptors/token-interceptor";

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
  function _deleteMultipleLocation(ids) {
    return Req.post("/api/locations/delete", { ids: ids });
  }
  return {
    getAllLocation: _getAllLocation,
    getLocation: _getLocation,
    addLocation: _addLocation,
    editLocation: _editLocation,
    deleteLocation: _deleteLocation,
    deleteMultipleLocation: _deleteMultipleLocation,
  };
})();
export default LocationService;
