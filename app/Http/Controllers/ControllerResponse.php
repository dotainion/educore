<?php

namespace App\Http\Controllers;

class ControllerResponse{

    protected ?int $successStatusCode = null;
    protected ?int $errorStatusCode = null;

    public function setStatusCode(?int $successCode = null, ?int $errorCode = null):self{
        $this->successStatusCode = $successCode;
        $this->errorStatusCode = $errorCode;
        return $this;
    }

    public function success($data = null, $message = 'Success', $status = 200){
        !is_array($data) && $data = [$data];
        return response()->json(
            [
                'status'  => 'success',
                'message' => $message,
                ...$data,
            ],
            $this->successStatusCode ?: $status
        );
    }

    public function error($message = 'Error', $status = 400, $errors = null){
        $response = [
            'status'  => 'error',
            'message' => $message,
        ];

        if ($errors) {
            $response['errors'] = $errors;
        }

        return response()->json($response, $this->successStatusCode ?: $status);
    }
}