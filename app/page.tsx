import Home from '@/components/home';
import { getStorageUrl } from '@/utils/supabase/storage';

export default async function Page() {
  // 使用工具函数动态获取 URL
  const avatarUrl = await getStorageUrl('portfolio-assets', 'photos/spike.jpeg');
  
  console.log('Dynamic avatar URL:', avatarUrl);

  return (
    <>
      <Home avatarUrl={avatarUrl} />
    </>
  );
}