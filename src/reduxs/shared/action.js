export const GET_SINGLE_CONFIG_CHOICE = "GET_SINGLE_CONFIG_CHOICE";
export const GET_SINGLE_CONFIG_CHOICE_SUCCESS = "GET_SINGLE_CONFIG_CHOICE_SUCCESS";
export const GET_SINGLE_CONFIG_CHOICE_ERROR = "GET_SINGLE_CONFIG_CHOICE_ERROR";
export const GET_MULTIPLE_CONFIG_CHOICE = "GET_MULTIPLE_CONFIG_CHOICE";
export const GET_MULTIPLE_CONFIG_CHOICE_SUCCESS = "GET_MULTIPLE_CONFIG_CHOICE_SUCCESS";
export const GET_MULTIPLE_CONFIG_CHOICE_ERROR = "GET_MULTIPLE_CONFIG_CHOICE_ERROR";
export const GET_MODULE = "GET_MODULE";
export const GET_MODULE_SUCCESS = "GET_MODULE_SUCCESS";
export const GET_MODULE_ERROR = "GET_MODULE_ERROR";
export const GET_PERMISSION = "GET_PERMISSION";
export const GET_PERMISSION_SUCCESS = "GET_PERMISSION_SUCCESS";
export const GET_PERMISSION_ERROR = "GET_PERMISSION_ERROR";

export const getSingleConfigChoice = (category) => ({
  type: GET_SINGLE_CONFIG_CHOICE,
  payload: { category },
});

export const getSingleConfigChoiceSuccess = (singleChoiceList) => ({
  type: GET_SINGLE_CONFIG_CHOICE_SUCCESS,
  payload: singleChoiceList,
});

export const getSingleConfigChoiceError = (error) => ({
  type: GET_SINGLE_CONFIG_CHOICE_ERROR,
  payload: error,
});

export const getMultipleConfigChoice = (categories) => ({
  type: GET_MULTIPLE_CONFIG_CHOICE,
  payload: { categories },
});

export const getMultipleConfigChoiceSuccess = (multipleChoiceList) => ({
  type: GET_MULTIPLE_CONFIG_CHOICE_SUCCESS,
  payload: multipleChoiceList,
});

export const getMultipleConfigChoiceError = (error) => ({
  type: GET_MULTIPLE_CONFIG_CHOICE_ERROR,
  payload: error,
});

export const getModule = () => ({
  type: GET_MODULE,
  payload: {},
});

export const getModuleSuccess = (moduleList) => ({
  type: GET_MODULE_SUCCESS,
  payload: moduleList,
});

export const getModuleError = (error) => ({
  type: GET_MODULE_ERROR,
  payload: error,
});

export const getPermission = () => ({
  type: GET_PERMISSION,
  payload: {},
});

export const getPermissionSuccess = (permissionList) => ({
  type: GET_PERMISSION_SUCCESS,
  payload: permissionList,
});

export const getPermissionError = (error) => ({
  type: GET_PERMISSION_ERROR,
  payload: error,
});
