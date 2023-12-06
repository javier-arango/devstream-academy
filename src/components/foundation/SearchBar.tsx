'use client'

import { Input } from '@nextui-org/react'
// import { searchSuggestedKeywords } from '@services/API/searchSuggestedKeywords.services'
import { useRouter } from 'next/navigation'
// import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineSearch } from 'react-icons/ai'
// import type { SuggestionResponse } from 'types'

interface FormValues {
  searchQuery: string
}

export const SearchBar = () => {
  const router = useRouter()
  const { register, handleSubmit } = useForm<FormValues>()
  // const searchQuery = watch('searchQuery')
  // const [keywordSuggestions, setKeywordSuggestions] =
  //   useState<SuggestionResponse>()

  // // Handle keyword suggestions
  // useEffect(() => {
  //   const fetchKeywordSuggestions = async () => {
  //     if (searchQuery && searchQuery.length > 2) {
  //       const response = await searchSuggestedKeywords(searchQuery)
  //       setKeywordSuggestions(response)
  //     }
  //   }

  //   fetchKeywordSuggestions()
  // }, [searchQuery])

  // Handle form submission (make the actual search)
  const onSubmit = (data: FormValues) => {
    const { searchQuery } = data

    const encodedSearchQuery = encodeURI(searchQuery)
    router.push(`/results?search_query=${encodedSearchQuery}`)
  }

  //   // Handle when the user click a suggestion
  //   const handleSuggestionClick = (suggestion: string) => {
  //     setValue('searchQuery', suggestion, { shouldValidate: true });
  //     setKeywordSuggestions(undefined); // Clear suggestions
  //     onSubmit({ searchQuery: suggestion }); // Perform search
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Search input */}
      <Input
        classNames={{
          base: 'max-w-full max-w-[30rem] h-10',
          mainWrapper: 'h-full',
          input: 'text-small',
          inputWrapper:
            'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
        }}
        radius="full"
        placeholder="Search"
        size="sm"
        startContent={<AiOutlineSearch size={24} />}
        type="search"
        {...register('searchQuery')}
      />

      {/* Keywords auto suggestions */}
      {/* {keywordSuggestions && keywordSuggestions.count > 0 && (
        <ul>
          {keywordSuggestions.suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion.title)}
            >
              {suggestion.title}
            </li>
          ))}
        </ul>
      )} */}
    </form>
  )
}

// Display name
SearchBar.displayName = 'SearchBar'
