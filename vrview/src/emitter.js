/*
 * Copyright 2015 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function Emitter() {
  this.initEmitter();
}

Emitter.prototype.initEmitter = function() {
  this.callbacks = {};
};

Emitter.prototype.emit = function(eventName) {
  var callbacks = this.callbacks[eventName];
  if (!callbacks) {
    console.log('No valid callback specified.');
    return;
  }
  var args = [].slice.call(arguments)
  // Eliminate the first param (the callback).
  args.shift();
  for (var i = 0; i < callbacks.length; i++) {
    callbacks[i].apply(this, args);
  }
};

Emitter.prototype.on = function(eventName, callback) {
  if (eventName in this.callbacks) {
    var cbs = this.callbacks[eventName]
    if (cbs.indexOf(callback) == -1) {
      cbs.push(callback);
    }
  } else {
    this.callbacks[eventName] = [callback];
  }
};

Emitter.prototype.removeListener = function(eventName, callback) {
  if (!(eventName in this.callbacks)) {
    return;
  }
  var cbs = this.callbacks[eventName];
  var ind = cbs.indexOf(callback);
  if (ind == -1) {
    console.warn('No matching callback found');
    return;
  }
  cbs.splice(ind, 1);
};

module.exports = Emitter;
