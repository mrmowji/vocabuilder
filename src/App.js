import React from 'react';
import logo from './logo.svg';
import { input } from "./input";
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: input,
      output: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({
      input: e.target.value,
    });
  }

  handleClick() {
    let output = {};
    let word = "";
    for (let i = 0; i < this.state.input.length; i++) {
      if (/[a-zA-Z']/.test(this.state.input[i])) {
        word += this.state.input[i];
      } else if (word !== "") {
        if (output[word] !== undefined) {
          output[word].count++;
        } else {
          output[word] = {
            count: 1,
            length: word.length,
          };
        }
        word = "";
      }
    }
    this.setState({
      output: output,
    });
    console.log(output);
  }

  render() {
    let arrayOutput = Object.keys(this.state.output).map(key => ({
      word: key,
      count: this.state.output[key].count,
      length: this.state.output[key].length,
    }));
    arrayOutput.sort((a, b) => b.count - a.count);
    let formattedOutput = arrayOutput.map(item => (
      <li key={item.word}><span>{item.word}</span> <span>({item.count})</span> <span>{item.length}</span></li>
    ));
    return (
      <div className="App">
        <textarea value={this.state.input} onChange={this.handleChange} />
        <button type="button" onClick={this.handleClick}>Start</button>
        <div>{arrayOutput.length}</div>
        <textarea value={JSON.stringify(arrayOutput)} />
        <ul>
          {formattedOutput}
        </ul>

      </div>
    );
  }
}

export default App;
