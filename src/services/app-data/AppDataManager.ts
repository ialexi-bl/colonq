export abstract class AppDataManager<TData, TAction> {
  public abstract formatForClient(data: any): TData
  public abstract formatForServer(data: TData): any
  public abstract cleanup(data: TData): TData
  public abstract getUploadData(
    data: TData,
    newData: TData,
  ): null | Record<string, any>

  public abstract validate(data: any): data is TData
  public abstract reduce(data: TData, action: TAction): TData

  constructor(public readonly applet: string) {}
}
