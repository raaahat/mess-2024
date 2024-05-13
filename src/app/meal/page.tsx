import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma';
import { CheckCircle2, MoreVertical, XCircle } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import {
  Table,
  TableBody,
  TableCaption,
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
import { createDateArray, formatDate } from '@/lib/utils';
import MealCell from './_components/meal-cell';

export default async function MemberPage() {
  return (
    <main>
      <div className="flex justify-between items-center gap-4">
        <PageHeader>Meal Chart</PageHeader>
      </div>
      <MealTable />
    </main>
  );
}
async function MealTable() {
  //geting member names for table header row
  const memberName = await prisma.member.findMany({
    select: { id: true, name: true },
    orderBy: [{ is_applicableFor_sc: 'desc' }, { createdAt: 'asc' }],
  });

  //generate array of dates for date columns for the meal table
  const startDate = new Date('2024-04-12');
  const endDate = new Date('2024-05-14');
  const dates = createDateArray(startDate, endDate);
  const dailyMeals = await prisma.dailyMeal.findMany();

  return (
    <Table className="max-h-screen overflow-scroll">
      <TableCaption>A list of daily meals for the month.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
          <TableHead className="w-32">Date</TableHead>
          {memberName.map((member) => {
            return (
              <TableHead className="w-20" key={member.id}>
                {member.name}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {dates.map((date) => {
          return (
            <TableRow key={date.toString()}>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical />
                    <span className="sr-only">Actions</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link
                        href={`meal/edit-by-date/${date
                          .toISOString()
                          .slice(0, 10)}/`}
                      >
                        Add Meal
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              <TableCell>{formatDate(date)}</TableCell>
              {memberName.map((member) => {
                const cellData = dailyMeals.find(
                  (d) =>
                    d.memberId === member.id &&
                    d.date.toString() === date.toString()
                );
                return (
                  <TableCell className="w-min" key={`${member.id}-${date}`}>
                    <MealCell data={cellData} />
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
