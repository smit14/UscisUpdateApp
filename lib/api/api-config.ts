export enum HttpRequestMethod {
    POST = "POST",
    GET = "GET",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
  }

export enum Resources {
    CaseStatus = "CaseStatus",
    StatusUpdate = "StatusUpdate"
}

export const resourceToMethodMap = new Map<Resources, HttpRequestMethod[]>([
    [Resources.CaseStatus, [HttpRequestMethod.GET]],
    [Resources.StatusUpdate, [HttpRequestMethod.POST]]
]);