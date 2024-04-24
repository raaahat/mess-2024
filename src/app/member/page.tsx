import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma';
import Link from 'next/link';

export default async function MemberPage() {
  const members = await prisma.member.findMany();

  return (
    <main>
      <div className="flex justify-between items-center pt-5">
        <div>Member list</div>

        <Button asChild>
          <Link href="/member/new"> Add Member</Link>
        </Button>
      </div>
      {members.map((member) => {
        return (
          <>
            <div>{member.name}</div>
          </>
        );
      })}
    </main>
  );
}
