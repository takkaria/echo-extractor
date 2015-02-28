// build using the crunchinator http://ted.mielczarek.org/code/mozilla/bookmarklet.html
// max length 2048

d = document;
d.qs = d.querySelector;
d.qsa = d.querySelectorAll;

// Modified from jquery
getText = function (elem) {
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

qst = function(match) {
	var e = d.qs(match);
	if (e) return getText(e);
}

makeUrl = function(base, params) {
	var url = base + '?';
	for (var prop in params)
		url += prop + '=' + encodeURIComponent(params[prop]) + '&';
	return url;
}

eventData = function(data) {
	d.location.href = makeUrl('https://echomanchester.net/event/add', data);
}

if (d.location.host == "www.facebook.com") {
	// See more
	var c = d.qs('.see_more_link');
	if (c)
		c.click();

	var dt = new Date(d.qs('[itemprop=startDate]').getAttribute('content'));

	eventData({
		title: qst('#event_header_info a'),
		location: d.qsa('._5xhk')[1].textContent + ', ' + d.qsa('._5xhp')[1].textContent,
		blurb: qst('#event_description'),
		url: d.location.href,
		date1: dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate(),
		time1: dt.getHours() + ':' + dt.getMinutes(),
	});
} else if (d.location.host == "www.eventbrite.com") {
	var dt1 = d.qs('.dtstart .value-title').title;
	var dt2 = d.qs('.dtend .value-title').title;

	eventData({
		title: qst('#event_header h1 span.summary'),
		hosted: qst('#event_header h2').trim(),
		location: qst('.location.vcard').trim(),
		blurb: qst('.description').trim(),
		url: d.location.href,
		date1: dt1.substr(0, 10),
		time1: dt1.substr(11, 5),
		date2: dt2.substr(0, 10),
		time2: dt2.substr(11, 5),
	});
} else {
	alert("Can't handle this webpage.");
}