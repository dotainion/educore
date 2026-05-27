<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Constants\RBACDefinition;
use App\Models\Permission;
use App\Models\Role;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        /**
         * 1. CREATE ALL PERMISSIONS FROM SINGLE SOURCE
         */
        foreach (RBACDefinition::allPermissions() as $permission) {
            Permission::firstOrCreate([
                'name' => $permission
            ]);
        }

        /**
         * 2. CREATE ROLES FROM SINGLE SOURCE
         */
        foreach (RBACDefinition::roles() as $roleName => $permissions) {
            $role = Role::firstOrCreate([
                'name' => $roleName
            ]);

            // super admin shortcut
            if (in_array('all', $permissions)) {
                $role->syncPermissions(Permission::all());
                continue;
            }

            $resolved = [];

            foreach ($permissions as $perm) {
                // wildcard support (employee.*)
                if (str_contains($perm, '.*')) {
                    $module = str_replace('.*', '', $perm);
                    $resolved = array_merge(
                        $resolved,
                        Permission::where('name', 'like', "{$module}.%")
                            ->pluck('name')
                            ->toArray()
                    );
                } else {
                    $resolved[] = $perm;
                }
            }

            $role->syncPermissions(array_unique($resolved));
        }
    }
}