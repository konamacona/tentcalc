var ITEM_GROUP = {
	SEATING: 'Seating',
	OTHER_TABLES: 'Tables',
	FOOD: 'Food',
	MUSIC: 'Entertainment',
	STANDING: 'Standing',
};

function /* class */ Item(group, name, spacePer, note, products) {
	this.id = name.split(' ').join('');
	this.shouldCheck = false; // Whether or not the user should be asked about this item
	this.count = 0;
	this.group = group;
	this.name = name;
	this.note = note;
	this.spacePerCount = spacePer;

	this.products = products; 

	this.getSpaceRequired = function () {
		return this.count * this.spacePerCount;
	}
}

var items = [
	new Item(ITEM_GROUP.SEATING, 'Banquet Table', 12, 'How many people would you like seated at a banquet table?'),
	new Item(ITEM_GROUP.SEATING, 'Round Table', 10, 'How many people would you like seated at a round table?'),
	new Item(ITEM_GROUP.SEATING, 'Row Seating', 6, 'How many people would you like seated in row seating?'),
	new Item(ITEM_GROUP.SEATING, 'Head Table', 20, 'How many people would you like seated at the head table?'),
	new Item(ITEM_GROUP.FOOD, 'Buffet Tables', 100, 'How many buffet tables do you need?'),
	new Item(ITEM_GROUP.FOOD, 'Four Foot Cake Tables', 50, 'How many cake tables do you need?'),
	new Item(ITEM_GROUP.FOOD, 'Four Foot Beverage Tables', 50, 'How many beverage tables do you need?'),
	new Item(ITEM_GROUP.FOOD, 'Bars', 150, 'How many bars do you need? One bar supports ~140 People w/ 2 Bartenders'),
	new Item(ITEM_GROUP.MUSIC, 'Disc Jockey Area', 100, 'How many DJ areas would you like set up?'),
	new Item(ITEM_GROUP.MUSIC, 'Band', 35, 'If having a band, how many members do they have?'),
	new Item(ITEM_GROUP.MUSIC, 'Dance Floor', 3, 'How many people are you expecting at your dance?'),
	new Item(ITEM_GROUP.OTHER_TABLES, 'Gift Tables', 100, 'How many gift tables do you need?'),
	new Item(ITEM_GROUP.OTHER_TABLES, 'Guest Book Tables', 50, 'How many guestbook tables do you need?'),
//TODO: get size of these tables
	new Item(ITEM_GROUP.OTHER_TABLES, 'Other Table Small', 50, 'How many small tables do you need?'),
	new Item(ITEM_GROUP.OTHER_TABLES, 'Other Table Large', 100, 'How many large tables do you need?'),
	new Item(ITEM_GROUP.STANDING, 'Standing without Table', 10),
	new Item(ITEM_GROUP.STANDING, 'Standing with Table', 8),
];

function /* class */ Product(name, id, image, size, available, description) {
	this.count = 0;
	this.available = available;
	this.id = id
	this.size = size;
	this.name = name;
	this.image = image;
	this.description = description;
}

var tents = [
	new Product('MQ 10x10 Tent', '207116', '10.jpg', 10*10, 2, 'Get protection from the sun with elegant shade structures for corporate event, commercial or home use.'),
	new Product('MQ 20x20 Tent', '207182', '20.jpg', 20*20, 6, 'Matrix-Marquee Party Tents make great festival tents, food service tents, retail tents, security & first aid tents, covered walkways, ticket kiosks, and portable pavilions.'),
	new Product('MQ 20x30 Tent', '207186', '23.jpg', 20*30, 3, 'The Matrix-Marquee is the world\'s most functional, fast, flexible and portable tent and canopy. Available as shown with plain or cathedral window walls. Four tents are displayed here.'),
	new Product('MQ 30x30 Tent', '207188', '30.jpg', 30*30, 4, 'This is the tent we used for our own son\'s reception. Plenty of room with no centre pole to the ground that allowed us to arrange the tables and chairs as we wished. I cannot say enough about how great this tent looks and functions.'),
	new Product('MQ 40 Hexagon Tent', '207206', '40.jpg', 1040, 2, 'The Hexagon 40 Tent is a perfect multi-purpose outdoor event tent. The top-of-the-line materials and meticulous design make it not only a stunning event tent, but a trusted structure for heavy weather conditions that you would find in the Maritimes.'),
];

