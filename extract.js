d = document;
d.qs = d.querySelector;
d.qsa = d.querySelectorAll;
d.qst = function querySelectorText(match) {
	var e = d.qs(match);
	if (e) return e.innerText;
}

function makeUrl(base, params) {
	var url = base + "?";
	for (var prop in params)
		url += prop + "=" + encodeURIComponent(params[prop]) + "&";
	return url;
}

function provideEventData(data) {
	d.location.href = makeUrl("https://echomanchester.net/event/add", data);
}

function facebook() {
	// See more
	var c = d.qs(".see_more_link");
	if (c)
		c.click();

	var dt = new Date(d.qs("[itemprop=startDate]").getAttribute("content"));

	// Make the actual URL.
	provideEventData({
		title: d.qst("#event_header_info a"),
		location: d.qsa("._5xhk")[1].innerText + ", " + d.qsa("._5xhp")[1].innerText,
		blurb: d.qst("#event_description"),
		url: d.location.href,
		date1: dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate(),
		time1: dt.getHours() + ":" + dt.getMinutes(),
	});
}

function eventbrite() {
	// Make the actual URL.
	provideEventData({
		title: d.qst("#event_header h1 span.summary"),
		hosted: d.qst("#event_header h2"),
		location: d.qst(".location.vcard"),
		blurb: d.qst(".description"),
		url: d.location.href,
		startdt: d.qs(".dtstart .value-title").title,
		enddt: d.qs(".dtend .value-title").title,
	});
}
