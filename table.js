/***************************
* Description :
* A js library for building tables
* Author :
* gugamm
* version : 1.2b
***************************/

function HtmlElement(id,className) {
    var props = [];

    function findProp(propName) {
        for (var i = 0; i < props.length; i++) {
            var prop = props[i];
            if (prop.propName === propName) {
                return i;
            }
        }
        return -1;
    }

    this.getProp = function (propName) {
        for (var i = 0; i < props.length; i++) {
            var prop = props[i];
            if (prop.propName === propName) {
                return prop;
            }
        }
        return null;
    };

    this.setProp = function(aPropName,aPropValue) {
        var pName = aPropName.toUpperCase();
        if (pName === 'ID' || pName === 'CLASS' || pName === 'CLASSNAME') {
            return;
        }

        var prop = this.getProp(aPropName);
        if (prop != null) {
            prop.propValue = aPropValue;
        } else {
            prop = {propName : aPropName, propValue : aPropValue};
            props.push(prop);
        }
        return prop;
    };

    this.delProp = function (propName) {
        var idx = findProp(propName);
        if (idx !== -1) {
            props.splice(idx,1);
        }
    };

    this._getProps = function() {
      return props;
    };

	this.onCreateElement = function(elem) {

	};

	this.setId(id);
	this.setClassName(className);
}

HtmlElement.prototype.getId = function () {
	return this.id;
};

HtmlElement.prototype.getClassName = function () {
	return this.className;
};

HtmlElement.prototype.setId = function (aId) {
	if (aId != null && aId != undefined) {
		this.id = aId;
	}
};

HtmlElement.prototype.setClassName = function (aClassName) {
	if (aClassName != null && aClassName != undefined) {
		this.className = aClassName;
	}
};

HtmlElement.prototype.createElement = function (elemTag) {
	var elem = document.createElement(elemTag);
	HtmlElement.setValidAttributes(elem,this.id,this.className);
    this._getProps().forEach(function(prop) {
       elem.setAttribute(prop.propName,prop.propValue);
    });
	this.onCreateElement(elem);
	return elem;
};

HtmlElement.isValid = function(attribute) {
	return (attribute != null && attribute != undefined);
};

HtmlElement.setValidAttributes = function(elem, id, className) {
	if (HtmlElement.isValid(id)) {
		elem.id = id;
	}
	if (HtmlElement.isValid(className)) {
		elem.className = className;
	}
};

function TableCell(id,className) {
	HtmlElement.call(this, id, className);
	
	var data = null;
	
	this.getData = function() {
		return data;
	};
	
	this.setData = function(aData) {
		data = aData;
	};
	
	this.render = function () {
		var cell = this.createElement('TD');
		cell.innerHTML = data;
		return cell;
	}
}

TableCell.prototype = Object.create(HtmlElement.prototype);
TableCell.prototype.constructor = TableCell;

function TableRow(id,className) {
	HtmlElement.call(this, id,className);
	var cells = [];
	var cellCount = 0;
	
	this.getCellCount = function() {
		return cellCount;
	};
	
	this.getCell = function(index) {
		if (index < 0 || index >= this.rowCount) {
			return null;
		}
		return cells[index];
	};
	
	this.addCell = function(data,id,className) {
		var cell = new TableCell(id,className);
		cell.setData(data);
		cells.push(cell);
		cellCount++;
		return cell;
	};
	
	this.render = function() {
		var row = this.createElement('TR');
		var i;
		for (i = 0; i < cellCount; i++) {
			row.appendChild(cells[i].render());
		}
		return row;
	}
}

TableRow.prototype = Object.create(HtmlElement.prototype);
TableRow.prototype.constructor = TableRow;

function TableBody(id,className) {
	HtmlElement.call(this,id,className);
	var rows = [];
	var rowCount = 0;
	
	this.getRowCount = function() {
		return rowCount;
	};
	
	this.getRow = function(index) {
		if (index < 0 || index >= this.rowCount) {
			return null;
		}
		return rows[index];
	};
	
	this.addRow = function(id,className) {
		var row = new TableRow(id,className);
		rows.push(row);
		rowCount++;
		return row;
	};
	
	this.render = function() {
		var table = this.createElement('TBODY');
		var i;
		for (i = 0; i < rowCount; i++) {
			var row = rows[i].render();
			table.appendChild(row);
		}
		return table;
	}
}

TableBody.prototype = Object.create(HtmlElement.prototype);
TableBody.prototype.constructor = TableBody;

function TableHCell(id,className) {
	HtmlElement.call(this, id, className);

	var data = null;

	this.getData = function() {
		return data;
	};

	this.setData = function(aData) {
		data = aData;
	};

	this.render = function () {
		var cell = this.createElement('TH');
		cell.innerHTML = data;
		return cell;
	}
}

TableHCell.prototype = Object.create(HtmlElement.prototype);
TableHCell.prototype.constructor = TableHCell;

function TableHRow(id,className) {
	HtmlElement.call(this, id,className);
	var cells = [];
	var cellCount = 0;

	this.getCellCount = function() {
		return cellCount;
	};

	this.getCell = function(index) {
		if (index < 0 || index >= this.rowCount) {
			return null;
		}
		return cells[index];
	};

	this.addCell = function(data,id,className) {
		var cell = new TableHCell(id,className);
		cell.setData(data);
		cells.push(cell);
		cellCount++;
		return cell;
	};

	this.render = function() {
		var row = this.createElement('TR');
		var i;
		for (i = 0; i < cellCount; i++) {
			row.appendChild(cells[i].render());
		}
		return row;
	}
}

TableHRow.prototype = Object.create(HtmlElement.prototype);
TableHRow.prototype.constructor = TableHRow;

function TableHeader(id,className) {
	HtmlElement.call(this,id,className);
	var rows = [];
	var rowCount = 0;

	this.getRowCount = function() {
		return rowCount;
	};

	this.getRow = function(index) {
		if (index < 0 || index >= this.rowCount) {
			return null;
		}
		return rows[index];
	};

	this.addRow = function(id,className) {
		var row = new TableHRow(id,className);
		rows.push(row);
		rowCount++;
		return row;
	};

	this.render = function() {
		var table = this.createElement('THEAD');
		var i;
		for (i = 0; i < rowCount; i++) {
			var row = rows[i].render();
			table.appendChild(row);
		}
		return table;
	}
}

TableHeader.prototype = Object.create(HtmlElement.prototype);
TableHeader.prototype.constructor = TableHeader;

function Table(id,className) {
	HtmlElement.call(this,id,className);
	this.createHeader = function(id,className) {
		this.header = new TableHeader(id,className);
		return this.header;
	};

	this.createBody = function(id,className) {
		this.body = new TableBody(id,className);
		return this.body;
	};

	this.setBody = function(body) {
		this.body = body;
	};

	this.setHeader = function(header) {
		this.header = header;
	};

	this.getBody = function() {
		if (this.body) {
			return this.body;
		}
		return null;
	};

	this.getHeader = function() {
		if (this.header) {
			return this.header;
		}
		return null;
	};

	this.render = function() {
		var table = this.createElement('TABLE');
		if (this.header) {
			table.appendChild(this.header.render());
		}
		if (this.body) {
			table.appendChild(this.body.render());
		}
		return table;
	};
}

Table.prototype = Object.create(HtmlElement.prototype);
Table.prototype.constructor = Table;