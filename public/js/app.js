const app = angular.module('GuitarApp', []);

app.controller('GuitarController', ['$http', function ($http) {

	this.createForm = {};
	this.guitar = '';
	this.indexOfEditFormToShow = null;

// create song entry
	this.createGuitar = () => {
		console.log('post', this.guitar);
		$http({
			method: 'POST',
			url: '/guitar',
			data: this.createForm
		}).then(response => {
			this.guitar.push(response.data);
			this.createForm = {};
		}, error => {
			console.error(error);
		}).catch(err => console.error('Catch: ', err));
	};

// get index of songs
	this.getGuitar = () => {
		$http({
			method: 'GET',
			url: '/guitar'
		}).then(response => {
			this.guitar = response.data;
		}, error => {
			console.error(error);
		}).catch(err => console.error('Catch: ', err))
	};
	this.getGuitar();

// delete song entry
	this.deleteGuitar = (id) => {
		$http({
			method: 'DELETE',
			url: '/guitar/' + id
		}).then(response => {
			const removeByIndex = this.guitar.findIndex(guitar =>
            guitar._id === id);
			this.guitars.splice(removeByIndex, 1);
		}).catch(err => console.error('Catch: ', err));
	};

// edit song entry
	this.editGuitar = (guitar) => {
		console.log('guitar learned', this._id);
		this.learnedSong = !this.learnedSong;
		console.log('after guitar learned');
		$http({
			method: 'PUT',
			url: '/guitar/' + this._id,
			data: {
				name: this.updatedName,
				artist: this.updatedArtist,
				url: this.updatedUrl,
				tabUrl: this.updatedtabUrl,
				lyricUrl: this.updatedlyricUrl,
				learnedSong: {learnedSong: this.updatedlearnedSong}
			}
		}).then(response => {
			this.getGuitar();
		}, error => {
			console.error(error);
		}).catch(err => console.log('Catch', error))
	};
	this.getGuitar();
}]);
