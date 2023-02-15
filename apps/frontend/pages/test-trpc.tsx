import { trpc } from '../utils/trpc';

export default function IndexPage({ clientName }: { clientName: string }) {
  const hello = trpc.hello.useQuery({ text: clientName });
  if (!hello.data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <p>{hello.data.greeting}</p>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  return {
    props: {
      clientName: 'Julian',
    }, // will be passed to the page component as props
  };
}
