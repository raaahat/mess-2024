'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { notFound, redirect } from 'next/navigation';
import { z } from 'zod';

const FormSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  is_stuff: z.boolean(),
  is_applicableFor_sc: z.boolean(),
  is_guest: z.boolean(),
});
const AddMember = FormSchema.omit({ id: true });
export type State = {
  errors?: {
    name?: string[];
    is_stuff?: string[];
    is_applicableFor_sc?: string[];
    is_guest?: string[];
  };
  message?: string | null;
};
export async function addMember(prevState: State, formData: FormData) {
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
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
  // Create one Member
  const Member = await prisma.member.create({
    data: validatedFields.data,
  });
  revalidatePath('/member');
  redirect('/member');
}

export async function updateMember(
  id: string,
  prevState: State,
  formData: FormData
) {
  //   console.log('id :', id);
  //   console.log('prevState:', prevState);
  //   console.log('formData:', formData);
  //   id : 306349d0-ffe6-47c6-8224-28f9e7b34215
  // prevState: { message: null, errors: {} }
  // formData: FormData { [Symbol(state)]: [ {
  //   name: 'name',
  //   value: 'rahat vai'
  // } ] }
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
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
  console.log(validatedFields.data);
  console.log(id);
  await prisma.member.update({
    where: { id },
    data: validatedFields.data,
  });
  revalidatePath('/member');
  redirect('/member');
}

export async function deleteMember(id: string) {
  const member = await prisma.member.delete({ where: { id } });

  if (member == null) return notFound();
  revalidatePath('/');
  revalidatePath('/members');
}
