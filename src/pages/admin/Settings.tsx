
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminSettings } from "@/types/admin";
import { Textarea } from "@/components/ui/textarea";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Plus,
  Trash2,
  Save,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { toast } from "sonner";

// Dữ liệu mẫu
const initialSettings: AdminSettings = {
  siteName: "Thời trang LOVN",
  logo: "/placeholder.svg",
  contactEmail: "contact@lovatowe.com",
  phoneNumber: "0123456789",
  address: "123 Đường ABC, Quận 1, TP. Hồ Chí Minh",
  socialLinks: {
    facebook: "https://facebook.com/lovnshop",
    instagram: "https://instagram.com/lovnshop",
    twitter: "https://twitter.com/lovnshop",
    youtube: "https://youtube.com/lovnshop",
  },
  shippingMethods: [
    {
      id: "standard",
      name: "Giao hàng tiêu chuẩn",
      price: 30000,
      description: "Giao hàng trong 3-5 ngày làm việc",
      estimatedDays: "3-5 ngày",
    },
    {
      id: "express",
      name: "Giao hàng nhanh",
      price: 50000,
      description: "Giao hàng trong 1-2 ngày làm việc",
      estimatedDays: "1-2 ngày",
    },
  ],
  paymentMethods: [
    {
      id: "cod",
      name: "Thanh toán khi nhận hàng",
      active: true,
      description: "Thanh toán bằng tiền mặt khi nhận hàng",
    },
    {
      id: "banking",
      name: "Chuyển khoản ngân hàng",
      active: true,
      description: "Chuyển khoản qua tài khoản ngân hàng",
    },
    {
      id: "credit_card",
      name: "Thẻ tín dụng / Ghi nợ",
      active: false,
      description: "Thanh toán bằng thẻ tín dụng hoặc thẻ ghi nợ",
    },
  ],
};

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<AdminSettings>(initialSettings);
  const [activeTab, setActiveTab] = useState<string>("general");

  const handleSave = () => {
    // TODO: Save settings to database
    console.log("Saving settings:", settings);
    toast.success("Lưu cài đặt thành công!");
  };

  const updateSocialLink = (platform: string, value: string) => {
    setSettings({
      ...settings,
      socialLinks: {
        ...settings.socialLinks,
        [platform]: value,
      },
    });
  };

  const addShippingMethod = () => {
    const newMethod = {
      id: `shipping_${Date.now()}`,
      name: "Phương thức vận chuyển mới",
      price: 0,
      description: "",
      estimatedDays: "",
    };
    setSettings({
      ...settings,
      shippingMethods: [...settings.shippingMethods, newMethod],
    });
  };

  const updateShippingMethod = (index: number, field: string, value: any) => {
    const updatedMethods = [...settings.shippingMethods];
    updatedMethods[index] = {
      ...updatedMethods[index],
      [field]: field === "price" ? parseInt(value) : value,
    };
    setSettings({
      ...settings,
      shippingMethods: updatedMethods,
    });
  };

  const removeShippingMethod = (index: number) => {
    const updatedMethods = [...settings.shippingMethods];
    updatedMethods.splice(index, 1);
    setSettings({
      ...settings,
      shippingMethods: updatedMethods,
    });
  };

  const togglePaymentMethod = (index: number) => {
    const updatedMethods = [...settings.paymentMethods];
    updatedMethods[index] = {
      ...updatedMethods[index],
      active: !updatedMethods[index].active,
    };
    setSettings({
      ...settings,
      paymentMethods: updatedMethods,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Cài đặt</h1>
        <Button className="shrink-0" onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Lưu cài đặt
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">Chung</TabsTrigger>
          <TabsTrigger value="shipping">Vận chuyển</TabsTrigger>
          <TabsTrigger value="payment">Thanh toán</TabsTrigger>
          <TabsTrigger value="social">Mạng xã hội</TabsTrigger>
        </TabsList>

        {/* Cài đặt chung */}
        <TabsContent value="general">
          <Card>
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Thông tin cửa hàng</h3>
                  <p className="text-sm text-gray-500">
                    Cài đặt thông tin chung về cửa hàng của bạn
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Tên cửa hàng</Label>
                    <Input
                      id="siteName"
                      value={settings.siteName}
                      onChange={(e) =>
                        setSettings({ ...settings, siteName: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="logo">Logo</Label>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border">
                        <img src={settings.logo} alt="Logo" />
                      </Avatar>
                      <Button variant="outline" size="sm">
                        Thay đổi
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Email liên hệ</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          contactEmail: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Số điện thoại</Label>
                    <Input
                      id="phoneNumber"
                      value={settings.phoneNumber}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          phoneNumber: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Địa chỉ</Label>
                    <Textarea
                      id="address"
                      value={settings.address}
                      onChange={(e) =>
                        setSettings({ ...settings, address: e.target.value })
                      }
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Cài đặt vận chuyển */}
        <TabsContent value="shipping">
          <Card>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Phương thức vận chuyển</h3>
                  <p className="text-sm text-gray-500">
                    Quản lý các phương thức vận chuyển cho cửa hàng của bạn
                  </p>
                </div>
                <Button onClick={addShippingMethod}>
                  <Plus className="mr-2 h-4 w-4" />
                  Thêm phương thức
                </Button>
              </div>

              <div className="space-y-4">
                {settings.shippingMethods.map((method, index) => (
                  <Card key={method.id} className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">
                          Phương thức vận chuyển #{index + 1}
                        </h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => removeShippingMethod(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Tên phương thức</Label>
                          <Input
                            value={method.name}
                            onChange={(e) =>
                              updateShippingMethod(
                                index,
                                "name",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Giá (VND)</Label>
                          <Input
                            type="number"
                            min="0"
                            value={method.price}
                            onChange={(e) =>
                              updateShippingMethod(
                                index,
                                "price",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Thời gian ước tính</Label>
                          <Input
                            value={method.estimatedDays}
                            onChange={(e) =>
                              updateShippingMethod(
                                index,
                                "estimatedDays",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <Label>Mô tả</Label>
                          <Textarea
                            value={method.description}
                            onChange={(e) =>
                              updateShippingMethod(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                            rows={2}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Cài đặt thanh toán */}
        <TabsContent value="payment">
          <Card>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium">Phương thức thanh toán</h3>
                <p className="text-sm text-gray-500">
                  Quản lý các phương thức thanh toán cho cửa hàng của bạn
                </p>
              </div>

              <div className="space-y-4">
                {settings.paymentMethods.map((method, index) => (
                  <Card key={method.id} className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <h4 className="font-medium">{method.name}</h4>
                        <p className="text-sm text-gray-500">
                          {method.description}
                        </p>
                      </div>
                      <div>
                        <Button
                          variant={method.active ? "default" : "outline"}
                          onClick={() => togglePaymentMethod(index)}
                        >
                          {method.active ? "Đang kích hoạt" : "Kích hoạt"}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Cài đặt mạng xã hội */}
        <TabsContent value="social">
          <Card>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium">Liên kết mạng xã hội</h3>
                <p className="text-sm text-gray-500">
                  Quản lý các liên kết mạng xã hội cho cửa hàng của bạn
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Facebook className="h-6 w-6 text-blue-600" />
                  <div className="flex-1">
                    <Input
                      placeholder="Link Facebook"
                      value={settings.socialLinks.facebook || ""}
                      onChange={(e) =>
                        updateSocialLink("facebook", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Instagram className="h-6 w-6 text-pink-500" />
                  <div className="flex-1">
                    <Input
                      placeholder="Link Instagram"
                      value={settings.socialLinks.instagram || ""}
                      onChange={(e) =>
                        updateSocialLink("instagram", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Twitter className="h-6 w-6 text-blue-400" />
                  <div className="flex-1">
                    <Input
                      placeholder="Link Twitter"
                      value={settings.socialLinks.twitter || ""}
                      onChange={(e) =>
                        updateSocialLink("twitter", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Youtube className="h-6 w-6 text-red-500" />
                  <div className="flex-1">
                    <Input
                      placeholder="Link Youtube"
                      value={settings.socialLinks.youtube || ""}
                      onChange={(e) =>
                        updateSocialLink("youtube", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
