import Image from "next/image";
import * as Dialog from '@radix-ui/react-dialog';
import { dateFormatter } from "../utils/formatter";
import { NewsModal } from "./NewsModal";

interface PostData {
  post: {
    id: number,
    imageUrl: string,
    newsSite: string,
    publishedAt: Date,
    summary: string,
    title: string,
    url: string,
  }
}

export function NewsPost({ post }: PostData ) {
  return (
    <article className="flex items-center gap-12 w-full py-4 px-4 rounded-lg">
    <Image className="h-52" src={post.imageUrl} width={250} height={20} alt="" />
    <main className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold text-gray">{post.title}</h2>
      <div className="flex items-center justify-between">
        <span className="text-orange">{dateFormatter(post.publishedAt)}</span>
        <span className="text-orange border border-orange py-1 px-2 rounded">{post.newsSite}</span>
      </div>
      <p className="text-gray leading-relaxed">{post.summary}</p>
      
      <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="mr-auto bg-orange text-white py-1 px-3 rounded transition hover:saturate-[1.4]">Ver mais</button>
          </Dialog.Trigger>
          <NewsModal post={post} />
      </Dialog.Root>
    </main>
  </article>
  )
}