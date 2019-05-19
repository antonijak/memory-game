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
    stack: [],
    open: {
      first: { picture: '', card: '' },
      second: { picture: '', card: '' }
    }
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
  handleClick = (pictureId, cardId) => {
    const first = this.state.open.first.picture;
    const second = this.state.open.second.picture;
    if (first !== '' && second !== '') {
      this.setState({
        open: {
          first: { picture: '', card: '' },
          second: { picture: '', card: '' }
        }
      });
    } else if (
      first !== '' &&
      second === '' &&
      cardId !== this.state.open.first.card
    ) {
      this.setState({
        open: {
          ...this.state.open,
          second: { picture: pictureId, card: cardId }
        }
      });
    } else {
      this.setState({
        open: {
          ...this.state.open,
          first: { picture: pictureId, card: cardId }
        }
      });
    }
  };
  return0to3 = num => {
    return num > 3 ? num - 4 : num;
  };
  render() {
    const { stack, cards, open } = this.state;
    return (
      <div className="App">
        <div className="game">
          {stack.map((card, i) => (
            <div
              key={i + 1}
              className="game__card"
              onClick={() => this.handleClick(this.return0to3(card), i + 1)}
            >
              <img
                className={
                  (open.first.picture === this.return0to3(card) &&
                    open.first.card === i + 1) ||
                  (open.second.picture === this.return0to3(card) &&
                    open.second.card === i + 1)
                    ? 'game__card__image'
                    : 'game__card__image game__card__image--hidden'
                }
                src={cards[this.return0to3(card)]}
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
