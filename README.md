# guitAWESOME

guitAWESOME

Project: guitAWESOME Live Site https://guitawesome.herokuapp.com/
SUMMARY/DESCRIPTION:
App that is dedicated to helping beginning musicians learn how to play by sharing chords and tabs along with youtube videos to play along to. This is actually the exact way I learned how to play guitar. Looking up the chords and tabs and then listening along on youtube.

APPROACH: 
Technologies Used: Node.js, Mongoose, Express, AngularJS, HTML, and CSS. Full crud and using MVC structure.
We wanted to build an app dedicated to musicians who just want to chill and learn new songs as Olena plays ukulele and I play guitar. We found a scraper dedicated to Ultimate Guitar but it didn't seem like it was actually an API so we opted to keep it out. The theme is very nature/mountain/campfire as it tied in really well with the relaxing tone we were going for.

UNSOLVED PROBLEMS:
As I said earlier, figuring out the API to the scraper that was not exactly an API was very hard. I would like to figure out how to render the videos onto the page so it does not have to re-direct you to seperate websites. By far, the hardest thing about this project was dealing with branching and not overwriting each other's code. I definitely can get better in that aspect.

We both had a ton of fun doing this project, it was a really good balance between the fun we were having and being challenging. Also, there was a great debate between naming our app guitAWESOME and guitAWWWYEAHHHH.

Code Snippet --- 
Angular index.html

<!DOCTYPE html>
<html lang="en" dir="ltr" ng-app="GuitarApp">
    <head>
        <meta charset="utf-8">
        <title></title>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js" charset="utf-8"></script>
        <script src="/js/app.js" charset="utf-8"></script>
        <link rel="stylesheet" href="/css/app.css">
		<link href="https://fonts.googleapis.com/css?family=Covered+By+Your+Grace" rel="stylesheet">
    </head>
    <body class='body' ng-controller="GuitarController as ctrl">
		<div class='header'>
            <h1 class='title'>Relax and Learn</h1>
        <!-- hi button -->
        <div ng-if="!ctrl.loggedInUsername">
            <button id="hi" ng-click="ctrl.toggleInfo()">Click here to sign up or login!</button>
        </div>
        <!-- modal -->
        <div ng-show="ctrl.showInfo" id="modal" ng-if="!ctrl.loggedInUsername">
            <div class="modal-forms">
                <!--Log In-->
                <div class='login'>
                    Log In:
                    <form ng-submit='ctrl.logIn()'>
                        <label for="username">Username:</label>
                        <input type='text' ng-model='ctrl.user.username' />
                        <label for="password">Password:</label>
                        <input type='password'autocomplete="off" ng-model='ctrl.user.password' />
                        <input id="loginbtn" type='submit' value='Log In' />
                    </form>
                </div><br>
                <!--Create User-->
                <div class='createuser'>
                    Create User:
                    <form ng-submit='ctrl.createUser()'>
                        <label for="username">Username:</label>
                        <input type='text' ng-model='ctrl.createUserForm.username' />
                        <label for="password">Password:</label>
                        <input type='password' autocomplete="off" ng-model='ctrl.createUserForm.password' />
                        <input id="cruserbtn" type='submit' value='Create User' />
                    </form>
                </div>
            </div>
        </div>
        <!-- Display Logged In Username -->
        <div>
            <h1 class='h1user' ng-if="ctrl.loggedInUsername">You are logged in {{ctrl.loggedInUsername}}</h1>
        </div>
    </div>
<!-- Create Guitar -->
	<div class='wrapper'>
		<div class='createforms'>
			<div ng-if="ctrl.loggedInUsername">
                <form ng-submit="ctrl.createGuitar()">
                    Song: <input type="text" ng-model="ctrl.createForm.name" placeholder="Name">
                    Artist:<input type="text" ng-model="ctrl.createForm.artist" placeholder="Artist">
                    Video: <input type="text" ng-model="ctrl.createForm.url" placeholder="Video Url">
                    Tab: <input type="text" ng-model="ctrl.createForm.tabUrl" placeholder="Tab Url">
                    Lyrics: <input type="text" ng-model="ctrl.createForm.lyricUrl" placeholder="Lyric Url">
                    Learned Song: <input type="checkbox" ng-model="ctrl.createForm.learnedSong" value="Learned Song"><br>
                    <input id="addnewbtn" type="submit" name="" value="Add New Song">
		    </div>
		</form>
<!-- List to be Displayed --->
		<div ng-if="ctrl.loggedInUsername" class='board'>
        <div ng-if="ctrl.loggedInUsername" ng-repeat="guitar in ctrl.guitars" class="list">
            <ul>
                <li><a href="{{guitar.url}}">Song: {{guitar.name}}</a></li>
                <li>Artist: {{guitar.artist}}</li>
                <li><a href="{{guitar.tabUrl}}">Tabs</a></li>
                <li><a href="{{guitar.lyricUrl}}">Lyrics</a></li>
                <li>Learned Song: {{guitar.learnedSong}}</li>
<!-- Delete Button-->
				<div class='delete' ng-click='ctrl.deleteGuitar(guitar._id)'>Delete This Entry</div>
<!-- Updated/Edit list-->
                <div class='edit'>
                <a href="#" ng-click="(ctrl.indexOfEditFormToShow === $index) ? ctrl.indexOfEditFormToShow = null : ctrl.indexOfEditFormToShow = $index">Edit This Entry</a>
                <form ng-if="$index === ctrl.indexOfEditFormToShow" ng-submit="ctrl.editGuitar(guitar)">
                    Name: <input type="text" ng-model="ctrl.updatedName" placeholder="name">
                    Artist: <input type="text" ng-model="ctrl.updatedArtist" placeholder="artist name">
                    Video Url: <input type="text" ng-model="ctrl.updatedUrl" placeholder="song video url">
                    Tab Url: <input type="text" ng-model="ctrl.updatedtabUrl" placeholder="tab url">
                    Lyric Url: <input type="text" ng-model="ctrl.updatedlyricUrl" placeholder="lyric url">
                    Learned Song: <input type="checkbox" ng-model="ctrl.updatedlearnedSong" value="Learned Song">
                    <input id="submiteditsbtn" type="submit" name="" value="Submit Edits" >
                </form>
            </ul>
            </div>
		</div>
	</div>
</div>
<!-- Log Out -->
<div>
	<button id="logout" ng-if="ctrl.loggedInUsername" ng-click='ctrl.logOut()'>Log Out</button>
</div>
    </body>
</html>
  
 APP.JS
 
 const app = angular.module('GuitarApp', []);

app.controller('GuitarController', ['$http', function ($http) {
	this.createForm = {};
	this.guitar = '';
	// declare user
	this.createUserForm = {};
	this.user = {};
	// toggle login and create
	this.showInfo = false;
  	this.toggleInfo = () => {
    this.showInfo = !this.showInfo;
    console.log(this.showInfo);
  }
  	//toggle edit song/guitar form
	// this.showEdit = false;
	// this.toggleEdit = () => {
	// 	this.showEdit = !this.showEdit;
	// }

// create user
	this.createUser = () => {
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
		$http({
			method: 'POST',
			url: '/sessions',
			data: this.user
		}).then(response => {
			console.log(response);
			this.loggedInUsername = this.user.username;
			this.user = {};
		}, error => {
			console.log(error);
		}).catch(error => console.error('Catch: ', error));
	};
// log out
	this.logOut = () => {
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
 
