import { Container } from "reactstrap";
import Navi from "../navi/Navi";
import Dashbord from "./Dashbord";

function App() {
  return (
    <Container>
      <Navi xs="12"></Navi>
      <Dashbord></Dashbord>
    </Container>
  );
}

export default App;