var otherProducts = [
	new Product('Fan Back Chair White', '207480', 'fanback.jpg', null, 488, 'Folding Fan Back chairs are ideal to be used for indoor or outdoor parties. Available in white.'),
	new Product('White Resin Chair with seating pad', '207482', 'whiteresin.jpg', null, 444, 'White Resin Folding Chairs with comfort seating pad. Made to be sturdier and more comfortable than regular rental chairs. We recommend these for your VIPs.'),
	new Product('Six Foot Banquet Table', '207516', 'banquet.jpg', null, 150, 'Our 6\' Banquet Tables are great for seating up to 8 people. They can also be used for buffet lines, DJ Service, Head Table, or guest book.'),
	new Product('Sixty Inch Round Table', '207510', 'round.jpg', null, 76, 'Accommodate up to 8 people at each table.'),
	new Product('Twenty Foot Squared Dance Floor', '207490', 'dance.jpg', null, 2, 'This 20\' X 20\' Portable Dance Floor comes in Wood grain with silver trim. This size can easily fit 40 couples. This Portable dance floor can be used indoors or outdoors. It is recommended to use a plywood subfloor if setting up dance floor on uneven ground.')
]

// Represents a relationship between an item and a product
function ProductItemPair(itemId, productId, productPerItem) {
	this.item = itemId;
	this.product = productId;
	this.productPerItem = productPerItem;

	this.getProductCount = function (items) {
		return Math.ceil(items * productPerItem);
	}
}

var productItemPairs = [
	new ProductItemPair('BanquetTable', '207516', 1 / 8), // Rect Banquet Table
	new ProductItemPair('BanquetTable', '207480', 1), // White Fan-back chairs
	new ProductItemPair('RoundTable', '207510', 1 / 8), // Round Table
	new ProductItemPair('RoundTable', '207480', 1), // White Fan-back chairs
	new ProductItemPair('HeadTable', '207516', 1 / 4), // Rect Banquet Table
	new ProductItemPair('HeadTable', '207482', 1), // White Resin Padded Chairs
	new ProductItemPair('RowSeating', '207480', 1), // White Fan-back chairs
	new ProductItemPair('BuffetTables', '207516', 1), // Rect Banquet Table
	new ProductItemPair('FourFootCakeTables', '207510', 1), // Round Table
	new ProductItemPair('FourFootBeverageTables', '207510', 1), // Round Table
	new ProductItemPair('DiscJockeyArea', '207516', 1), // Rect Banquet Table
	new ProductItemPair('DanceFloor', '207490', 1 / 80), // Dance Floor
	new ProductItemPair('GiftTables', '207516', 1), // Rect Banquet Table
	new ProductItemPair('GuestBookTables', '207510', 1), // Round Table
	new ProductItemPair('OtherTableSmall', '207510', 1), // Round Table
	new ProductItemPair('OtherTableLarge', '207516', 1), // Rect Banquet Table
]

var itemsById = {};
items.forEach(function(item) { itemsById[item.id] = item; });

var productsById = {};
tents.forEach(function(tent) { productsById[tent.id] = tent; });
otherProducts.forEach(function(product) { productsById[product.id] = product; });

function /* class */ PackageItem(id, count, specialName) {
	this.product = productsById[id];
	this.count = count || 1;
	this.specialName = specialName;
}
function /* class */ Package(id, name, products) {
	this.id = id
	this.name = name;
	this.products = products;
}
var packages = [
	new Package('wed80', 'Wedding Reception 80 Guests', [new PackageItem('207188'), new PackageItem('207480', 80), new PackageItem('207510', 10), new PackageItem('207516', 1, 'Buffet Table')]),
	new Package('wed100', 'Wedding Reception 100 Guests', [new PackageItem('207186', 2), new PackageItem('207480', 100), new PackageItem('207510', 13), new PackageItem('207516', 1, 'Buffet Table')]),
	new Package('wed120', 'Wedding Reception 120 Guests', [new PackageItem('207188', 2), new PackageItem('207480', 120), new PackageItem('207510', 15), new PackageItem('207516', 2, 'Buffet Table')]),
	new Package('wed150', 'Wedding Reception 150 Guests', [new PackageItem('207186', 4), new PackageItem('207480', 150), new PackageItem('207510', 19), new PackageItem('207516', 3, 'Buffet Table')]),
	new Package('wed175', 'Wedding Reception 175 Guests', [new PackageItem('207186', 4), new PackageItem('207480', 175), new PackageItem('207510', 22), new PackageItem('207516', 4, 'Buffet Table')]),
	new Package('wed200', 'Wedding Reception 200 Guests', [new PackageItem('207186', 5), new PackageItem('207480', 200), new PackageItem('207510', 25), new PackageItem('207516', 4, 'Buffet Table')])
]

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
			<h1>Tent Size Calculator!</h1>
			<p>Looking for the right tents and accessories for your event but not quite sure what you need? We&#39;re here to help! The calculator will determine how much tent space you will need and what products you may want to rent, all you need to do is click &quot;Next&quot; to begin.</p>
			<p>Having a wedding? Review our wedding packages and if you find one you like, begin a quote right away!</p>
		</div>` + getButtons()//+ generatePackageList()
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
	addTab('tabFinish', 'Results', '<div id="resultsTab"></div>' + getButtons());
	populateResultsTab();
}

// Generates the html string for a tab for 1 item group
function generateGroupOptions(itemGroup) {
	var result = getButtons() + `<div class="tent-item-container">`;

	items.forEach(function(item) {
		if(item.group !== itemGroup) {
			return;
		}

		var note = item.note || "";

		var itemText = `
			<div id="` + item.id + `" class="tent-calc-item">
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

	result += `</div>`;

	return result;
}

