import * as chai from "chai";
import * as mocha from "mocha";
import { ByteArray } from "../src";

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
    ba.position = 0;
    expect(ba.readUTF()).eq("Hello!");
  });

  it("should write and read a number", () => {
    ba.writeInt(1234);
    ba.position = 0;
    expect(ba.readInt()).eq(1234);
  });

  it("should write and read a boolean", () => {
    ba.writeBoolean(true);
    ba.position = 0;
    expect(ba.readBoolean()).eq(true);
  });
});
