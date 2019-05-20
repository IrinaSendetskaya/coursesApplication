import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "duration"
})
export class DurationPipe implements PipeTransform {
  transform(value: number, args?: any): string {
    let result = "";
    if (value <= 0) return " час  мин";
    if (value < 60) {
      result = value + " мин";
    } else if (value == 60) {
      result = "1 час";
    } else {
      result = ((value / 60) ^ 0) + " час " + (value % 60) + " мин";
    }
    return result;
  }
}
