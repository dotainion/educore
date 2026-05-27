<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\HR\DocumentType;

class DocumentTypeSeeder extends Seeder{
    protected array $documentTypes = [
        [
            'name' => 'passport',
            'steps' => ['Inbox', 'Verification', 'Compliance', 'Approved'],
            'risk' => 'high',
            'autoApprove' => false,
        ],[
            'name' => 'id_card',
            'steps' => ['Inbox', 'Verification', 'Approved'],
            'risk' => 'medium',
            'autoApprove' => false,
        ],[
            'name' => 'contract',
            'steps' => ['Inbox', 'Verification', 'Legal Review', 'Approved'],
            'risk' => 'high',
            'autoApprove' => false,
        ],[
            'name' => 'certificate',
            'steps' => ['Inbox', 'Verification', 'Approved'],
            'risk' => 'low',
            'autoApprove' => true,
        ],[
            'name' => 'tax_form',
            'steps' => ['Inbox', 'Compliance', 'Approved'],
            'risk' => 'high',
            'autoApprove' => false,
        ],
    ];

    public function run(): void
    {
        foreach($this->documentTypes as $docType){
            DocumentType::updateOrCreate([
                'name' => $docType['name'],
            ],[
                'name' => $docType['name'],
                'steps' => $docType['steps'],
                'risk' => $docType['risk'],
                'autoApprove' => $docType['autoApprove'],
            ]);
        }
    }
}

