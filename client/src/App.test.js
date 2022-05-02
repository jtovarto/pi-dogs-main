import { render } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import configureStore from "redux-mock-store";

describe("With React Testing Library", () => {
  const initialState = {};
  const mockStore = configureStore();
  let store;
  let app;

  beforeEach(() => {
    store = mockStore(initialState);
    app = (
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
  });

  it('Shows "Hello world!"', () => {
    
    const { getByText } = render(app);

    expect(getByText("Bienvenidos")).not.toBeNull();
  });

  it('Shows "Hello world!a"', () => {
    
    const { getByText } = render(app);

    expect(getByText("Bienvenidos")).not.toBeNull();
  });
});
