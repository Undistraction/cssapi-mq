(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('styled-components'), require('ramda')) :
	typeof define === 'function' && define.amd ? define(['styled-components', 'ramda'], factory) :
	(global.styledMQ = factory(global.styled,global.R));
}(this, (function (styledComponents,_ramda) { 'use strict';

var _ramda__default = 'default' in _ramda ? _ramda['default'] : _ramda;

/**
 * A function that returns `undefined`.
 *
 * @func stubUndefined
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.0.0|v1.0.0}
 * @category Function
 * @sig ... -> undefined
 * @return {undefined}
 * @example
 *
 * RA.stubUndefined(); //=> undefined
 * RA.stubUndefined(1, 2, 3); //=> undefined
 */
var stubUndefined = /*#__PURE__*/_ramda.always(void 0); // eslint-disable-line no-void

/**
 * Checks if input value is `undefined`.
 *
 * @func isUndefined
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.0.1|v0.0.1}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isNotUndefined|isNotUndefined}
 * @example
 *
 * RA.isUndefined(1); //=> false
 * RA.isUndefined(undefined); //=> true
 * RA.isUndefined(null); //=> false
 */
var isUndefined = /*#__PURE__*/_ramda.equals( /*#__PURE__*/stubUndefined());

/**
 * Checks if input value is complement `undefined`.
 *
 * @func isNotUndefined
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.0.1|v0.0.1}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isUndefined|isUndefined}
 * @example
 *
 * RA.isNotUndefined(1); //=> true
 * RA.isNotUndefined(undefined); //=> false
 * RA.isNotUndefined(null); //=> true
 */
var isNotUndefined = /*#__PURE__*/_ramda.complement(isUndefined);

/**
 * Checks if input value is `null`.
 *
 * @func isNull
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.1.0|v0.1.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isNotNull|isNotNull}
 * @example
 *
 * RA.isNull(1); //=> false
 * RA.isNull(undefined); //=> false
 * RA.isNull(null); //=> true
 */
var isNull = /*#__PURE__*/_ramda.equals(null);

/**
 * Checks if input value is complement of `null`.
 *
 * @func isNotNull
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.1.0|v0.1.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isNull|isNull}
 * @example
 *
 * RA.isNotNull(1); //=> true
 * RA.isNotNull(undefined); //=> true
 * RA.isNotNull(null); //=> false
 */
var isNotNull = /*#__PURE__*/_ramda.complement(isNull);

/**
 * Checks if input value is complement of `null` or `undefined`.
 *
 * @func isNotNil
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.3.0|v0.3.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link http://ramdajs.com/docs/#isNil|isNil}
 * @example
 *
 * RA.isNotNil(null); //=> false
 * RA.isNotNil(undefined); //=> false
 * RA.isNotNil(0); //=> true
 * RA.isNotNil([]); //=> true
 */
var isNotNil = /*#__PURE__*/_ramda.complement(_ramda.isNil);

/**
 * Tests whether or not an object is an array.
 *
 * @private
 * @param {*} val The object to test.
 * @return {Boolean} `true` if `val` is an array, `false` otherwise.
 * @example
 *
 *      _isArray([]); //=> true
 *      _isArray(null); //=> false
 *      _isArray({}); //=> false
 */
var _isArray = Array.isArray || function _isArray(val) {
  return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]';
};

/**
 * Checks if input value is `Array`.
 *
 * @func isArray
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.3.0|v0.3.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isNotArray|isNotArray}
 * @example
 *
 * RA.isArray([]); //=> true
 * RA.isArray(null); //=> false
 * RA.isArray({}); //=> false
 */
var isArray = /*#__PURE__*/_ramda.or(Array.isArray, _isArray);

/**
 * Checks if input value is complement of `Array`
 *
 * @func isNotArray
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.3.0|v0.3.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isArray|isArray}
 * @example
 *
 * RA.isNotArray([]); //=> false
 * RA.isNotArray(null); //=> true
 * RA.isNotArray({}); //=> true
 */
var isNotArray = /*#__PURE__*/_ramda.complement(isArray);

/**
 * Checks if input value is `Boolean`.
 *
 * @func isBoolean
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.3.0|v0.3.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isNotBoolean|isNotBoolean}
 * @example
 *
 * RA.isBoolean(false); //=> true
 * RA.isBoolean(true); //=> true
 * RA.isBoolean(null); //=> false
 */
var isBoolean = /*#__PURE__*/_ramda.is(Boolean);

/**
 * Checks if input value is complement of `Boolean`.
 *
 * @func isNotBoolean
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.3.0|v0.3.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isBoolean|isBoolean}
 * @example
 *
 * RA.isNotBoolean(false); //=> false
 * RA.isNotBoolean(true); //=> false
 * RA.isNotBoolean(null); //=> true
 */
var isNotBoolean = /*#__PURE__*/_ramda.complement(isBoolean);

/**
 * Returns true if the given value is not its type's empty value; `false` otherwise.
 *
 * @func isNotEmpty
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.4.0|v0.4.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link http://ramdajs.com/docs/#isEmpty|isEmpty}
 * @example
 *
 * RA.isNotEmpty([1, 2, 3]); //=> true
 * RA.isNotEmpty([]); //=> false
 * RA.isNotEmpty(''); //=> false
 * RA.isNotEmpty(null); //=> true
 * RA.isNotEmpty(undefined): //=> true
 * RA.isNotEmpty({}); //=> false
 * RA.isNotEmpty({length: 0}); //=> true
 */
var isNotEmpty = /*#__PURE__*/_ramda.complement(_ramda.isEmpty);

/**
 * Returns `true` if the given value is its type's empty value, `null` or `undefined`.
 *
 * @func isNilOrEmpty
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.4.0|v0.4.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link http://ramdajs.com/docs/#isEmpty|isEmpty}, {@link http://ramdajs.com/docs/#isNil|isNil}
 * @example
 *
 * RA.isNilOrEmpty([1, 2, 3]); //=> false
 * RA.isNilOrEmpty([]); //=> true
 * RA.isNilOrEmpty(''); //=> true
 * RA.isNilOrEmpty(null); //=> true
 * RA.isNilOrEmpty(undefined): //=> true
 * RA.isNilOrEmpty({}); //=> true
 * RA.isNilOrEmpty({length: 0}); //=> false
 */
var isNilOrEmpty = /*#__PURE__*/_ramda.anyPass([_ramda.isNil, _ramda.isEmpty]);

function _isString(x) {
  return Object.prototype.toString.call(x) === '[object String]';
}
var _isString_1 = _isString;

/**
 * Checks if input value is `String`.
 *
 * @func isString
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.4.0|v0.4.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isNotString|isNotString}
 * @example
 *
 * RA.isString('abc'); //=> true
 * RA.isString(1); //=> false
 */
var isString = _isString_1;

/**
 * Checks if input value is complement of `String`.
 *
 * @func isNotString
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.4.0|v0.4.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isString|isString}
 * @example
 *
 * RA.isNotString('abc'); //=> false
 * RA.isNotString(1); //=> true
 */
var isNotString = /*#__PURE__*/_ramda.complement(isString);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* eslint-disable max-len */
/**
 * Tests whether or not an object is similar to an array.
 *
 * @func isArrayLike
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.9.0|v1.9.0}
 * @licence https://github.com/ramda/ramda/blob/master/LICENSE.txt
 * @category List
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @returns {Boolean} `true` if `val` has a numeric length property and extreme indices defined; `false` otherwise.
 * @see {@link RA.isNotArrayLike|isNotArrayLike}

 * @example
 *
 * RA.isArrayLike([]); //=> true
 * RA.isArrayLike(true); //=> false
 * RA.isArrayLike({}); //=> false
 * RA.isArrayLike({length: 10}); //=> false
 * RA.isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
 */
/* eslint-enable max-len */
var isArrayLike = function isArrayLike(val) {
  if (isArray(val)) {
    return true;
  }
  if (!val) {
    return false;
  }
  if (isString(val)) {
    return false;
  }
  if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) !== 'object') {
    return false;
  }
  if (val.nodeType === 1) {
    return !!val.length;
  }
  if (val.length === 0) {
    return true;
  }
  if (val.length > 0) {
    return _ramda.has(0, val) && _ramda.has(val.length - 1, val);
  }
  return false;
};



/**
 The MIT License (MIT)

 Copyright (c) 2013-2016 Scott Sauyet and Michael Hurley

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/

/**
 * Tests whether or not an object is similar to an array.
 *
 * @func isNotArrayLike
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.5.0|v0.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isArrayLike|isArrayLike}
 * @example
 *
 * RA.isNotArrayLike([]); //=> false
 * RA.isNotArrayLike(true); //=> true
 * RA.isNotArrayLike({}); //=> true
 * RA.isNotArrayLike({length: 10}); //=> true
 * RA.isNotArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> false
 */
var isNotArrayLike = /*#__PURE__*/_ramda.complement(isArrayLike);

var GeneratorFunction = null;
try {
  GeneratorFunction = /*#__PURE__*/new Function('return function* () {}')().constructor; // eslint-disable-line no-new-func
} catch (e) {} // eslint-disable-line no-empty


/* eslint-disable max-len */
/**
 * Checks if input value is `Generator Function`.
 *
 * @func isGeneratorFunction
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.5.0|v0.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isFunction|isFunction}, {@link RA.isAsyncFunction|isAsyncFunction}, {@link RA.isNotGeneratorFunction|isNotGeneratorFunction}
 * @example
 *
 * RA.isGeneratorFunction(function* test() { }); //=> true
 * RA.isGeneratorFunction(null); //=> false
 * RA.isGeneratorFunction(function test() { }); //=> false
 * RA.isGeneratorFunction(() => {}); //=> false
 */
/* eslint-enable max-len */
var isGeneratorFunction = function isGeneratorFunction(val) {
  var toStringCheck = Object.prototype.toString.call(val) === '[object GeneratorFunction]';
  var legacyConstructorCheck = isNotNull(GeneratorFunction) && val instanceof GeneratorFunction;

  return _ramda.or(toStringCheck, legacyConstructorCheck);
};

/* eslint-disable max-len */
/**
 * Checks if input value is complement of `Generator Function`
 *
 * @func isNotGeneratorFunction
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.5.0|v0.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isFunction|isFunction}, {@link RA.isAsyncFunction|isAsyncFunction}, {@link RA.isGeneratorFunction|isGeneratorFunction}
 * @example
 *
 * RA.isNotGeneratorFunction(function* test() { }); //=> false
 * RA.isNotGeneratorFunction(null); //=> true
 * RA.isNotGeneratorFunction(function test() { }); //=> true
 * RA.isNotGeneratorFunction(() => {}); //=> true
 */
/* eslint-enable max-len */
var isNotGeneratorFunction = /*#__PURE__*/_ramda.complement(isGeneratorFunction);

/* eslint-disable max-len */
/**
 * Checks if input value is `Async Function`.
 *
 * @func isAsyncFunction
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.5.0|v0.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isFunction|isFunction}, {@link RA.isNotAsyncFunction|isNotAsyncFunction}, {@link RA.isGeneratorFunction|isGeneratorFunction}
 * @example
 *
 * RA.isAsyncFunction(async function test() { }); //=> true
 * RA.isAsyncFunction(null); //=> false
 * RA.isAsyncFunction(function test() { }); //=> false
 * RA.isAsyncFunction(() => {}); //=> false
 */
/* eslint-enable max-len */
var isAsyncFunction = function isAsyncFunction(val) {
  return Object.prototype.toString.call(val) === '[object AsyncFunction]';
};

/* eslint-disable max-len */
/**
 * Checks if input value is complement of `Async Function`
 *
 * @func isNotAsyncFunction
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.5.0|v0.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isFunction|isFunction}, {@link RA.isAsyncFunction|isAsyncFunction}, {@link RA.isGeneratorFunction|isGeneratorFunction}
 * @example
 *
 * RA.isNotAsyncFunction(async function test() { }); //=> false
 * RA.isNotAsyncFunction(null); //=> true
 * RA.isNotAsyncFunction(function test() { }); //=> true
 * RA.isNotAsyncFunction(() => {}); //=> true
 */
/* eslint-enable max-len */
var isNotAsyncFunction = /*#__PURE__*/_ramda.complement(isAsyncFunction);

/* eslint-disable max-len */
/**
 * Checks if input value is `Function`.
 *
 * @func isFunction
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.5.0|v0.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isNotFunction|isNotFunction}, {@link RA.isAsyncFunction|isNotAsyncFunction}, {@link RA.isGeneratorFunction|isGeneratorFunction}
 * @example
 *
 * RA.isFunction(function test() { }); //=> true
 * RA.isFunction(function* test() { }); //=> true
 * RA.isFunction(async function test() { }); //=> true
 * RA.isFunction(() => {}); //=> true
 * RA.isFunction(null); //=> false
 * RA.isFunction('abc'); //=> false
 */
/* eslint-enable max-len */
var isFunction = /*#__PURE__*/_ramda.anyPass([function (val) {
  return Object.prototype.toString.call(val) === '[object Function]';
}, isGeneratorFunction, isAsyncFunction]);

/* eslint-disable max-len */
/**
 * Checks if input value is complement of `Function`.
 *
 * @func isNotFunction
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.5.0|v0.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isFunction|isFunction}, {@link RA.isAsyncFunction|isNotAsyncFunction}, {@link RA.isGeneratorFunction|isGeneratorFunction}
 * @example
 *
 * RA.isNotFunction(function test() { }); //=> false
 * RA.isNotFunction(function* test() { }); //=> false
 * RA.isNotFunction(async function test() { }); //=> false
 * RA.isNotFunction(() => {}); //=> false
 * RA.isNotFunction(null); //=> true
 * RA.isNotFunction('abc'); //=> true
 */
/* eslint-enable max-len */
var isNotFunction = /*#__PURE__*/_ramda.complement(isFunction);

var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isOfTypeObject = function isOfTypeObject(val) {
  return (typeof val === 'undefined' ? 'undefined' : _typeof$1(val)) === 'object';
};

/* eslint-disable max-len */
/**
 * Checks if input value is language type of `Object`.
 *
 * @func isObj
 * @aliases isObject
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.5.0|v0.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isNotObj|isNotObj}, {@link RA.isObjLike|isObjLike}, {@link RA.isPlainObj|isPlainObj}
 * @example
 *
 * RA.isObj({}); //=> true
 * RA.isObj([]); //=> true
 * RA.isObj(() => {}); //=> true
 * RA.isObj(null); //=> false
 * RA.isObj(undefined); //=> false
 */
/* eslint-enable max-len */
var isObj = /*#__PURE__*/_ramda.both(isNotNull, /*#__PURE__*/_ramda.anyPass([isOfTypeObject, isFunction]));

/* eslint-disable max-len */
/**
 * Checks if input value is complement of language type of `Object`.
 *
 * @func isNotObj
 * @aliases isNotObject
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.5.0|v0.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isObj|isObj}, {@link RA.isObjLike|isObjLike}, {@link RA.isPlainObj|isPlainObj}
 * @example
 *
 * RA.isNotObj({}); //=> false
 * RA.isNotObj([]); //=> false
 * RA.isNotObj(() => {}); //=> false
 * RA.isNotObj(null); //=> true
 * RA.isNotObj(undefined); //=> true
 */
/* eslint-enable max-len */
var isNotObj = /*#__PURE__*/_ramda.complement(isObj);

/* eslint-disable max-len */
/**
 * Checks if value is object-like. A value is object-like if it's not null and has a typeof result of "object".
 *
 * @func isObjLike
 * @aliases isObjectLike
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.5.0|v0.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isNotObjLike|isNotObjLike}, {@link RA.isObj|isObj}, {@link RA.isPlainObj|isPlainObj}
 * @example
 *
 * RA.isObjLike({}); //=> true
 * RA.isObjLike([]); //=> true
 * RA.isObjLike(() => {}); //=> false
 * RA.isObjLike(null); //=> false
 * RA.isObjLike(undefined); //=> false
 */
/* eslint-enable max-len */
var isObjLike = /*#__PURE__*/_ramda.both(isNotNull, isOfTypeObject);

/* eslint-disable max-len */
/**
 * Checks if value is not object-like. A value is object-like if it's not null and has a typeof result of "object".
 *
 * @func isNotObjLike
 * @aliases isNotObjectLike
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.5.0|v0.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isObjLike|isObjLike}, {@link RA.isObj|isObj}, {@link RA.isPlainObj|isPlainObj}
 * @example
 *
 * RA.isNotObjLike({}); //=> false
 * RA.isNotObjLike([]); //=> false
 * RA.isNotObjLike(() => {}); //=> true
 * RA.isNotObjLike(null); //=> true
 * RA.isNotObjLike(undefined); //=> true
 */
/* eslint-enable max-len */
var isNotObjLike = /*#__PURE__*/_ramda.complement(isObjLike);

function _isObject(x) {
  return Object.prototype.toString.call(x) === '[object Object]';
}
var _isObject_1 = _isObject;

var isObjectConstructor = /*#__PURE__*/_ramda.pipe(_ramda.toString, /*#__PURE__*/_ramda.equals( /*#__PURE__*/_ramda.toString(Object)));
var hasObjectConstructor = /*#__PURE__*/_ramda.pathSatisfies( /*#__PURE__*/_ramda.both(isFunction, isObjectConstructor), ['constructor']);

/* eslint-disable max-len */
/**
 * Check to see if an object is a plain object (created using `{}`, `new Object()` or `Object.create(null)`).
 *
 * @func isPlainObj
 * @aliases isPlainObject
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.5.0|v0.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isNotPlainObj|isNotPlainObj}, {@link RA.isObjLike|isObjLike}, {@link RA.isObj|isObj}
 * @example
 *
 * class Bar {
 *   constructor() {
 *     this.prop = 'value';
 *   }
 * }
 *
 * RA.isPlainObj(new Bar()); //=> false
 * RA.isPlainObj({ prop: 'value' }); //=> true
 * RA.isPlainObj(['a', 'b', 'c']); //=> false
 * RA.isPlainObj(Object.create(null); //=> true
 * RA.isPlainObj(new Object()); //=> true
 */
