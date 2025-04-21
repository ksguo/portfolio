import { createClient } from "./client";

export async function getStorageUrl(bucket: string, path: string): Promise<string> {

    const supabase = createClient();
    
    // 使用 Supabase 客户端获取 URL
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    console.log(`获取到存储URL: ${data.publicUrl} 用于 ${bucket}/${path}`);
    
    return data.publicUrl;
  
}

// 添加便捷函数获取各类资源
export async function getAvatarUrl(filename: string): Promise<string> {
  return getStorageUrl('portfolio-assets', `photos/${filename}`);
}
