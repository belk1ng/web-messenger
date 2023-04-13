import { useReducer } from "react";

type ActionPayload = {
  name: string;
  value: string;
};

type ActionType =
  | {
      type: "change";
      payload: ActionPayload;
    }
  | {
      type: "error";
      payload: ActionPayload;
    }
  | {
      type: "clear";
      payload: {
        name: string;
      };
    };

function useFormReducer<
  T extends Record<
    string,
    {
      value: string;
      errorMessage: string;
    }
  >
>(initState: T) {
  function reducer(state: T, action: ActionType) {
    switch (action.type) {
      case "change":
        return {
          ...state,
          [action.payload.name]: {
            value: action.payload.value,
            errorMessage: "",
          },
        };

      case "error":
        return {
          ...state,
          [action.payload.name]: {
            value: state[action.payload.name as keyof typeof state].value,
            errorMessage: action.payload.value,
          },
        };

      case "clear":
        return {
          ...state,
          [action.payload.name]: {
            value: state[action.payload.name as keyof typeof state].value,
            errorMessage: "",
          },
        };
    }
  }

  const [state, dispatch] = useReducer(reducer, initState);

  const handleChange = (name: string, value: string) => {
    dispatch({
      type: "change",
      payload: {
        name,
        value,
      },
    });
  };

  const handleError = (name: string, value: string) => {
    dispatch({
      type: "error",
      payload: {
        name,
        value,
      },
    });
  };

  const handleClearError = (name: string) => {
    dispatch({
      type: "clear",
      payload: {
        name,
      },
    });
  };

  return {
    state,
    dispatch,
    handleChange,
    handleError,
    handleClearError,
  };
}

export default useFormReducer;