/* eslint-enable max-len */
var isPlainObj = function isPlainObj(val) {
  if (!isObjLike(val) || !_isObject_1(val)) {
    return false;
  }

  var proto = Object.getPrototypeOf(val);

  if (isNull(proto)) {
    return true;
  }

  return hasObjectConstructor(proto);
};

/* eslint-disable max-len */
/**
 * Check to see if an object is a not plain object (created using `{}`, `new Object()` or `Object.create(null)`).
 *
 * @func isNotPlainObj
 * @aliases isNotPlainObject
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.5.0|v0.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isPlainObj|isPlainObj}, {@link RA.isObjLike|isObjLike}, {@link RA.isObj|isObj}
 * @example
 *
 * class Bar {
 *   constructor() {
 *     this.prop = 'value';
 *   }
 * }
 *
 * RA.isNotPlainObj(new Bar()); //=> true
 * RA.isNotPlainObj({ prop: 'value' }); //=> false
 * RA.isNotPlainObj(['a', 'b', 'c']); //=> true
 * RA.isNotPlainObj(Object.create(null); //=> false
 * RA.isNotPlainObj(new Object()); //=> false
 */
/* eslint-enable max-len */
var isNotPlainObj = /*#__PURE__*/_ramda.complement(isPlainObj);

/* eslint-disable max-len */
/**
 * Checks if value is `Date` object.
 *
 * @func isDate
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.6.0|v0.6.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isNotDate|isNotDate}, {@link RA.isValidDate|isValidDate}, {@link RA.isNotValidDate|isNotValidDate}
 * @example
 *
 * RA.isDate(new Date()); //=> true
 * RA.isDate('1997-07-16T19:20+01:00'); //=> false
 */
/* eslint-enable max-len */
var isDate = /*#__PURE__*/_ramda.is(Date);

/**
 * Checks if value is complement of `Date` object.
 *
 * @func isNotDate
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.6.0|v0.6.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isDate|isDate}
 * @example
 *
 * RA.isNotDate(new Date()); //=> false
 * RA.isNotDate('1997-07-16T19:20+01:00'); //=> true
 */
var isNotDate = /*#__PURE__*/_ramda.complement(isDate);

function _isNumber(x) {
  return Object.prototype.toString.call(x) === '[object Number]';
}
var _isNumber_1 = _isNumber;

/**
 * Checks if value is a `Number` primitive or object.
 *
 * @func isNumber
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.6.0|v0.6.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isNotNumber|isNotNumber}
 * @example
 *
 * RA.isNumber(5); // => true
 * RA.isNumber(Number.MAX_VALUE); // => true
 * RA.isNumber(-Infinity); // => true
 * RA.isNumber(NaN); // => true
 * RA.isNumber('5'); // => false
 */
var isNumber = _isNumber_1;

// eslint-disable-next-line no-restricted-globals
var isNaNPolyfill = /*#__PURE__*/_ramda.both(isNumber, isNaN);

/**
 * Checks whether the passed value is `NaN` and its type is `Number`.
 * It is a more robust version of the original, global isNaN().
 *
 *
 * @func isNaN
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.6.0|v0.6.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isNotNaN|isNotNaN}
 * @example
 *
 * RA.isNaN(NaN); // => true
 * RA.isNaN(Number.NaN); // => true
 * RA.isNaN(0 / 0); // => true
 *
 * // e.g. these would have been true with global isNaN().
 * RA.isNaN('NaN'); // => false
 * RA.isNaN(undefined); // => false
 * RA.isNaN({}); // => false
 * RA.isNaN('blabla'); // => false
 *
 * RA.isNaN(true); // => false
 * RA.isNaN(null); // => false
 * RA.isNaN(37); // => false
 * RA.isNaN('37'); // => false
 * RA.isNaN('37.37'); // => false
 * RA.isNaN(''); // => false
 * RA.isNaN(' '); // => false
 */
var _isNaN = /*#__PURE__*/_ramda.or(Number.isNaN, isNaNPolyfill);

/**
 * Checks whether the passed value is complement of `NaN` and its type is not `Number`.
 *
 * @func isNotNaN
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.6.0|v0.6.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isNaN|isNaN}
 * @example
 *
 * RA.isNotNaN(NaN); // => false
 * RA.isNotNaN(Number.NaN); // => false
 * RA.isNotNaN(0 / 0); // => false
 *
 * RA.isNotNaN('NaN'); // => true
 * RA.isNotNaN(undefined); // => true
 * RA.isNotNaN({}); // => true
 * RA.isNotNaN('blabla'); // => true
 *
 * RA.isNotNaN(true); // => true
 * RA.isNotNaN(null); // => true
 * RA.isNotNaN(37); // => true
 * RA.isNotNaN('37'); // => true
 * RA.isNotNaN('37.37'); // => true
 * RA.isNotNaN(''); // => true
 * RA.isNotNaN(' '); // => true
 */
var isNotNaN = /*#__PURE__*/_ramda.complement(_isNaN);

/* eslint-disable max-len */
/**
 * Checks if value is valid `Date` object.
 *
 * @func isValidDate
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.8.0|v1.8.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isDate|isDate}, {@link RA.isNotDate|isNotDate}, {@link RA.isNotValidDate|isNotValidDate}
 * @example
 *
 * RA.isValidDate(new Date()); //=> true
 * RA.isValidDate(new Date('a')); //=> false
 */
/* eslint-enable max-len */
var isValidDate = /*#__PURE__*/_ramda.both(isDate, /*#__PURE__*/_ramda.pipe( /*#__PURE__*/_ramda.invoker(0, 'getTime'), isNotNaN));

/**
 * Checks if value is complement of valid `Date` object.
 *
 * @func isNotValidDate
 * @aliases isInvalidDate
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.8.0|v1.8.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isValidDate|isValidDate}, {@link RA.isDate|isDate}, {@link RA.isNotDate|isNotDate}
 * @example
 *
 * RA.isNotValidDate(new Date()); //=> false
 * RA.isNotValidDate(new Date('a')); //=> true
 */
var isNotValidDate = /*#__PURE__*/_ramda.complement(isValidDate);

/**
 * Checks if value is a complement of `Number` primitive or object.
 *
 * @func isNotNumber
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.6.0|v0.6.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isNumber|isNumber}
 * @example
 *
 * RA.isNotNumber(5); // => false
 * RA.isNotNumber(Number.MAX_VALUE); // => false
 * RA.isNotNumber(-Infinity); // => false
 * RA.isNotNumber('5'); // => true
 */
var isNotNumber = /*#__PURE__*/_ramda.complement(isNumber);

/**
 * Checks if value is a positive `Number` primitive or object.
 *
 * @func isPositive
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.15.0|v1.15.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isNegative|isNegative}
 * @example
 *
 * RA.isPositive(1); // => true
 * RA.isPositive(Number.MAX_VALUE); // => true
 * RA.isPositive(-Infinity); // => false
 * RA.isPositive(NaN); // => false
 * RA.isPositive('5'); // => false
 */
var isPositive = /*#__PURE__*/_ramda.both(isNumber, /*#__PURE__*/_ramda.lt(0));

/**
 * Checks if value is a negative `Number` primitive or object.
 *
 * @func isNegative
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.15.0|v1.15.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isPositive|isPositive}
 * @example
 *
 * RA.isNegative(-1); // => true
 * RA.isNegative(Number.MIN_VALUE); // => false
 * RA.isNegative(+Infinity); // => false
 * RA.isNegative(NaN); // => false
 * RA.isNegative('5'); // => false
 */
var isNegative = /*#__PURE__*/_ramda.both(isNumber, /*#__PURE__*/_ramda.gt(0));

// eslint-disable-next-line no-restricted-globals
var isFinitePolyfill = /*#__PURE__*/_ramda.both(isNumber, isFinite);

/**
 * Checks whether the passed value is a finite `Number`.
 *
 * @func isFinite
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.7.0|v0.7.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isNotFinite|isNotFinite}
 * @example
 *
 * RA.isFinite(Infinity); //=> false
 * RA.isFinite(NaN); //=> false
 * RA.isFinite(-Infinity); //=> false
 *
 * RA.isFinite(0); // true
 * RA.isFinite(2e64); // true
 *
 * RA.isFinite('0');  // => false
 *                    // would've been true with global isFinite('0')
 * RA.isFinite(null); // => false
 *                    // would've been true with global isFinite(null)
 */
var _isFinite = /*#__PURE__*/_ramda.or(Number.isFinite, isFinitePolyfill);

/**
 * Checks whether the passed value is complement of finite `Number`.
 *
 *
 * @func isNotFinite
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.7.0|v0.7.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isFinite|isFinite}
 * @example
 *
 * RA.isNotFinite(Infinity); //=> true
 * RA.isNotFinite(NaN); //=> true
 * RA.isNotFinite(-Infinity); //=> true
 *
 * RA.isNotFinite(0); // false
 * RA.isNotFinite(2e64); // false
 *
 * RA.isNotFinite('0');  // => true
 * RA.isNotFinite(null); // => true
 */
var isNotFinite = /*#__PURE__*/_ramda.complement(_isFinite);

var isIntegerPolyfill = /*#__PURE__*/_ramda.both(_isFinite, /*#__PURE__*/_ramda.converge(_ramda.equals, [Math.floor, _ramda.identity]));

/**
 * Checks whether the passed value is an `integer`.
 *
 * @func isInteger
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.7.0|v0.7.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isNotInteger|isNotInteger}
 * @example
 *
 * RA.isInteger(0); //=> true
 * RA.isInteger(1); //=> true
 * RA.isInteger(-100000); //=> true
 *
 * RA.isInteger(0.1);       //=> false
 * RA.isInteger(Math.PI);   //=> false
 *
 * RA.isInteger(NaN);       //=> false
 * RA.isInteger(Infinity);  //=> false
 * RA.isInteger(-Infinity); //=> false
 * RA.isInteger('10');      //=> false
 * RA.isInteger(true);      //=> false
 * RA.isInteger(false);     //=> false
 * RA.isInteger([1]);       //=> false
 */
var isInteger = /*#__PURE__*/_ramda.or(Number.isInteger, isIntegerPolyfill);

/**
 * Checks whether the passed value is complement of an `integer`.
 *
 *
 * @func isNotInteger
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.7.0|v0.7.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isInteger|isInteger}
 * @example
 *
 * RA.isNotInteger(0); //=> false
 * RA.isNotInteger(1); //=> false
 * RA.isNotInteger(-100000); //=> false
 *
 * RA.isNotInteger(0.1);       //=> true
 * RA.isNotInteger(Math.PI);   //=> true
 *
 * RA.isNotInteger(NaN);       //=> true
 * RA.isNotInteger(Infinity);  //=> true
 * RA.isNotInteger(-Infinity); //=> true
 * RA.isNotInteger('10');      //=> true
 * RA.isNotInteger(true);      //=> true
 * RA.isNotInteger(false);     //=> true
 * RA.isNotInteger([1]);       //=> true
 */
var isNotInteger = /*#__PURE__*/_ramda.complement(isInteger);

/**
 * Checks whether the passed value is a `float`.
 *
 * @func isFloat
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.14.0|v1.14.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isNotFloat|isNotFloat}
 * @example
 *
 * RA.isFloat(0); //=> false
 * RA.isFloat(1); //=> false
 * RA.isFloat(-100000); //=> false
 *
 * RA.isFloat(0.1);       //=> true
 * RA.isFloat(Math.PI);   //=> true
 *
 * RA.isFloat(NaN);       //=> false
 * RA.isFloat(Infinity);  //=> false
 * RA.isFloat(-Infinity); //=> false
 * RA.isFloat('10');      //=> false
 * RA.isFloat(true);      //=> false
 * RA.isFloat(false);     //=> false
 * RA.isFloat([1]);       //=> false
 */
var isFloat = /*#__PURE__*/_ramda.both(_isFinite, /*#__PURE__*/_ramda.complement(isInteger));

/**
 * Checks whether the passed value is complement of a `float`.
 *
 * @func isNotFloat
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.14.0|v1.14.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isFloat|isFloat}
 * @example
 *
 * RA.isNotFloat(0); //=> true
 * RA.isNotFloat(1); //=> true
 * RA.isNotFloat(-100000); //=> true
 *
 * RA.isNotFloat(0.1);       //=> false
 * RA.isNotFloat(Math.PI);   //=> false
 *
 * RA.isNotFloat(NaN);       //=> true
 * RA.isNotFloat(Infinity);  //=> true
 * RA.isNotFloat(-Infinity); //=> true
 * RA.isNotFloat('10');      //=> true
 * RA.isNotFloat(true);      //=> true
 * RA.isNotFloat(false);     //=> true
 * RA.isNotFloat([1]);       //=> true
 */
var isNotFloat = /*#__PURE__*/_ramda.complement(isFloat);

/**
 * Checks if value is odd integer number.
 * An odd number is an integer which is not a multiple DIVISIBLE of two.
 *
 * @func isOdd
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.18.0|v1.18.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isEven|isEven}
 * @example
 *
 * RA.isOdd(1); // => true
 * RA.isOdd(-Infinity); // => false
 * RA.isOdd(4); // => false
 * RA.isOdd(3); // => true
 */
var isOdd = /*#__PURE__*/_ramda.both(isInteger, /*#__PURE__*/_ramda.pipe( /*#__PURE__*/_ramda.flip(_ramda.modulo)(2), /*#__PURE__*/_ramda.complement(_ramda.equals)(0)));

/**
 * Checks if value is even integer number.
 * An even number is an integer which is "evenly divisible" by two.
 * Zero is an even number because zero divided by two equals zero,
 * which despite not being a natural number, is an integer.
 * Even numbers are either positive or negative.
 *
 * @func isEven
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.18.0|v1.18.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isOdd|isOdd}
 * @example
 *
 * RA.isEven(0); // => true
 * RA.isEven(1); // => false
 * RA.isEven(-Infinity); // => false
 * RA.isEven(4); // => true
 * RA.isEven(3); // => false
 */
var isEven = /*#__PURE__*/_ramda.both(isInteger, /*#__PURE__*/_ramda.complement(isOdd));

/**
 * Checks if input value is a pair.
 *
 * @func isPair
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.19.0|v1.19.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link http://ramdajs.com/docs/#pair|pair}, {@link RA.isNotPair|isNotPair}
 * @example
 *
 * RA.isPair([]); // => false
 * RA.isPair([0]); // => false
 * RA.isPair([0, 1]); // => true
 * RA.isPair([0, 1, 2]); // => false
 * RA.isPair({ 0: 0, 1: 1 }); // => false
 * RA.isPair({ foo: 0, bar: 0 }); // => false
 */
var isPair = /*#__PURE__*/_ramda.both(isArray, /*#__PURE__*/_ramda.pipe(_ramda.length, /*#__PURE__*/_ramda.equals(2)));

/**
 * Checks if input value is complement of a pair.
 *
 * @func isNotPair
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.19.0|v1.19.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link http://ramdajs.com/docs/#pair|pair}, {@link RA.isPair|isPair}
 * @example
 *
 * RA.isNotPair([]); // => true
 * RA.isNotPair([0]); // => true
 * RA.isNotPair([0, 1]); // => false
 * RA.isNotPair([0, 1, 2]); // => true
 * RA.isNotPair({0: 0, 1: 1}); // => true
 * RA.isNotPair({foo: 0, bar: 0}); // => true
 */
var isNotPair = /*#__PURE__*/_ramda.complement(isPair);

/**
 * Checks if input value is a `thenable`.
 * `thenable` is an object or function that defines a `then` method.
 *
 * @func isThenable
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.1.0|v2.1.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link RA.isPromise|isPromise}
 * @example
 *
 * RA.isThenable(null); // => false
 * RA.isThenable(undefined); // => false
 * RA.isThenable([]); // => false
 * RA.isThenable(Promise.resolve()); // => true
 * RA.isThenable(Promise.reject()); // => true
 * RA.isThenable({ then: () => 1 }); // => true
 */
var isThenable = /*#__PURE__*/_ramda.pathSatisfies(isFunction, ['then']);

/**
 * Checks if input value is a native `Promise`.
 * The Promise object represents the eventual completion (or failure)
 * of an asynchronous operation, and its resulting value.
 *
 * @func isPromise
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.1.0|v2.1.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link https://promisesaplus.com/|Promises/A+}, {@link RA.isThenable|isThenable}
 * @example
 *
 * RA.isPromise(null); // => false
 * RA.isPromise(undefined); // => false
 * RA.isPromise([]); // => false
 * RA.isPromise(Promise.resolve()); // => true
 * RA.isPromise(Promise.reject()); // => true
 * RA.isPromise({ then: () => 1 }); // => false
 */
var isPromise = /*#__PURE__*/_ramda.both(isObj, /*#__PURE__*/_ramda.pipe(_ramda.toString, /*#__PURE__*/_ramda.equals('[object Promise]')));

/**
 * A function that returns `null`.
 *
 * @func stubNull
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.6.0|v1.6.0}
 * @category Function
 * @sig ... -> null
 * @return {null}
 * @example
 *
 * RA.stubNull(); //=> null
 * RA.stubNull(1, 2, 3); //=> null
 */
var stubNull = /*#__PURE__*/_ramda.always(null);

