import prisma from '@/lib/prisma';
import Link from 'next/link';
import React from 'react';

export default async function EditByMember() {
  const members = await prisma.member.findMany();
  return (
    <div className="flex justify-center">
      <div>
        EditByMember
        {members.map((member) => {
          return (
            <div className="p-2 m-1" key={member.id}>
              <Link href={`/meal/edit-by-member/${member.id}`}>
                <div className="bg-slate-200 rounded-lg px-2">
                  {member.name}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
