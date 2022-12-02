import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlass } from "phosphor-react";

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

interface SearchFormProps {
  getSearchedNews: (query?: string) => Promise<void>
}

export function SearchForm({ getSearchedNews }: SearchFormProps) {
  const {
    register,
    handleSubmit,
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchNews(data: SearchFormInputs) {
    await getSearchedNews(data.query)
    console.log(data.query);
  }

  return (
    <form className="flex items-center gap-3" onSubmit={handleSubmit(handleSearchNews)}>
      <input className="w-52 bg-transparent text-orange outline-none shadow" placeholder="Pesquise por notícias" required {...register('query')} />
      <button>
        <MagnifyingGlass className="text-orange" size={22} />
      </button>
    </form>
  )
}