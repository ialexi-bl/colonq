export type ServerResponse<TStatus extends string, TData = null> = {
  status: TStatus
  data: TData
}

// export type InferServerResponse<T> = T extends ServerResponse<infer S, infer D>
//   ? ServerResponse<S, D>
//   : never
// export type InferFailedResponse<T> = T extends ServerResponse<infer S, infer D>
//   ? FailedResponse<S, D>
//   : never
// export type InferSuccessfulResponse<T> = T extends SuccessfulResponse<
//   infer S,
//   infer D
// >
//   ? SuccessfulResponse<S, D>
//   : never

// export type ServerResponse<TStatus extends string, TData> =
//   | SuccessfulResponse<TStatus, TData>
//   | FailedResponse<TStatus, TData>
