interface defaultStateI {}

const defaultState: defaultStateI = {};

const filesReducer = (
  state: defaultStateI = defaultState,
  action: any
): defaultStateI => {
  return state;
};

export default filesReducer;
