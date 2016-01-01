// Modified from jquery
function getText(elem) {
	var node,
		ret = '',
		nodeType = elem.nodeType;

	if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		if ( typeof elem.textContent === 'string' ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
}

function qst(match) {
	var e = document.querySelector(match);
	if (e) return getText(e);
}

function makeUrl(base, params) {
	var url = base + '?';
	for (var prop in params)
		url += prop + '=' + encodeURIComponent(params[prop]) + '&';
	return url;
}

function eventData(data) {
	document.location.href = makeUrl('https://echomanchester.net/event/add', data);
}

if (document.location.host == "www.facebook.com") {
	// See more
	var c = document.querySelector('.see_more_link');
	if (c)
		c.click();

	var dt = new Date(document.querySelector('[itemprop=startDate]').getAttribute('content'));

	eventData({
		title: qst('#event_header_info a'),
		location: document.querySelectorAll('._5xhk')[1].textContent + ', ' + document.querySelectorAll('._5xhp')[1].textContent,
		blurb: qst('#event_description'),
		url: document.location.href,
		date1: dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate(),
		time1: dt.getHours() + ':' + dt.getMinutes(),
	});
} else if (document.location.host == "www.eventbrite.com" ||
		document.location.host == "www.eventbrite.co.uk") {
	var dt1 = document.querySelector('.dtstart .value-title').title;
	var dt2 = document.querySelector('.dtend .value-title').title;

	eventData({
		title: qst('#event_header h1 span.summary'),
		hosted: qst('#event_header h2').trim(),
		location: qst('h2.location').trim(),
		blurb: qst('.description').trim(),
		url: document.location.href,
		date1: dt1.substr(0, 10),
		time1: dt1.substr(11, 5),
		date2: dt2.substr(0, 10),
		time2: dt2.substr(11, 5),
	});
} else {
	alert("Can't handle this webpage.");
}