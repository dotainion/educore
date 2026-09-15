<?php

namespace App\Constants;

use App\Constants\RBACPermission;
use App\Constants\RBACModule;
use App\Constants\RBACRole;

class RBACDefinition
{
    /**
     * =========================
     * HELPER
     * =========================
     */
    private static function perm(string $module, ?string $permission = null): string
    {
        if ($permission === null) {
            return "{$module }.*";
        }
        return  "{$module}.{$permission}";
    }

    /**
     * =========================
     * MODULES + PERMISSIONS
     * =========================
     */
    public static function modules(): array
    {
        return [
            RBACModule::DASHBOARD => [
                RBACPermission::VIEW,
            ],

            RBACModule::EMPLOYEE => [
                RBACPermission::VIEW_SELF,
                RBACPermission::VIEW_TEAM,
                RBACPermission::VIEW_ALL,
                RBACPermission::CREATE,
                RBACPermission::UPDATE,
                RBACPermission::DELETE,
                RBACPermission::TERMINATE,
                RBACPermission::ASSIGN_DEPARTMENT,
            ],

            RBACModule::PAYROLL => [
                RBACPermission::VIEW_SELF,
                RBACPermission::VIEW_TEAM,
                RBACPermission::VIEW_ALL,
                RBACPermission::PROCESS,
                RBACPermission::ADJUST,
                RBACPermission::RUN,
            ],

            RBACModule::ATTENDANCE => [
                RBACPermission::VIEW_SELF,
                RBACPermission::VIEW_TEAM,
                RBACPermission::VIEW_ALL,
                RBACPermission::CLOCK_IN,
                RBACPermission::CLOCK_OUT,
                RBACPermission::OVERRIDE,
            ],

            RBACModule::LEAVE => [
                RBACPermission::REQUEST,
                RBACPermission::VIEW_SELF,
                RBACPermission::VIEW_TEAM,
                RBACPermission::VIEW_ALL,
                RBACPermission::APPROVE_TEAM,
                RBACPermission::APPROVE_ALL,
                RBACPermission::REJECT,
            ],

            RBACModule::TASKS => [
                RBACPermission::VIEW_SELF,
                RBACPermission::VIEW_TEAM,
                RBACPermission::VIEW_ALL,
                RBACPermission::CREATE,
                RBACPermission::UPDATE,
                RBACPermission::ASSIGN,
                RBACPermission::COMPLETE,
            ],

            RBACModule::PROJECTS => [
                RBACPermission::VIEW,
                RBACPermission::CREATE,
                RBACPermission::UPDATE,
                RBACPermission::DELETE,
                RBACPermission::MANAGE_TEAM,
            ],

            RBACModule::INVOICES => [
                RBACPermission::VIEW,
                RBACPermission::CREATE,
                RBACPermission::UPDATE,
                RBACPermission::APPROVE,
                RBACPermission::PAY,
            ],

            RBACModule::EXPENSES => [
                RBACPermission::VIEW_SELF,
                RBACPermission::VIEW_ALL,
                RBACPermission::SUBMIT,
                RBACPermission::APPROVE,
                RBACPermission::REJECT,
                RBACPermission::AUDIT,
            ],

            RBACModule::CRM => [
                RBACPermission::VIEW,
                RBACPermission::CREATE,
                RBACPermission::UPDATE,
                RBACPermission::DELETE,
                RBACPermission::ASSIGN,
            ],

            RBACModule::HR => [
                RBACPermission::MANAGE_ROLES,
                RBACPermission::ASSIGN_ROLES,
                RBACPermission::MANAGE_PERMISSIONS,
                RBACPermission::MANAGE_POLICIES,
                RBACPermission::AUDIT_LOGS,
            ],

            RBACModule::SUPPORT => [
                RBACPermission::VIEW,
                RBACPermission::CREATE,
                RBACPermission::ASSIGN,
                RBACPermission::REJECT,
            ],
        ];
    }

