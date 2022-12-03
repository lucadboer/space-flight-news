import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import * as NavigationMenu from '@radix-ui/react-navigation-menu';

import { CaretDown } from "phosphor-react";

import { NewsPost } from "../components/NewsPost";
import { SearchForm } from "../components/SearchForm";
import { Spinner } from "../components/Spinner";

import rocketLogo from '../assets/rocket-logo.svg'

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

  const router = useRouter()
  
  const limit = 10
  const [posts, setPosts] = useState<PostData[]>([])
  const [sort, setSort] = useState("desc")
  const [isLoading, setIsLoading] = useState(false)

  const api = 'https://api.spaceflightnewsapi.net/v3/articles/'

  useEffect(() => {
    getPosts()
  }, [])

  const getPosts = async (query: string = '') => {
      try {
        const { contains } = router.query
        
        setIsLoading(true)
        const response = await axios.get(
          api,
          {
            params: {
              title_contains: contains || query,
              _limit: limit,
              _sort: `publishedAt:${sort}`,
              _start: posts.length
            }
          }
        )
        const data = await response.data
        
        setPosts(data)
      } finally {
        setIsLoading(false)
      }}
  
  async function handleGetMorePosts() {
    try {
      setIsLoading(true)
      const { data } = await axios.get(api, {
        params: {
          _start: posts.length,
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

  return (
    <div className="pb-20">
      <header className="w-full flex flex-col pt-6 pb-14 bg-galaxy">
        <div className="w-full absolute flex justify-end gap-4">
          <div className="flex items-center max-h-8 border rounded p-[1.45rem] border-orange">
            <SearchForm getSearchedNews={getPosts} />
          </div>
          <div className="bg-transparent border h-full border-orange p-[0.68rem] rounded mr-8 text-zinc-300">
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
                        if(sort !== 'desc') {
                          setSort('desc')
                        }
                        getPosts()

                    }}>Mais novas</button>
                      </li>
                      <li className="hover:text-orange">
                      <button onClick={() => {
                        setSort('asc')
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

        <div className="mt-16 w-full flex flex-col gap-6 items-center justify-center">
          <Image src={rocketLogo} width={130} height={200} alt="" />
          <h1 className="text-white text-5xl">Space Flight News</h1>
        </div>
      </header>

      <hr />

      <main className="mt-8 max-w-[750px] mx-auto">   
        <section className="flex flex-col gap-16">
          {posts.map((post) => {  
            return (
              <NewsPost key={post.id} post={post} />
            )
            }       
          )}

          <button onClick={handleGetMorePosts} className="mx-auto bg-orange text-white rounded border-0 py-2 px-4 transition hover:saturate-[1.3]">
            {isLoading ? <Spinner /> : 'Carregar mais'}
          </button>
        </section>
      </main>
    </div>
  )
}