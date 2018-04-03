const app = angular.module('GuitarApp', []);
app.controller('AuthController', ['$http', function ($http) {

	this.getSignedInUser = () => {
		$http({
			method: 'GET',
			url: '/app'
		}).then(response => {
			console.log(response);
		});
	};

	this.createdUser = () => {
		$http({
			method: 'POST',
			url: '/users',
			data: {
				username: this.username,
				password: this.password
			}
		}).then(response => {
			console.log(response);
		}, error => {
			console.log(error);
		}).catch(error => console.error('Catch: ', error));
	};

	this.logIn = () => {
		$http({
			method: 'POST',
			url: '/sessions',
			data: {
				username: this.username,
				password: this.password
			}
		}).then(response => {
			console.log(response);
		}, error => {
			console.log(error);
		}).catch(error => console.error('Catch: ', error));
	};

	this.goApp = () => {
		const controller = this;
		$http({
			method: 'GET',
			url: '/app'
		}).then(response => {
			controller.loggedInUsername = response.data.username;
		}, error => {
			console.log(error);
		}).catch(error => console.error('Catch: ', error));
	};
}]);
// EVERYTHING ABOVE HERE IS LOGIN/CREATEUSER/AUTH
// =====================================================================
app.controller('GuitarController', ['$http', function ($http) {
	this.createForm = {};
	this.guitar = '';
// create song entry
	this.createGuitar = () => {
		$http({
			method: 'POST',
			url: '/guitar',
			data: this.createForm
		}).then(response => {
			this.guitars.push(response.data);
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
			this.guitars = response.data;
		}, error => {
			console.error(error);
		}).catch(err => console.error('Catch: ', err));
	};
	this.getGuitar();
// delete song entry
	this.deleteGuitar = (id) => {
		$http({
			method: 'DELETE',
			url: '/guitar/' + id
		}).then(response => {
			const removeByIndex = this.guitars.findIndex(guitar =>
            guitar._id === id);
			this.guitars.splice(removeByIndex, 1);
		}).catch(err => console.error('Catch: ', err));
	};
// edit song entry
	this.editGuitar = (guitar) => {
		this.learnedSong = false;
		$http({
			method: 'PUT',
			url: '/guitar/' + guitar._id,
			data: {
				name: this.updatedName,
				artist: this.updatedArtist,
				url: this.updatedUrl,
				tabUrl: this.updatedtabUrl,
				lyricUrl: this.updatedlyricUrl,
				learnedSong: this.updatedlearnedSong
			}
		}).then(response => {
			this.getGuitar();
		}, error => {
			console.error(error);
		}).catch(err => console.log('Catch', error));
	};
	this.getGuitar();
}]);
