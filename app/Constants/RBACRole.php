<?php

namespace App\Constants;

class RBACRole
{
    // =========================
    // ROLES (SINGLE SOURCE)
    // =========================
    public const SUPER_ADMIN = 'super_admin';
    public const ADMIN = 'admin';
    public const HR_ADMIN = 'hr_admin';
    public const MANAGER = 'manager';
    public const EMPLOYEE = 'employee';
    public const GUEST = 'guest';

    /**
     * Optional helper: all roles list
     */
    public static function all(): array
    {
        return [
            self::SUPER_ADMIN,
            self::ADMIN,
            self::HR_ADMIN,
            self::MANAGER,
            self::EMPLOYEE,
            self::GUEST,
        ];
    }
}