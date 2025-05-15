import { getJobById } from '@/lib/db/jobs';
import ApplicationForm from '../components/ApplicationForm';

interface CareerPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CareerPage({ params }: CareerPageProps) {
  const id = (await params).id;
  const job = await getJobById(id);

  return (
    <section className="md:!px-48 flex flex-col gap-4">
      <h1 className="">{job.title}</h1>
      <p>{job.description}</p>
      <p>Location: {job.location}</p>
      <p>Posted on: {new Date(job.posted_at).toLocaleDateString()}</p>

      <ApplicationForm jobId={id} />
    </section>
  );
}
