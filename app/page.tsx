import Home from '@/components/home';
import { getStorageUrl } from '@/utils/supabase/storage';

export default async function Page() {
  // 使用工具函数动态获取 URL
  const avatarUrl = await getStorageUrl('portfolio-assets', 'profile/spike.jpeg');
  const asukaUrl = await getStorageUrl('portfolio-assets', 'profile/Asuka.png');
  

  const webagentUrl = await getStorageUrl('portfolio-assets', 'projects/next-blog-starter.png');

  const actionImageUrl = await getStorageUrl('portfolio-assets', 'projects/intellSpend.png');
  const paperUrl = await getStorageUrl('portfolio-assets', 'documents/resume.pdf');

  console.log('Dynamic avatar URL:', avatarUrl);

  return (
    <>
      <Home
        avatarUrl={avatarUrl}
        asukaUrl={asukaUrl}
        webagentUrl={webagentUrl}
        actionImageUrl={actionImageUrl}
        paperUrl={paperUrl}

      />
    </>
  );
}