/**
 * This function returns a new empty object.
 *
 * @func stubObj
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.1.0|v2.1.0}
 * @category Function
 * @sig ... -> Object
 * @aliases stubObject
 * @return {Object} Returns the new empty object.
 * @example
 *
 * RA.stubObj(); //=> {}
 * RA.stubObj(1, 2, 3); //=> {}
 */

var stubObj = function stubObj() {
  return {};
};

/**
 * A function that returns empty string.
 *
 * @func stubString
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.1.0|v2.1.0}
 * @category Function
 * @sig ... -> String
 * @return {string} The empty string
 * @example
 *
 * RA.stubString(); //=> ''
 * RA.stubString(1, 2, 3); //=> ''
 */
var stubString = /*#__PURE__*/_ramda.always('');

/**
 * A function that returns new empty array on every call.
 *
 * @func stubArray
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.1.0|v2.1.0}
 * @category Function
 * @sig ... -> Array
 * @return {Array} New empty array
 * @example
 *
 * RA.stubArray(); //=> []
 * RA.stubArray(1, 2, 3); //=> []
 */

var stubArray = function stubArray() {
  return [];
};

/**
 * A function that performs no operations.
 *
 * @func noop
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.0.0|v1.0.0}
 * @category Function
 * @sig ... -> undefined
 * @return {undefined}
 * @example
 *
 * RA.noop(); //=> undefined
 * RA.noop(1, 2, 3); //=> undefined
 */
var noop = /*#__PURE__*/_ramda.always( /*#__PURE__*/stubUndefined());

var mapping = /*#__PURE__*/Object.freeze({
  equals: 'fantasy-land/equals',
  lte: 'fantasy-land/lte',
  compose: 'fantasy-land/compose',
  id: 'fantasy-land/id',
  concat: 'fantasy-land/concat',
  empty: 'fantasy-land/empty',
  map: 'fantasy-land/map',
  contramap: 'fantasy-land/contramap',
  ap: 'fantasy-land/ap',
  of: 'fantasy-land/of',
  alt: 'fantasy-land/alt',
  zero: 'fantasy-land/zero',
  reduce: 'fantasy-land/reduce',
  traverse: 'fantasy-land/traverse',
  chain: 'fantasy-land/chain',
  chainRec: 'fantasy-land/chainRec',
  extend: 'fantasy-land/extend',
  extract: 'fantasy-land/extract',
  bimap: 'fantasy-land/bimap',
  promap: 'fantasy-land/promap'
});

var isFunctor = /*#__PURE__*/_ramda.anyPass([/*#__PURE__*/_ramda.pathSatisfies(isFunction, ['map']), /*#__PURE__*/_ramda.pathSatisfies(isFunction, [mapping.map])]);
var isApply = /*#__PURE__*/_ramda.both(isFunctor, /*#__PURE__*/_ramda.anyPass([/*#__PURE__*/_ramda.pathSatisfies(isFunction, ['ap']), /*#__PURE__*/_ramda.pathSatisfies(isFunction, [mapping.ap])]));

var ap$1 = /*#__PURE__*/_ramda.curryN(2, function (applyF, applyX) {
  // return original ramda `ap` if not Apply spec
  if (!isApply(applyF) || !isApply(applyX)) {
    return _ramda.ap(applyF, applyX);
  }

  try {
    // new version of `ap` starting from ramda version > 0.23.0
    return applyF.ap(applyX);
  } catch (e) {
    // old version of `ap` till ramda version <= 0.23.0
    return applyX.ap(applyF);
  }
});

/**
 * "lifts" a function to be the specified arity, so that it may "map over" objects that satisfy
 * the fantasy land Apply spec of algebraic structures.
 *
 * Lifting is specific for {@link https://github.com/scalaz/scalaz|scalaz} and {@link http://www.functionaljava.org/|functional java} implementations.
 * Old version of fantasy land spec were not compatible with this approach,
 * but as of fantasy land 1.0.0 Apply spec also adopted this approach.
 *
 * This function acts as interop for ramda <= 0.23.0 and {@link https://monet.github.io/monet.js/|monet.js}.
 *
 * More info {@link https://github.com/fantasyland/fantasy-land/issues/50|here}.
 *
 * @func liftFN
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.2.0|v1.2.0}
 * @category Function
 * @sig Apply a => Number -> (a... -> a) -> (a... -> a)
 * @param {Number} arity The arity of the lifter function
 * @param {Function} fn The function to lift into higher context
 * @return {Function} The lifted function
 * @see {@link http://ramdajs.com/docs/#lift|lift}, {@link http://ramdajs.com/docs/#ap|ap}
 * @example
 *
 * const { Maybe } = require('monet');
 *
 * const add3 = (a, b, c) => a + b + c;
 * const madd3 = RA.liftFN(3, add3);
 *
 * madd3(Maybe.Some(10), Maybe.Some(15), Maybe.Some(17)); //=> Maybe.Some(42)
 * madd3(Maybe.Some(10), Maybe.Nothing(), Maybe.Some(17)); //=> Maybe.Nothing()
 */
var liftFN = /*#__PURE__*/_ramda.curry(function (arity, fn) {
  var lifted = _ramda.curryN(arity, fn);
  return _ramda.curryN(arity, function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var accumulator = _ramda.map(lifted, _ramda.head(args));
    var apps = _ramda.slice(1, Infinity, args);
    return _ramda.reduce(ap$1, accumulator, apps);
  });
});

/**
 * "lifts" a function to be the specified arity, so that it may "map over" objects that satisfy
 * the fantasy land Apply spec of algebraic structures.
 *
 * Lifting is specific for {@link https://github.com/scalaz/scalaz|scalaz} and {@link http://www.functionaljava.org/|functional java} implementations.
 * Old version of fantasy land spec were not compatible with this approach,
 * but as of fantasy land 1.0.0 Apply spec also adopted this approach.
 *
 * This function acts as interop for ramda <= 0.23.0 and {@link https://monet.github.io/monet.js/|monet.js}.
 *
 * More info {@link https://github.com/fantasyland/fantasy-land/issues/50|here}.
 *
 * @func liftF
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.2.0|v1.2.0}
 * @category Function
 * @sig Apply a => (a... -> a) -> (a... -> a)
 * @param {Function} fn The function to lift into higher context
 * @return {Function} The lifted function
 * @see {@link RA.liftFN|liftFN}
 * @example
 *
 * const { Maybe } = require('monet');
 *
 * const add3 = (a, b, c) => a + b + c;
 * const madd3 = RA.liftF(add3);
 *
 * madd3(Maybe.Some(10), Maybe.Some(15), Maybe.Some(17)); //=> Maybe.Some(42)
 * madd3(Maybe.Some(10), Maybe.Nothing(), Maybe.Some(17)); //=> Maybe.Nothing()
 */
var liftF = function liftF(fn) {
  return liftFN(fn.length, fn);
};

/* eslint-disable max-len */
/**
 * The catamorphism is a way of folding a type into a value.
 *
 * **Either**
 *
 * If the either is right than the right function will be executed with
 * the `right` value and the value of the function returned. Otherwise the left function
 * will be called with the `left` value.
 *
 * **Maybe**
 *
 * If the maybe is Some than the right function will be executed with the `some` value and the value of the function
 * returned. Otherwise the left function with be called without an argument.
 *
 *
 *
 * @func cata
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.4.0|v1.4.0}
 * @category Function
 * @sig (a -> b) -> (a -> c) -> Cata a -> b | c
 * @param {Function} leftFn The left function that consumes the left value
 * @param {Function} rightFn The right function that consumes the right value
 * @param {Cata} catamorphicObj Either, Maybe or any other type with catamorphic capabilities (`cata` or `either` method)
 * @return {*}
 * @see {@link https://monet.github.io/monet.js/#cata|cata explained}
 * @example
 *
 * // Either
 * const eitherR = Either.Right(1);
 * const eitherL = Either.Left(2);
 *
 * RA.cata(identity, identity, eitherR); //=> 1
 * RA.cata(identity, identity, eitherL); //=> 2
 *
 * // Maybe
 * const maybeSome = Maybe.Some(1);
 * const maybeNothing = Maybe.Nothing();
 *
 * RA.cata(identity, identity, maybeSome); //=> 1
 * RA.cata(identity, identity, maybeNothing); //=> undefined
 */
/* eslint-enable */
var catamorphism = /*#__PURE__*/_ramda.curry(function (leftFn, rightFn, catamorphicObj) {
  if (isFunction(catamorphicObj.cata)) {
    return catamorphicObj.cata(leftFn, rightFn);
  }
  return catamorphicObj.either(leftFn, rightFn);
});

/**
 * Weaves a configuration into function returning the runnable monad like `Reader` or `Free`.
 * This allows us to pre-bind the configuration in advance and use the weaved function
 * without need to explicitly pass the configuration on every call.
 *
 * @func weave
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.7.0|v1.7.0}
 * @category Function
 * @sig (*... -> *) -> * -> (*... -> *)
 * @param {Function} fn The function to weave
 * @param {*} config The configuration to weave into fn
 * @return {Function} Auto-curried weaved function
 * @example
 *
 * const { Reader: reader } = require('monet');
 *
 * const log = value => reader(
 *   config => config.log(value)
 * );
 *
 * // no weaving
 * log('test').run(console); //=> prints 'test'
 *
 * // weaving
 * const wlog = RA.weave(log, console);
 * wlog('test'); //=> prints 'test'
 */
var weave = /*#__PURE__*/_ramda.curryN(2, function (fn, config) {
  return _ramda.curryN(fn.length, function () {
    return fn.apply(undefined, arguments).run(config);
  });
});

/**
 * Weaves a configuration into function returning the runnable monad like `Reader` or `Free`.
 * This allows us to pre-bind the configuration in advance and use the weaved function
 * without need to explicitly pass the configuration on every call.
 *
 * @func weaveLazy
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.10.0|v1.10.0}
 * @category Function
 * @sig (*... -> *) -> (* -> *) -> (*... -> *)
 * @param {Function} fn The function to weave
 * @param {Function} configAccessor The function that returns the configuration object
 * @return {Function} Auto-curried weaved function
 * @example
 *
 * const { Reader: reader } = require('monet');
 *
 * const log = value => reader(
 *   config => config.log(value)
 * );
 *
 * const consoleAccessor = R.always(console);
 *
 * // no weaving
 * log('test').run(console); //=> prints 'test'
 *
 * // weaving
 * const wlog = RA.weaveLazy(log, consoleAccessor);
 * wlog('test'); //=> prints 'test'
 */
var weaveLazy = /*#__PURE__*/_ramda.curryN(2, function (fn, configAccessor) {
  return _ramda.curryN(fn.length, function () {
    return fn.apply(undefined, arguments).run(configAccessor());
  });
});

/**
 * Returns a curried equivalent of the provided function, with the specified arity.
 * This function is like curryN, except that the provided arguments order is reversed.
 *
 * @func curryRightN
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.12.0|v1.12.0}
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} length The arity for the returned function
 * @param {Function} fn The function to curry
 * @return {Function}  A new, curried function
 * @see {@link http://ramdajs.com/docs/#curryN|curryN}, {@link RA.curryRight|curryRight}
 * @example
 *
 * const concatStrings = (a, b, c) => a + b + c;
 * const concatStringsCurried = RA.curryRightN(3, concatStrings);
 *
 * concatStringCurried('a')('b')('c'); // => 'cba'
 */
var curryRightN = /*#__PURE__*/_ramda.curryN(2, function (arity, fn) {
  return _ramda.curryN(arity, function wrapper() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return fn.apply(this, _ramda.reverse(args));
  });
});

/**
 * Returns a curried equivalent of the provided function.
 * This function is like curry, except that the provided arguments order is reversed.
 *
 * @func curryRight
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.12.0|v1.12.0}
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Function} fn The function to curry
 * @return {Function}  A new, curried function
 * @see {@link http://ramdajs.com/docs/#curry|curry}, {@link RA.curryRightN|curryRightN}
 * @example
 *
 * const concatStrings = (a, b, c) => a + b + c;
 * const concatStringsCurried = RA.curryRight(concatStrings);
 *
 * concatStringCurried('a')('b')('c'); // => 'cba'
 */
var curryRight = /*#__PURE__*/_ramda.converge(curryRightN, [_ramda.length, _ramda.identity]);

/* eslint-disable max-len */
/**
 * Composable shortcut for `Promise.resolve`.
 *
 * Returns a Promise object that is resolved with the given value.
 * If the value is a thenable (i.e. has a "then" method), the returned promise will
 * "follow" that thenable, adopting its eventual state.
 *
 * @func resolveP
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.16.0|v1.16.0}
 * @category Function
 * @sig a -> Promise a
 * @param {*} [value=undefined] Argument to be resolved by this Promise. Can also be a Promise or a thenable to resolve
 * @return {Promise} A Promise that is resolved with the given value, or the promise passed as value, if the value was a promise object
 * @see {@link RA.rejectP|rejectP}
 * @example
 *
 * RA.resolveP(); //=> Promise(undefined)
 * RA.resolveP('a'); //=> Promise('a')
 * RA.resolveP([1, 2, 3]); //=> Promise([1, 2, 3])
 */
/* eslint-enable max-len */
var resolveP = /*#__PURE__*/_ramda.bind(Promise.resolve, Promise);

/**
 * Composable shortcut for `Promise.reject`.
 *
 * Returns a Promise object that is rejected with the given reason.
 *
 * @func rejectP
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.16.0|v1.16.0}
 * @category Function
 * @sig a -> Promise a
 * @param {*} [reason=undefined] Reason why this Promise rejected.
 * @return {Promise} A Promise that is rejected with the given reason
 * @see {@link RA.resolveP|resolveP}
 * @example
 *
 * RA.rejectP(); //=> Promise(undefined)
 * RA.rejectP('a'); //=> Promise('a')
 * RA.rejectP([1, 2, 3]); //=> Promise([1, 2, 3])
 */
var rejectP = /*#__PURE__*/_ramda.bind(Promise.reject, Promise);

// helpers
var filterIndexed = /*#__PURE__*/_ramda.addIndex(_ramda.filter);
var containsIndex = /*#__PURE__*/_ramda.curry(function (indexes, val, index) {
  return _ramda.contains(index, indexes);
});

/**
 * Picks values from list by indexes.
 *
 * @func pickIndexes
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.1.0|v1.1.0}
 * @category List
 * @sig  [Number] -> [a] -> [a]
 * @param {Array} indexes The indexes to pick
 * @param {Array} list The list to pick values from
 * @return {Array} New array containing only values at `indexes`
 * @see {@link http://ramdajs.com/docs/#pick|pick}, {@link RA.omitIndexes|omitIndexes}
 * @example
 *
 * RA.pickIndexes([0, 2], ['a', 'b', 'c']); //=> ['a', 'c']
 */
var pickIndexes = /*#__PURE__*/_ramda.curry(function (indexes, list) {
  return filterIndexed(containsIndex(indexes), list);
});

/**
 * Creates a list from from arguments.
 *
 * @func list
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.1.0|v1.1.0}
 * @category List
 * @sig  a... -> [a...]
 * @param {...*} items The items of the feature list
 * @return {Array} New list created from items
 * @see {@link https://github.com/ramda/ramda/wiki/Cookbook#create-a-list-function|Ramda Cookbook}
 * @example
 *
 * RA.list('a', 'b', 'c'); //=> ['a', 'b', 'c']
 */
var list = /*#__PURE__*/_ramda.unapply(_ramda.identity);

/**
 * Returns the result of concatenating the given lists or strings.
 *
 * Note: R.concat expects both arguments to be of the same type, unlike
 * the native Array.prototype.concat method.
 * It will throw an error if you concat an Array with a non-Array value.
 * Dispatches to the concat method of the second argument, if present.
 *
 * @func concatRight
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.11.0|v1.11.0}
 * @category List
 * @sig [a] -> [a] -> [a]
 * @sig String -> String -> String
 * @param {Array|String} firstList The first list
 * @param {Array|String} secondList The second list
 * @return {Array|String} A list consisting of the elements of `secondList`
 * followed by the elements of `firstList`.
 * @see {@link http://ramdajs.com/docs/#concat|concat}
 * @example
 *
 * RA.concatRight('ABC', 'DEF'); //=> 'DEFABC'
 * RA.concatRight([4, 5, 6], [1, 2, 3]); //=> [1, 2, 3, 4, 5, 6]
 * RA.concatRight([], []); //=> []
 */
var concatRight = /*#__PURE__*/_ramda.flip(_ramda.concat);

