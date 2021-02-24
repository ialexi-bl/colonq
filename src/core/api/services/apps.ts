import { Api, ApiPromise, Endpoint } from 'core/api/config'
import ApiService from './api'
import StoreController from 'store/StoreController'

const getId = StoreController.requireUserId

function getAppsList(): ApiPromise<Api.Apps.GetApps> {
  return ApiService.get<Api.Apps.GetApps>(Endpoint.apps.get)
}

function loadApps(): ApiPromise<Api.User.GetApps> {
  return ApiService.get<Api.User.GetApps>(Endpoint.user.getApps(getId()))
}

function loadApp(
  category: string,
  name?: string,
): ApiPromise<Api.User.GetApp> {
  return ApiService.get<Api.User.GetApp>(
    Endpoint.user.getApp(getId(), name ? `${category}/${name}` : category),
  )
}

const AppsService = { getAppsList, loadApps, loadApp }
export default AppsService
