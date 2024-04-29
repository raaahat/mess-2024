import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma';
import { CheckCircle2, MoreVertical, XCircle } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '../../components/PageHeader';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DeleteDropdownItem } from './_components/memberActions';

export default async function MemberPage() {
  return (
    <main>
      <div className="flex justify-between items-center gap-4">
        <PageHeader>Member list</PageHeader>
        <Button asChild>
          <Link href="/member/new">Add Member</Link>
        </Button>
      </div>
      <MembersTable />
      {/* <section className="m-4 p-2">
        {members.map((member) => {
          return (
            <>
              <div>
                name: {member.name}{' '}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-red-700" />
                        <span className="sr-only">Move to trash</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Move to trash</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Edit</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </>
          );
        })}
      </section> */}
    </main>
  );
}
async function MembersTable() {
  const members = await prisma.member.findMany({
    orderBy: [
      {
        is_applicableFor_sc: 'desc',
      },
      {
        createdAt: 'asc',
      },
    ],
  });
  if (members.length === 0) return <p>No Members found</p>;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Applicable for SC</TableHead>
          <TableHead>Cook</TableHead>
          <TableHead>Guest</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.id}>
            <TableCell>{member.name}</TableCell>
            <TableCell>
              {member.is_applicableFor_sc === true ? (
                <>
                  <span className="sr-only">Available</span>
                  <CheckCircle2 />
                </>
              ) : (
                <>
                  <span className="sr-only">Unavailable</span>
                  <XCircle className="stroke-destructive" />
                </>
              )}
            </TableCell>
            <TableCell>
              {member.is_stuff ? (
                <>
                  <span className="sr-only">Available</span>
                  <CheckCircle2 />
                </>
              ) : (
                <>
                  <span className="sr-only">Unavailable</span>
                  <XCircle className="stroke-destructive" />
                </>
              )}
            </TableCell>
            <TableCell>
              {member.is_guest ? (
                <>
                  <span className="sr-only">Available</span>
                  <CheckCircle2 />
                </>
              ) : (
                <>
                  <span className="sr-only">Unavailable</span>
                  <XCircle className="stroke-destructive" />
                </>
              )}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href={`/member/${member.id}/edit`}>Edit</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DeleteDropdownItem id={member.id} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