/* eslint-disable max-len */
/**
 * Given an `Iterable`(arrays are `Iterable`), or a promise of an `Iterable`,
 * which produces promises (or a mix of promises and values),
 * iterate over all the values in the `Iterable` into an array and
 * reduce the array to a value using the given iterator function.
 *
 * If the iterator function returns a promise, then the result of the promise is awaited,
 * before continuing with next iteration. If any promise in the array is rejected or a promise
 * returned by the iterator function is rejected, the result is rejected as well.
 *
 * If `initialValue` is `undefined` (or a promise that resolves to `undefined`) and
 * the `Iterable` contains only 1 item, the callback will not be called and
 * the `Iterable's` single item is returned. If the `Iterable` is empty, the callback
 * will not be called and `initialValue` is returned (which may be undefined).
 *
 * This function is basically equivalent to {@link http://bluebirdjs.com/docs/api/promise.reduce.html|bluebird.reduce}.
 *
 * @func reduceP
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.13.0|v1.13.0}
 * @category List
 * @typedef MaybePromise = Promise.<*> | *
 * @sig ((Promise a, MaybePromise b) -> Promise a) -> MaybePromise a -> MaybePromise [MaybePromise b] -> Promise a
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the current element from the list
 * @param {*|Promise.<*>} acc The accumulator value
 * @param {Array.<*>|Promise.<Array<*|Promise.<*>>>} list The list to iterate over
 * @return {Promise} The final, accumulated value
 * @see {@link http://ramdajs.com/docs/#reduce|reduce}, {@link RA.reduceRightP|reduceRightP}, {@link http://bluebirdjs.com/docs/api/promise.reduce.html|bluebird.reduce}
 * @example
 *
 * RA.reduceP(
 *   (total, fileName) => fs
 *     .readFileAsync(fileName, 'utf8')
 *     .then(contents => total + parseInt(contents, 10)),
 *   0,
 *   ['file1.txt', 'file2.txt', 'file3.txt']
 * ); // => Promise(10)
 *
 * RA.reduceP(
 *   (total, fileName) => fs
 *     .readFileAsync(fileName, 'utf8')
 *     .then(contents => total + parseInt(contents, 10)),
 *   Promise.resolve(0),
 *   ['file1.txt', 'file2.txt', 'file3.txt']
 * ); // => Promise(10)
 *
 * RA.reduceP(
 *   (total, fileName) => fs
 *     .readFileAsync(fileName, 'utf8')
 *     .then(contents => total + parseInt(contents, 10)),
 *   0,
 *   [Promise.resolve('file1.txt'), 'file2.txt', 'file3.txt']
 * ); // => Promise(10)
 *
 * RA.reduceP(
 *   (total, fileName) => fs
 *     .readFileAsync(fileName, 'utf8')
 *     .then(contents => total + parseInt(contents, 10)),
 *   0,
 *   Promise.resolve([Promise.resolve('file1.txt'), 'file2.txt', 'file3.txt'])
 * ); // => Promise(10)
 *
 */
/* esline-enable max-len */
var reduceP = /*#__PURE__*/_ramda.curryN(3, function (fn, acc, list) {
  return resolveP(list).then(function (iterable) {
    var listLength = _ramda.length(iterable);

    if (listLength === 0) {
      return acc;
    }

    var reducer = _ramda.reduce(function (accP, currentValueP) {
      return accP.then(function (previousValue) {
        return Promise.all([previousValue, currentValueP]);
      }).then(function (_ref) {
        var previousValue = _ref[0],
            currentValue = _ref[1];

        if (isUndefined(previousValue) && listLength === 1) {
          return currentValue;
        }

        return fn(previousValue, currentValue);
      });
    });

    return reducer(resolveP(acc), iterable);
  });
});

// in older ramda versions the order of the arguments is flipped
var flipArgs = /*#__PURE__*/_ramda.pipe(_ramda.reduceRight(_ramda.concat, ''), _ramda.equals('ba'))(['a', 'b']);

/* eslint-disable max-len */
/**
 * Given an `Iterable`(arrays are `Iterable`), or a promise of an `Iterable`,
 * which produces promises (or a mix of promises and values),
 * iterate over all the values in the `Iterable` into an array and
 * reduce the array to a value using the given iterator function.
 *
 * Similar to {@link RA.reduceP|reduceP} except moves through the input list from the right to the left.
 * The iterator function receives two values: (value, acc),
 * while the arguments' order of reduceP's iterator function is (acc, value).
 *
 * @func reduceRightP
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.13.0|v1.13.0}
 * @category List
 * @typedef MaybePromise = Promise.<*> | *
 * @sig ((MaybePromise b, Promise a) -> Promise a) -> MaybePromise a -> MaybePromise [MaybePromise b] -> Promise a
 * @param {Function} fn The iterator function. Receives two values, the current element from the list and the accumulator
 * @param {*|Promise.<*>} acc The accumulator value
 * @param {Array.<*>|Promise.<Array<*|Promise.<*>>>} list The list to iterate over
 * @return {Promise} The final, accumulated value
 * @see {@link RA.reduceP|reduceP}, {@link http://bluebirdjs.com/docs/api/promise.reduce.html|bluebird.reduce}
 * @example
 *
 * RA.reduceRightP(
 *   (fileName, total) => fs
 *     .readFileAsync(fileName, 'utf8')
 *     .then(contents => total + parseInt(contents, 10)),
 *   0,
 *   ['file1.txt', 'file2.txt', 'file3.txt']
 * ); // => Promise(10)
 *
 * RA.reduceRightP(
 *   (fileName, total) => fs
 *     .readFileAsync(fileName, 'utf8')
 *     .then(contents => total + parseInt(contents, 10)),
 *   Promise.resolve(0),
 *   ['file1.txt', 'file2.txt', 'file3.txt']
 * ); // => Promise(10)
 *
 * RA.reduceRightP(
 *   (fileName, total) => fs
 *     .readFileAsync(fileName, 'utf8')
 *     .then(contents => total + parseInt(contents, 10)),
 *   0,
 *   [Promise.resolve('file1.txt'), 'file2.txt', 'file3.txt']
 * ); // => Promise(10)
 *
 * RA.reduceRightP(
 *   (fileName, total) => fs
 *     .readFileAsync(fileName, 'utf8')
 *     .then(contents => total + parseInt(contents, 10)),
 *   0,
 *   Promise.resolve([Promise.resolve('file1.txt'), 'file2.txt', 'file3.txt'])
 * ); // => Promise(10)
 *
 */
/* esline-enable max-len */
var reduceRightP = /*#__PURE__*/_ramda.curryN(3, function (fn, acc, list) {
  return resolveP(list).then(function (iterable) {
    var listLength = _ramda.length(iterable);

    if (listLength === 0) {
      return acc;
    }

    var reducer = _ramda.reduceRight(function (arg1, arg2) {
      var accP = void 0;
      var currentValueP = void 0;

      if (flipArgs) {
        accP = arg1;
        currentValueP = arg2;
      } else {
        accP = arg2;
        currentValueP = arg1;
      }

      return accP.then(function (previousValue) {
        return Promise.all([previousValue, currentValueP]);
      }).then(function (_ref) {
        var previousValue = _ref[0],
            currentValue = _ref[1];

        if (isUndefined(previousValue) && listLength === 1) {
          return currentValue;
        }

        return fn(currentValue, previousValue);
      });
    });

    return reducer(resolveP(acc), iterable);
  });
});

/**
 * Returns the elements of the given list or string (or object with a slice method)
 * from fromIndex (inclusive).
 * Dispatches to the slice method of the second argument, if present.
 *
 * @func sliceFrom
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.16.0|v1.16.0}
 * @category List
 * @sig  Number -> [a] -> [a]
 * @param {number} fromIndex The start index (inclusive)
 * @param {Array|string} list The list or string to slice
 * @return {Array|string} The sliced list or string
 * @see {@link http://ramdajs.com/docs/#slice|slice}, {@link RA.sliceTo|sliceTo}
 * @example
 *
 * RA.sliceFrom(1, [1, 2, 3]); //=> [2, 3]
 */
var sliceFrom = /*#__PURE__*/_ramda.slice(_ramda.__, Infinity);

/**
 * Returns the elements of the given list or string (or object with a slice method)
 * to toIndex (exclusive).
 * Dispatches to the slice method of the second argument, if present.
 *
 * @func sliceTo
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.16.0|v1.16.0}
 * @category List
 * @sig  Number -> [a] -> [a]
 * @param {number} toIndex The end index (exclusive)
 * @param {Array|string} list The list or string to slice
 * @return {Array|string} The sliced list or string
 * @see {@link http://ramdajs.com/docs/#slice|slice}, {@link RA.sliceFrom|sliceFrom}
 * @example
 *
 * RA.sliceTo(2, [1, 2, 3]); //=> [1, 2]
 */
var sliceTo = /*#__PURE__*/_ramda.slice(0);

// helpers
var rejectIndexed = /*#__PURE__*/_ramda.addIndex(_ramda.reject);
var containsIndex$1 = /*#__PURE__*/_ramda.curry(function (indexes, val, index) {
  return _ramda.contains(index, indexes);
});

/**
 * Returns a partial copy of an array omitting the indexes specified.
 *
 * @func omitIndexes
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.19.0|v1.19.0}
 * @category List
 * @sig [Int] -> [a] -> [a]
 * @see {@link http://ramdajs.com/docs/#omit|omit}, {@link RA.pickIndexes|pickIndexes}
 * @param {!Array} indexes The array of indexes to omit from the new array
 * @param {!Array} list The array to copy from
 * @return {!Array} The new array with omitted indexes
 * @example
 *
 * RA.omitIndexes([-1, 1, 3], ['a', 'b', 'c', 'd']); //=> ['a', 'c']
 */
var omitIndexes = /*#__PURE__*/_ramda.curry(function (indexes, list) {
  return rejectIndexed(containsIndex$1(indexes), list);
});

/**
 * Acts as multiple path: arrays of paths in, array of values out. Preserves order.
 *
 * @func paths
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.2.0|v1.2.0}
 * @category List
 * @sig  [[k]] -> {k: v} - [v]
 * @param {Array} ps The property paths to fetch
 * @param {Object} obj The object to query
 * @return {Array} The corresponding values or partially applied function
 * @see {@link https://github.com/ramda/ramda/wiki/Cookbook#derivative-of-rprops-for-deep-fields|Ramda Cookbook}, {@link http://ramdajs.com/docs/#props|props}
 * @example
 *
 * const obj = {
 *   a: { b: { c: 1 } },
 *   x: 2,
 * };
 *
 * RA.paths([['a', 'b', 'c'], ['x']], obj); //=> [1, 2]
 */
var paths = /*#__PURE__*/_ramda.curry(function (ps, obj) {
  return _ramda.ap([_ramda.path(_ramda.__, obj)], ps);
});

/**
 * Creates a new object with the own properties of the provided object, but the
 * keys renamed according to logic of renaming function.
 *
 * Keep in mind that in the case of keys conflict is behaviour undefined and
 * the result may vary between various JS engines!
 *
 * @func renameKeysWith
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.5.0|v1.5.0}
 * @category Object
 * @sig (a -> b) -> {a: *} -> {b: *}
 * @param {Function} fn Function that renames the keys
 * @param {!Object} obj Provided object
 * @return {!Object} New object with renamed keys
 * @see {@link https://github.com/ramda/ramda/wiki/Cookbook#rename-keys-of-an-object-by-a-function|Ramda Cookbook}, {@link RA.renameKeys|renameKeys}
 * @example
 *
 * RA.renameKeysWith(R.concat('a'), { A: 1, B: 2, C: 3 }) //=> { aA: 1, aB: 2, aC: 3 }
 */
var renameKeysWith = /*#__PURE__*/_ramda.curry(function (fn, obj) {
  return _ramda.pipe(_ramda.toPairs, _ramda.map(_ramda.adjust(fn, 0)), _ramda.fromPairs)(obj);
});

var valueOrKey = function valueOrKey(keysMap) {
  return function (key) {
    if (_ramda.has(key, keysMap)) {
      return keysMap[key];
    }
    return key;
  };
};

/**
 * Creates a new object with the own properties of the provided object, but the
 * keys renamed according to the keysMap object as `{oldKey: newKey}`.
 * When some key is not found in the keysMap, then it's passed as-is.
 *
 * Keep in mind that in the case of keys conflict is behaviour undefined and
 * the result may vary between various JS engines!
 *
 * @func renameKeys
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.5.0|v1.5.0}
 * @category Object
 * @sig {a: b} -> {a: *} -> {b: *}
 * @param {!Object} keysMap
 * @param {!Object} obj
 * @return {!Object} New object with renamed keys
 * @see {@link https://github.com/ramda/ramda/wiki/Cookbook#rename-keys-of-an-object|Ramda Cookbook}, {@link RA.renameKeysWith|renameKeysWith}
 * @example
 *
 * const input = { firstName: 'Elisia', age: 22, type: 'human' };
 *
 * RA.renameKeys({ firstName: 'name', type: 'kind', foo: 'bar' })(input);
 * //=> { name: 'Elisia', age: 22, kind: 'human' }
 */
var renameKeys = /*#__PURE__*/_ramda.curry(function (keysMap, obj) {
  return renameKeysWith(valueOrKey(keysMap), obj);
});

/**
 * Create a new object with the own properties of the second object merged with
 * the own properties of the first object. If a key exists in both objects,
 * the value from the first object will be used. *
 * Putting it simply: it sets properties only if they don't exist.
 *
 * @func mergeRight
 * @aliases resetToDefault, defaults
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.6.0|v1.6.0}
 * @category Object
 * @sig {k: v} -> {k: v} -> {k: v}
 * @param {Object} r Destination
 * @param {Object} l Source
 * @return {Object}
 * @see {@link http://ramdajs.com/docs/#merge|merge}, {@link https://github.com/ramda/ramda/wiki/Cookbook#set-properties-only-if-they-dont-exist|Ramda Cookbook}
 * @example
 *
 * RA.mergeRight({ 'age': 40 }, { 'name': 'fred', 'age': 10 });
 * //=> { 'name': 'fred', 'age': 40 }
 */
var mergeRight = /*#__PURE__*/_ramda.flip(_ramda.merge);

/**
 * Functional equivalent of merging object properties with object spread operator.
 *
 * @func mergeProps
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.17.0|v1.17.0}
 * @category Object
 * @sig [k] -> {k: {a}} -> {a}
 * @see {@link RA.mergePaths|mergePaths}
 * @param {!Array} ps The property names to merge
 * @param {!Object} obj The object to query
 * @return {!Object} The object composed of merged properties of obj
 * @example
 *
 * const obj = {
 *   foo: { fooInner: 1 },
 *   bar: { barInner: 2 }
 * };
 *
 * { ...obj.foo, ...obj.bar }; //=> { fooInner: 1, barInner: 2 }
 * RA.mergeProps(['foo', 'bar'], obj); //=> { fooInner: 1, barInner: 2 }
 */
var mergeProps = /*#__PURE__*/_ramda.curryN(2, /*#__PURE__*/_ramda.pipe(_ramda.props, _ramda.mergeAll));

/**
 * Merge objects under corresponding paths.
 *
 * @func mergePaths
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.17.0|v1.17.0}
 * @category Object
 * @sig [[k]] -> {k: {a}} -> {a}
 * @see {@link RA.mergeProps|mergeProps}
 * @param {!Array} paths The property paths to merge
 * @param {!Object} obj The object to query
 * @return {!Object} The object composed of merged property paths of obj
 * @example
 *
 * const obj = {
 *   foo: { fooInner: { fooInner2: 1 } },
 *   bar: { barInner: 2 }
 * };
 *
 * { ...obj.foo.fooInner, ...obj.bar }; //=>  { fooInner2: 1, barInner: 2 }
 * RA.mergePaths([['foo', 'fooInner'], ['bar']], obj); //=> { fooInner2: 1, barInner: 2 }
 */
var mergePaths = /*#__PURE__*/_ramda.curryN(2, /*#__PURE__*/_ramda.pipe(paths, _ramda.mergeAll));

/**
 * Create a new object with the own properties of the object under the `path`
 * merged with the own properties of the provided `source`.
 * If a key exists in both objects, the value from the `source` object will be used.
 *
 * @func mergePath
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.18.0|v1.18.0}
 * @category Object
 * @sig [k] -> {a} -> {k: {a}} -> {k: {a}}
 * @see {@link RA.mergeProp|mergeProp}
 * @param {!Array} path The property path of the destination object
 * @param {!Object} source The source object
 * @param {!Object} obj The object that has destination object under corresponding property path
 * @return {!Object} The new version of object
 * @example
 *
 * RA.mergePath(
 *  ['outer', 'inner'],
 *  { foo: 3, bar: 4 },
 *  { outer: { inner: { foo: 2 } } }
 * ); //=> { outer: { inner: { foo: 3, bar: 4 } }
 */
var mergePath = /*#__PURE__*/_ramda.curry(function (path$$1, source, obj) {
  return _ramda.over(_ramda.lensPath(path$$1), mergeRight(source), obj);
});

/**
 * Create a new object with the own properties of the object under the `p`
 * merged with the own properties of the provided `source`.
 * If a key exists in both objects, the value from the `source` object will be used.
 *
 * @func mergeProp
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.18.0|v1.18.0}
 * @category Object
 * @sig [k] -> {a} -> {k: {a}} -> {k: {a}}
 * @see {@link RA.mergePath|mergePath}
 * @param {!Array} p The property of the destination object
 * @param {!Object} source The source object
 * @param {!Object} obj The object that has destination object under corresponding property
 * @return {!Object} The new version of object
 * @example
 *
 * RA.mergeProp(
 *  'outer',
 *  { foo: 3, bar: 4 },
 *  { outer: { foo: 2 } }
 * ); //=> { outer: { foo: 3, bar: 4 } };
 */
var mergeProp = /*#__PURE__*/_ramda.curry(function (p, subj, obj) {
  return mergePath(_ramda.of(p), subj, obj);
});

/**
 * Returns a "view" of the given data structure, determined by the given lens.
 * The lens's focus determines which portion of the data structure is visible.
 * Returns the defaultValue if "view" is null, undefined or NaN; otherwise the "view" is returned.
 *
 * @func viewOr
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.13.0|1.13.0}
 * @category Object
 * @typedef Lens s b = Functor f => (b -> f b) -> s -> f s
 * @sig a -> Lens s b -> s -> b | a
 * @see {@link http://ramdajs.com/docs/#view|view}
 * @param {*} defaultValue The default value
 * @param {Function} lens Van Laarhoven lens
 * @param {*} data The data structure
 * @returns {*} "view" or defaultValue
 *
 * @example
 *
 * RA.viewOr('N/A', R.lensProp('x'), {}); // => 'N/A'
 * RA.viewOr('N/A', R.lensProp('x'), { x: 1 }); // => 1
 * RA.viewOr('some', R.lensProp('y'), { y: null }); // => 'some'
 * RA.viewOr('some', R.lensProp('y'), { y: false }); // => false
 */

