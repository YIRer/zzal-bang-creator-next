import dynamic from 'next/dynamic';
const KonavaCanvas = dynamic(() => import('@/components/canvas/KonavaCanvas'), {
  ssr: false,
  suspense: true,
});

export default function Home() {
  return (
    <main>
      <KonavaCanvas />
    </main>
  );
}
