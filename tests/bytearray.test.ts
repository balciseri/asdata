import * as chai from "chai";
import * as mocha from "mocha";
import {  ByteArray } from "../src";

const expect = chai.expect;

let ba: ByteArray;

beforeEach((done) => {
  ba = new ByteArray();
  done();
});

describe("ByteArray", () => {
  it("should create an instance of ByteArray", () => {
    ba = new ByteArray();
  });

  it("should write and read a string", () => {
    ba.writeUTF("Hello!");
    ba.clear();
    expect(ba.readUTF()).eq("Hello!");
  });

  it("should write and read a number", () => {
    ba.writeInt(1234);
    ba.clear();
    expect(ba.readInt()).eq(1234);
  });

  it("should write and read a boolean", () => {
    ba.writeBoolean(true);
    ba.clear();
    expect(ba.readBoolean()).eq(true);
  });

  it("should read/write MultiBytes", () => {
    ba.writeMultiByte("test", "ascii");
    ba.writeMultiByte("yolo");
    ba.writeMultiByte("again", "ascii");
    ba.clear();
    expect(ba.readMultiByte(4, "ascii")).equal("test");
    expect(ba.readMultiByte(4)).equal("yolo");
    expect(ba.readMultiByte(5, "ascii")).equal("again");
  });
});
