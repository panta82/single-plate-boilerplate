import { Boilerplate, FIELD_TYPES } from '../lib/types';

function prependLines(targetStr, withStr) {
	return targetStr
		.split(/\n\r|\r\n|\r|\n/g)
		.map(str => (str ? withStr + str : str))
		.join('\n');
}

function generateHTML({ favicon, navbarDark, navbarContainer, jumbotron, form }) {
	let navbarHTML = `
			<a class="navbar-brand" href="#">Navbar</a>
			<button class="navbar-toggler" type="button"
					data-toggle="collapse" data-target="#navbarsExampleDefault"
					aria-controls="navbarsExampleDefault" aria-expanded="false"
					aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarsExampleDefault">
				<ul class="navbar-nav mr-auto">
					<li class="nav-item active">
						<a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">Link</a>
					</li>
					<li class="nav-item">
						<a class="nav-link disabled" href="#">Disabled</a>
					</li>
					<li class="nav-item dropdown">
						<a class="nav-link dropdown-toggle" href="#"
								id="dropdown01" data-toggle="dropdown" aria-haspopup="true"
								aria-expanded="false">Dropdown</a>
						<div class="dropdown-menu" aria-labelledby="dropdown01">
							<a class="dropdown-item" href="#">Action</a>
							<a class="dropdown-item" href="#">Another action</a>
							<a class="dropdown-item" href="#">Something else here</a>
						</div>
					</li>
				</ul>
				<form class="form-inline my-2 my-lg-0">
					<input class="form-control mr-sm-2" type="text"
							placeholder="Search" aria-label="Search">
					<button class="btn btn-outline-default my-2 my-sm-0"
							type="submit">Search</button>
				</form>
			</div>
`;

	if (navbarContainer) {
		navbarHTML =
			`\n			<div class="container d-flex justify-content-between">` +
			prependLines(navbarHTML, '\t') +
			`			</div>\n`;
	}

	let jumbotronHTML = '';
	if (jumbotron) {
		jumbotronHTML = `
		<div class="jumbotron">
			<div class="container">
				<h1 class="display-3">Hello, world!</h1>
				<p>Jumbotron text</p>
				<p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>
			</div>
		</div>
`;
	}

	let formHTML = '';
	if (form) {
		formHTML = `
			<hr />
			<form>
				<div class="form-row">
					<div class="form-group col-md-6">
						<label for="inputEmail4">Email</label>
						<input type="email" class="form-control" id="inputEmail4" placeholder="Email">
					</div>
					<div class="form-group col-md-6">
						<label for="inputPassword4">Password</label>
						<input type="password" class="form-control" id="inputPassword4" placeholder="Password">
					</div>
				</div>
				<div class="form-group">
					<label for="inputAddress">Address</label>
					<input type="text" class="form-control" id="inputAddress"
							placeholder="1234 Main St">
				</div>
				<div class="form-group">
					<label for="inputAddress2">Address 2</label>
					<input type="text" class="form-control" id="inputAddress2"
							placeholder="Apartment, studio, or floor">
				</div>
				<div class="form-row">
					<div class="form-group col-md-6">
						<label for="inputCity">City</label>
						<input type="text" class="form-control" id="inputCity">
					</div>
					<div class="form-group col-md-4">
						<label for="inputState">State</label>
						<select id="inputState" class="form-control">
							<option selected="">Choose...</option>
							<option>State1</option>
							<option>State2</option>
							<option>State3</option>
						</select>
					</div>
					<div class="form-group col-md-2">
						<label for="inputZip">Zip</label>
						<input type="text" class="form-control" id="inputZip">
					</div>
				</div>
				<div class="form-group">
					<div class="form-check">
						<input class="form-check-input" type="checkbox" id="gridCheck">
						<label class="form-check-label" for="gridCheck">
							Check me out
						</label>
					</div>
				</div>
				<button type="submit" class="btn btn-primary">Sign in</button>
			</form>
`;
	}

	return `
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta name="description" content="">
		<meta name="author" content="">
${favicon ? `		<link rel="icon" href="favicon.ico">\n` : ''}
		<title>Hello world</title>

		<link rel="stylesheet"
				href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
				integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
				crossorigin="anonymous" />
		
		<style type="text/css" rel="stylesheet">
			/* your styles here */
		</style>
	</head>

	<body>
		
		<nav class="navbar navbar-expand-md ${
			navbarDark ? 'navbar-dark bg-dark' : 'navbar-light bg-light'
		}">
${navbarHTML}
		</nav>
${jumbotronHTML}
		<main role="main" class="container">
${formHTML}
		</main>
		
		<footer class="text-muted">
      <div class="container">
        <hr />
        <p class="float-right">
          <a href="#">Back to top</a>
        </p>
        <p>Copyright ${new Date().getFullYear()}, Company</p>
      </div>
    </footer>

		<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
				integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
				crossorigin="anonymous"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"
				integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ"
				crossorigin="anonymous"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"
				integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm"
				crossorigin="anonymous"></script>
	</body>
</html>
	`.trim();
}

export default new Boilerplate({
	title: 'Bootstrap page',
	description: `Bootstrap 4.x starter template with navbar. Assets are drawn from CDN-s.`,

	fields: [
		{
			key: 'favicon',
			label: 'Favicon',
			type: FIELD_TYPES.TOGGLE,
			default: true,
		},
		{
			key: 'navbarDark',
			label: 'Dark navbar',
			type: FIELD_TYPES.TOGGLE,
			default: false,
		},
		{
			key: 'navbarContainer',
			label: 'Navbar container',
			type: FIELD_TYPES.TOGGLE,
			default: true,
		},
		{
			key: 'jumbotron',
			label: 'Jumbotron',
			type: FIELD_TYPES.TOGGLE,
			default: false,
		},
		{
			key: 'form',
			label: 'Form example',
			type: FIELD_TYPES.TOGGLE,
			default: false,
		},
	],

	blocks: [
		{
			title: null,
			language: 'html',
			instructions: 'Paste this into your HTML file',
			code: generateHTML,
		},
	],
});
