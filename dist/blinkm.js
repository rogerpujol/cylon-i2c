/*
 * BlinkM driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/


(function() {
  'use strict';
  var namespace;

  namespace = require('node-namespace');

  namespace("Cylon.Driver.I2C", function() {
    return this.BlinkM = (function() {
      function BlinkM(opts) {
        this.self = this;
        this.device = opts.device;
        this.connection = this.device.connection;
        this.address = 0x09;
      }

      BlinkM.prototype.commands = function() {
        return ['off', 'rgb', 'fade', 'color'];
      };

      BlinkM.prototype.start = function(callback) {
        Logger.debug("BlinkM started");
        this.connection.i2cConfig(50);
        callback(null);
        return this.device.emit('start');
      };

      BlinkM.prototype.off = function() {
        return this.connection.i2cWrite(this.address, this.commandBytes('o'));
      };

      BlinkM.prototype.rgb = function(r, g, b) {
        this.connection.i2cWrite(this.address, this.commandBytes('n'));
        return this.connection.i2cWrite(this.address, [r, g, b]);
      };

      BlinkM.prototype.fade = function(r, g, b) {
        this.connection.i2cWrite(this.address, this.commandBytes('c'));
        return this.connection.i2cWrite(this.address, [r, g, b]);
      };

      BlinkM.prototype.commandBytes = function(s) {
        return new Buffer(s, 'ascii');
      };

      return BlinkM;

    })();
  });

}).call(this);
