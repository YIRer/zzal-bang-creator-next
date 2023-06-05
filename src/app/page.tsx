import dynamic from 'next/dynamic';
import styles from './page.module.css';

const KonavaCanvas = dynamic(() => import('@/components/canvas/KonavaCanvas'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className={styles.main}>
      <KonavaCanvas />
    </main>
  );
}
