export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  success: boolean
}

export interface UploadResponse {
  url: string
  filename: string
  size: number
  type: string
  path?: string
}

export interface UploadResult {
  success: boolean
  data?: UploadResponse
  error?: string
  progress?: number
}

export interface RequestOptions {
  auth?: boolean;
  headers?: Record<string, string>;
  [key: string]: any;
}
