(function (ConfApp) {
	$.widget("confapp.session_blob", {
		options: {
			session: undefined
		},

		_create: function() {
			this._super("create");
			this.element.addClass("session_blob")
			var session = this.option("session");
			
			var title_div = $("<div />").addClass("title")
										.appendTo(this.element)
										.text(session.title);
			var sub_div = $("<div />")	.addClass("sub")
										.appendTo(this.element);
			var type_span = $("<span />")	.addClass("type")
											.appendTo(sub_div)
											.text(session.type);
			var location_span = $("<span />")	.addClass("location")
												.appendTo(sub_div);
			ConfApp.database.get_location(session.location_fk, $.proxy(function(location) {
				if(location) {
					location_span.text(location.name);
				}
			}, this));

			this.element.on("click", $.proxy(this.expand, this));
		},
		_destroy: function() {
			this._super("destroy");
		},
		expand: function() {
			this.element.trigger("expand");
		}
	});

}(ConfApp));
