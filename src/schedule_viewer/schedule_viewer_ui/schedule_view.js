(function (ConfApp) {
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	 	months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		ampm = ["AM", "PM"];

	function pad(n, width, z) {
		z = z || '0';
		n = n + '';
		return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	}

	$.widget("confapp.schedule", {
		options: {
			get_day_str: function(date) {
				return days[date.getDay()] + " " + months[date.getMonth()] + " " + date.getDate();
			},

			get_time_range_str: function(start_time, end_time) {
				var start_hours = start_time.getHours(),
					end_hours = end_time.getHours();
				var ampm;
				if(end_hours >= 12) {
					ampm = "PM";
					end_hours -= 12;
				} else {
					ampm = "AM";
				}

				if(start_hours >= 12) {
					start_hours -= 12;
				}
				
				if(start_hours === 0) { start_hours = 12; }
				if(end_hours === 0) { end_hours = 12; }

				return start_hours+":" + pad(start_time.getMinutes(), 2)+"-"+end_hours+":"+pad(end_time.getMinutes(), 2) + " " + ampm;
			}
		},

		_create: function() {
			this._super("create");
			//$.mobile.loading("show");
			if(ConfApp.database.is_loaded()) {
				this.on_db_loaded();
			} else {
				ConfApp.database.once("loaded", $.proxy(this.on_db_loaded, this));
			}
		},

		on_db_loaded: function() {
			ConfApp.database.get_days($.proxy(this.on_days_loaded, this));
		},

		on_days_loaded: function(days) {
			var len = days.length;
			for(var i = 0; i<len; i++) {
				var day = days[i];
				var day_header = $("<h3 />")	.appendTo(this.element)
												.text(this.option("get_day_str").call(this, day));
				var day_grid_container = $("<div />").appendTo(this.element);
				ConfApp.database.get_sessions(	day,
												new Date(day.getTime() + (24 * 60 * 60 * 1000) - 1),
												$.proxy(this.on_day_sessions_loaded, this, day, day_grid_container));

			}
		},

		on_day_sessions_loaded: function(day, day_grid_container, sessions) {
			// Sort by start time
			sessions.sort(function(a, b) {
				if(a.start_time === b.start_time) {
					return a.end_time - b.end_time;
				} else {
					return a.start_time - b.start_time;
				}
			});
			var last_start_time, last_end_time;

			var len = sessions.length;
			var class_strings = ['a', 'b', 'c', 'd', 'e'];
			var get_time_range_str = this.option("get_time_range_str");

			var day_grid;
			var session_num = 0;

			for(var i = 0; i<len; i++) {
				var session = sessions[i];
				var start_time = session.start_time, end_time = session.end_time;

				if(start_time !== last_start_time || end_time !== last_end_time) {
					var time_range_header = $("<h4 />")	.appendTo(day_grid_container)
														.text(get_time_range_str(session.start_date, session.end_date));
														
					var day_grid = $("<div />")	.addClass("ui-grid-d ui-responsive")
												.appendTo(day_grid_container);
					
					last_start_time = start_time;
					last_end_time = end_time;
					session_num = 0;
				}

				var title = session.title;
				var block = $("<div />").addClass("ui-block-"+class_strings[session_num%class_strings.length])
										.appendTo(day_grid);
				var block_body = $("<div />")	.addClass("ui-body ui-body-d")
												.appendTo(block)
												.session_blob({
													session: session
												});

				block_body.on("expand", $.proxy(this.expand_session, this, session, block_body));
				session_num++;
			}
		},

		expand_session: function(session, session_display) {
			$.mobile.changePage($("<div />").appendTo(document.body).session_page({
				session: session
			}));
		},

		_destroy: function() {
			this._super("destroy");
		}
	});

}(ConfApp));
