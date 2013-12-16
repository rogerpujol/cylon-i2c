###
 * BlinkM driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict';

require './cylon-i2c'

namespace = require 'node-namespace'

namespace "Cylon.Drivers.I2C", ->
  class @BlinkM extends Cylon.Driver
    constructor: (opts) ->
      super
      @address = 0x09

    commands: ->
      ['off', 'rgb', 'fade', 'color', 'version']

    start: (callback) ->
      @connection.i2cConfig(50)

      super

    off: ->
      @connection.i2cWrite @address, @commandBytes('o')

    rgb: (r, g, b) ->
      @connection.i2cWrite @address, @commandBytes('n')
      @connection.i2cWrite @address, [r, g, b]

    fade: (r, g, b) ->
      @connection.i2cWrite @address, @commandBytes('c')
      @connection.i2cWrite @address, [r, g, b]

    color: (callback) ->
      @connection.i2cWrite @address, @commandBytes('g')
      @connection.i2cRead @address, 3, (data) =>
        (callback)(data[0], data[1], data[2])

    version: (callback) ->
      @connection.i2cWrite @address, @commandBytes('Z')
      @connection.i2cRead @address, 2, (data) =>
        (callback)("#{data[0]}.#{data[1]}")

    commandBytes: (s) ->
      new Buffer(s, 'ascii')