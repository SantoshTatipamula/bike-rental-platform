import { Button } from "@/components/ui/button";

const BikeActions = () => {

  return (
    <div className="flex gap-2">
      <Button size="sm" variant="outline">Edit</Button>
      <Button size="sm" variant="destructive">Delete</Button>
    </div>
  );
};

export default BikeActions;