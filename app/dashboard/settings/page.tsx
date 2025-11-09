import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  return (
    <div className="grid gap-6 w-full">
      <h1 className="text-3xl font-bold text-gray-900">Settings</h1>

      <Card className="bg-white rounded-xl shadow-sm border-none">
        <CardHeader className="p-7 pb-6">
          <CardTitle className="text-3xl font-bold text-gray-900">Profile Settings</CardTitle>
        </CardHeader>
        <CardContent className="p-7 pt-0 space-y-4">
          <div>
            <Label htmlFor="name" className="text-gray-900">Name</Label>
            <Input id="name" defaultValue="Learner User" className="bg-gray-50 border-gray-200" />
          </div>
          <div>
            <Label htmlFor="email" className="text-gray-900">Email</Label>
            <Input id="email" type="email" defaultValue="learner@example.com" className="bg-gray-50 border-gray-200" />
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm">Update Profile</Button>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-xl shadow-sm border-none">
        <CardHeader className="p-7 pb-6">
          <CardTitle className="text-3xl font-bold text-gray-900">Notification Settings</CardTitle>
        </CardHeader>
        <CardContent className="p-7 pt-0 space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications" className="text-gray-900">Email Notifications</Label>
            <Switch id="email-notifications" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="in-app-notifications" className="text-gray-900">In-App Notifications</Label>
            <Switch id="in-app-notifications" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-xl shadow-sm border-none">
        <CardHeader className="p-7 pb-6">
          <CardTitle className="text-3xl font-bold text-gray-900">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="p-7 pt-0">
          <Button variant="destructive" className="bg-red-500 text-white shadow-sm hover:bg-red-600">Delete Account</Button>
          <p className="text-sm text-gray-500 mt-2">This action cannot be undone.</p>
        </CardContent>
      </Card>
    </div>
  )
}
