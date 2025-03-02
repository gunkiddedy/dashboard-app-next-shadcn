import { type testChartData } from './utils'

export interface ApiResponse<T> {
  isSuccess?: boolean
  responseCode?: string
  responseMessage?: string
  responseData?: T
  metaData?: {
    totalCount: number
    pageSize: number
    currentPage: number
    totalPages: number
    hasNext: boolean
    hasPrevious: boolean
  }
}

export enum PaginationEnum {
  PAGE_NUMBER = 'PageNumber',
  PAGE_SIZE = 'PageSize',
}

export enum FilterEnum {
  SEARCH_QUERY = 'SearchQuery',
}

export type DonutDataType = ReturnType<() => typeof testChartData>

export interface IUseGenerateData {
  adolescents?: number
  unlicensed?: number
  firstTimers?: number
  targetables?: number
}

export interface IGenerateTargetablesData {
  doesNotCareAboutFuelEmissions?: number
  caresAboutFuelEmissions?: number
  fwd?: number
  idk?: number
  carDistribution?: Record<string, string[]>
}
