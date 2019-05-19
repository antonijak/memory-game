import React, { Component } from 'react';
import './App.scss';

//images
import ace from './assets/ace.jpg';
import earphones from './assets/earphones.jpg';
import smiley from './assets/smiley.jpg';
import umbrella from './assets/umbrella.jpg';
import cat from './assets/cat.jpg';
import rose from './assets/rose.jpg';
import question from './assets/question.jpg';
import baloon from './assets/baloon.jpg';

class App extends Component {
	state = {
		cards: [ace, earphones, smiley, umbrella, cat, rose, baloon, question],
		stack: [],
		open: {
			first: { picture: '', card: '' },
			second: { picture: '', card: '' }
		},
		score: 0,
		moves: 0,
		cls: 'info__text__score__number'
	};

	createRandomStack = numberOfPictures => {
		// create array of random numbers starting from 0 to max

		let arr = [];
		const max = numberOfPictures * 2;

		for (let i = 0; arr.length < max; i++) {
			let num = Math.floor(Math.random() * max);
			!arr.includes(num) && arr.push(num);
		}

		//return only numbers 0-numberOfPictures in the array

		return arr.map(num =>
			num > numberOfPictures - 1 ? num - numberOfPictures : num
		);
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
				score: this.state.score + 1,
				cls: 'info__text__score__number info__text__score__number--black'
			});

			setTimeout(() => {
				this.setState({
					cls: 'info__text__score__number'
				});
			}, 500);
		}, 500);
	};

	flipACard = (picture, card) => {
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
				},
				moves: this.state.moves + 1
			});

			picture === firstPic && this.givePoint(picture);
		} else {
			this.setState({
				open: {
					...this.state.open,
					first: { picture, card }
				},
				moves: this.state.moves + 1
			});
		}
	};

	closeAllCards = e => {
		// close all cards when user clicks between cards

		if (
			e.target.id === 'game' &&
			this.state.open.first.picture &&
			this.state.open.second.picture
		) {
			this.setState({
				open: {
					first: { picture: '', card: '' },
					second: { picture: '', card: '' }
				}
			});
		}
	};

	render() {
		const { stack, cards, open, score, moves, cls } = this.state;
		const { picture: firstPicture, card: firstCard } = open.first;
		const { picture: secondPicture, card: secondCard } = open.second;

		return (
			<div className="App">
				<div className="info">
					<div className="info__text">
						<p className="info__text__moves">
							Moves <span className="info__text__moves__number">{moves}</span>
						</p>
						<h1 className="info__text__title">Memory Game</h1>
						<p className="info__text__score">
							Score <span className={cls}>{score}</span>
						</p>
					</div>
				</div>

				{score === 8 && <div className="congrats">Congratulations!</div>}

				<div className="game" onClick={this.closeAllCards} id="game">
					{stack.map((picture, i) => {
						const card = i + 1;
						return (
							<div
								key={card}
								className={
									picture === 'x' ? 'game__card empty-slot' : 'game__card'
								}
								onMouseDown={() =>
									picture !== 'x' && this.flipACard(picture, card)
								}
							>
								{picture !== 'x' ? (
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
								) : (
									<div />
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
