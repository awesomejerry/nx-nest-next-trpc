import { trpc } from '../utils/trpc';

import { appCaller } from '../server/routers/_app';

type Props = {
  greeting: string;
};

export default function IndexPage({ greeting }: Props) {
  const hello = trpc.hello.useQuery({ text: 'Julian' });
  return (
    <div>
      <p>SSR: {greeting}</p>
      <p>CSR: {hello.data ? hello.data.greeting : 'loading'}</p>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const result = await appCaller.hello({ text: 'Jerry' });
  return {
    props: {
      greeting: result.greeting,
    }, // will be passed to the page component as props
  };
}
