import React, { Component } from 'react';
import './App.scss';

//images
import ace from './assets/ace.jpg';
import earphones from './assets/earphones.jpg';
import smiley from './assets/smiley.jpg';
import umbrella from './assets/umbrella.jpg';

class App extends Component {
  state = {
    cards: [ace, earphones, smiley, umbrella],
    stack: []
  };
  createRandomStack = max => {
    // create array of random numbers starting from 0 to max
    let arr = [];
    for (let i = 0; arr.length < max; i++) {
      let num = Math.floor(Math.random() * max);
      !arr.includes(num) && arr.push(num);
    }
    return arr;
  };
  componentDidMount = () => {
    const deck = this.state.cards;
    //duplicate all cards
    const cards = deck.concat(deck);

    this.setState({ stack: this.createRandomStack(8), cards });
  };
  render() {
    const { stack, cards } = this.state;
    return (
      <div className="App">
        <div className="game">
          {stack.map((card, i) => (
            <div key={i + 1} className="game__card">
              <img
                className="game__card__image"
                src={card > 3 ? cards[card - 4] : cards[card]}
                alt={`card${card}`}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
