var ITEM_GROUP = {
	SEATING: 'Seating',
	OTHER_TABLES: 'Tables',
	FOOD: 'Food',
	MUSIC: 'Entertainment',
	STANDING: 'Standing',
};

function /* class */ Item(group, name, spacePer, note) {
	this.id = name.split(' ').join('');
	this.shouldCheck = false; // Whether or not the user should be asked about this item
	this.count = 0;
	this.group = group;
	this.name = name;
	this.note = note;
	this.spacePerCount = spacePer;

	this.getSpaceRequired = function () {
		return this.count * this.spacePerCount;
	}
}

var items = [
	new Item(ITEM_GROUP.SEATING, 'Banquet Table', 12, '# of People'),
	new Item(ITEM_GROUP.SEATING, 'Round Table', 10, '# of People'),
	new Item(ITEM_GROUP.SEATING, 'Row Seating', 6, '# of People'),
	new Item(ITEM_GROUP.SEATING, 'Head Table', 20, '# of People'),
	new Item(ITEM_GROUP.FOOD, 'Buffet Tables', 100),
	new Item(ITEM_GROUP.FOOD, 'Four Foot Cake Tables', 50),
	new Item(ITEM_GROUP.FOOD, 'Four Foot Beverage Tables', 50),
	new Item(ITEM_GROUP.FOOD, 'Bars', 150, 'Supports ~140 People w/ 2 Bartenders'),
	new Item(ITEM_GROUP.MUSIC, 'Disc Jockey Area', 100, '# of DJs'),
	new Item(ITEM_GROUP.MUSIC, 'Band', 35, '# of Members'),
	new Item(ITEM_GROUP.MUSIC, 'Dance Floor', 3, '# of People'),
	new Item(ITEM_GROUP.OTHER_TABLES, 'Gift Tables', 100),
	new Item(ITEM_GROUP.OTHER_TABLES, 'Guest Book Tables', 50),
	new Item(ITEM_GROUP.OTHER_TABLES, 'Other Table Small', 50, '(X-Y Feet)'),
	new Item(ITEM_GROUP.OTHER_TABLES, 'Other Table Large', 100, '(Y-Z Feet)'),
	new Item(ITEM_GROUP.STANDING, 'Standing without Table', 10),
	new Item(ITEM_GROUP.STANDING, 'Standing with Table', 8),
];

var tents = [
	{ size: 10*10, name: 'MQ 10x10 Tent', img: '10.jpg', desc: 'Get protection from the sun with elegent shade structures for corporate event, commercial or home use.' },
	{ size: 20*20, name: 'MQ 20x20 Tent', img: '20.jpg', desc: 'Matrix-Marquee Party Tents make great festival tents, food service tents, retail tents, security & first aid tents, covered walkways, ticket kiosks, and portable pavilions.'},
	{ size: 20*30, name: 'MQ 20x30 Tent', img: '23.jpg', desc: 'The Matrix-Marquee is the world\'s most functional, fast, flexible and portable tent and canopy. Available as shown with plain or cathedral window walls. Four tents are displayed here.'},
	{ size: 30*30, name: 'MQ 30x30 Tent', img: '30.jpg', desc: 'This is the tent we used for our own son\'s reception. Plenty of room with no centre pole to the ground that allowed us to arrange the tables and chairs as we wished. I cannot say enough about how great this tent looks and functions.'},
	{ size: 1040, name: 'MQ 40 Hexagon Tent', img: '40.jpg', desc: 'The Hexagon 40 Tent is a perfect multi-purpose outdoor event tent. The top-of-the-line materials and meticulous design make it not only a stunning event tent, but a trusted structure for heavy weather conditions that you would find in the Maritimes.' }
];

var itemsById = {};
items.forEach(function(item) { itemsById[item.id] = item; });

/* Adds a tab to the navigation */
function addTab(tabId, label, content) {
	$('#navList').append(
		'<li><a href="#' + tabId + '" data-toggle="tab">' + label + '</a></li>'
	);

	$('#tabContainer').append(
		'<div class="tab-pane" id="' + tabId + '">' + content + '</div>'
	);
}

function generateInitialPages() {
	// Add an intro tab
	addTab('tabIntro', 'Introduction', `
		<div class="jumbotron">
			<h1>Tent Products Wizard!</h1>
			<p>This wizrd will guide you through a process to determine how much tent space you will need and what products you may want to rent from Maritime Tents!</p>
		</div>`
	);

	// Add a tab for each item group
	Object.keys(ITEM_GROUP).forEach(function(groupKey) {
		var group = ITEM_GROUP[groupKey];
		addTab('tab' + group, group, generateGroupOptions(group));
	});

	// Bind the input box controls to the data in the items array, the buttons are already bound
	items.forEach(function(item) {
		$('#' + item.id + 'Count').bind('keyup mouseup', function () {
			item.count = parseInt($('#' + item.id + 'Count').val(), 10);
			item.count = Math.max(item.count, 0);
			$('#' + item.id + 'Count').val(item.count);
		});
	});

	// Add final page placeholder and populate it.
	addTab('tabFinish', 'Results', '<div id="resultsTab"></div>');
	populateResultsTab();
}

