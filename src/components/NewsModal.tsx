import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';

import { PostData } from '../pages';
import { dateFormatter } from '../utils/formatter';

import 'animate.css';

interface NewsModalProps {
  post: PostData
}

export function NewsModal({ post }: NewsModalProps) {
  return (
    <>
      <Dialog.Portal>
      <Dialog.Overlay className='fixed w-screen h-screen inset-0 bg-[#00000096]' />
      <Dialog.Content className='animate__animated animate__zoomIn fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-purple rounded p-6'>
      <main className='flex flex-col items-center gap-6'>
        <article className="flex items-center gap-12 w-full bg-purple py-4 px-4 rounded-lg">
          <Image className="h-52" src={post.imageUrl} width={250} height={20} alt="" />
          <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold text-gray">{post.title}</h2>
          <div className="flex items-center justify-between">
            <span className="text-orange">{dateFormatter(post.publishedAt)}</span>
          </div>
          <p className="text-gray leading-relaxed">{post.summary}</p>
          </div>
        </article>
        <a href={post.url} target={'_blank'} className="bg-orange py-1 px-2 mx-auto rounded cursor-pointer transition hover:saturate-[1.4]" rel="noreferrer">Ir para notícia</a>
      </main>
      
      </Dialog.Content>
    </Dialog.Portal>
    </>
    
  )
}