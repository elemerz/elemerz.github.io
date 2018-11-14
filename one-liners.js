Function.prototype.method = function (name, func) {
  if(!(name in this.prototype)) {
	this.prototype[name] = func;  
  }
  return this;
};
/**Document related*/
/**Draws a random colored border around all matched elements.*/
function outlineElements(selector) {
    [].forEach.call($$(selector), function(a) {
        a.style.outline = "1px solid #" + (~~(Math.random() * (1 << 24))).toString(16);
    });
}
/**Generic functions*/
/**Returns true if the passed object is a scalar.*/
function isScalar(obj){return (/string|number|boolean/).test(typeof obj);}
/**Returns a JSON object containing all the passed query parameters. Those following the ?*/
function getQueryParameters() {
    return document.location.search.replace(/(^\?)/, '').split('&').reduce(function(o, n) {
        n = n.split('=');
        o[n[0]] = n[1];
        return o;
    }, {});
}

/**Number*/
/**Generates a random integer between 2 values*/
Number.random = function(a,b) {
    return a + Math.round((b - a) * Math.random());
};

/**Constrains the number between the given limits*/
Number.limit = function(a,b) {
    return (this < a ? a : (this > b ? b : this));
};

/**Transforms the number into a linguistic ordinal: 1 ==> 1-st, 2 ==> 2-nd, 13 ==> 13-th*/
Number.method('nth', function() {
    return this + (['st', 'nd', 'rd'][(this + '').match(/1?\d\b/) - 1] || 'th');
});

/**Math*/
/**Returns the sign of the number. (-1, 0, +1)*/
Number.method('sign', function(num) {
    return (num > 0) - (num < 0);
});

/**Date Time*/
/**Returns the english name of the current month.*/
function getNameOfMonth() {
    return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][new Date().getMonth()];
}
/**Returns the current year as a 4-digit number.*/
function getCurrentYear() {
    return new Date().getFullYear();
}

/**Array extensions*/
/**Removes all the elements from an array.*/
Array.method('clear', function() {
    this.length = 0; return this;
});
/**Returns a copy of the current array.*/
Array.method('clone', function() {
    return this.slice(0);
});
/**Returns the smallest element of an array.*/
Array.method('min', function() {
    return Math.min.apply(Math, this);
});
/**Returns the largest element of an array.*/
Array.method('max', function() {
    return Math.max.apply(Math, this);
});
/**Returns the sum of the array.*/
Array.method('sum', function() {
    for (var s = 0, i = this.length; i; s += this[--i]);
    return s;
});
/**Calculates the mean, standard deviation and variance in an array.*/
Array.method('average', function() {
    var r = {
            mean: 0,
            variance: 0,
            deviation: 0
        },
        t = this.length;
    for (var m, s = 0, l = t; l--; s += this[l]);
    for (m = r.mean = s / t, l = t, s = 0; l--; s += Math.pow(this[l] - m, 2));
    return r.deviation = Math.sqrt(r.variance = s / t), r;
});
/**Returns a randomly chosen element from an array.*/
Array.method('choose', function() {
    return this[Number.random(0, this.length)];
});
/**Returns a shuffled (randomly ordered) copy of an array.*/
Array.method('shuffle', function() {
    return this.slice().sort(function() {
        return Math.random() > 0.5 ? 1 : -1;
    });
});
/**Returns a copy of an array without the specified element.*/
Array.method('without', function(element) {
    return this.splice(this.indexOf(element), 1);
});
/**Returns the element which is the nearest (the difference is minimal) to the passed one.*/
Array.method('nearestTo', function(nr) {
    if ((l = this.length) < 2) return l - 1;
    for (var l, p = Math.abs(this[--l] - nr); l--;)
        if (p < (p = Math.abs(this[l] - nr))) break;
    return l + 1;
});
Array.method('chunk', function(s) {
    for (var x, i = 0, c = -1, l = this.length, n = []; i < l; i++)
        /*jshint expr:true*/
		(x = i % s) ? n[c][x] = this[i] : n[++c] = [this[i]];
		/*jshint expr:false*/
    return n;
});
/**Rotates an array with p positions. (much faster than successive unshift() pop() calls). [1,2,3,4,5,6,7,8,9,10].rotate(2) ==> [9, 10, 1, 2, 3, 4, 5, 6, 7, 8]*/
Array.method('rotate', function(p) {
	/*jshint shadow:true*/
    for (var l = this.length, p = (Math.abs(p) >= l && (p %= l), p < 0 && (p += l), p), i, x; p; p = (Math.ceil(l / p) - 1) * p - l + (l = p))
        for (i = l; i > p; x = this[--i], this[i] = this[i - p], this[i - p] = x);
    /*jshint shadow:false*/
	return this;
});

/**String methods*/
/**Pads a string from the left with the specified character, up to the specified length.*/
String.method('padLeft', function(toLen, c) {
    return (new Array(toLen || 2).join(c || 0) + this).slice(-toLen);
});
/**Returns a string repeated the specified number of times.*/
String.method('repeat', function(times) {
    return Array(times + 1).join(this);
});
/**Returns the reverse of the string.*/
String.method('reverse', function() {
    return string.split("").reverse().join("");
});
/**Returns the LEET-ed version of a string. Popular in passwords (replace e ==> 3, T=> 7, etc)*/
String.method('leet', function() {
    return this.replace(/[a-z]/g, function f(a) {
        return "4BCD3F6H1JKLMN0PQR57" [parseInt(a, 36) - 10] || a.replace(/[a-t]/gi, f);
    });
});
/**Strips all the HTML tags from the passed string.*/
String.method('stripTags', function() {
    return this.replace(/<[^>]+>/gi, "");
});
/**Returns a pseudo unique id of the specified length (but not longer than 10). Example: String.uid(5) ==> AFQMD*/
String.uid = function(len) {
        return Math.random().toString(36).substr(2, Math.max(len || 5, 10));
    };
    /**Random UUID (RFC-4122 v4)*/
String.UUID = function() {
    for (var r = "", n = 1; 36 >= n; n++) r += 9 === n || 14 === n || 19 === n || 24 === n ? "-" : 15 === n ? 4 : 20 === n ? dec2hex[4 * Math.random() | 8] : dec2hex[15 * Math.random() | 0];
    return r;
};
