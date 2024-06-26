'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { addMember } from '../actions/members';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useFormState, useFormStatus } from 'react-dom';

function UserForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(addMember, initialState);
  return (
    <>
      <form action={dispatch}>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" name="name" placeholder="Name..." />
        </div>
        <div id="customer-error" aria-live="polite" aria-atomic="true">
          {state.errors?.name &&
            state.errors.name.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
        <div className="items-top flex space-x-2">
          <Checkbox
            id="is_applicableFor_sc"
            name="is_applicableFor_sc"
            defaultChecked
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="is_applicableFor_sc"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              make him applicable for service charge
            </label>
          </div>
        </div>
        <div className="items-top flex space-x-2">
          <Checkbox id="is_stuff" name="is_stuff" />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="is_stuff"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              make him cook or helper
            </label>
          </div>
        </div>
        <div className="items-top flex space-x-2">
          <Checkbox id="is_guest" name="is_guest" />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="is_guest"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              make him guest
            </label>
          </div>
        </div>
        <SubmitButton />
      </form>
    </>
  );
}
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Saving...' : 'Save'}
    </Button>
  );
}

export default UserForm;
