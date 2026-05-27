<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Http\Resources\HR\DocumentResource;
use App\Models\HR\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    public function __construct(){
        parent::__construct(
            model: Document::class,
            resource: DocumentResource::class
        );
    }
    
    public function create(Request $request)
    {
        $request->validate([
            'file' => 'required|file|max:10240',
            'employeeId' => 'required|string',
            'documentTypeId' => 'required|string',
            'expiry' => '',
            'note' => '',
            'verified' => 'required|boolean'
        ]);

        $file = $request->file('file');
        $fileName = uniqid() . '.' . $file->getClientOriginalExtension();
        $path = $file->storeAs('documents', $fileName);

        $document = Document::create([
            'employeeId' => $request->employeeId,
            'createdById' => Auth::user()->userId,
            'originalName' => $file->getClientOriginalName(),
            'fileName' => $fileName,
            'path' => $path,
            'mimeType' => $file->getMimeType(),
            'size' => $file->getSize(),
            'documentTypeId' => $request->documentTypeId,
            'expiry' => $request->expiry,
            'note' => $request->note,
            'verified' => $request->verified
        ]);

        $document->load('documentType');

        return $this->response->success([
            $this->modelName => $this->resource($document)
        ]);
    }

    public function show(Request $request)
    {
        //abort_unless($request->hasValidSignature(), 403);

        $documentId = $request->route('documentId');
        $document = Document::findOrFail($documentId);

        if (!Storage::exists($document->path)) {
            abort(404, 'File not found');
        }
        return response()->file(storage_path('app/' . $document->path));
    }

    public function findByEmployeeId(Request $request)
    {
        $request->validate([
            'employeeId' => 'required|string',
        ]);

        $documents = Document::where('employeeId', $request->employeeId)->get();

        return $this->response->success([
            $this->pluralModelName => $this->resourceCollection($documents)
        ]);
    }

    public function findByCreatedById(Request $request)
    {
        $request->validate([
            'createdById' => 'required|string',
        ]);

        $documents = Document::where('createdById', $request->createdById)->get();

        return $this->response->success([
            $this->pluralModelName => $this->resourceCollection($documents)
        ]);
    }

    public function download(Request $request)
    {
        //abort_unless($request->hasValidSignature(), 403);

        $documentId = $request->route('documentId');
        $document = Document::findOrFail($documentId);

        return Storage::download($document->path, $document->originalName);
    }

    public function update(Request $request)
    {
        $request->validate([
            'file' => 'required|file|max:10240',
            'employeeId' => 'required|string',
            'documentId' => 'required|string',
            'documentTypeId' => 'required|string',
            'expiry' => '',
            'note' => '',
            'verified' => 'required|boolean'
        ]);

        $document = Document::findOrFail($request->documentId);

        // delete old file
        if (Storage::exists($document->path)) {
            Storage::delete($document->path);
        }

        $file = $request->file('file');
        $fileName = uniqid() . '.' . $file->getClientOriginalExtension();
        $path = $file->storeAs('documents', $fileName);

        $document->update([
            'employeeId' => $request->employeeId,
            'originalName' => $file->getClientOriginalName(),
            'fileName' => $fileName,
            'path' => $path,
            'mimeType' => $file->getMimeType(),
            'size' => $file->getSize(),
            'documentTypeId' => $request->documentTypeId,
            'expiry' => $request->expiry,
            'note' => $request->note,
            'verified' => $request->verified
        ]);

        $document->load('documentType');

        return $this->response->success([
            $this->modelName => $this->resource($document)
        ]);
    }

    public function delete(Request $request)
    {
        $request->validate([
            'documentId' => 'required|string'
        ]);

        $document = Document::findOrFail($request->documentId);

        if (Storage::exists($document->path)) {
            Storage::delete($document->path);
        }

        $document->delete();

        return $this->response->success([
            $this->modelName => $this->resource($document)
        ], message: 'Document deleted successfully');
    }
}