    /**
     * =========================
     * ROLES (CLEAN CONST-BASED)
     * =========================
     */
    public static function roles(): array
    {
        return [
            RBACRole::SUPER_ADMIN => [
                'all',
            ],

            RBACRole::ADMIN => [
                self::perm(RBACModule::EMPLOYEE),
                self::perm(RBACModule::PAYROLL),
                self::perm(RBACModule::ATTENDANCE),
                self::perm(RBACModule::LEAVE),
                self::perm(RBACModule::TASKS),
                self::perm(RBACModule::PROJECTS),
                self::perm(RBACModule::INVOICES),
                self::perm(RBACModule::EXPENSES),
                self::perm(RBACModule::CRM),
                self::perm(RBACModule::SUPPORT),

                self::perm(RBACModule::HR, RBACPermission::MANAGE_ROLES),
                self::perm(RBACModule::HR, RBACPermission::ASSIGN_ROLES),
            ],

            RBACRole::HR_ADMIN => [
                self::perm(RBACModule::EMPLOYEE),
                self::perm(RBACModule::LEAVE),
                self::perm(RBACModule::ATTENDANCE),

                self::perm(RBACModule::HR, RBACPermission::MANAGE_ROLES),
                self::perm(RBACModule::HR, RBACPermission::ASSIGN_ROLES),
                self::perm(RBACModule::HR, RBACPermission::MANAGE_PERMISSIONS),
                self::perm(RBACModule::HR, RBACPermission::AUDIT_LOGS),
            ],

            RBACRole::MANAGER => [
                self::perm(RBACModule::EMPLOYEE, RBACPermission::VIEW_TEAM),
                self::perm(RBACModule::ATTENDANCE, RBACPermission::VIEW_TEAM),
                self::perm(RBACModule::LEAVE, RBACPermission::APPROVE_TEAM),

                self::perm(RBACModule::TASKS),
                self::perm(RBACModule::PROJECTS, RBACPermission::VIEW),
            ],

            RBACRole::EMPLOYEE => [
                self::perm(RBACModule::DASHBOARD, RBACPermission::VIEW),
                self::perm(RBACModule::EMPLOYEE, RBACPermission::VIEW_SELF),
                self::perm(RBACModule::LEAVE, RBACPermission::REQUEST),
                self::perm(RBACModule::LEAVE, RBACPermission::VIEW_SELF),
                self::perm(RBACModule::ATTENDANCE, RBACPermission::VIEW_SELF),
                self::perm(RBACModule::TASKS, RBACPermission::VIEW_SELF),
            ],

            RBACRole::GUEST => [
                self::perm(RBACModule::DASHBOARD, RBACPermission::VIEW),
                self::perm(RBACModule::EMPLOYEE, RBACPermission::VIEW_SELF),
            ],
        ];
    }

    private static function parseRolesWithPerm():array{
        $roles = [];
        foreach(self::roles() as $role => $actions){
            $roles[] = [
                'name' => $role,
                'permissions' => $actions
            ];
        }
        return $roles;
    }

    /**
     * =========================
     * FLATTEN FOR SEEDER
     * =========================
     */
    public static function allPermissions(): array
    {
        $permissions = [];
        foreach (self::modules() as $module => $actions) {
            foreach ($actions as $action) {
                $permissions[] = "{$module}.{$action}";
            }
        }
        return $permissions;
    }

    //permissions with roles
    public static function permissions():array{
        $modules = [];
        foreach(self::modules() as $module => $actions){
            $modules[] = [
                'name' => $module,
                'roles' => self::parseRolesWithPerm()
            ];
        }
        return $modules;
        /*$permissions = [];
        foreach(self::modules() as $module => $_){
            $filter = array_filter(self::allPermissions(), fn($perm)=>str_contains($perm, $module));
            $permissions[$module] = str_replace("{$module}.", '', $filter);
        }
        return $permissions;*/
    }
}