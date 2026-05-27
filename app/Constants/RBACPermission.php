<?php

namespace App\Constants;

class RBACPermission
{
    /**
     * =========================
     * SINGLE SOURCE OF TRUTH: PERMISSIONS
     * =========================
     */
    public const VIEW_SELF = 'view_self';
    public const VIEW_TEAM = 'view_team';
    public const VIEW_ALL = 'view_all';

    public const CREATE = 'create';
    public const UPDATE = 'update';
    public const DELETE = 'delete';
    public const VIEW = 'view';

    public const TERMINATE = 'terminate';
    public const ASSIGN_DEPARTMENT = 'assign_department';

    public const PROCESS = 'process';
    public const ADJUST = 'adjust';
    public const RUN = 'run';

    public const CLOCK_IN = 'clock_in';
    public const CLOCK_OUT = 'clock_out';
    public const OVERRIDE = 'override';

    public const REQUEST = 'request';
    public const APPROVE_TEAM = 'approve_team';
    public const APPROVE_ALL = 'approve_all';
    public const REJECT = 'reject';

    public const ASSIGN = 'assign';
    public const COMPLETE = 'complete';

    public const MANAGE_TEAM = 'manage_team';

    public const APPROVE = 'approve';
    public const PAY = 'pay';

    public const SUBMIT = 'submit';
    public const AUDIT = 'audit';

    public const MANAGE_ROLES = 'manage_roles';
    public const ASSIGN_ROLES = 'assign_roles';
    public const MANAGE_PERMISSIONS = 'manage_permissions';
    public const MANAGE_POLICIES = 'manage_policies';
    public const AUDIT_LOGS = 'audit_logs';
}