(function() {
//http://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable
function humanFileSize(bytes, si) {
    var thresh = si ? 1000 : 1024;
    if(bytes < thresh) return bytes + ' B';
    var units = si ? ['kB','MB','GB','TB','PB','EB','ZB','YB'] : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while(bytes >= thresh);
    return bytes.toFixed(1)+' '+units[u];
}
var dbi;
$("#publish_db").on("click", function() {
	$("#changes_sum").val("");
});

$("#publish").on("click", function() {
	var changes = $("#changes_sum").val().split("\n");
	$.ajax({
		type: "GET",
		url: "/publish",
		data: {
			changelog: changes
		},
		success: function(info) {
		/*
			if(info.error) {
				$("#curr_alert").removeClass("alert-success").addClass("alert-danger")
								.text(info.error);
			} else {
				$("#curr_alert").removeClass("alert-danger").addClass("alert-succes")
								.text("Uploaded version " + info.version);
			}
			$(document.body).scrollTop(0);
			window.setTimeout(function() {
				$("#curr_alert").text("").removeClass("alert-danger alert-success");
			}, 5000);
			*/
			if(info.error) {
				alert(info.error);
			} else {
				alert("Uploaded version " + info.version);
			}
		}
	});
	//console.log("publish");
});
var $generate_db = $("#generate_db").on("click.generate_db", function() {
										$generate_db.removeClass("btn-primary btn-success")
													.addClass("btn-warning")
													.attr("disabled", true)
													.off("click.generate_db")
													.text("Generating database...");
										$.ajax({
											type: "GET",
											url: "/generate_db",
											success: function(info) {
												var db_files = info.db_files;
												update_files(info.files);
												$generate_db.removeClass("btn-primary btn-warning")
															.addClass("btn-primary")
															.text("View Generated Database")
															.attr("disabled", false)
															.on("click.view_db", function() {
																window.open("schedule_viewer/index.html?db_url=" + encodeURIComponent("../"+db_files.json.replace("src/", "")));
															});
												$("#publish_db").attr("disabled", false)
																.show()
																.text("Publish to " + dbi.publish_to_name);
											},
											error: function() {
											}
										});
									});

var drag_to = $(".drag_to"),
	uploaded_files = $("#uploaded_files"),
	tests = {
		filereader: typeof FileReader != 'undefined',
		dnd: 'draggable' in document.createElement('span'),
		formdata: !!window.FormData,
		progress: "upload" in new XMLHttpRequest
	}, 
	support = {
		filereader: document.getElementById('filereader'),
		formdata: document.getElementById('formdata')
	},
	fileupload = document.getElementById('upload');

	"filereader formdata".split(' ').forEach(function (api) {
		if (tests[api] === false) {
			support[api].className = 'fail';
		} else {
			support[api].className = 'hidden';
		}
	});

if (tests.dnd) { 
	drag_to	.on('dragover', function() {
				$(this).addClass("hover");
				return false;
			})
			.on('dragleave dragcancel dragend drop', function() {
				$(this).removeClass("hover");
				return false;
			})
			.on('drop', function(e) {
				$("div.alert").alert("close").remove();
				$(this).removeClass("hover");
				e.preventDefault();
				readfiles(e.originalEvent.dataTransfer.files, $(this));
			});
} else {
	fileupload.className = 'hidden';
	fileupload.querySelector('input').onchange = function () {
		readfiles(this.files);
	};
}


var percentages = {x: -1, y: -1};
var selected_map_file;
$("#add_map_location").on("click", function() {
	var select_map = $("#select_map");
	var cur_row;
	var map_files = dbi.map_files;
	var click_map = $("#click_map");
	$("#room_display_name, #room_csv_name").val("");
	select_map.html("");
	click_map.html("");
	percentages = {x: -1, y: -1};

	var location_indicator = $("<span />").css({
		position: "absolute",
		width: "16px",
		height: "16px",
		"border-radius": "8px",
		border: "2px solid red",
		"z-index": 300,
		"pointer-events": "none",
		"background-color": "rgba(200, 100, 100, 0.2)"
	});

	var show_selected_map = function(map_file) {
		selected_map_file = map_file;
		click_map.html("");
		var instructions =  $("<div />").addClass("col-md-12").text("Click the location on the map").appendTo(click_map);
		var big_img_container =  $("<div />").addClass("col-md-12").appendTo(click_map).css({
			"position": "relative",
			"padding-left": "0px",
			"padding-top": "0px"
		});
		var big_img = $("<img />")	.attr("src", "get_upload/"+map_file.unique_name)
									.addClass("img-responsive")
									.appendTo(big_img_container)
									.css({
										cursor: "crosshair"
									});

							big_img	.on("click", $.proxy(function(event) {
										var offset = {x: event.offsetX, y: event.offsetY};
										var size = {width: big_img.width(), height: big_img.height()}
										percentages = {x: 100*offset.x/size.width, y: 100*offset.y/size.height};
										location_indicator.prependTo(big_img_container);
										location_indicator.css({
											left: Math.round(size.width*percentages.x/100 - 8) + "px",
											top: Math.round(size.height*percentages.y/100 - 8) + "px"
										});
									}, this));
	};
	if(map_files.length === 1) {
		$("#select_map_text").hide();
		show_selected_map(map_files[0]);
	} else {
		$("#select_map_text").show();
		for(var i = 0; i<map_files.length; i++) {
			if(i%3 === 0) {
				curr_row = $("<div />").addClass("row").appendTo(select_map);
			}

			var img_info = $("<div />").addClass("map_file col-md-4").appendTo(curr_row);
			var map_file = map_files[i];
			var image = $("<img />").attr("src", "get_upload/" + map_file.unique_name)
									.addClass("img-responsive")
									.appendTo(img_info);
			var name = $("<span />").appendTo(img_info)
									.text(map_file.name);
			img_info.on("click", $.proxy(function(map_file, img_info) {
				$("div.map_file.selected", select_map).removeClass("selected");
				img_info.addClass("selected");
				show_selected_map(map_file);
			}, this, map_file, img_info));
		}
	}
});

$("#add_room").on("click", function() {
	var select_map = $("#mapLocationModal");
	var room_display_name = $("#room_display_name").val();
	var room_csv_name = $("#room_csv_name").val();
	$.ajax({
		type: "GET",
		url: "/add_location",
		data: {
			map_unique_name: selected_map_file.unique_name,
			display_name: room_display_name,
			csv_name: room_csv_name,
			x_pct: percentages.x,
			y_pct: percentages.y
		},
		success: update_files
	})
});

function readfiles(files, target) {
	var formData = tests.formdata ? new FormData() : null;
	for (var i = 0; i < files.length; i++) {
		if (tests.formdata) {
			formData.append('file', files[i]);
		}
	}

	// now post a new XHR request
	if (tests.formdata) {
		var url;
		if(target.parents().hasClass("csvs")) {
			url = "/upload_csv";
		} else if(target.parents().hasClass("maps")) {
			url = "/upload_map";
		} else {
			console.error("Unknown upload target");
		}

		$.ajax({
			type: "POST",
			url: url,
			success: update_files,
			data: formData,
			processData: false,
			contentType: false,
			error: function(res, type, status) {
				var message = status;
				if(message === "Request Entity Too Large") {
					message = "Your requested upload was too large. Upload size is limited to 5MB. Sorry.";
				}
				var alert = $("<div class='alert alert-danger' />")	.text(message)
																	.append("<a class='close' data-dismiss='alert' href='#' aria-hidden='true'>&times;</a>")
																	.prependTo($("#alerts"))
																	.alert();
			}
		});
	}
}

$.ajax({
	type: "GET",
	url: "/current_files",
	success: update_files
});

function update_files(db_info) {
	dbi = db_info;
	$("#publish_db").hide();
	if(db_info.ready_to_generate) {
		$generate_db.attr("disabled", false)
					.text("Generate Database")
					.attr("title", "");
		$("#cant_gen_reason").hide();
	} else {
		$generate_db.attr("disabled", true);
		$("#cant_gen_reason").text(db_info.error).show();
	}
	var objects = db_info.categories;
	uploaded_files.html("");
	if(objects.length === 0) {
		uploaded_files.addClass("empty");
	} else {
		uploaded_files.removeClass("empty");
				
		var categories = {};
		for(var i = 0; i<objects.length; i++) {
			var obj = objects[i];
			if(categories.hasOwnProperty(obj.type)) {
				categories[obj.type].push(obj);
			} else {
				categories[obj.type] = [obj];
			}
		}
		var x = 0;
		for(var key in categories) {
			if(categories.hasOwnProperty(key)) {
				var category_name;
				var infos = categories[key];
				if(key === "error") {
					category_name = "(Unknown type)";
				} else if(key === "conference_files") {
					category_name = "Conference Info";
				} else if(key === "pcs_files") {
					category_name = "Submissions";
				} else if(key === "schedule_files") {
					category_name = "Schedule";
				} else if(key === "info") {
					continue;
				} else {
					category_name = key;
				}
				var cat = $("<div />").addClass("col-md-12 category", key)
										.text(category_name)
										.appendTo(uploaded_files);
				for(var i = 0; i<infos.length; i++) {
					var row_container = $("<div />").addClass("col-md-12")
													.appendTo(uploaded_files);
					var info = infos[i];
					var file_disp = $("<div />").addClass("file row " + ((x++)%2 ? "even" : "odd"))
												.appendTo(row_container);
					var filename_container = $("<div />").addClass("col-md-6").appendTo(file_disp);
					var filesize_container = $("<div />").addClass("col-md-2").appendTo(file_disp);
					var timestamp_container = $("<div />").addClass("col-md-3").appendTo(file_disp);
					var remove_container = $("<div />").addClass("col-md-1").appendTo(file_disp);

					$("<a />")		.addClass("filename")
									.attr("href", "get_upload/" + info.unique_name)
									.attr("title", "Click to view")
									.text(info.filename)
									.appendTo(filename_container);
					var human_file_size = humanFileSize(info.size, true);
					$("<span />")	.addClass("size")
									.text(info.rows ? (info.rows === 1 ? human_file_size + " (1 row)" : human_file_size + " (" + info.rows + " rows)" ) : human_file_size)
									.appendTo(filesize_container);
					$("<abbr />")	.addClass("timeago")
									.appendTo(timestamp_container)
									.attr("title", (new Date(info.uploaded)).toISOString())
									.timeago();
					$("<button />")	.addClass("btn btn-xs btn-danger")
									.appendTo(remove_container)
									.text("Remove")
									.on("click", $.proxy(function(info) {
										$.ajax({
											type: "GET",
											url: "/remove_upload",
											data: {
												unique_name: info.unique_name
											},
											success: update_files
										})
									}, this, info));

					if(info.error || (info.db_errors && info.db_errors.length > 0)) {
						var errors = [];
						if(info.error) {
							errors.push(info.error);
						}
						errors.push.apply(errors, info.db_errors.map(function(dbe) {
							return "Row " + (dbe.row+1) + ": " + dbe.message;
						}));
						file_disp	.addClass("danger");
						//filename_container.removeClass("col-md-6").addClass("col-md-3");
						var error_container = $("<div />")	.addClass("error col-md-12")
															.appendTo(uploaded_files);
						var error_ul = $("<ul />").appendTo(error_container);
						for(var j = 0; j<errors.length; j++) {
							var error = errors[j];
							$("<li />")	.text(error)
										.appendTo(error_ul);
						}
					}
				}
			}
		}
	}

	var map_files = db_info.map_files;
	var map_views = $(".map_views");
	map_views.html("");
	var cur_row;

	for(var i = 0; i<map_files.length; i++) {
		if(i%3 === 0) {
			curr_row = $("<div />").addClass("row").appendTo(map_views);
		}

		var img_info = $("<div />").addClass("map_file col-md-4").appendTo(curr_row);
		var map_file = map_files[i];

		var rename_group = $("<div />")	.addClass("input-group rename_group")
										.appendTo(img_info);
		var mapname = $("<input />").addClass("form-control input-sm")
									.attr({
										type: "text",
										placeholder: "Map name",
										value: map_file.name
									})
									.appendTo(rename_group);
		var rename_btn_group = $("<span />").addClass("input-group-btn")
											.appendTo(rename_group);
		var rename_btn = $("<button />").addClass("btn btn-default btn-sm")
										.text("Rename")
										.appendTo(rename_btn_group);
							rename_btn	.on("click", $.proxy(function(map_file, mapname, rename_btn) {
											$.ajax({
												type: "GET",
												url: "/rename_map",
												data: {
													unique_name: map_file.unique_name,
													name: mapname.val()
												},
												success: function(db_info) {
													dbi = db_info;
													rename_btn.removeClass("btn-primary").addClass("btn-default");
												},
												error: function() {
													rename_btn.removeClass("btn-primary").addClass("btn-default");
												}
											})
										}, this, map_file, mapname, rename_btn));
		mapname.on("change propertychange keyup input paste", $.proxy(function(rename_btn) {
			rename_btn.addClass("btn-primary").removeClass("btn-default");
		}, this, rename_btn));
		var image = $("<img />").attr("src", "get_upload/" + map_file.unique_name)
								.addClass("img-responsive")
								.appendTo(img_info);
		var remove = $("<button />").addClass("remove btn btn-xs btn-danger")
									.appendTo(img_info)
									.text("Remove")
									.on("click", $.proxy(function(map_file) {
										$.ajax({
											type: "GET",
											url: "/remove_upload",
											data: {
												unique_name: map_file.unique_name
											},
											success: update_files
										})
									}, this, map_file));
	}
	if(map_files.length === 0) {
		$("#add_map_location").attr("disabled", true);
	} else {
		$("#add_map_location").attr("disabled", false);
	}
	var locations = db_info.locations;
	var locations_div = $("#locations");
	$(".location.row", locations_div).remove();
	var thumb_width = 100,
		thumb_height = thumb_width/2;
	for(var i = 0; i<locations.length; i++) {
		var location = locations[i];
		var row = $("<div />").addClass("location row").appendTo(locations_div);
		var map_img = $("<div />").addClass("col-md-3").appendTo(row).css({ });
		var img_container = $("<div />").appendTo(map_img).addClass("img_container").css({
			"overflow": "hidden",
			height: thumb_height+"px"
		});
		var img = $("<img />");
		img	.on("load", $.proxy(function(location, img) {
				var width = img.width(),
					height = img.height();
				var x = Math.round(location.percentage.x*width/100 - thumb_width/2),
					y = Math.round(location.percentage.y*height/100 - thumb_height/2);
				img.css({
					left: -x + "px",
					top: -y + "px"
				});
			}, this, location, img))
			.attr("src", "get_upload/"+location.map_unique_name)
			.css({
				position: "relative",
			})
			.appendTo(img_container);
		var display_name_container = $("<div />").addClass("display_name col-md-4").appendTo(row).text(location.display);
		var csv_name_container = $("<div />").addClass("csv_name col-md-3").appendTo(row).text(location.code_name);
		var remove_container = $("<div />").addClass("remove col-md-2").appendTo(row);
		$("<button />")	.addClass("btn btn-xs btn-danger")
						.appendTo(remove_container)
						.text("Remove")
						.on("click", $.proxy(function(location) {
							$.ajax({
								type: "GET",
								url: "/remove_location",
								data: {
									id: location.id
								},
								success: update_files
							});
						}, this, location));
	}
}

}());
