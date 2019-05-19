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
		},
		score: 0
	};

	createRandomStack = max => {
		// create array of random numbers starting from 0 to max

		let arr = [];

		for (let i = 0; arr.length < max; i++) {
			let num = Math.floor(Math.random() * max);
			!arr.includes(num) && arr.push(num);
		}
		//return only numbers 0-3 in the array

		return arr.map(num => (num > 3 ? num - 4 : num));
	};

	componentDidMount = () => {
		//this code is for future when number and source of cards could be changed

		const deck = this.state.cards;

		//duplicate all cards
		const cards = deck.concat(deck);

		this.setState({ stack: this.createRandomStack(8), cards });
	};

	givePoint = picture => {
		setTimeout(() => {
			this.setState({
				stack: this.state.stack.map(item =>
					item === picture ? (item = 'x') : item
				),
				score: this.state.score + 1
			});
		}, 500);
	};

	handleClick = (picture, card) => {
		const { picture: firstPic, card: firstCard } = this.state.open.first;
		const secondPic = this.state.open.second.picture;

		//check if any cards are already selected and populate "open": first "first" then "second"

		if (firstPic !== '' && secondPic !== '') {
			this.setState({
				open: {
					first: { picture: '', card: '' },
					second: { picture: '', card: '' }
				}
			});
		} else if (firstPic !== '' && secondPic === '' && card !== firstCard) {
			this.setState({
				open: {
					...this.state.open,
					second: { picture, card }
				}
			});

			picture === firstPic && this.givePoint(picture);
		} else {
			this.setState({
				open: {
					...this.state.open,
					first: { picture, card }
				}
			});
		}
	};

	render() {
		const { stack, cards, open, score } = this.state;
		const { picture: firstPicture, card: firstCard } = open.first;
		const { picture: secondPicture, card: secondCard } = open.second;

		return (
			<div className="App">
				<div className="info">Score: {score}</div>
				<div className="game">
					{stack.map((picture, i) => {
						const card = i + 1;
						return (
							<div
								key={card}
								className={
									picture === 'x' ? 'game__card empty-slot' : 'game__card'
								}
								onClick={() =>
									picture !== 'x' && this.handleClick(picture, card)
								}
							>
								{picture !== 'x' && (
									<img
										className={
											(firstPicture === picture && firstCard === card) ||
											(secondPicture === picture && secondCard === card)
												? 'game__card__image'
												: 'game__card__image game__card__image--hidden'
										}
										src={cards[picture]}
										alt={`card${picture}`}
									/>
								)}
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default App;