// Generates the html string for a tab for 1 item group
function generateGroupOptions(itemGroup) {
	var result = "";

	items.forEach(function(item) {
		if(item.group !== itemGroup) {
			return;
		}

		var note = item.note || "";

		var itemText = `
			<div id="` + item.id + `" class="tent-calc-item col-xs-12 col-sm-6 col-md-4 col-lg-3">
				<div class="panel panel-default">
				<div class="panel-heading"><label for="basic-url">` + item.name + `</label></div>
				<div class="panel-body">
				<p>` + note + `</p>
				<div class="input-group tent-calc-input">
					<input id="` + item.id + `Count" type="number" min="0" class="form-control"
								aria-label="` + item.name + `" value="` + item.count + `">
					<div class="input-group-btn">
						<button class="btn btn-default" type="button" onclick="addCount('`+ item.id +`', -1)"><i class="fa fa-minus"></i></button>
						<button class="btn btn-default" type="button" onclick="addCount('`+ item.id +`',  1)"><i class="fa fa-plus"></i></button>
					</div>
				</div>
				</div>
				</div>
			</div>
		`;
		result += itemText;
	})

	return result;
}

function tentSpaceNeeded() {
	return items.reduce(function(a, b) { return a + b.getSpaceRequired(); }, 0);
}

// Generates a list of tents they should totally rent
function generateProductList(itemGroup) {
	var result = "";
	var reccomended = [];
	var spaceNeeded = tentSpaceNeeded();
	
	tents.forEach(function(tent) {
		tent.count = 0;
	});
	tents = tents.sort(function(a, b) {
		return b.size - a.size;
	});

	while(spaceNeeded > 0) {
		for(var i = 0; i < tents.length; i++) {
			if(tents[i].size < spaceNeeded || i == tents.length - 1) {
				spaceNeeded -= tents[i].size;
				spaceNeeded = Math.max(spaceNeeded, 0);
				tents[i].count ++;
				break;
			}
		}
	}

	tents.forEach(function(tent) {
		if(tent.count == 0) { return; }

		var count = "";
		if(tent.count > 1) {
			count += tent.count + "x - ";
		}

		result += `
			<div id="` + tent.id + `" class="tent-calc-item col-xs-12 col-sm-6 col-md-4 col-lg-3">
				<div class="panel panel-default">
					<div class="panel-heading">
						<label for="basic-url">` + count + tent.name + `</label>
					</div>
					<div class="panel-body">
						` + tent.desc + `
					</div>
					<div class="panel-footer">
						<img class="tent-img" src="/images/` + tent.img + `"></img>
					</div>
				</div>
			</div>
		`;
	});

	return result;
}

function populateResultsTab() {
	var tab = $('#resultsTab');
	var result = "";
	var spaceNeeded = tentSpaceNeeded();

	if(spaceNeeded == 0) {
		result += `
			<div class="jumbotron">
				<h1>Oh No! It's an empty party!</h1>
				<p>Add some items on the previous pages to see how much space you'll need!</p>
			</div>
		`;
	} else {
		result += `
			<div class="jumbotron">
				<h1>You Need ` + spaceNeeded + ` Square Feet of Tent Space</h1>
				<p>See the recommended products below and begin a <a href="http://maritimetents.website/request-a-quote/">Free Quote</a> now!</p>
			</div>
			`;
	}

	result += generateProductList();

	tab.html(result);
}

function addCount(itemId, value) {
	if(!itemsById[itemId]) {
		console.log('invalid item ' + itemId);
		return;
	}
	var item = itemsById[itemId];
	if(isNaN(item.count)) {
		item.count = 0;
	}
	item.count += value;
	item.count = Math.max(item.count, 0);
	$('#' + item.id + 'Count').val(item.count);
}

//basic wizard w/ progress
$(document).ready(function() {
	generateInitialPages();

	$('#rootwizard').bootstrapWizard({onTabShow: function(tab, navigation, index) {
		var $total = navigation.find('li').length;
		var $current = index+1;
		var $percent = ($current/$total) * 100;
		$('#rootwizard .progress-bar').css({width:$percent+'%'});

		// Recalculate the total on results tab shown
		if($total == $current) {
			populateResultsTab();
		}
	}});
});
