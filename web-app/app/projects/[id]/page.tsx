interface Props {
  params: { id: number };
}

export default function ProjectDetail({ params: { id } }: Props) {
  return <div>Project: {id}</div>;
}
