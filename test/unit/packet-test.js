'use strict';

var packet = require('../../').packet;
var assert = require('chai').assert;
// Buffer.equals() for v0.10
require('buffer-equals-polyfill');

suite('Packet', () => {
  test('header to object', () => {
    let msg = new Buffer('240000343e80510800000000000000000000000000000000000000000000000002000000', 'hex');
    let parsed = packet.toObject(msg);

    assert.isObject(parsed);
    assert.equal(parsed.size, 36);
    assert.equal(parsed.description, 0x3400);
    assert.equal(parsed.addressable, true);
    assert.equal(parsed.tagged, true);
    assert.equal(parsed.origin, false);
    assert.equal(parsed.protocolVersion, 1024);
    assert.equal(parsed.source, '3e805108');
    assert.equal(parsed.target, '000000000000');
    assert.equal(parsed.site, '');
    assert.equal(parsed.type, 2);
    assert.equal(parsed.sequence, 0);
    assert.equal(parsed.time, 0);
    assert.isTrue(parsed.reserved1.equals(new Buffer('0000', 'hex')));
    assert.isTrue(parsed.reserved2.equals(new Buffer('00', 'hex')));
    assert.isTrue(parsed.reserved3.equals(new Buffer('0000', 'hex')));

    msg = new Buffer('3200005442524b52d073d5006d7200004c49465856320000c466acd1741bdf13110000001ddb86343fe90100e61701000000', 'hex');
    parsed = packet.toObject(msg);

    assert.isObject(parsed);
    assert.equal(parsed.size, 50);
    assert.equal(parsed.description, 0x5400);
    assert.equal(parsed.addressable, true);
    assert.equal(parsed.tagged, false);
    assert.equal(parsed.origin, true);
    assert.equal(parsed.protocolVersion, 1024);
    assert.equal(parsed.source, '42524b52');
    assert.equal(parsed.target, 'd073d5006d72');
    assert.equal(parsed.site, 'LIFXV2');
    assert.equal(parsed.sequence, 0);
    assert.equal(parsed.type, 17);
    assert.equal(parsed.time, '1431893395075000004');
    assert.isTrue(parsed.reserved1.equals(new Buffer('0000', 'hex')));
    assert.isTrue(parsed.reserved2.equals(new Buffer('00', 'hex')));
    assert.isTrue(parsed.reserved3.equals(new Buffer('0000', 'hex')));

    msg = new Buffer('5c00005442524b52d073d5006d7200004c49465856320000c469ea095c6adf13380000001438456c47c442a9b2603b45972218170000000000000000000000000000000000000000000000000000000000000000406e62fc12f4b913', 'hex');
    parsed = packet.toObject(msg);

    assert.isObject(parsed);
    assert.equal(parsed.size, 92);
    assert.equal(parsed.description, 0x5400);
    assert.equal(parsed.addressable, true);
    assert.equal(parsed.tagged, false);
    assert.equal(parsed.origin, true);
    assert.equal(parsed.protocolVersion, 1024);
    assert.equal(parsed.source, '42524b52');
    assert.equal(parsed.target, 'd073d5006d72');
    assert.equal(parsed.site, 'LIFXV2');
    assert.equal(parsed.sequence, 0);
    assert.equal(parsed.type, 56);
    assert.equal(parsed.time, '1431980150063000004');
    assert.isTrue(parsed.reserved1.equals(new Buffer('0000', 'hex')));
    assert.isTrue(parsed.reserved2.equals(new Buffer('00', 'hex')));
    assert.isTrue(parsed.reserved3.equals(new Buffer('0000', 'hex')));

    msg = new Buffer('24000014953C1B08D073D5006D7200004C49465856320007000000000000000033000000', 'hex');
    parsed = packet.toObject(msg);

    assert.isObject(parsed);
    assert.equal(parsed.size, 36);
    assert.equal(parsed.description, 0x1400);
    assert.equal(parsed.addressable, true);
    assert.equal(parsed.tagged, false);
    assert.equal(parsed.origin, false);
    assert.equal(parsed.protocolVersion, 1024);
    assert.equal(parsed.source, '953c1b08');
    assert.equal(parsed.target, 'd073d5006d72');
    assert.equal(parsed.site, 'LIFXV2');
    assert.equal(parsed.sequence, 7);
    assert.equal(parsed.type, 51);
    assert.equal(parsed.time, 0);
    assert.isTrue(parsed.reserved1.equals(new Buffer('0000', 'hex')));
    assert.isTrue(parsed.reserved2.equals(new Buffer('00', 'hex')));
    assert.isTrue(parsed.reserved3.equals(new Buffer('0000', 'hex')));
  });

  test('header to buffer', () => {
    let expectedResult = new Buffer('240000343e80510800000000000000000000000000000000000000000000000002000000', 'hex');
    let obj = {
      size: 36,
      description: 0x3400,
      source: '3e805108',
      target: '000000000000',
      site: '',
      sequence: 0,
      type: 2
    };
    let parsed = packet.toBuffer(obj);
    assert.isTrue(parsed.equals(expectedResult));

    obj = {
      size: 36,
      addressable: true,
      tagged: true,
      protocolVersion: 1024,
      source: '3e805108',
      type: 2
    };
    parsed = packet.toBuffer(obj);
    assert.isTrue(parsed.equals(expectedResult));

    expectedResult = new Buffer('5c00005442524b52d073d5006d7200004c49465856320000c469ea095c6adf1338000000', 'hex');
    obj = {
      size: 92,
      addressable: true,
      origin: true,
      source: '42524b52',
      target: 'd073d5006d72',
      site: 'LIFXV2',
      sequence: 0,
      type: 56,
      time: '1431980150063000004'
    };

    parsed = packet.toBuffer(obj);
    assert.isTrue(parsed.equals(expectedResult));
  });
});