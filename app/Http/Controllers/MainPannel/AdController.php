<?php

namespace App\Http\Controllers\MainPannel;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HR\DocumentController;
use App\Http\Controllers\IController;
use App\Http\Resources\MainPannel\AdResource;
use App\Models\MainPannel\Ad;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class AdController extends Controller implements IController
{
    protected DocumentController $document;
    protected JsonResponse $res;

    public function __construct(){
        parent::__construct(
            model: Ad::class,
            resource: AdResource::class,
            createRule: [
                'title' => ['required', 'string'],
                'content' => ['required', 'string'],
                'company' => ['nullable', 'string'],
                'ctaText' => ['nullable'],
                'ctaUrl' => ['nullable'],
                'adType' => ['required', 'string'],
                'status' => ['required', 'string', 'in:active,draft,inactive'],
                'expiresAt' => ['required', 'string'],
            ],
            updateRule: [
                'adId' => ['string'],
                'title' => ['string'],
                'content' => ['string'],
                'company' => ['string'],
                'ctaText' => ['nullable'],
                'ctaUrl' => ['nullable'],
                'adType' => ['string'],
                'status' => ['string', 'in:active,draft,inactive'],
                'expiresAt' => ['string'],
            ],
            findRule: [
                'adId' => [],
                'adType' => [],
                'expiresAt' => [],
                'status' => [],
            ],
            searchRule: self::SAME_AS_FIND_RULE,
            listRule: self::SAME_AS_FIND_RULE
        );
        $this->document = new DocumentController();
    }

    public function create(Request $request){
        $values = $this->validateData($request, $this->createRule);

        $file = $request->file('poster');
        $fileName = uniqid() . '.' . $file->getClientOriginalExtension();
        $path = $file->storeAs('ads', $fileName, 'public');
        $values['path'] = $path;

        $model = $this->model::create($values);

        return $this->response->success([
            $this->modelName => $this->resource($model)
        ]);
    }

    public function update(Request $request){
        $id = $this->resolveId($request);
        $values = $this->validateData($request, $this->updateRule);

        $ad = $this->model::findOrFail($id);

        if($file = $request->file('poster')){
            if ($ad->path && Storage::disk('public')->exists($ad->path)) {
                Storage::disk('public')->delete($ad->path);
            }

            $fileName = uniqid() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('ads', $fileName, 'public');
            $values['path'] = $path;
        }

        $ad->update($values);

        return $this->response->success([
            $this->modelName => $this->resource($ad)
        ]);
    }
}