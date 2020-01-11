import { percentComplete, setHrsLabel } from "../components/utils";

xit("Outputs days left with label that is plural or singular based on expiration", () => {});

xit("Outputs relative expiration label based on expiration date", () => {});

it("Outputs percent value with % label", () => {
  let percent = percentComplete(25, 100);
  expect(percent).toBe("25%");

  percent = percentComplete(50, 150);
  expect(percent).toBe("33.3%");
});

it("Outputs label that is plural or singular based on hours", () => {
  let hour = setHrsLabel(1);
  expect(hour).toBe("hr");

  hour = setHrsLabel(2);
  expect(hour).toBe("hrs");

  hour = setHrsLabel(-1);
  expect(hour).toBe("hr");

  hour = setHrsLabel(-2);
  expect(hour).toBe("hrs");
});
