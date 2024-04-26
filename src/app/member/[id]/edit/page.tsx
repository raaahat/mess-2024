import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { PageHeader } from '../../_components/PageHeader';
import EditUserForm from '../../_components/EditUserForm';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const member = await prisma.member.findUnique({
    where: { id },
  });
  if (!member) {
    notFound();
  }

  return (
    <main>
      <PageHeader>Edit Member</PageHeader>
      <EditUserForm member={member} />
    </main>
  );
}
