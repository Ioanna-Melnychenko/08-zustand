'use client';
import css from './NotesPage.module.css';
import SearchBox from '@/components/SearchBox/SearchBox';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { useState } from 'react';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import { useDebouncedCallback } from 'use-debounce';
import NoteList from '@/components/NoteList/NoteList';
import { fetchNotes } from '@/lib/api';

interface NotesClientProps {
  tag: string;
}

function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryKey = tag
    ? ['notes', { page, searchValue, tag }]
    : ['notes', { page, searchValue }];
  const { data, isSuccess } = useQuery({
    queryKey,
    queryFn: () => fetchNotes(page, searchValue, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  const totalPages = data?.totalPages || 0;

  const closeModal = () => setIsModalOpen(false);

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearchValue(value);
    setPage(1);
  }, 500);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />
        {totalPages > 1 && (
          <Pagination totalPages={totalPages} page={page} setPage={setPage} />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}

export default NotesClient;