var viewOr = /*#__PURE__*/_ramda.curryN(3, function (defaultValue, lens, data) {
  return _ramda.defaultTo(defaultValue, _ramda.view(lens, data));
});

/**
 * Returns whether or not an object has an own property with the specified name at a given path.
 *
 * @func hasPath
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.14.0|v1.14.0}
 * @category Object
 * @typedef Idx = String | Int
 * @sig [Idx] -> {a} -> Boolean
 * @param {Array.<string|number>} path The path of the nested property
 * @param {Object} obj The object to test
 * @return {Boolean}
 * @see {@link http://ramdajs.com/docs/#has|has}
 * @example
 *
 * RA.hasPath(['a', 'b'], { a: { b: 1 } }); //=> true
 * RA.hasPath(['a', 'b', 'c'], { a: { b: 1 } }); //=> false
 * RA.hasPath(['a', 'b'], { a: { } }); //=> false
 * RA.hasPath([0], [1, 2]); //=> true
 */
var hasPath = /*#__PURE__*/_ramda.curryN(2, function (objPath, obj) {
  var prop$$1 = _ramda.head(objPath);

  // termination conditions
  if (_ramda.length(objPath) === 0 || !isObj(obj)) {
    return false;
  } else if (_ramda.length(objPath) === 1) {
    return _ramda.has(prop$$1, obj);
  }

  return hasPath(_ramda.tail(objPath), _ramda.path([prop$$1], obj)); // base case
});

/**
 * Spreads object under property path onto provided object.
 * It's like {@link RA.flattenPath|flattenPath}, but removes object under the property path.
 *
 * @func spreadPath
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.19.0|v1.19.0}
 * @category Object
 * @typedef Idx = String | Int
 * @sig [Idx] -> {k: v} -> {k: v}
 * @param {!Array.<string|number>} path The property path to spread
 * @param {!Object} obj The provided object
 * @return {!Object} The result of the spread
 * @see {@link RA.spreadProp|spreadProp}, {@link RA.flattenPath|flattenPath}
 * @example
 *
 * RA.spreadPath(
 *   ['b1', 'b2'],
 *   { a: 1, b1: { b2: { c: 3, d: 4 } } }
 * ); // => { a: 1, c: 3, d: 4, b1: {} };
 */
var spreadPath = /*#__PURE__*/_ramda.curryN(2, /*#__PURE__*/_ramda.converge(_ramda.merge, [_ramda.dissocPath, /*#__PURE__*/_ramda.pathOr({})]));

/**
 * Spreads object under property onto provided object.
 * It's like {@link RA.flattenProp|flattenProp}, but removes object under the property.
 *
 * @func spreadProp
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.19.0|v1.19.0}
 * @category Object
 * @typedef Idx = String | Int
 * @sig Idx -> {k: v} -> {k: v}
 * @param {!string|number} prop The property to spread
 * @param {!Object} obj The provided object
 * @return {!Object} The result of the spread
 * @see {@link RA.spreadPath|spreadPath}, {@link RA.flattenProp|flattenProp}
 * @example
 *
 * RA.spreadProp('b', { a: 1, b: { c: 3, d: 4 } }); // => { a: 1, c: 3, d: 4 };
 */
var spreadProp = /*#__PURE__*/_ramda.curry(function (prop$$1, obj) {
  return spreadPath(_ramda.of(prop$$1), obj);
});

/**
 * Flattens a property path so that its fields are spread out into the provided object.
 * It's like {@link RA.spreadPath|spreadPath}, but preserves object under the property path.
 *
 * @func flattenPath
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.19.0|v1.19.0}
 * @category Object
 * @typedef Idx = String | Int
 * @sig [Idx] -> {k: v} -> {k: v}
 * @param {!Array.<string|number>} path The property path to flatten
 * @param {!Object} obj The provided object
 * @return {!Object} The flattened object
 * @see {@link RA.flattenProp|flattenProp}, {@link RA.spreadPath|spreadPath}
 * @example
 *
 * RA.flattenPath(
 *   ['b1', 'b2'],
 *   { a: 1, b1: { b2: { c: 3, d: 4 } } }
 * ); // => { a: 1, c: 3, d: 4, b1: { b2: { c: 3, d: 4 } } };
 */
var flattenPath = /*#__PURE__*/_ramda.curry(function (path$$1, obj) {
  return _ramda.merge(obj, _ramda.pathOr({}, path$$1, obj));
});

/**
 * Flattens a property so that its fields are spread out into the provided object.
 * It's like {@link RA.spreadProp|spreadProp}, but preserves object under the property path.
 *
 * @func flattenProp
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.19.0|v1.19.0}
 * @category Object
 * @typedef Idx = String | Int
 * @sig [Idx] -> {k: v} -> {k: v}
 * @param {!string|number} prop The property to flatten
 * @param {!Object} obj The provided object
 * @return {!Object} The flattened object
 * @see {@link RA.flattenPath|flattenPath}, {@link RA.spreadProp|spreadProp}
 * @example
 *
 * RA.flattenProp(
 *   'b',
 *   { a: 1, b: { c: 3, d: 4 } }
 * ); // => { a: 1, c: 3, d: 4, b: { c: 3, d: 4 } };
 */
var flattenProp = /*#__PURE__*/_ramda.curry(function (prop$$1, obj) {
  return flattenPath(_ramda.of(prop$$1), obj);
});

/**
 * Returns `true` if data structure focused by the given lens equals provided value.
 *
 * @func lensEq
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.13.0|1.13.0}
 * @category Relation
 * @typedef Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig  Lens s a -> b -> s -> Boolean
 * @see {@link RA.lensNotEq|lensNotEq}
 * @param {function} lens Van Laarhoven lens
 * @param {*} value The value to compare the focused data structure with
 * @param {*} data The data structure
 * @return {Boolean} `true` if the focused data structure equals value, `false` otherwise
 *
 * @example
 *
 * RA.lensEq(R.lensIndex(0), 1, [0, 1, 2]); // => false
 * RA.lensEq(R.lensIndex(1), 1, [0, 1, 2]); // => true
 * RA.lensEq(R.lensPath(['a', 'b']), 'foo', { a: { b: 'foo' } }) // => true
 */
var lensEq = /*#__PURE__*/_ramda.curryN(3, function (lens, val, data) {
  return _ramda.pipe(_ramda.view(lens), _ramda.equals(val))(data);
});

/**
 * Returns `true` if data structure focused by the given lens doesn't equal provided value.
 *
 * @func lensNotEq
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.13.0|1.13.0}
 * @category Relation
 * @typedef Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> b -> s -> Boolean
 * @see {@link RA.lensEq|lensEq}
 * @param {function} lens Van Laarhoven lens
 * @param {*} value The value to compare the focused data structure with
 * @param {*} data The data structure
 * @return {Boolean} `false` if the focused data structure equals value, `true` otherwise
 *
 * @example
 *
 * RA.lensNotEq(R.lensIndex(0), 1, [0, 1, 2]); // => true
 * RA.lensNotEq(R.lensIndex(1), 1, [0, 1, 2]); // => false
 * RA.lensNotEq(R.lensPath(['a', 'b']), 'foo', { a: { b: 'foo' } }) // => false
 */
var lensNotEq = /*#__PURE__*/_ramda.complement(lensEq);

/**
 * Returns `true` if data structure focused by the given lens satisfies the predicate.
 * Note that the predicate is expected to return boolean value and will be evaluated
 * as `false` unless the predicate returns `true`.
 *
 * @func lensSatisfies
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.13.0|1.13.0}
 * @category Relation
 * @typedef Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig  Boolean b => (a -> b) -> Lens s a -> s -> b
 * @see {@link RA.lensNotSatisfy|lensNotSatisfy}
 * @param {Function} predicate The predicate function
 * @param {Function} lens Van Laarhoven lens
 * @param {*} data The data structure
 * @return {Boolean} `true` if the focused data structure satisfies the predicate, `false` otherwise
 *
 * @example
 *
 * RA.lensSatisfies(R.equals(true), R.lensIndex(0), [false, true, 1]); // => false
 * RA.lensSatisfies(R.equals(true), R.lensIndex(1), [false, true, 1]); // => true
 * RA.lensSatisfies(R.equals(true), R.lensIndex(2), [false, true, 1]); // => false
 * RA.lensSatisfies(R.identity, R.lensProp('x'), { x: 1 }); // => false
 */
var lensSatisfies = /*#__PURE__*/_ramda.curryN(3, function (predicate, lens, data) {
  return _ramda.pipe(_ramda.view(lens), predicate, _ramda.equals(true))(data);
});

/**
 * Returns `true` if data structure focused by the given lens doesn't satisfy the predicate.
 * Note that the predicate is expected to return boolean value.
 *
 * @func lensNotSatisfy
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.13.0|1.13.0}
 * @category Relation
 * @typedef Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig  Boolean b => (a -> b) -> Lens s a -> s -> b
 * @see {@link RA.lensSatisfies|lensSatisfies}
 * @param {Function} predicate The predicate function
 * @param {Function} lens Van Laarhoven lens
 * @param {*} data The data structure
 * @return {Boolean} `false` if the focused data structure satisfies the predicate, `true` otherwise
 *
 * @example
 *
 * RA.lensNotSatisfy(R.equals(true), R.lensIndex(0), [false, true, 1]); // => true
 * RA.lensNotSatisfy(R.equals(true), R.lensIndex(1), [false, true, 1]); // => false
 * RA.lensNotSatisfy(R.equals(true), R.lensIndex(2), [false, true, 1]); // => true
 * RA.lensNotSatisfy(R.identity, R.lensProp('x'), { x: 1 }); // => true
 */
var lensNotSatisfy = /*#__PURE__*/_ramda.complement(lensSatisfies);

// This implementation was highly inspired by the implementations
// in ramda-lens library.
//
// https://github.com/ramda/ramda-lens


// isomorphic :: ((a -> b), (b -> a)) -> Isomorphism
//     Isomorphism = x -> y
var isomorphic = function isomorphic(to, from) {
  var isomorphism = function isomorphism(x) {
    return to(x);
  };
  isomorphism.from = from;
  return isomorphism;
};

// isomorphisms :: ((a -> b), (b -> a)) -> (a -> b)
var isomorphisms = function isomorphisms(to, from) {
  return isomorphic(_ramda.curry(function (toFunctorFn, target) {
    return _ramda.map(from, toFunctorFn(to(target)));
  }), _ramda.curry(function (toFunctorFn, target) {
    return _ramda.map(to, toFunctorFn(from(target)));
  }));
};

// from :: Isomorphism -> a -> b
var from = /*#__PURE__*/_ramda.curry(function (isomorphism, x) {
  return isomorphism.from(x);
});

/**
 * Defines an isomorphism that will work like a lens. It takes two functions.
 * The function that converts and the function that recovers.
 *
 * @func lensIso
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.19.0|1.19.0}
 * @category Relation
 * @typedef Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig (s -> a) -> (a -> s) -> Lens s a
 * @param {!function} to The function that converts
 * @param {!function} from The function that recovers
 * @return {!function} The isomorphic lens
 * @see {@link http://ramdajs.com/docs/#lens|lens}
 *
 * @example
 *
 * const lensJSON = RA.lensIso(JSON.parse, JSON.stringify);
 *
 * R.over(lensJSON, assoc('b', 2), '{"a":1}'); //=> '{"a":1,"b":2}'
 * R.over(RA.lensIso.from(lensJSON), R.replace('}', ',"b":2}'), { a: 1 }); // => { a: 1, b: 2 }
 */
var lensIso = /*#__PURE__*/_ramda.curry(isomorphisms);
lensIso.from = from;

// type :: Monad a => a -> String
var type = /*#__PURE__*/_ramda.either( /*#__PURE__*/_ramda.path(['@@type']), /*#__PURE__*/_ramda.path(['constructor', '@@type']));

// typeEquals :: Monad a => String -> a -> Boolean
var typeEquals = /*#__PURE__*/_ramda.curry(function (typeIdent, monad) {
  return type(monad) === typeIdent;
});

// isSameType :: (Monad a, Monad b) => a -> b -> Boolean
var isSameType = /*#__PURE__*/_ramda.curryN(2, /*#__PURE__*/_ramda.useWith(_ramda.equals, [type, type]));

// isNotSameType :: (Monad a, Monad b) => a -> b -> Boolean
var isNotSameType = /*#__PURE__*/_ramda.complement(isSameType);

// aliases :: Prototype -> NewPrototypePairs
//     Prototype = Object
//     NewPrototypePairs = Array
var aliases = /*#__PURE__*/_ramda.pipe(_ramda.toPairs, /*#__PURE__*/_ramda.map( /*#__PURE__*/_ramda.over( /*#__PURE__*/_ramda.lensIndex(0), /*#__PURE__*/_ramda.replace('fantasy-land/', ''))));

var _functorTrait;
var _applyTrait;
var _setoidTrait;
var _semigroupTrait;
var _chainTrait;
var _ordTrait;

var functorTrait = (_functorTrait = {}, _functorTrait[mapping.map] = function (fn) {
  return this.constructor[mapping.of](fn(this.value));
}, _functorTrait);

var applyTrait = (_applyTrait = {}, _applyTrait[mapping.ap] = function (applyWithFn) {
  var _this = this;

  return applyWithFn.map(function (fn) {
    return fn(_this.value);
  });
}, _applyTrait);

var setoidTrait = (_setoidTrait = {}, _setoidTrait[mapping.equals] = function (setoid) {
  return isSameType(this, setoid) && _ramda.equals(this.value, setoid.value);
}, _setoidTrait);

var semigroupTrait = (_semigroupTrait = {}, _semigroupTrait[mapping.concat] = function (semigroup) {
  var concatenatedValue = this.value;

  if (isString(this.value) || isNumber(this.value)) {
    concatenatedValue = this.value + semigroup.value;
  } else if (_ramda.pathSatisfies(isFunction, ['value', mapping.concat], this)) {
    concatenatedValue = this.value[mapping.concat](semigroup.value);
  } else if (_ramda.pathSatisfies(isFunction, ['value', 'concat'], this)) {
    concatenatedValue = this.value.concat(semigroup.value);
  }

  return this.constructor[mapping.of](concatenatedValue);
}, _semigroupTrait);

var chainTrait = (_chainTrait = {}, _chainTrait[mapping.chain] = function (fn) {
  var newChain = fn(this.value);

  return isSameType(this, newChain) ? newChain : this;
}, _chainTrait);

var ordTrait = (_ordTrait = {}, _ordTrait[mapping.lte] = function (ord) {
  return isSameType(this, ord) && (this.value < ord.value || this[mapping.equals](ord));
}, _ordTrait);

