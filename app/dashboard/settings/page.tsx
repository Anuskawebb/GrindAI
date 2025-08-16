import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-bold text-grindgrid-text-primary">Settings</h1>

      <Card className="bg-grindgrid-card shadow-neumorphic rounded-lg">
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="Learner User" className="bg-grindgrid-bg shadow-neumorphic-inset" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="learner@example.com" className="bg-grindgrid-bg shadow-neumorphic-inset" />
          </div>
          <Button className="bg-grindgrid-accent text-white shadow-neumorphic-sm hover:bg-grindgrid-accent/90">Update Profile</Button>
        </CardContent>
      </Card>

      <Card className="bg-grindgrid-card shadow-neumorphic rounded-lg">
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications">Email Notifications</Label>
            <Switch id="email-notifications" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="in-app-notifications">In-App Notifications</Label>
            <Switch id="in-app-notifications" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-grindgrid-card shadow-neumorphic rounded-lg">
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" className="bg-red-500 text-white shadow-neumorphic-sm hover:bg-red-600">Delete Account</Button>
          <p className="text-sm text-grindgrid-text-secondary mt-2">This action cannot be undone.</p>
        </CardContent>
      </Card>
    </div>
  )
}
