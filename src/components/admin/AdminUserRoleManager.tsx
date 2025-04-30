
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface AdminUserRoleManagerProps {
  userId: string;
  currentRole: string;
  onRoleChange?: (newRole: string) => void;
}

const AdminUserRoleManager: React.FC<AdminUserRoleManagerProps> = ({
  userId,
  currentRole,
  onRoleChange,
}) => {
  const [role, setRole] = useState<string>(currentRole || 'user');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [availableRoles, setAvailableRoles] = useState<string[]>(['user', 'admin', 'moderator']);

  // Tải danh sách vai trò có sẵn từ Supabase
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        // Trong thực tế, bạn có thể cần tạo một enum roles trong Supabase
        const { data, error } = await supabase.rpc('get_available_roles');

        if (error) throw error;
        
        if (data && Array.isArray(data)) {
          setAvailableRoles(data);
        }
      } catch (error) {
        console.error("Không thể tải danh sách vai trò:", error);
        // Fallback to default roles
      }
    };

    fetchRoles();
  }, []);

  const handleRoleChange = async (newRole: string) => {
    if (newRole === role) return;
    
    setIsLoading(true);
    
    try {
      // Xóa vai trò hiện tại
      const { error: deleteError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);

      if (deleteError) throw deleteError;

      // Thêm vai trò mới
      const { error: insertError } = await supabase
        .from('user_roles')
        .insert({
          user_id: userId,
          role: newRole
        });

      if (insertError) throw insertError;

      setRole(newRole);
      toast.success(`Đã cập nhật vai trò thành ${newRole}`);
      
      if (onRoleChange) {
        onRoleChange(newRole);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật vai trò:", error);
      toast.error("Không thể cập nhật vai trò. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Select
        value={role}
        onValueChange={handleRoleChange}
        disabled={isLoading}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Chọn vai trò" />
        </SelectTrigger>
        <SelectContent>
          {availableRoles.map((roleOption) => (
            <SelectItem key={roleOption} value={roleOption}>
              {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default AdminUserRoleManager;
