(function (ConfApp) {
	$.widget("confapp.session_page", {
		options: {
			session: undefined
		},

		_create: function() {
			this._super("create");
			this.element.addClass("session_page")
			this.element.attr("data-role", "page")
			
			var page_header = $("<div />")	.attr("data-role", "header")
											.appendTo(this.element);

			var content = $("<div />")	.attr("data-role", "content")
										.appendTo(this.element);
			var back_button = $("<a />").attr("href", "javascript:void(0)")
										.attr("data-icon", "back")
										.addClass("ui-btn-left")
										.text("Back")
										.appendTo(page_header)
										.on("click", $.proxy(function() {
											$.mobile.changePage($("#content").parent());
											this.element.session_page("destroy");
										}, this));

			var session = this.option("session");

			var header = $("<div />")	.addClass("header")
										.appendTo(content);

			var title_view = $("<h1 />")	.addClass("title")
											.appendTo(header)
											.text(session.title);
			var chairs = $("<h2 />")	.addClass("chair")
										.appendTo(header);

			var event_views = $("<div />")	.appendTo(content);

			ConfApp.database.get_sub_sessions(session, $.proxy(function(events) {
				for(var i = 0; i<events.length; i++) {
					$("<div />").event_blob({
									event: events[i]
								})
								.appendTo(event_views);
				}
			}, this));
			var chairs = cjs([]);
			ConfApp.database.get_people(session, $.proxy(function(people) {
				var len = people.length;
				for(var i = 0; i<len; i++) {
					var person = people[i];
					$("<span />").person_blob({
									person: people[i]
								})
								.appendTo(chairs);
					if(i < len-1) {
						if(len === 2) {
							chairs.append(" and ");
						} else {
							if(i < len - 2) {
								chairs.append(", ");
							} else {
								chairs.append(", and ");
							}
						}
					}
				}
			}, this));
		},
		_destroy: function() {
			this._super("destroy");
		}
	});

	$.widget("confapp.event_blob", {
		options: {
			event: undefined
		},

		_create: function() {
			this._super("create");
			this.element.addClass("session_page")
			var event = this.option("event");
			var title = $("<h2 />")	.appendTo(this.element)
									.text(event.title);
			var authors = $("<div />")	.appendTo(this.element)
										.addClass("authors");
			var abstract = $("<p />")	.appendTo(this.element)
										.text(event.description);

			ConfApp.database.get_people(event, $.proxy(function(people) {
				var len = people.length;
				for(var i = 0; i<len; i++) {
					var person = people[i];
					$("<span />").person_blob({
									person: people[i]
								})
								.appendTo(authors);
					if(i < len-1) {
						if(len === 2) {
							authors.append(" and ");
						} else {
							if(i < len - 2) {
								authors.append(", ");
							} else {
								authors.append(", and ");
							}
						}
					}
				}
			}, this));
		},
		_destroy: function() {
			this._super("destroy");
		}
	});

	$.widget("confapp.person_blob", {
		options: {
			person: undefined
		},

		_create: function() {
			this._super("create");
			var person = this.option("person");
			var text = person.name;
			if(person.affiliation) {
				text += " (" + person.affiliation + ")";
			}
			this.element.text(text);
		},
		_destroy: function() {
			this._super("destroy");
		}
	});

}(ConfApp));
