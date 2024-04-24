'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const FormSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  is_stuff: z.boolean(),
  is_applicableFor_sc: z.boolean(),
  is_guest: z.boolean(),
});
const AddMember = FormSchema.omit({ id: true });
export async function addMember(formData: FormData) {
  const is_applicableFor_sc = formData.get('is_applicableFor_sc') === 'on';
  const is_guest = formData.get('is_guest') === 'on';
  const is_stuff = formData.get('is_stuff') === 'on';
  const validatedFields = AddMember.safeParse({
    name: formData.get('name'),
    is_applicableFor_sc,
    is_stuff,
    is_guest,
  });
  if (!validatedFields.success) {
    return null;
  }
  // Create one Member
  const Member = await prisma.member.create({
    data: validatedFields.data,
  });
  revalidatePath('/member');
  redirect('/member');
}
