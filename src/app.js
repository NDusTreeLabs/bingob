/**
 * Created by Mihail on 8/15/2016.
 */
'use strict';

import CardGenerator from './card/card-generator';
import CardDrawer from './card/card-drawer';
import 'es6-promise';
import 'isomorphic-fetch';

class App {

	constructor(title = 'Bingo game') {
		this.confUrl = 'http://localhost:8000/config.json';
		this.title = title;
		this.loadConfigs(App.init);
	}

	loadConfigs(callback) {
		fetch(this.confUrl)
			.then((response) => {
				if (response.status >= 400) {
					throw new Error("Bad response from server");
				}
				return response.json();
			}).then((config) => {
			callback(this, config);
		});

		return callback;
	}

	static init(context, conf) {
		context.start(conf);
	}

	start(conf) {
		this.cardGen = new CardGenerator(conf);
		let cardDrawer = new CardDrawer();
		let htmlCards = cardDrawer.draw(this.cardGen.generateCards());
		document.getElementById('startBtn').addEventListener('click', (e) => {
			console.log('>>> Start Game!');
			htmlCards.forEach((el) => {
				document.getElementById('gameContainer').appendChild(el);
			});
		});
	}
}

export default App;

(() => {
	let app = new App();
	//document.addEventListener('DOMContentLoaded', () => {});
})();