var _createClass = /*#__PURE__*/ function () { function defineProperties(target, props$$1) { for (var i = 0; i < props$$1.length; i++) { var descriptor = props$$1[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// we do this here for jsdocs generate properly
var of$1 = mapping.of;
var ap$3 = mapping.ap;
var map$1 = mapping.map;
var equals$1 = mapping.equals;
var concat$1 = mapping.concat;
var chain = mapping.chain;
var lte = mapping.lte;
var empty$1 = mapping.empty;
var contramap = mapping.contramap;

/**
 * The simplest {@link https://github.com/fantasyland/fantasy-land|fantasy-land}
 * compatible monad which attaches no information to values.
 *
 * The Identity type is a very simple type that has no interesting side effects and
 * is effectively just a container of some value. So why does it exist ?
 * The Identity type is often used as the base monad of a monad
 * transformer when no other behaviour is required.
 *
 * @memberOf RA
 * @implements
 * {@link https://github.com/fantasyland/fantasy-land#apply|Apply},
 * {@link https://github.com/fantasyland/fantasy-land#applicative|Applicative},
 * {@link https://github.com/fantasyland/fantasy-land#functor|Functor},
 * {@link https://github.com/fantasyland/fantasy-land#setoid|Setoid},
 * {@link https://github.com/fantasyland/fantasy-land#semigroup|Semigroup},
 * {@link https://github.com/fantasyland/fantasy-land#chain|Chain},
 * {@link https://github.com/fantasyland/fantasy-land#monad|Monad},
 * {@link https://github.com/fantasyland/fantasy-land#ord|Ord},
 * {@link https://github.com/fantasyland/fantasy-land#monoid|Monoid*},
 * {@link https://github.com/fantasyland/fantasy-land#contravariant|Contravariant}
 * @since {@link https://char0n.github.io/ramda-adjunct/1.8.0|v1.8.0}
 */

var Identity = /*#__PURE__*/function () {
  /**
   * Fantasy land {@link https://github.com/fantasyland/fantasy-land#applicative|Applicative} specification.
   *
   * @static
   * @sig of :: Applicative f => a -> f a
   * @param {*} value
   * @returns {RA.Identity}
   * @example
   *
   * const a = Identity.of(1); //=> Identity(1)
   */
  Identity[of$1] = function (value) {
    return new Identity(value);
  };

  /**
   * @static
   */


  _createClass(Identity, null, [{
    key: '@@type',
    get: function get() {
      return 'RA/Identity';
    }

    /**
     * Private constructor. Use {@link RA.Identity.of|Identity.of} instead.
     *
     * @private
     * @param {*} value
     * @return {RA.Identity}
     */

  }]);

  function Identity(value) {
    _classCallCheck(this, Identity);

    this.value = value;
  }

  /**
   * Catamorphism for a value.
   * @returns {*}
   * @example
   *
   * const a = Identity.of(1);
   * a.get(); //=> 1
   */


  Identity.prototype.get = function get() {
    return this.value;
  };

  /**
   * Fantasy land {@link https://github.com/fantasyland/fantasy-land#apply|Apply} specification.
   *
   * @sig ap :: Apply f => f a ~> f (a -> b) -> f b
   * @param {RA.Identity} applyWithFn
   * @return {RA.Identity}
   * @example
   *
   * const a = Identity.of(1);
   * const b = Identity.of(1).map(a => b => a + b);
   *
   * a.ap(b); //=> Identity(2)
   */


  Identity.prototype[ap$3] = function (applyWithFn) {
    return applyTrait[ap$3].call(this, applyWithFn);
  };

  /**
   * Fantasy land {@link https://github.com/fantasyland/fantasy-land#functor|Functor} specification.
   *
   * @sig map :: Functor f => f a ~> (a -> b) -> f b
   * @param {Function} fn
   * @return {RA.Identity}
   * @example
   *
   * const a = Identity.of(1);
   * a.map(a => a + 1); //=> Identity(2)
   */


  Identity.prototype[map$1] = function (fn) {
    return functorTrait[map$1].call(this, fn);
  };

  /**
   * Fantasy land {@link https://github.com/fantasyland/fantasy-land#setoid|Setoid} specification.
   *
   * @sig equals :: Setoid a => a ~> a -> Boolean
   * @param {RA.Identity} setoid
   * @return {boolean}
   * @example
   *
   * const a = Identity.of(1);
   * const b = Identity.of(1);
   * const c = Identity.of(2);
   *
   * a.equlas(b); //=> true
   * a.equals(c); //=> false
   */


  Identity.prototype[equals$1] = function (setoid) {
    return setoidTrait[equals$1].call(this, setoid);
  };

  /**
   * Fantasy land {@link https://github.com/fantasyland/fantasy-land#semigroup|Semigroup} specification.
   *
   * @sig concat :: Semigroup a => a ~> a -> a
   * @param {RA.Identity} semigroup
   * @return {RA.Identity}
   * @example
   *
   * const a = Identity.of(1);
   * const b = Identity.of(1);
   * a.concat(b); //=> 2
   *
   * const c = Identity.of('c');
   * const d = Identity.of('d');
   * c.concat(d); //=> 'cd'
   *
   * const e = Identity.of(['e']);
   * const f = Identity.of(['f']);
   * e.concat(f); //=> ['e', 'f']
   */


  Identity.prototype[concat$1] = function (semigroup) {
    return semigroupTrait[concat$1].call(this, semigroup);
  };

  /**
   * Fantasy land {@link https://github.com/fantasyland/fantasy-land#chain|Chain} specification.
   *
   * @sig chain :: Chain m => m a ~> (a -> m b) -> m b
   * @param {Function} fn Function returning the value of the same {@link https://github.com/fantasyland/fantasy-land#semigroup|Chain}
   * @return {RA.Identity}
   * @example
   *
   * const a = Identity.of(1);
   * const fn = val => Identity.of(val + 1);
   *
   * a.chain(fn).chain(fn); //=> Identity(3)
   */


  Identity.prototype[chain] = function (fn) {
    return chainTrait[chain].call(this, fn);
  };

  /**
   * Fantasy land {@link https://github.com/fantasyland/fantasy-land#ord|Ord} specification.
   *
   * @sig lte :: Ord a => a ~> a -> Boolean
   * @param {RA.Identity} ord
   * @return {boolean}
   * @example
   *
   * const a = Identity.of(1);
   * const b = Identity.of(1);
   * const c = Identity.of(2);
   *
   * a.lte(b); //=> true
   * a.lte(c); //=> true
   * c.lte(a); //=> false
   */


  Identity.prototype[lte] = function (ord) {
    return ordTrait[lte].call(this, ord);
  };

  /**
   * Fantasy land {@link https://github.com/fantasyland/fantasy-land#monoid|Monoid*} specification.
   * Partial implementation of Monoid specification. `empty` method on instance only, returning
   * identity value of the wrapped type. Using `R.empty` under the hood.
   *
   *
   * @sig empty :: Monoid m => () -> m
   * @return {RA.Identity}
   * @example
   *
   * const a = Identity.of('test');
   * const i = a.empty();
   *
   * a.concat(i); //=> Identity('string');
   * i.concat(a); //=> Identity('string');
   */


  Identity.prototype[empty$1] = function () {
    return this.constructor.of(_ramda.empty(this.value));
  };

  /**
   * Fantasy land {@link https://github.com/fantasyland/fantasy-land#contravariant|Contravariant} specification.
   *
   * @sig contramap :: Contravariant f => f a ~> (b -> a) -> f b
   * @param {Function} fn
   * @return {RA.Identity}
   * @example
   *
   * const identity = a => a;
   * const add1 = a => a + 1;
   * const divide2 = a => a / 2;
   *
   * Identity.of(divide2).contramap(add1).get()(3); //=> 2
   * Identity.of(identity).contramap(divide2).contramap(add1).get()(3); //=> 2
   * Identity.of(identity).contramap(a => divide2(add1(a))).get()(3); //=> 2
   */


  Identity.prototype[contramap] = function (fn) {
    var _this = this;

    return this.constructor.of(function (value) {
      return _this.value(fn(value));
    });
  };

  return Identity;
}();

aliases(Identity).forEach(function (_ref) {
  var alias = _ref[0],
      fn = _ref[1];

  Identity[alias] = fn;
});
aliases(Identity.prototype).forEach(function (_ref2) {
  var alias = _ref2[0],
      fn = _ref2[1];

  Identity.prototype[alias] = fn;
});

/**
 * @namespace RA
 */

// Type


var es = Object.freeze({
	isNotUndefined: isNotUndefined,
	isUndefined: isUndefined,
	isNull: isNull,
	isNotNull: isNotNull,
	isNotNil: isNotNil,
	isArray: isArray,
	isNotArray: isNotArray,
	isBoolean: isBoolean,
	isNotBoolean: isNotBoolean,
	isNotEmpty: isNotEmpty,
	isNilOrEmpty: isNilOrEmpty,
	isString: isString,
	isNotString: isNotString,
	isArrayLike: isArrayLike,
	isNotArrayLike: isNotArrayLike,
	isGeneratorFunction: isGeneratorFunction,
	isNotGeneratorFunction: isNotGeneratorFunction,
	isAsyncFunction: isAsyncFunction,
	isNotAsyncFunction: isNotAsyncFunction,
	isFunction: isFunction,
	isNotFunction: isNotFunction,
	isObj: isObj,
	isObject: isObj,
	isNotObj: isNotObj,
	isNotObject: isNotObj,
	isObjLike: isObjLike,
	isObjectLike: isObjLike,
	isNotObjLike: isNotObjLike,
	isNotObjectLike: isNotObjLike,
	isPlainObj: isPlainObj,
	isPlainObject: isPlainObj,
	isNotPlainObj: isNotPlainObj,
	isNotPlainObject: isNotPlainObj,
	isDate: isDate,
	isNotDate: isNotDate,
	isValidDate: isValidDate,
	isNotValidDate: isNotValidDate,
	isInvalidDate: isNotValidDate,
	isNumber: isNumber,
	isNotNumber: isNotNumber,
	isPositive: isPositive,
	isNegative: isNegative,
	isNaN: _isNaN,
	isNotNaN: isNotNaN,
	isFinite: _isFinite,
	isNotFinite: isNotFinite,
	isInteger: isInteger,
	isNotInteger: isNotInteger,
	isFloat: isFloat,
	isNotFloat: isNotFloat,
	isOdd: isOdd,
	isEven: isEven,
	isPair: isPair,
	isNotPair: isNotPair,
	isThenable: isThenable,
	isPromise: isPromise,
	stubUndefined: stubUndefined,
	stubNull: stubNull,
	stubObj: stubObj,
	stubObject: stubObj,
	stubString: stubString,
	stubArray: stubArray,
	noop: noop,
	liftFN: liftFN,
	liftF: liftF,
	cata: catamorphism,
	weave: weave,
	weaveLazy: weaveLazy,
	curryRightN: curryRightN,
	curryRight: curryRight,
	resolveP: resolveP,
	rejectP: rejectP,
	pickIndexes: pickIndexes,
	list: list,
	concatRight: concatRight,
	reduceP: reduceP,
	reduceRightP: reduceRightP,
	sliceFrom: sliceFrom,
	sliceTo: sliceTo,
	omitIndexes: omitIndexes,
	paths: paths,
	renameKeys: renameKeys,
	renameKeysWith: renameKeysWith,
	mergeRight: mergeRight,
	resetToDefault: mergeRight,
	mergeProps: mergeProps,
	mergePaths: mergePaths,
	mergeProp: mergeProp,
	mergePath: mergePath,
	viewOr: viewOr,
	hasPath: hasPath,
	spreadProp: spreadProp,
	spreadPath: spreadPath,
	flattenProp: flattenProp,
	flattenPath: flattenPath,
	lensEq: lensEq,
	lensNotEq: lensNotEq,
	lensSatisfies: lensSatisfies,
	lensNotSatisfy: lensNotSatisfy,
	lensIso: lensIso,
	Identity: Identity
});

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _const = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
// eslint-disable-next-line import/prefer-default-export
var UNITS = exports.UNITS = Object.freeze({
  EM: 'em',
  REM: 'rem',
  PX: 'px',
  DPI: 'dpi',
  PERCENT: '%'
});
});

unwrapExports(_const);
var _const_1 = _const.UNITS;

var predicates = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUnitRemOrEm = exports.isAspectRatioString = exports.isNumberWithPercent = exports.isNumberWithDpi = exports.isNumberWithRem = exports.isNumberWithEm = exports.isNumberWithPx = exports.isNumberWithUnit = exports.isValidPositiveNumber = exports.isValidNumber = undefined;







var isValidNumber = exports.isValidNumber = (_ramda__default.either)(es.isFloat, es.isInteger);
var isValidPositiveNumber = exports.isValidPositiveNumber = (_ramda__default.both)(isValidNumber, (_ramda__default.gt)(_ramda__default.__, 0));

var isNumberWithUnit = exports.isNumberWithUnit = (_ramda__default.curry)(function (units, value) {
  var regex = '^-?\\d+(?:.\\d+)?(?:' + (_ramda__default.join)('|', units) + ')$';
  return new RegExp(regex).test(value);
});
var isNumberWithPx = exports.isNumberWithPx = isNumberWithUnit([_const.UNITS.PX]);
var isNumberWithEm = exports.isNumberWithEm = isNumberWithUnit([_const.UNITS.EM]);
var isNumberWithRem = exports.isNumberWithRem = isNumberWithUnit([_const.UNITS.REM]);
var isNumberWithDpi = exports.isNumberWithDpi = isNumberWithUnit([_const.UNITS.DPI]);
var isNumberWithPercent = exports.isNumberWithPercent = isNumberWithUnit([_const.UNITS.PERCENT]);
var isAspectRatioString = exports.isAspectRatioString = (_ramda__default.test)(/^[1-9]+[0-9]* ?\/ ?[1-9]+[0-9]*$/);

var isUnitRemOrEm = exports.isUnitRemOrEm = (_ramda__default.contains)(_ramda__default.__, [_const.UNITS.EM, _const.UNITS.REM]);
});

unwrapExports(predicates);
var predicates_1 = predicates.isUnitRemOrEm;
var predicates_2 = predicates.isAspectRatioString;
var predicates_3 = predicates.isNumberWithPercent;
var predicates_4 = predicates.isNumberWithDpi;
var predicates_5 = predicates.isNumberWithRem;
var predicates_6 = predicates.isNumberWithEm;
var predicates_7 = predicates.isNumberWithPx;
var predicates_8 = predicates.isNumberWithUnit;
var predicates_9 = predicates.isValidPositiveNumber;
var predicates_10 = predicates.isValidNumber;

var parse = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unitPartOfUnitedNumber = exports.numericPartOfUnitedNumber = exports.elementsOfUnitedNumber = undefined;



var elementsOfUnitedNumber = exports.elementsOfUnitedNumber = function elementsOfUnitedNumber(value) {
  var captures = /^(-?\d+(?:.\d+)?)([a-z]+)?$/.exec(value);
  if (!captures || (_ramda__default.any)(_ramda__default.isNil, [captures, captures[1], captures[2]])) {
    throw new Error('Supplied value was not a number with a unit: \'' + value + '\'');
  }
  return [Number(captures[1]), captures[2]];
};

var numericPartOfUnitedNumber = exports.numericPartOfUnitedNumber = (_ramda__default.compose)((_ramda__default.view)((_ramda__default.lensIndex)(0)), elementsOfUnitedNumber);

var unitPartOfUnitedNumber = exports.unitPartOfUnitedNumber = (_ramda__default.compose)((_ramda__default.view)((_ramda__default.lensIndex)(1)), elementsOfUnitedNumber);
});

unwrapExports(parse);
var parse_1 = parse.unitPartOfUnitedNumber;
var parse_2 = parse.numericPartOfUnitedNumber;
var parse_3 = parse.elementsOfUnitedNumber;

var convert = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unitedDimensionToUnitlessPixelValue = exports.remOrEmToPxValue = exports.pxToRemOrEmValue = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();







var pxToRemOrEmValue = exports.pxToRemOrEmValue = function pxToRemOrEmValue(value, baseFontSize) {
  return (_ramda__default.divide)(value, baseFontSize);
};

var remOrEmToPxValue = exports.remOrEmToPxValue = function remOrEmToPxValue(value, baseFontSize) {
  return (_ramda__default.multiply)(value, baseFontSize);
};

var unitedDimensionToUnitlessPixelValue = exports.unitedDimensionToUnitlessPixelValue = function unitedDimensionToUnitlessPixelValue(value, baseFontSize) {
  var _elementsOfUnitedNumb = (parse.elementsOfUnitedNumber)(value),
      _elementsOfUnitedNumb2 = _slicedToArray(_elementsOfUnitedNumb, 2),
      number = _elementsOfUnitedNumb2[0],
      unit = _elementsOfUnitedNumb2[1];

  return (predicates.isUnitRemOrEm)(unit) ? remOrEmToPxValue(number, baseFontSize) : number;
};
});

unwrapExports(convert);
var convert_1 = convert.unitedDimensionToUnitlessPixelValue;
var convert_2 = convert.remOrEmToPxValue;
var convert_3 = convert.pxToRemOrEmValue;

var utils = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appendUnit = undefined;



// eslint-disable-next-line import/prefer-default-export
var appendUnit = exports.appendUnit = (_ramda__default.curry)(function (value, unit) {
  return (_ramda__default.join)('', [value, unit]);
});
});

unwrapExports(utils);
var utils_1 = utils.appendUnit;

var output = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.outputWithUnit = undefined;







// eslint-disable-next-line import/prefer-default-export
var outputWithUnit = exports.outputWithUnit = function outputWithUnit(unit, baseFontSize, value) {
  return (utils.appendUnit)((predicates.isUnitRemOrEm)(unit) ? (convert.pxToRemOrEmValue)(value, baseFontSize) : value, unit);
};
});

unwrapExports(output);
var output_1 = output.outputWithUnit;

var lib = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appendUnit = exports.isUnitRemOrEm = exports.isAspectRatioString = exports.isNumberWithPercent = exports.isNumberWithDpi = exports.isNumberWithRem = exports.isNumberWithEm = exports.isNumberWithPx = exports.isNumberWithUnit = exports.isValidPositiveNumber = exports.isValidNumber = exports.unitPartOfUnitedNumber = exports.numericPartOfUnitedNumber = exports.elementsOfUnitedNumber = exports.outputWithUnit = exports.unitedDimensionToUnitlessPixelValue = exports.remOrEmToPxValue = exports.pxToRemOrEmValue = exports.UNITS = undefined;













exports.UNITS = _const.UNITS;
exports.pxToRemOrEmValue = convert.pxToRemOrEmValue;
exports.remOrEmToPxValue = convert.remOrEmToPxValue;
exports.unitedDimensionToUnitlessPixelValue = convert.unitedDimensionToUnitlessPixelValue;
exports.outputWithUnit = output.outputWithUnit;
exports.elementsOfUnitedNumber = parse.elementsOfUnitedNumber;
exports.numericPartOfUnitedNumber = parse.numericPartOfUnitedNumber;
exports.unitPartOfUnitedNumber = parse.unitPartOfUnitedNumber;
exports.isValidNumber = predicates.isValidNumber;
exports.isValidPositiveNumber = predicates.isValidPositiveNumber;
exports.isNumberWithUnit = predicates.isNumberWithUnit;
exports.isNumberWithPx = predicates.isNumberWithPx;
exports.isNumberWithEm = predicates.isNumberWithEm;
exports.isNumberWithRem = predicates.isNumberWithRem;
exports.isNumberWithDpi = predicates.isNumberWithDpi;
exports.isNumberWithPercent = predicates.isNumberWithPercent;
exports.isAspectRatioString = predicates.isAspectRatioString;
exports.isUnitRemOrEm = predicates.isUnitRemOrEm;
exports.appendUnit = utils.appendUnit;
});

unwrapExports(lib);
var lib_1 = lib.appendUnit;
var lib_2 = lib.isUnitRemOrEm;
var lib_3 = lib.isAspectRatioString;
var lib_4 = lib.isNumberWithPercent;
var lib_5 = lib.isNumberWithDpi;
var lib_6 = lib.isNumberWithRem;
var lib_7 = lib.isNumberWithEm;
var lib_8 = lib.isNumberWithPx;
var lib_9 = lib.isNumberWithUnit;
var lib_10 = lib.isValidPositiveNumber;
var lib_11 = lib.isValidNumber;
var lib_12 = lib.unitPartOfUnitedNumber;
var lib_13 = lib.numericPartOfUnitedNumber;
var lib_14 = lib.elementsOfUnitedNumber;
var lib_15 = lib.outputWithUnit;
var lib_16 = lib.unitedDimensionToUnitlessPixelValue;
var lib_17 = lib.remOrEmToPxValue;
var lib_18 = lib.pxToRemOrEmValue;
var lib_19 = lib.UNITS;

