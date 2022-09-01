import Req from "src/interceptors/token-interceptor";

const TableDataService = (function () {
  function _getAllData(
    endpoint,
    search,
    searchFields,
    sortOrder,
    page,
    pageSize,
    activeCol,
    fromDate = "",
    toDate = ""
  ) {
    let query = "";
    if (fromDate || toDate) {
      query += `&fromDate=${fromDate}&toDate=${toDate}`;
    } 
    return Req.get(
      `/api/${endpoint}?pagination[perpage]=${pageSize}&pagination[page]=${page}&orderBy=${activeCol}&sortedBy=${sortOrder}&search=${search}&searchFields=${searchFields}${query}`
    );
  }
  return {
    getAllData: _getAllData,
  };
})();
export default TableDataService;
