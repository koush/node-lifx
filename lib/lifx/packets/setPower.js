'use strict';

var Packet = {
  size: 2,
  addressable: true,
  tagged: true
};

/**
 * Converts packet specific data from a buffer to an object
 * @param  {Buffer} buf Buffer containing only packet specific data no header
 * @return {Object}     Information contained in packet
 */
Packet.toObject = function(buf) {
  var obj = {};
  var offset = 0;

  if (buf.length !== this.size) {
    throw new Error('Invalid length given for setPower LIFX packet');
  }

  obj.level = buf.readUInt16LE(offset);
  offset += 2;

  return obj;
};

/**
 * Converts the given packet specific object into a packet
 * @param  {Object} obj object with configuration data
 * @param  {Number} obj.power 0 for off or 65535 for on
 * @return {Buffer} packet
 */
Packet.toBuffer = function(obj) {
  var buf = new Buffer(this.size);
  buf.fill(0);
  var offset = 0;

  if (obj.level !== 0 && obj.level !== 65535) {
    throw new RangeError('Invalid level given for setPower LIFX packet, only 0 and 65535 are supported');
  }
  buf.writeUInt16LE(obj.level, offset);
  offset += 2;

  return buf;
};

module.exports = Packet;