/// <reference types="@rbxts/testez/globals" />

import { Tracer } from "@rbxts/tracer";
import { createPart } from "utils/part-utils";
import { END_POS, POS_DIFF, START_POS } from "../constants";

export = () => {
  const radius = 10;

  it("should ray into nothing from start to end", () => {
    const result = Tracer.sphere(radius, START_POS, END_POS).run();

    expect(result.hit).to.equal(undefined);
    expect(result.distance).to.equal(POS_DIFF.Magnitude);
    expect(result.material).to.equal(Enum.Material.Air);
  });

  it("should ray into nothing from start to direction", () => {
    const result = Tracer.sphere(radius, START_POS, POS_DIFF.Unit, POS_DIFF.Magnitude).run();

    expect(result.hit).to.equal(undefined);
    expect(result.distance).to.equal(POS_DIFF.Magnitude);
    expect(result.material).to.equal(Enum.Material.Air);
  });

  it("should hit temporary part", () => {
    const part = createPart(START_POS.add(END_POS.div(2)));
    const result = Tracer.sphere(radius, START_POS, END_POS).run();

    expect(result.hit).to.equal(part);
  });

  it("should error on incorrect arguments", () => {
    expect(() => Tracer.sphere(radius, START_POS, undefined as unknown as Vector3)).to.throw();
  });

  it("should error when radius is negative", () => {
    expect(() => Tracer.sphere(-10, START_POS, END_POS)).to.throw();
  });
};
