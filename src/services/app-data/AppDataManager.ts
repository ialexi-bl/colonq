export abstract class AppDataManager<TData, TStoredData, TAction> {
  public defaultData: TStoredData | undefined

  public abstract formatForClient(data: TStoredData): TData
  public abstract formatToStore(data: TData): TStoredData
  // public abstract cleanup(data: TData): TData
  public abstract getUploadData(
    newData: TData,
    forceAll?: boolean,
  ): null | TStoredData

  public abstract validate(data: any): data is TStoredData
  public abstract reduce(data: TData, action: TAction): TData

  constructor(public readonly applet: string) {}
}