function preserveCamelCase(str) {
	let isLastCharLower = false;
	let isLastCharUpper = false;
	let isLastLastCharUpper = false;

	for (let i = 0; i < str.length; i++) {
		const c = str[i];

		if (isLastCharLower && /[a-zA-Z]/.test(c) && c.toUpperCase() === c) {
			str = str.substr(0, i) + '-' + str.substr(i);
			isLastCharLower = false;
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = true;
			i++;
		} else if (isLastCharUpper && isLastLastCharUpper && /[a-zA-Z]/.test(c) && c.toLowerCase() === c) {
			str = str.substr(0, i - 1) + '-' + str.substr(i - 1);
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = false;
			isLastCharLower = true;
		} else {
			isLastCharLower = c.toLowerCase() === c;
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = c.toUpperCase() === c;
		}
	}

	return str;
}

var camelcase = function (str) {
	if (arguments.length > 1) {
		str = Array.from(arguments)
			.map(x => x.trim())
			.filter(x => x.length)
			.join('-');
	} else {
		str = str.trim();
	}

	if (str.length === 0) {
		return '';
	}

	if (str.length === 1) {
		return str.toLowerCase();
	}

	if (/^[a-z0-9]+$/.test(str)) {
		return str;
	}

	const hasUpperCase = str !== str.toLowerCase();

	if (hasUpperCase) {
		str = preserveCamelCase(str);
	}

	return str
		.replace(/^[_.\- ]+/, '')
		.toLowerCase()
		.replace(/[_.\- ]+(\w|$)/g, (m, p1) => p1.toUpperCase());
};

var isArray$2 = Array.isArray || function (obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
};

var isDate$2 = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Date]';
};

var isRegex = function (obj) {
  return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var has$1 = Object.prototype.hasOwnProperty;
var objectKeys = Object.keys || function (obj) {
  var keys$$1 = [];
  for (var key in obj) {
    if (has$1.call(obj, key)) {
      keys$$1.push(key);
    }
  }
  return keys$$1;
};

function dashCase(str) {
  return str.replace(/[A-Z](?:(?=[^A-Z])|[A-Z]*(?=[A-Z][^A-Z]|$))/g, function (s, i) {
    return (i > 0 ? '-' : '') + s.toLowerCase();
  });
}

function map$2(xs, f) {
  if (xs.map) {
    return xs.map(f);
  }
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

function reduce$1(xs, f, acc) {
  if (xs.reduce) {
    return xs.reduce(f, acc);
  }
  for (var i = 0; i < xs.length; i++) {
    acc = f(acc, xs[i], i);
  }
  return acc;
}

function walk(obj) {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }
  if (isDate$2(obj) || isRegex(obj)) {
    return obj;
  }
  if (isArray$2(obj)) {
    return map$2(obj, walk);
  }
  return reduce$1(objectKeys(obj), function (acc, key) {
    var camel = dashCase(key);
    acc[camel] = walk(obj[key]);
    return acc;
  }, {});
}

var dasherize = function (obj) {
  if (typeof obj === 'string') {
    return dashCase(obj);
  }
  return walk(obj);
};

var MEDIA_PREFIX = '@media';

// -----------------------------------------------------------------------------
// CONFIG
// -----------------------------------------------------------------------------

var SEPARATOR_VALUES = Object.freeze({
  rem: 0.01,
  em: 0.01,
  px: 1,
  dpi: 1
});

var DIMENSIONS_UNITS = Object.freeze({
  EM: 'em',
  REM: 'rem',
  PX: 'px'
});



var UNITS = Object.freeze({
  DIMENSIONS: DIMENSIONS_UNITS,
  RESOLUTION: Object.freeze({ DPI: 'dpi' })
});

var BREAKPOINT_MAP_NAMES = Object.freeze(['width', 'height', 'resolution']);

// -----------------------------------------------------------------------------
// MEDIA TYPES
// -----------------------------------------------------------------------------

var MEDIA_TYPES = Object.freeze({
  ALL: 'all',
  PRINT: 'print',
  SCREEN: 'screen',
  SPEECH: 'speech'
});

// eslint-disable-next-line import/prefer-default-export
var separatorValueForUnit = function separatorValueForUnit(unit) {
  return SEPARATOR_VALUES[unit];
};

var isPopulatedObject = _ramda.both(_ramda.complement(_ramda.isEmpty), isObj);
var isPositiveNumberOrZero = _ramda.both(lib_11, _ramda.gte(_ramda.__, 0));
var isPositiveInteger = _ramda.both(lib_10, Number.isInteger);
var isPositiveIntegerOrZero = _ramda.both(isPositiveNumberOrZero, Number.isInteger);

var isNumericPartOfUnitValuePositive = _ramda.compose(lib_10, lib_13);
var isPositiveNumberWithPixelUnit = _ramda.both(lib_9([DIMENSIONS_UNITS.PX]), isNumericPartOfUnitValuePositive);
var isNumberWithDimensionsUnit = lib_9(_ramda.values(DIMENSIONS_UNITS));
var isPositiveNumberWithResolutionUnit = _ramda.both(lib_5, isNumericPartOfUnitValuePositive);
var isPositiveNumberWithDimensionsUnit = _ramda.both(isNumberWithDimensionsUnit, isNumericPartOfUnitValuePositive);
var doesListIncludeValue = function doesListIncludeValue(list) {
  return _ramda.contains(_ramda.__, _ramda.values(list));
};
var isDimensionsUnitValid = _ramda.contains(_ramda.__, _ramda.values(DIMENSIONS_UNITS));
var isMediaTypeValid = _ramda.flip(_ramda.contains)(_ramda.values(MEDIA_TYPES));
var areMediaTypesValid = _ramda.both(_ramda.all(isMediaTypeValid), _ramda.complement(_ramda.isEmpty));

var toUnit = function toUnit(dimensionsUnit, baseFontSize) {
  return _ramda.partial(lib_15, [dimensionsUnit, baseFontSize]);
};

var prepareUnitlessValue = function prepareUnitlessValue(value, shouldSeparateQueries, dimensionsUnit) {
  return _ramda.when(_ramda.always(shouldSeparateQueries), _ramda.subtract(_ramda.__, separatorValueForUnit(dimensionsUnit)))(value);
};

var dimensionsValueRenderer = (function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$baseFontSize = _ref.baseFontSize,
      baseFontSize = _ref$baseFontSize === undefined ? 16 : _ref$baseFontSize,
      _ref$dimensionsUnit = _ref.dimensionsUnit,
      dimensionsUnit = _ref$dimensionsUnit === undefined ? UNITS.DIMENSIONS.EM : _ref$dimensionsUnit,
      _ref$shouldSeparateQu = _ref.shouldSeparateQueries,
      shouldSeparateQueries = _ref$shouldSeparateQu === undefined ? true : _ref$shouldSeparateQu;

  return function (value, shouldSeparate) {
    if (isNumberWithDimensionsUnit(value)) {
      value = lib_16(value, baseFontSize);
    }
    var preparedValue = prepareUnitlessValue(value, shouldSeparateQueries && shouldSeparate, dimensionsUnit);
    var x = toUnit(dimensionsUnit, baseFontSize)(preparedValue);
    return x;
  };
});

var prepareUnitlessValue$1 = function prepareUnitlessValue(value, shouldSeparateQueries, unit) {
  return _ramda.when(_ramda.always(shouldSeparateQueries), _ramda.subtract(_ramda.__, separatorValueForUnit(unit)))(value);
};

var resolutionValueRenderer = (function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$shouldSeparateQu = _ref.shouldSeparateQueries,
      shouldSeparateQueries = _ref$shouldSeparateQu === undefined ? true : _ref$shouldSeparateQu;

  return function (value, shouldSeparate) {
    if (lib_5(value)) {
      value = lib_13(value);
    }

    var preparedValue = prepareUnitlessValue$1(value, shouldSeparateQueries && shouldSeparate, UNITS.RESOLUTION.DPI);

    return lib_1(preparedValue, UNITS.RESOLUTION.DPI);
  };
});

var aspectRatioValueRenderer = (function () {
  return _ramda.identity;
});

var colorValueRenderer = (function () {
  return _ramda.identity;
});

var monochromeValueRenderer = (function () {
  return _ramda.identity;
});

var dimensionValidator = {
  message: "You must supply a 'dimension' as either a unitless positive number or a string comprised of a number followed by em, rem px",
  validate: _ramda.either(lib_10, isPositiveNumberWithDimensionsUnit)
};

var resolutionValidator = {
  message: "You must supply 'resolution' as a positive number",
  validate: _ramda.either(lib_11, isPositiveNumberWithResolutionUnit)
};

var aspectRatioValidator = {
  message: "You must supply an 'aspectRatio' in the form of two positive integers separated by a forward slash, for example '16/9'",
  validate: lib_3
};

var colorValidator = {
  message: "You must supply 'colorIndex' as zero or a positive integer",
  validate: _ramda.either(isPositiveIntegerOrZero, isNull)
};

var monochromeValidator = {
  message: "You must supply 'monochrome' as zero or a postive integer",
  validate: _ramda.either(isPositiveIntegerOrZero, isNull)
};

var ORIENTATION = Object.freeze(['portrait', 'landscape']);
var SCAN = Object.freeze(['interlace', 'progressive']);
var GRID = Object.freeze([0, 1]);
var UPDATE = Object.freeze(['none', 'slow', 'fast']);
var OVERFLOW_BLOCK = Object.freeze(['none', 'scroll', 'optional-paged']);
var OVERFLOW_INLINE = Object.freeze(['none', 'scroll']);
var COLOR_GAMUT = Object.freeze(['srgb', 'p3', 'rec2020']);
var DISPLAY_MODE = Object.freeze(['fullscreen', 'standalone', 'minimal-ui', 'browser']);

var LINEAR_FEATURES = [{
  name: 'orientation',
  validValues: ORIENTATION
}, {
  name: 'scan',
  validValues: SCAN
}, {
  name: 'grid',
  validValues: GRID,
  allowNoArgument: true
}, {
  name: 'update',
  validValues: UPDATE,
  allowNoArgument: true
}, {
  name: 'overflow-block',
  validValues: OVERFLOW_BLOCK
}, {
  name: 'overflow-inline',
  validValues: OVERFLOW_INLINE
}, {
  name: 'color-gamut',
  validValues: COLOR_GAMUT
}, {
  name: 'display-mode',
  validValues: DISPLAY_MODE
}];

var RANGED_FEATURES = [{
  name: 'width',
  valueRenderer: dimensionsValueRenderer,
  validator: dimensionValidator
}, {
  name: 'height',
  valueRenderer: dimensionsValueRenderer,
  validator: dimensionValidator
}, {
  name: 'resolution',
  valueRenderer: resolutionValueRenderer,
  validator: resolutionValidator
}, {
  name: 'aspect-ratio',
  valueRenderer: aspectRatioValueRenderer,
  validator: aspectRatioValidator
}, {
  name: 'color',
  valueRenderer: colorValueRenderer,
  validator: colorValidator,
  config: {
    allowNoArgument: true
  }
}, {
  name: 'color-index',
  valueRenderer: colorValueRenderer,
  validator: colorValidator,
  config: {
    allowNoArgument: true
  }
}, {
  name: 'monochrome',
  valueRenderer: monochromeValueRenderer,
  validator: monochromeValidator,
  config: {
    allowNoArgument: true
  }
}];

var rangedFeatureNames = _ramda.map(_ramda.compose(camelcase, _ramda.prop('name')))(RANGED_FEATURES);

var rangedFeatureNamed = _ramda.compose(_ramda.find(_ramda.__, RANGED_FEATURES), _ramda.propEq('name'), dasherize);

// eslint-disable-next-line import/prefer-default-export
var ensureArray = _ramda.when(_ramda.complement(isArray), function (mediaTypes) {
  return [mediaTypes];
});

// eslint-disable-next-line import/prefer-default-export
var toCommaSeparatedList = function toCommaSeparatedList(values$$1) {
  return values$$1.join(', ');
};

var wrapWithQuotes = _ramda.map(function (v) {
  return '\'' + v + '\'';
});
var keysToCommaSeparatedList = _ramda.compose(toCommaSeparatedList, wrapWithQuotes, _ramda.keys);
var valuesToCommaSeparatedList = _ramda.compose(toCommaSeparatedList, _ramda.values);
var objectToString = JSON.stringify;

// Horrible hackery to get round issues with Babel extending builtins.
// This is the only way to have a custom error.
var InvalidValueError = function InvalidValueError(message) {
  var error = new Error(message);
  error.name = 'InvalidValueError';
  this.name = error.name;
  this.message = error.message;
  if (error.stack) this.stack = error.stack;
  this.toString = function () {
    return this.name + ': ' + this.message;
  };
};
InvalidValueError.prototype = new Error();
InvalidValueError.prototype.name = 'InvalidValueError';

var throwError = function throwError(message) {
  throw new InvalidValueError(message);
};

var composeError = function composeError(message) {
  return _ramda.compose(throwError, message);
};

var invalidBreakpointsErrorMessage = function invalidBreakpointsErrorMessage(breakpoints) {
  return 'Breakpoints must be an object, but you supplied \'' + objectToString(breakpoints) + '\'.';
};

var emptyBreakpointMapErrorMessage = function emptyBreakpointMapErrorMessage(breakpointMap) {
  return '\n  You must not supply an empty object of breakpoints to \'configure()\', but the you supplied \'' + objectToString(breakpointMap) + '\'.';
};

var invalidBreakpointNamesErrorMessage = function invalidBreakpointNamesErrorMessage(breakpointMap) {
  return 'You supplied a breakpoint set with an invalid name. Valid values are: \'' + rangedFeatureNames + '\', but you supplied: \'' + objectToString(breakpointMap) + '\'.';
};

var emptyBreakpointSetErrorMessage = function emptyBreakpointSetErrorMessage(breakpointMapName) {
  return 'A breakpoint set must contain at least one breakpoint, but you supplied an empty breakpoint set for the \'' + objectToString(breakpointMapName) + '\' map.';
};

var mssingBreakpointMapErrorMessage = function mssingBreakpointMapErrorMessage(name) {
  return 'This mq object was not configured with a breakpoint set for \'' + name + '\'.';
};

var missingBreakpointErrorMessage = _ramda.curry(function (name, breakpointMapName, breakpoints) {
  return 'There is no \'' + breakpointMapName + '\' breakpoint defined called \'' + name + '\', only: ' + keysToCommaSeparatedList(breakpoints) + ' are defined.';
});

var sameBreakpointsForBetweenErrorMessage = function sameBreakpointsForBetweenErrorMessage(name) {
  return 'You must supply two different breakpoints to \'widthBetween\' but both were: \'' + name + '\'.';
};

var invalidMediaTypeErrorMessage = function invalidMediaTypeErrorMessage(value) {
  return '\'mediaType\' must be one of \'' + valuesToCommaSeparatedList(MEDIA_TYPES) + '\' but you supplied: \'' + value + '\'.';
};

var invalidBreakpointSetValueErrorMessage = _ramda.curry(function (message, breakpoints) {
  return message + ' but you supplied \'' + objectToString(breakpoints) + '\'.';
});

var invalidBaseFontSizeErrorMessage = function invalidBaseFontSizeErrorMessage(value) {
  return '\'baseFontSize\' must be a positive number, but you supplied \'' + value + '\'.';
};

var invalidDefaultMediaTypeErrorMessage = function invalidDefaultMediaTypeErrorMessage(value) {
  return '\'defaultMediaType\' must be one of \'' + valuesToCommaSeparatedList(MEDIA_TYPES) + '\' but was \'' + value + '\'.';
};

var invalidDimensionsUnitErrorMessage = function invalidDimensionsUnitErrorMessage(value) {
  return '\'unit\' must be one of \'' + valuesToCommaSeparatedList(UNITS.DIMENSIONS) + '\' but was \'' + value + '\'.';
};

var shouldSeparateQueriesErrorMessage = function shouldSeparateQueriesErrorMessage(value) {
  return '\'shouldSeparateQueries\' must be a boolean but was \'' + value + '\'.';
};

var invalidFeatureErrorMessage = _ramda.curry(function (name, possibleValues, value) {
  return '\n  \'' + name + '\' must be one of: \'' + possibleValues + '\' but was: \'' + value + '\'.';
});

var queryNoElementsErrorMessage = function queryNoElementsErrorMessage() {
  return "You must supply at least one argument to 'query()' to build a valid media query.";
};

var notNoElementsErrorMessage = function notNoElementsErrorMessage() {
  return "You must supply at least one argument to 'not()' to build a valid media query.";
};

var queryElementIsValidTypeErrorMessage = function queryElementIsValidTypeErrorMessage(value) {
  return 'You must only supply strings or arrays to \'query()\' but you supplied \'' + value + '\'.';
};

var queryChildElementIsValidTypeErrorMessage = function queryChildElementIsValidTypeErrorMessage(value) {
  return 'You must only supply strings or arrays as children of arrays passed in to \'query()\' but you supplied \'' + objectToString(value) + '\'.';
};

var queryNoNestedArraysErrorMessage = function queryNoNestedArraysErrorMessage(value) {
  return 'You must not supply any nested arrays as part of a query but you supplied \'' + value + '\'.';
};

var noUntweakedErrorMessage = function noUntweakedErrorMessage() {
  return 'There is no untweaked mq object available.';
};

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};





















var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();



var taggedTemplateLiteral = function (strings, raw) {
  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
};









var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

// TODO: Can't move these to predicates as they import helper from features and
// this causes an acyclical dependency between features -> validators ->
// predicates.
var isBreakpointSetNameValid = _ramda.contains(_ramda.__, rangedFeatureNames);
var areBreakpointSetNamesValid = _ramda.all(isBreakpointSetNameValid);

