import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { addMember } from '../actions/addMember';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

function UserForm() {
  return (
    <>
      <form action={addMember}>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" name="name" placeholder="Name..." />
        </div>
        <div className="items-top flex space-x-2">
          <Checkbox
            id="is_applicableFor_sc"
            name="is_applicableFor_sc"
            checked
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
        <Button type="submit">add</Button>
      </form>
    </>
  );
}

export default UserForm;
