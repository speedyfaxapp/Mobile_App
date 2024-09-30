export class Convert {
  public static toObject<T>(json: string): T {
    return JSON.parse(json);
  }

  public static toJson<T>(value: T): string {
    return JSON.stringify(value);
  }
}
