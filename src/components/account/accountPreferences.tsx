import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function AccountPreferences() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Account Preferences</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="order-updates">Order Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Receive emails about your orders
                </p>
              </div>
              <Switch id="order-updates" defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="promotions">Promotions</Label>
                <p className="text-sm text-muted-foreground">
                  Receive emails about sales and special offers
                </p>
              </div>
              <Switch id="promotions" defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="newsletter">Newsletter</Label>
                <p className="text-sm text-muted-foreground">
                  Receive our monthly newsletter
                </p>
              </div>
              <Switch id="newsletter" defaultChecked />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-medium mb-4">Language & Currency</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Language</Label>
              <RadioGroup defaultValue="english">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="english" id="english" />
                  <Label htmlFor="english">English</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="spanish" id="spanish" />
                  <Label htmlFor="spanish">Spanish</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="french" id="french" />
                  <Label htmlFor="french">French</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Currency</Label>
              <RadioGroup defaultValue="usd">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="usd" id="usd" />
                  <Label htmlFor="usd">USD ($)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="eur" id="eur" />
                  <Label htmlFor="eur">EUR (€)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gbp" id="gbp" />
                  <Label htmlFor="gbp">GBP (£)</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-medium mb-4">Privacy</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="data-collection">Data Collection</Label>
                <p className="text-sm text-muted-foreground">
                  Allow us to collect usage data to improve our services
                </p>
              </div>
              <Switch id="data-collection" defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="personalized-ads">Personalized Ads</Label>
                <p className="text-sm text-muted-foreground">
                  Allow us to show you personalized advertisements
                </p>
              </div>
              <Switch id="personalized-ads" defaultChecked />
            </div>
          </div>
        </div>

        <Button className="bg-amber-800 hover:bg-amber-900 text-white">
          Save Preferences
        </Button>
      </div>
    </div>
  );
}
