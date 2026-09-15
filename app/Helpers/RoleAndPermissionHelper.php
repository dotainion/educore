<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Auth;
use ReflectionClass;

class RoleAndPermissionHelper
{
    const VIEW = 'view';
    const CREATE = 'create';
    const EDIT = 'edit';
    const DELETE = 'delete';

    protected function module(): string{
        return request()->segment(1);
    }

    protected function ability(string $action): string{
        return "{$this->module()}.{$action}";
    }

    public function can(string $action): bool{
        return Auth::user()->can($this->ability($action));
    }

    public function denyUnless(string $action){
        abort_unless($this->can($action), 403);
    }

    public function canView(): bool{
        return $this->can('view');
    }

    public function canViewOrFail(): void{
        $this->denyUnless('view');
    }

    public function canCreate(): bool{
        return $this->can('create');
    }

    public function canCreateOrFail(): void{
        $this->denyUnless('create');
    }

    public function canEdit(): bool{
        return $this->can('edit');
    }

    public function canEditOrFail(): void{
        $this->denyUnless('edit');
    }

    public function canDelete(): bool{
        return $this->can('delete');
    }

    public function canDeleteOrFail(): void{
        $this->denyUnless('delete');
    }

    public function all(): array
    {
        $result = [];
        foreach ((new ReflectionClass($this))->getConstants() as $key => $value) {
            $result[strtolower($key)] = $this->can($value);
        }
        return $result;
    }
}