function tentSpaceNeeded() {
	return items.reduce(function(a, b) { return a + b.getSpaceRequired(); }, 0);
}

// Generates a list of tents they should totally rent
function generateProductList() {
	var result = "";
	var reccomended = [];
	var spaceNeeded = tentSpaceNeeded();
	
	var combinedProducts = tents.concat(otherProducts);

	combinedProducts.forEach(function(product) {
		product.count = 0;
	});
	tents = tents.sort(function(a, b) {
		return b.size - a.size;
	});

	while(spaceNeeded > 0) {
		var changed = false;
		for(var i = 0; i < tents.length; i++) {
			if(tents[i].available > tents[i].count && (tents[i].size < spaceNeeded || i == tents.length - 1)) {
				changed = true;
				spaceNeeded -= tents[i].size;
				spaceNeeded = Math.max(spaceNeeded, 0);
				tents[i].count ++;
				break;
			}
		}
		if(!changed) {
			console.error('force breaking loop')
			break;
		}
	}

	productItemPairs.forEach(function(pair) {
		if(itemsById[pair.item].count <= 0) { return; }
		productsById[pair.product].count += pair.getProductCount(itemsById[pair.item].count);
	});

	combinedProducts.forEach(function(product) {
		if(product.count == 0) { return; }

		var count = "";
		if(product.count > 1) {
			count += product.count + "x - ";
		}

		result += `
			<div id="` + product.id + `" class="tent-calc-item col-xs-12 col-sm-6 col-md-4 col-lg-3">
				<div class="panel panel-default">
					<div class="panel-heading">
						<label for="basic-url">` + count + product.name + `</label>
					</div>
					<div class="panel-body">
						` + product.description + `
					</div>
					<div class="panel-footer">
						<img class="tent-img" src="./images/` + product.image + `"></img>
					</div>
				</div>
			</div>
		`;
	});

	return result;
}

function generateLinkParams() {
	var result = "";
	tents.concat(otherProducts).forEach(function(product) {
		if(product.count > 0) {
			result += '&' + product.id + '=' + product.count;
		}
	});
	return result;
}

function generateLinkParamsPackage(package) {
	var result = "";
	package.products.forEach(function(product) {
		if(product.count > 0) {
			result += '&' + product.product.id + '=' + product.count;
		}
	});
	return result;
}

function populateResultsTab() {
	var tab = $('#resultsTab');
	var result = "";
	var spaceNeeded = tentSpaceNeeded();

	var productList = generateProductList();

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
				<p>The recommended products are shown below. <a href="http://maritimetents.website/request-a-quote/?` + generateLinkParams() + `" target="_top">Click here</a> to begin a free quote with these items or a <a href="http://maritimetents.website/request-a-quote/" target="_top">Free Empty Quote</a> now!</p>
			</div>
			`;
	}

	result += productList;

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


// Generates a list of packages
function generatePackageList() {
	var result = '<div class="tent-item-container">';

	packages.forEach(function(package) {
		var productList = "<ul>";
		package.products.forEach(function(product) {
			productList += "<li>";
			if(product.count > 1) productList += product.count + " x ";
			productList += product.specialName || product.product.name;
			productList += "</li>";
		});
		productList += "</ul>";

		var linkParams = generateLinkParamsPackage(package);

		result += `
			<div id="` + package.id + `" class="tent-calc-item">
				<div class="panel panel-default">
					<div class="panel-heading">
						<label for="basic-url">` + package.name + `</label>
					</div>
					<div class="panel-body">
						` + productList + `
						<br>
						<a class="btn btn-primary startQuoteBtnRight" href="http://maritimetents.website/request-a-quote/?` + linkParams + `" target="_top">Start a Quote</a>
					</div>
				</div>
			</div>
		`;
	});

	result += '</div>';

	return result;
}

function getButtons() {
	return `
	<ul class="pager wizard">
		<li class="previous"><a href="#" class="">Previous</a></li>
		<li class="next"><a href="#" class="">Next</a></li>
	</ul>
	`;
	return '';
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
