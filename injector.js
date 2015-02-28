javascript:(function() {
	var url = 'https://raw.githubusercontent.com/takkaria/echo-extractor/master/extract.js';

	var d = document,
		z = d.createElement('script'),
		b = d.body;

	try {
		if (!b) throw (0);
		z.setAttribute('src', '');
		b.appendChild(z);
	} catch (e) {
		alert('Please wait until the page has loaded.');
	}

})();
