const app = angular.module('GuitarApp', []);

app.controller('GuitarController', ['$http', function ($http) {
	this.createForm = {};
	this.guitar = '';
	// declare user
	this.createUserForm = {};
	this.user = {};

// create user
	this.createUser = () => {
		this.showForm = true;
		$http({
			method: 'POST',
			url: '/users',
			data: this.createUserForm
		}).then(response => {
			console.log(response);
			this.createUserForm = {};
		}, error => {
			console.log(error);
		}).catch(error => console.error('Catch: ', error));
	};
// log in
	this.logIn = () => {
		this.showForm = true;
		$http({
			method: 'POST',
			url: '/sessions',
			data: this.user
		}).then(response => {
			console.log(this.user);
			this.loggedInUsername = this.user.username;
			this.user = {};
		}, error => {
			console.log(error);
		}).catch(error => console.error('Catch: ', error));
	};
// log out
	this.logOut = () => {
		this.showForm = true;
		$http({
			method: 'DELETE',
			url: '/sessions',
			data: {
				username: this.user.username,
				password: this.user.password
			}
		}).then(response => {
			this.loggedInUsername = '';
			console.log(response);
		});
	};

// create song entry
	this.createGuitar = () => {
		this.showForm = true;
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
