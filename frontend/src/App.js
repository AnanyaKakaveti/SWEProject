import logo from './logo.svg';
import './App.css';
import { connect, sendMsg } from "./api";

// function App() {
//   return (
    
//     <div className="App">
//       <header className="App-header">
//         <p>
//           Welcome to JAM.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <login>  Sign in</login>
      
//         </a>
        
//         <div>Hello!</div>
//       </header>
//     </div>
//   );
// }

class App extends Component {
  constructor(props) {
    super(props);
    connect();
  }

  send() {
    console.log("hello");
    sendMsg("hello");
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.send}>Hit</button>
      </div>
    );
  }
}

export default App;
