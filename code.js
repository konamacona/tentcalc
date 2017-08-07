
// My shit
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
	addTab('tabIntro', 'Introduction', `
		<div class="jumbotron">
			<h1>Tent Products Wizard!</h1>
			<p>This wizrd will guide you through a process to determine how much tent space you will need and what products you may want to rent from Maritime Tents!</p>
		</div>`
	);

	Object.keys(ITEM_GROUP).forEach(function(groupKey) {
		var group = ITEM_GROUP[groupKey];
		addTab('tab' + group, group, generateGroupOptions(group));
	});

	items.forEach(function(item) {
		$('#' + item.id + 'Count').bind('keyup mouseup', function () {
			item.count = parseInt($('#' + item.id + 'Count').val(), 10);
			item.count = Math.max(item.count, 0);
			$('#' + item.id + 'Count').val(item.count);
		});
	});

	addTab('tabFinish', 'Results', '<div id="resultsTab"></div>');
	populateResultsTab();
}

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

function populateResultsTab() {
	var tab = $('#resultsTab');

	var tentSpaceNeeded = 0;
	items.forEach(function(item) { tentSpaceNeeded += item.getSpaceRequired(); });

	console.log('populate w: ' + tentSpaceNeeded);

	result += `
		<div class="jumbotron">
			<h1>You Need ` + tentSpaceNeeded + ` Square Feet of Tent Space</h1>
			<p>See the recommended products below or begin a free quote now with some pre-selected items based on your entries!</p>
		</div>
		`;

	

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

