import { getJobs } from '@/lib/db/jobs';
import JobSearch from './components/JobSearch';
import { Job } from '@/shared/types/career';
import JobGrid from './components/JobGrid';

export default async function CareersPage() {
  const jobs: Job[] = await getJobs();
  return (
    <>
      <section className="md:!px-48 flex flex-col gap-4">
        <JobSearch />

        <JobGrid jobs={jobs} />
      </section>
    </>
  );
}
