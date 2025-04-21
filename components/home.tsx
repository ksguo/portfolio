'use client';

import { useState } from 'react';
import Image from 'next/image';
import IconCloud from './icon-cloud';
import  {icons} from '../config/icons';

interface HomeProps {
 
    avatarUrl: string;
   
  }

export default function Home({ avatarUrl,}: HomeProps) {
  const [imgError, setImgError] = useState(false);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4">
      {/* 头像部分 */}
      <div className="mb-8">
        <Image 
          src={imgError ? "/placeholder-avatar.png" : avatarUrl}
          alt="Profile Avatar"
          width={150}
          height={150}
          className="rounded-full border-4 border-gray-200"
          priority
          onError={() => setImgError(true)}
        />

      </div>

      <div>
        <IconCloud iconSlugs={icons}/>
      </div>
      
       

      
    </div>
  );
}