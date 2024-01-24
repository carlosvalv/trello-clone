import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import Lists from "./components/Lists";
import ModalManager from "./components/Modals/ModalManager";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Trello clone</h1>
        <Lists />
      </div>
      <ModalManager />
    </Provider>
  );
}

export default App;
