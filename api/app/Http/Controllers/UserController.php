<?php

namespace App\Http\Controllers;

use App\Models\User;

class UserController extends Controller
{
    /**
     * セレクトボックスなどに使う最小リスト
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function list()
    {
        $users = User::pluck('name', 'id')->toArray();

        return $users
            ? response()->json($users, 201)
            : response()->json([], 500);
    }
}
