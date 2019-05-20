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
  it('should transform 0 to " час  мин"', () => {
    expect(pipe.transform(0)).toBe(" час  мин");
  });
  it('should transform 40 to "40 мин"', () => {
    expect(pipe.transform(40)).toBe("40 мин");
  });
  it('should transform 60 to "1 час"', () => {
    expect(pipe.transform(60)).toBe("1 час");
  });
});
