import { useReducer } from "react";

const ReducerTest = () => {
  interface State {
    counter: number;
  }

  type Action =
    | {
        type: "increment";
      }
    | { type: "decrement" };

  function reducer(state: State, action: Action) {
    switch (action.type) {
      case "increment":
        return {
          counter: state.counter + 1,
        };
      case "decrement":
        return {
          counter: state.counter - 1,
        };
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, { counter: 0 });

  function increment() {
    dispatch({ type: "increment" });
  }
  function decrement() {
    dispatch({ type: "decrement" });
  }

  return (
    <div className="container">
      <p>
        The counter is <span>{state.counter}</span>
      </p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
};

export default ReducerTest;
