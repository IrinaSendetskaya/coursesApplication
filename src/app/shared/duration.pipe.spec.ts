import { DurationPipe } from "./duration.pipe";

describe("DurationPipe", () => {

  let pipe: DurationPipe;
  beforeEach(() => {
    pipe = new DurationPipe();
  });

  it("create an instance", () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform 125 to "2 час 5 мин"', () => {
    expect(pipe.transform(125)).toBe("2 час 5 мин");
  });
});
