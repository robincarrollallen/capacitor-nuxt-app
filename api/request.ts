import type { ApiResponse, RequestOptions, UploadResponse, UploadResult } from "./types"

async function request<T = any>(url: string, options: RequestOptions = {}) {
  // 在函数调用时获取配置和 token
  const config = useRuntimeConfig()
  const token = useCookie("token")
  const tenantStore = useTenantStore()

  const { auth = true, params, body, ...fetchOptions } = options

  // 如果需要认证但没有 token，返回错误
  if (auth && !token.value) {
    throw new Error("Authentication required but no token available")
  }

  // 构建 headers
  const headers: Record<string, string> = {
    tenantid: `${tenantStore.tenantInfo.id}`,
    ...fetchOptions.headers,
  }

  // 只有在需要认证且有 token 时才添加 Authorization header
  if (auth && token.value) {
    headers.Authorization = `Bearer ${token.value}`
  }

  const data = await $fetch(url, {
    baseURL: config.public.apiBase || 'https://api-dev.g6b.xyz',
    headers,
    params: { json: params },
    body: { json: body },
    ...fetchOptions,
  }) as T

  return data
}

export async function upload<T = UploadResponse>(url: string, formData: FormData, onProgress?: (progress: number) => void) {
  // 在函数调用时获取配置和 token
  const config = useRuntimeConfig()
  const token = useCookie("token")

  return new Promise<ApiResponse<T>>((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    // 监听上传进度
    if (onProgress) {
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 100)
          onProgress(progress)
        }
      })
    }

    xhr.onload = () => {
      try {
        if (xhr.status >= 200 && xhr.status < 300) {
          const response = JSON.parse(xhr.responseText) as ApiResponse<T>
          resolve(response)
        }
        else {
          reject(new Error(`Upload failed: ${xhr.status} ${xhr.statusText}`))
        }
      }
      catch {
        reject(new Error("Failed to parse response"))
      }
    }

    xhr.onerror = () => reject(new Error("Network error during upload"))
    xhr.ontimeout = () => reject(new Error("Upload timeout"))

    xhr.open("POST", `${config.public.apiBase}${url}`)
    if (token.value) {
      xhr.setRequestHeader("Authorization", `Bearer ${token.value}`)
    }
    xhr.timeout = 60000 // 60秒超时
    xhr.send(formData)
  })
}

// GET 请求
export function get<T = any>(url: string, params?: Record<string, any>, options: RequestOptions = {}) {
  return request<T>(url, {
    method: "GET",
    query: params,
    ...options,
  })
}

// POST 请求
export function post<T = any>(url: string, params?: any, options: RequestOptions = {}) {
  return request<T>(url, {
    method: "POST",
    body: params,
    ...options,
  })
}

// PUT 请求
export function put<T = any>(url: string, params?: any, options: RequestOptions = {}) {
  return request<T>(url, {
    method: "PUT",
    body: params,
    ...options,
  })
}

// DELETE 请求
export function del<T = any>(url: string, options: RequestOptions = {}) {
  return request<T>(url, {
    method: "DELETE",
    ...options,
  })
}

// 单张图片上传
export async function uploadSingleImage(file: File,	options: {
  onProgress?: (progress: number) => void
  folder?: string
  maxSize?: number
  allowedTypes?: string[]
} = {}): Promise<UploadResult> {
  const {
    onProgress,
    folder = "images",
    maxSize = 10,
    allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"],
  } = options

  // 文件验证
  if (!allowedTypes.includes(file.type)) {
    return {
      success: false,
      error: `不支持的文件类型: ${file.type}`,
    }
  }

  if (file.size > maxSize * 1024 * 1024) {
    return {
      success: false,
      error: `文件大小不能超过 ${maxSize}MB`,
    }
  }

  const formData = new FormData()
  formData.append("file", file)
  formData.append("folder", folder)

  try {
    const response = await upload<UploadResponse>("/upload/image", formData, onProgress)

    return {
      success: response.success || response.code === 200,
      data: response.data,
      error: response.success ? undefined : response.message,
    }
  }
  catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    }
  }
}

// 批量图片上传
export async function uploadMultipleImages(files: File[],	options: {
  onProgress?: (progress: number, index: number, total: number) => void
  onSingleComplete?: (result: UploadResult, index: number) => void
  folder?: string
  maxSize?: number
  allowedTypes?: string[]
  concurrent?: number
} = {}): Promise<{
    total: number
    completed: number
    successful: number
    failed: number
    results: Array<UploadResult & { index: number, filename: string }>
  }> {
  const {
    onProgress,
    onSingleComplete,
    folder = "images",
    maxSize = 10,
    allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"],
    concurrent = 3,
  } = options

  const results = []
  const total = files.length
  let completed = 0

  // 分批并发上传
  for (let i = 0; i < files.length; i += concurrent) {
    const batch = files.slice(i, i + concurrent)

    const batchPromises = batch.map(async (file, batchIndex) => {
      const globalIndex = i + batchIndex

      try {
        const result = await uploadSingleImage(file, {
          folder,
          maxSize,
          allowedTypes,
          onProgress: (progress) => {
            onProgress?.(progress, globalIndex, total)
          },
        })

        completed++
        onSingleComplete?.(result, globalIndex)

        return {
          index: globalIndex,
          filename: file.name,
          ...result,
        }
      }
      catch (error) {
        completed++
        const errorResult = {
          index: globalIndex,
          filename: file.name,
          success: false,
          error: error instanceof Error ? error.message : "Upload failed",
        }

        onSingleComplete?.(errorResult, globalIndex)
        return errorResult
      }
    })

    const batchResults = await Promise.all(batchPromises)
    results.push(...batchResults)
  }

  return {
    total,
    completed,
    successful: results.filter(r => r.success).length,
    failed: results.filter(r => !r.success).length,
    results,
  }
}
