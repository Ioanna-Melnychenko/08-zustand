import Link from 'next/link';
import css from './Home.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not-found',
  description: 'This page is displayed when the rout is not found',
  openGraph: {
    title: 'Notes Hub',
    description: 'My best Notes Hub',
    url: '',
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Image for Notes Hub',
      },
    ],
    type: 'website',
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">Go back home</Link>
    </div>
  );
};

export default NotFound;
