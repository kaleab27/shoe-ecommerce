import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AccountProfile() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Profile Information</h2>
        <p className="text-muted-foreground">
          Update your personal information and how we can reach you
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage
            src="/placeholder.svg?height=80&width=80"
            alt="Profile picture"
          />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <Button variant="outline" size="sm" className="mb-2">
            Change Avatar
          </Button>
          <p className="text-xs text-muted-foreground">
            JPG, GIF or PNG. 1MB max.
          </p>
        </div>
      </div>

      <Separator />

      <form className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" defaultValue="John" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" defaultValue="Doe" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" defaultValue="john.doe@example.com" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-medium mb-4">Change Password</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" />
            </div>
          </div>
        </div>

        <Button className="bg-amber-800 hover:bg-amber-900 text-white">
          Save Changes
        </Button>
      </form>
    </div>
  );
}
