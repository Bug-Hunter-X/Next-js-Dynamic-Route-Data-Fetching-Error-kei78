// bugSolution.js
import { useRouter } from 'next/router';

export async function getStaticPaths() {
  const res = await fetch('https://api.example.com/paths');
  const paths = await res.json();
  // Handle potential errors
  if (!paths || !Array.isArray(paths)) {
    console.error('Error fetching paths:', paths);
    return { paths: [], fallback: 'blocking' };
  }
  return {
    paths: paths.map((path) => ({ params: { id: path.id } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.example.com/data/${params.id}`);
  const data = await res.json();

  if (!data || !data.content) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: data,
    },
  };
}

function MyComponent({ data }) {
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </div>
  );
}

export default MyComponent;