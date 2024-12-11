import "./App.css";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <div className="container-fluid main_cont">
      <div className="row m-0 main_row">
        <div className="col-12">
          <div className="row m-0 justify-content-center">
            <div className="col-12 col-md-6">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
