import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import * as NavigationMenu from '@radix-ui/react-navigation-menu';

import { NewsPost } from "../components/NewsPost";
import { SearchForm } from "../components/SearchForm";
import { Spinner } from "../components/Spinner";

import rocketLogo from '../assets/rocket-logo.png'
import { CaretDown } from "phosphor-react";

export interface PostData {    
  id: number,
  imageUrl: string,
  newsSite: string,
  publishedAt: Date,
  summary: string,
  title: string,
  url: string,
}[]

export default function Home() {

  const [posts, setPosts] = useState<PostData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [sortDates, setSortDates] = useState<'newest' | 'oldest'>('newest')

  const api = 'https://api.spaceflightnewsapi.net/v3/articles/'

  const getPosts = useCallback(
    async (query: string = '') => {
      try {
        setIsLoading(true)
        const response = await axios.get(
          api,
          {
            params: {
              title_contains: query
            }
          }
        )
        const data = await response.data
        
        setPosts(data)
      } finally {
        setIsLoading(false)
      }
    },
    [posts, sortDates],
  )

  async function handleGetMorePosts() {
    try {
      setIsLoading(true)
      const { data } = await axios.get(api, {
        params: {
          _start: posts.length
        }
      })

      setPosts(state => [...state, ...data])
    } catch(error) {
      alert('Não foi possível realizar mais requisições')
    }
    finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div className="pt-5 pb-20">
      <header className="w-full flex flex-col">
        <div className="w-full absolute flex justify-end gap-4">
          <div className="flex items-center max-h-8 gap-1 border rounded p-[1.45rem] border-orange">
            <SearchForm getSearchedNews={getPosts} />
          </div>
          <div className="bg-transparent border h-full border-orange p-[0.68rem] rounded mr-8 text-zinc-400">
            <NavigationMenu.Root>
              <NavigationMenu.List>
                <NavigationMenu.Item>
                  <NavigationMenu.Trigger className="flex items-center gap-3">
                    Selecione <CaretDown />
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content>
                    <ul className="border-t border-t-orange">
                      <li className="mt-2 hover:text-orange">
                      <button onClick={() => {
                        setSortDates('newest')
                        getPosts()

                    }}>Mais novas</button>
                      </li>
                      <li className="hover:text-orange">
                      <button onClick={() => {
                        setSortDates('oldest')
                        getPosts()
              
                      }}>Mais antigas</button>
                      </li>
                    </ul>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
              </NavigationMenu.List>
            </NavigationMenu.Root>
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <Image src={rocketLogo} width={300} height={300} alt="" />
          <h1 className="text-orange text-4xl">Space Flight News</h1>
        </div>
      </header>

      <hr />

      <main className="mt-8 max-w-[750px] mx-auto">   
        <section className="flex flex-col gap-16">
          {posts.sort((a, b) => sortDates === 'oldest' 
                ? new Date(a.publishedAt).getDate() - new Date(b.publishedAt).getDate() 
                : new Date(b.publishedAt).getDate() - new Date(a.publishedAt).getDate())
              .map((post, index) => {  
                if (index % 2 === 0 ) {
                  return (
                    <NewsPost key={post.id} post={post} />
                  )
                }       
          })}

          <button onClick={handleGetMorePosts} className="mx-auto bg-transparent text-orange border border-orange py-2 px-4 transition hover:scale-105">
            {isLoading ? <Spinner /> : 'Carregar mais'}
          </button>
        </section>
      </main>
    </div>
  )
}