var validate = function validate(predicate, errorMessage) {
  return function (value) {
    _ramda.unless(predicate, composeError(errorMessage))(value);
  };
};

// Validate a map of breakpoint sets.

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

var validateBreakpointSetValues = function validateBreakpointSetValues(name, breakpointSet) {
  var _rangedFeatureNamed = rangedFeatureNamed(name),
      validator = _rangedFeatureNamed.validator;

  validate(_ramda.compose(_ramda.all(validator.validate), _ramda.values), _ramda.compose(_ramda.curry(invalidBreakpointSetValueErrorMessage)(validator.message), _ramda.values))(breakpointSet);
};

var validateBreakpointSetObject = function validateBreakpointSetObject(name, breakpointSet) {
  validate(isPopulatedObject, _ramda.always(emptyBreakpointSetErrorMessage(name)))(breakpointSet);
};

// Validate a set of breakpoints.
var validateBreakpointSet = function validateBreakpointSet(name, breakpointSet) {
  validateBreakpointSetObject(name, breakpointSet);
  validateBreakpointSetValues(name, breakpointSet);
};

var validateMediaTypes = validate(areMediaTypesValid, invalidMediaTypeErrorMessage);

var validateBreakpointSetNames = validate(_ramda.compose(areBreakpointSetNamesValid, _ramda.keys), invalidBreakpointNamesErrorMessage);

var validateBreakpointObject = function validateBreakpointObject(breakpointMap) {
  validate(_ramda.both(_ramda.complement(isArray), isObj), invalidBreakpointsErrorMessage)(breakpointMap);
  validate(isPopulatedObject, emptyBreakpointMapErrorMessage)(breakpointMap);
};

var validateBreakpointMap = function validateBreakpointMap(breakpoints) {
  validateBreakpointObject(breakpoints);
  validateBreakpointSetNames(breakpoints);
};

var validateBreakpointSets = _ramda.compose(_ramda.map(function (_ref) {
  var _ref2 = slicedToArray(_ref, 2),
      name = _ref2[0],
      value = _ref2[1];

  return validateBreakpointSet(name, value);
}), _ramda.toPairs);

var validateConfig = function validateConfig(_ref3) {
  var baseFontSize = _ref3.baseFontSize,
      defaultMediaType = _ref3.defaultMediaType,
      dimensionsUnit = _ref3.dimensionsUnit,
      shouldSeparateQueries = _ref3.shouldSeparateQueries;

  validate(_ramda.either(lib_10, isPositiveNumberWithPixelUnit), invalidBaseFontSizeErrorMessage)(baseFontSize);

  validate(_ramda.anyPass([isNull, _ramda.compose(areMediaTypesValid, ensureArray)]), invalidDefaultMediaTypeErrorMessage)(defaultMediaType);

  validate(isDimensionsUnitValid, invalidDimensionsUnitErrorMessage)(dimensionsUnit);
  validate(isBoolean, shouldSeparateQueriesErrorMessage)(shouldSeparateQueries);
};

var validateFeature = function validateFeature(name, possibleValues, value) {
  validate(doesListIncludeValue(possibleValues), invalidFeatureErrorMessage(name, possibleValues))(value);
};

var buildMediaType = (function (defaultMediaType) {
  return function () {
    var mediaTypes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [defaultMediaType];

    var mediaTypesArray = ensureArray(mediaTypes);
    validateMediaTypes(mediaTypesArray);
    return toCommaSeparatedList(mediaTypesArray);
  };
});

var nand = _ramda.complement(_ramda.and);
var nor = _ramda.complement(_ramda.or);
var notBoth = _ramda.compose(_ramda.complement, _ramda.both);
var neither = _ramda.compose(_ramda.complement, _ramda.either);
var notAllPass = _ramda.compose(_ramda.complement, _ramda.allPass);
var nonePass = _ramda.compose(_ramda.complement, _ramda.anyPass);

var nameValue = _ramda.compose(_ramda.join(': '), _ramda.reject(_ramda.isNil));
var isArrayOrString = _ramda.either(isArray, isString);
var isNegationObject = _ramda.both(isObj, _ramda.has('not'));

var joinAnd = _ramda.join(' and ');
var joinComma = _ramda.join(', ');
var prefixWithNot = _ramda.concat('not ');
var containsArrays = _ramda.any(isArray);
var expandNegationObject = function expandNegationObject(negationObject) {
  return negationObject.not;
};
var containsMediaType = _ramda.contains(_ramda.__, _ramda.values(MEDIA_TYPES));
var arrayContainsMediaType = _ramda.any(containsMediaType);

var ensureMediaType = function ensureMediaType(defaultMediaType) {
  for (var _len = arguments.length, elements = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    elements[_key - 1] = arguments[_key];
  }

  return _ramda.map(function (element) {
    if (isArray(element)) {
      // Only add prefix if no media type is declared
      if (arrayContainsMediaType(element)) {
        return element;
      }
      return [defaultMediaType].concat(toConsumableArray(element));
    }
    if (containsMediaType(element)) {
      return element;
    }
    return joinAnd([defaultMediaType, element]);
  })(elements);
};

var queryElementIsValidType = function queryElementIsValidType(element) {
  _ramda.when(_ramda.either(isNull, neither(isArrayOrString, isNegationObject)), composeError(queryElementIsValidTypeErrorMessage))(element);
};

var queryElementChildrenValidType = function queryElementChildrenValidType(element) {
  _ramda.when(isArray, _ramda.unless(_ramda.all(function (child) {
    return _ramda.either(isArrayOrString, isNegationObject)(child);
  }), composeError(queryChildElementIsValidTypeErrorMessage)))(element);
};

var elemementHasNoNestedArrays = function elemementHasNoNestedArrays(element) {
  _ramda.when(isArray, _ramda.when(containsArrays, composeError(queryNoNestedArraysErrorMessage)))(element);
};

var validateDefinition = function validateDefinition() {
  for (var _len2 = arguments.length, elements = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    elements[_key2] = arguments[_key2];
  }

  _ramda.forEach(function (element) {
    queryElementIsValidType(element);
    queryElementChildrenValidType(element);
    elemementHasNoNestedArrays(element);
  })(elements);
};

var renderFeature = function renderFeature(name, value) {
  return _ramda.join('', ['(', nameValue([name, value]), ')']);
};

var renderQueryDefinition = function renderQueryDefinition() {
  for (var _len3 = arguments.length, elements = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    elements[_key3] = arguments[_key3];
  }

  validateDefinition.apply(undefined, toConsumableArray(elements));
  elements = _ramda.map(_ramda.when(isNegationObject, expandNegationObject))(elements);
  elements = _ramda.map(_ramda.when(isArray, joinAnd))(elements);
  return _ramda.join(' ', [MEDIA_PREFIX, elements]);
};

var renderNotQueryDefinition = function renderNotQueryDefinition(defaultMediaType) {
  for (var _len4 = arguments.length, elements = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    elements[_key4 - 1] = arguments[_key4];
  }

  _ramda.when(_ramda.isEmpty, composeError(notNoElementsErrorMessage))(elements);
  validateDefinition.apply(undefined, toConsumableArray(elements));

  elements = ensureMediaType.apply(undefined, [defaultMediaType].concat(toConsumableArray(elements)));

  return _ramda.compose(joinComma, _ramda.map(_ramda.compose(prefixWithNot, _ramda.when(isArray, joinAnd))))(elements);
};

var buildLinearFeature = (function (name, possibleValues) {
  var allowNoArgument = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return function (value) {
    _ramda.unless(_ramda.both(isUndefined, _ramda.always(allowNoArgument)), _ramda.partial(validateFeature, [name, possibleValues]))(value);
    return renderFeature(name, value);
  };
});

var toLinearFeatures = _ramda.map(function (_ref) {
  var name = _ref.name,
      validValues = _ref.validValues,
      allowNoArgument = _ref.allowNoArgument;
  return defineProperty({}, camelcase(name), buildLinearFeature(name, validValues, allowNoArgument));
});

var buildLinearFeatures = (function () {
  return _ramda.mergeAll(toLinearFeatures(LINEAR_FEATURES));
});

// -----------------------------------------------------------------------------
// Internal
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

var propEqName = _ramda.propEq('name');
var propName = _ramda.prop('name');
var zipToNameAndValue = _ramda.zipObj(['name', 'value']);
// TODO: This should be internal
var findBreakpointIndex = function findBreakpointIndex(breakpoint, breakpointsArray) {
  return _ramda.findIndex(propEqName(breakpoint))(breakpointsArray);
};

var toBreakpointArray = _ramda.compose(_ramda.map(zipToNameAndValue), _ramda.toPairs);

var getUpperLimit = function getUpperLimit(breakpointsArray, breakpoint) {
  var index = findBreakpointIndex(breakpoint, breakpointsArray);
  return _ramda.compose(propName, _ramda.nth(_ramda.inc(index)))(breakpointsArray);
};

var buildFeatureItem = function buildFeatureItem(name, parser, config) {
  return function (breakpoint) {
    return renderFeature(name, parser(breakpoint, config));
  };
};

var nilValueAndAllowedToPass = function nilValueAndAllowedToPass(value, noArgs) {
  return _ramda.both(_ramda.isNil, _ramda.always(noArgs))(value);
};

var buildRangedFeature = (function (name, valueRenderer) {
  var _o;

  var breakpoints = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref$defaultMediaType = _ref.defaultMediaType,
      defaultMediaType = _ref$defaultMediaType === undefined ? MEDIA_TYPES.SCREEN : _ref$defaultMediaType,
      _ref$onlyNamedBreakpo = _ref.onlyNamedBreakpoints,
      onlyNamedBreakpoints = _ref$onlyNamedBreakpo === undefined ? true : _ref$onlyNamedBreakpo,
      _ref$allowNoArgument = _ref.allowNoArgument,
      allowNoArgument = _ref$allowNoArgument === undefined ? false : _ref$allowNoArgument;

  var camelisedName = camelcase(name);

  var _rangedFeatureNamed = rangedFeatureNamed(name),
      validator = _rangedFeatureNamed.validator;

  // ---------------------------------------------------------------------------
  // UTILS
  // ---------------------------------------------------------------------------

  var getBreakpointNamed = function getBreakpointNamed(breakpoint) {
    if (_ramda.isEmpty(breakpoints)) throwError(mssingBreakpointMapErrorMessage(camelisedName));
    var value = breakpoints[breakpoint];
    if (_ramda.isNil(value)) throwError(missingBreakpointErrorMessage(breakpoint, name, breakpoints));
    return value;
  };

  var configuredValueRenderer = function configuredValueRenderer(value) {
    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref2$shouldSeparate = _ref2.shouldSeparate,
        shouldSeparate = _ref2$shouldSeparate === undefined ? false : _ref2$shouldSeparate,
        _ref2$noArgs = _ref2.noArgs,
        noArgs = _ref2$noArgs === undefined ? false : _ref2$noArgs;

    // TODO clean this up, but order here is vital - we need to return in this
    // order.
    if (nilValueAndAllowedToPass(value, noArgs)) {
      return valueRenderer(value, shouldSeparate);
    }

    if (onlyNamedBreakpoints) {
      value = getBreakpointNamed(value);
      return valueRenderer(value, shouldSeparate);
    }

    validator.validate(value);
    return valueRenderer(value, shouldSeparate);
  };

  var defaultAPIConfig = { mediaType: defaultMediaType };

  var orderedBreakpoints = toBreakpointArray(breakpoints);
  var indexOfBreakpointNamed = function indexOfBreakpointNamed(value) {
    return _ramda.findIndex(value, orderedBreakpoints);
  };

  var nextBreakpointAboveNamed = function nextBreakpointAboveNamed(value) {
    return getUpperLimit(orderedBreakpoints, value);
  };

  // ---------------------------------------------------------------------------
  // Features
  // ---------------------------------------------------------------------------

  var feature = buildFeatureItem(name, configuredValueRenderer, {
    noArgs: allowNoArgument
  });
  var minFeature = buildFeatureItem('min-' + name, configuredValueRenderer);
  var maxFeature = buildFeatureItem('max-' + name, configuredValueRenderer, {
    shouldSeparate: true
  });

  // ---------------------------------------------------------------------------
  // Feature Helpers
  // ---------------------------------------------------------------------------

  var aboveFeature = function aboveFeature(from) {
    return minFeature(from);
  };

  var belowFeature = function belowFeature(to) {
    return maxFeature(to);
  };

  var betweenFeatures = function betweenFeatures(from, to) {
    if (from === to) throwError(sameBreakpointsForBetweenErrorMessage(from));
    var fromIndex = indexOfBreakpointNamed(propEqName(from));
    var toIndex = indexOfBreakpointNamed(propEqName(to));

    var _ref3 = fromIndex < toIndex ? [from, to] : [to, from],
        _ref4 = slicedToArray(_ref3, 2),
        lower = _ref4[0],
        higher = _ref4[1];

    return joinAnd([minFeature(lower), maxFeature(higher)]);
  };

  var atFeatureBreakpoint = function atFeatureBreakpoint(breakpoint) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultAPIConfig;

    var breakpointAbove = nextBreakpointAboveNamed(breakpoint);
    if (breakpointAbove) {
      return betweenFeatures(breakpoint, breakpointAbove, config);
    }
    return aboveFeature(breakpoint, config);
  };

  var atFeature = function atFeature(breakpoint) {
    return feature(breakpoint);
  };

  var titleizedName = name[0].toUpperCase() + camelcase(name.slice(1));

  var o = (_o = {}, defineProperty(_o, camelcase(name), feature), defineProperty(_o, 'min' + [titleizedName], minFeature), defineProperty(_o, 'max' + [titleizedName], maxFeature), defineProperty(_o, 'above' + [titleizedName], aboveFeature), defineProperty(_o, 'below' + [titleizedName], belowFeature), defineProperty(_o, 'between' + [titleizedName] + 's', betweenFeatures), defineProperty(_o, 'at' + [titleizedName] + 'Breakpoint', atFeatureBreakpoint), defineProperty(_o, 'at' + [titleizedName], atFeature), _o);

  return o;
});

var build = function build(globalConfig, breakpoints, item) {
  breakpoints = _ramda.defaultTo({})(breakpoints);
  var x = buildRangedFeature(item.name, item.valueRenderer(globalConfig), breakpoints[camelcase(item.name)], _ramda.merge(globalConfig, item.config));
  return x;
};

var buildRangeFeatures = (function (breakpoints, globalConfig) {
  return _ramda.mergeAll(_ramda.map(_ramda.curry(build)(globalConfig, breakpoints))(RANGED_FEATURES));
});

var _templateObject = taggedTemplateLiteral(['\n  ', ' {\n    ', ';\n  }\n'], ['\n  ', ' {\n    ', ';\n  }\n']);

var renderQuery = (function (definition, content) {
  return styledComponents.css(_templateObject, definition, content);
});

var defaultConfig = {
  baseFontSize: 16,
  defaultMediaType: MEDIA_TYPES.SCREEN,
  dimensionsUnit: UNITS.DIMENSIONS.EM,
  shouldSeparateQueries: true,
  onlyNamedBreakpoints: true
};

var validateConfigArgs = function validateConfigArgs(breakpoints, config) {
  validateConfig(config);
  if (_ramda.complement(isUndefined)(breakpoints)) validateBreakpointMap(breakpoints);
  validateBreakpointSets(breakpoints);
};

// Don't expand config vars as we need to pass a single config object around.
var configure = function configure(breakpoints) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var originalMQ = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  var configWithDefaults = _ramda.merge(defaultConfig, config);

  validateConfigArgs(breakpoints, configWithDefaults);
  // Ensure we have a unitless value stored for baseFontSize
  if (isNumberWithDimensionsUnit(configWithDefaults.baseFontSize)) {
    configWithDefaults.baseFontSize = lib_16(configWithDefaults.baseFontSize, 16);
  }
  // ---------------------------------------------------------------------------
  // API
  // ---------------------------------------------------------------------------

  var tweak = function tweak(mq, tweakpoints) {
    if (breakpoints) validateBreakpointMap(tweakpoints);
    validateBreakpointSets(tweakpoints);
    var mergedBreakpoints = _ramda.mergeDeepLeft(breakpoints, tweakpoints);
    return configure(mergedBreakpoints, configWithDefaults, mq);
  };

  var query = function query() {
    for (var _len = arguments.length, elements = Array(_len), _key = 0; _key < _len; _key++) {
      elements[_key] = arguments[_key];
    }

    if (_ramda.isEmpty(elements)) throwError(queryNoElementsErrorMessage());

    return function (stringParts) {
      for (var _len2 = arguments.length, interpolationValues = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        interpolationValues[_key2 - 1] = arguments[_key2];
      }

      return renderQuery(renderQueryDefinition.apply(undefined, elements), styledComponents.css.apply(undefined, [stringParts].concat(interpolationValues)));
    };
  };

  var not = function not() {
    for (var _len3 = arguments.length, elements = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      elements[_key3] = arguments[_key3];
    }

    return {
      not: renderNotQueryDefinition.apply(undefined, [configWithDefaults.defaultMediaType].concat(elements))
    };
  };

  // ---------------------------------------------------------------------------
  // Export
  // ---------------------------------------------------------------------------

  var o = _extends({
    mediaType: buildMediaType(configWithDefaults.defaultMediaType)
  }, buildLinearFeatures(), buildRangeFeatures(breakpoints, configWithDefaults), {
    query: query,
    not: not,
    untweaked: function untweaked() {
      if (!originalMQ) {
        throwError(noUntweakedErrorMessage());
      }
      return originalMQ;
    }
  });
  o.tweak = _ramda.partial(tweak, [o]);
  return o;
};

var mq$1 = {
  configure: configure
};

return mq$1;

})));
