import Req from "interceptors/TokenInterceptor";
import qs from "query-string";
import { cleanQueryObj, paginationLimit } from "helpers";

const TableDataService = (function () {
  function _getAllData(endpoint, params) {
    if (!params.page || !params.pageSize || !params.sortedBy || !params.orderBy) {
      params.page = params.page ? params.page : 1;
      params.pageSize = params.pageSize ? params.pageSize : paginationLimit;
      params.sortedBy = params.sortedBy ? params.sortedBy : "desc";
      params.orderBy = params.orderBy ? params.orderBy : "created_at";
    }
    const sentParams = { ...cleanQueryObj(params) };
    return Req.get(`/api/${endpoint}?${qs.stringify(sentParams, { arrayFormat: "bracket" })}`);
  }

  function _getAllDataPost(endpoint, params) {
    if (!params.page || !params.pageSize || !params.sortedBy || !params.orderBy) {
      params.page = params.page ? params.page : 1;
      params.pageSize = params.pageSize ? params.pageSize : paginationLimit;
      params.sortedBy = params.sortedBy ? params.sortedBy : "desc";
      params.orderBy = params.orderBy ? params.orderBy : "created_at";
    }
    const sentParams = { ...cleanQueryObj(params) };
    return Req.post(`/api/${endpoint}?${qs.stringify(sentParams, { arrayFormat: "bracket" })}`);
  }
  return { getAllData: _getAllData, getAllPost: _getAllDataPost };
})();
export default TableDataService;
