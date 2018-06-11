import * as chai from "chai";
import * as mocha from "mocha";
import * as fs from "fs";
import { ByteArray } from "../src";

const expect = chai.expect;

let ba: ByteArray;
let fileBuffer: Buffer;

describe("ByteArray with offset and length", () => {

  before((done) => {
    fileBuffer = fs.readFileSync("tests/fixtures/HintCategory.d2o");
    done();
  });

  it("should create an instance with correct length and bytesAvailable", () => {
    const arrayBuffer: ArrayBuffer = fileBuffer.buffer;
    ba = new ByteArray(arrayBuffer, fileBuffer.byteOffset, fileBuffer.byteLength)
    expect(ba.length).eq(fileBuffer.byteLength);
    expect(ba.bytesAvailable).eq(fileBuffer.byteLength);
  });

  it("it should read D2O header", () => {
    expect(ba.readMultiByte(3, "ASCII")).equal("D2O");
  });

});

describe("ByteArray", () => {

  beforeEach((done) => {
    ba = new ByteArray();
    done();
  });

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

  it("should create an instance with wrong length and bytesAvailable when using a small buffer", () => {
    const arrayBuffer: ArrayBuffer = fileBuffer.buffer;
    ba = new ByteArray(arrayBuffer)
    expect(ba.length).not.eq(fileBuffer.byteLength);
    expect(ba.bytesAvailable).not.eq(fileBuffer.byteLength);
  });

});
