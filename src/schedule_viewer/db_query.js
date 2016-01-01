(function(ConfApp) {
	var blank_fn = function(){};
	var extract_args = function(args, arg_names) {
		var arg_map = {};
		if(args.length === 0) {
			arg_map.callback = blank_fn;
		} else {
			var len = arg_names.length;
			for(var i = 0; i<len; i++) {
				arg_map[arg_names[i]] = args[i];
			}
			
			if($.isFunction(args[args.length-1])) {
				arg_map.callback = args[args.length-1];
			} else {
				arg_map.callback = blank_fn;
			}
		}
		return arg_map;
	};

	var Database = function(db_url) {
		able.make_this_listenable(this);
		this.database = undefined;
		this.loaded = false;
		this.load(db_url);
	};
	(function(My) {
		var proto = My.prototype;
		able.make_proto_listenable(proto);

		proto.load = function(filename) {
			$.ajax({
				url: filename,
				dataType: "text",
				error: function() { console.log("error"); },
				success: $.proxy(function(data) {
					this.database = JSON.parse(data);
					this.loaded = true;
					this._emit("loaded");
				}, this)
			});
		};
		proto.is_loaded = function() {
			return this.loaded;
		};

		proto.get_days = function() {
			if(!this.loaded) {
				throw new Error("Database is not loaded");
			}
			var args = extract_args(arguments, []);
			var timezone_offset = (new Date()).getTimezoneOffset() * 60;

			var start_date = new Date((this.database.conference[0].start_day + this.database.conference[0].utc_offset + timezone_offset) * 1000);
			var num_days = this.database.conference[0].num_days;
			var rv = [];
			for(var i = 0; i<num_days; i++) {
				var day_date = new Date(start_date.getTime() + i * 24 * 60 * 60 * 1000)
				rv.push(day_date);
			}
			args.callback(rv);
		};

		proto.get_sessions = function() {
			if(!this.loaded) { throw new Error("Database is not loaded"); }
			var args = extract_args(arguments, ["start_time", "end_time"]);

			var database = this.database;

			var len = database.event.length;
			var children = [];
			for(var i = 0; i<len; i++) {
				var event = database.event[i];
				this.initialize_event(event);
				var start_time = event.start_time * 1000;
				if(event.top_level && start_time > args.start_time) {
					if(start_time > args.end_time) {
						//break;
						continue;
					}
					children.push(event);
				}
			}
			args.callback(children);
		};

		proto.initialize_event = function(event) {
			if(!event.initialized) {
				var timezone_offset = (new Date()).getTimezoneOffset() * 60;

				event.start_date = new Date((event.start_time + this.database.conference[0].utc_offset + timezone_offset)*1000);
				event.end_date = new Date((event.end_time + this.database.conference[0].utc_offset + timezone_offset)*1000);
				event.initialized = true;
			}
		};

		proto.get_sub_sessions = function() {
			if(!this.loaded) { throw new Error("Database is not loaded"); }
			var args = extract_args(arguments, ["session"]);
			
			var database = this.database;

			var event_events = database.event_events;
			var len = database.event_events.length;
			var child_fks = [];
			var parent_fk = args.session._id;
			for(var i = 0; i<len; i++) {
				var ee = event_events[i];
				if(ee.parent_fk === parent_fk) {
					child_fks[ee.sequence] = ee.child_fk;
				}
			}
			len = database.event.length;
			var children = [];
			outer: for(var j = 0; j<len; j++) {
				var event = database.event[j];
				var _id = event._id;
				for(var k = 0; k<child_fks.length; k++) {
					if(child_fks[k] === _id) {
						children.push(event);
						continue outer;
					}
				}
			}

			children.sort(function(a, b) {
				return child_fks.indexOf(a._id) - child_fks.indexOf(b._id);
			});
			args.callback(children);
		};

		proto.get_people = function() {
			if(!this.loaded) { throw new Error("Database is not loaded"); }
			var args = extract_args(arguments, ["event"]);
			
			var database = this.database;

			var event_people = database.event_people;
			var len = database.event_people.length;
			var person_fks = [];
			var event_fk = args.event._id;
			for(var i = 0; i<len; i++) {
				var ep = event_people[i];
				if(ep.event_fk === event_fk) {
					person_fks[ep.sequence] = ep.person_fk;
				}
			}
			len = database.person.length;
			var people = [];
			for(var j = 0; j<len; j++) {
				var person = database.person[j];
				if(person_fks.indexOf(person._id) >= 0) {
					people.push(person);
				}
			}


			people.sort(function(a, b) {
				return person_fks.indexOf(a._id) - person_fks.indexOf(b._id);
			});
			args.callback(people);
		};

		proto.get_location = function() {
			if(!this.loaded) { throw new Error("Database is not loaded"); }
			var args = extract_args(arguments, ["fk"]);

			var database = this.database;
			var locations = database.location
			if(args.fk > 0) {
				var location = locations[args.fk-1];
				if(location._id === args.fk) {
					args.callback(location);
				} else {
					args.callback(undefined);
				}
			} else {
				args.callback(undefined);
			}
		};
	}(Database));
	ConfApp.load_db = function(db_name) {
		ConfApp.database = new Database(db_name);
	};
}(ConfApp));
