<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    /**
     * ログイン中のユーザー情報を取得
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        $user = Auth::user();

        return $user
            ? response()->json([
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ])
            : response()->json([], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    /**
     * セレクトボックスなどに使う最小リスト
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function list()
    {
        $users = User::pluck('name', 'id')->toArray();

        return $users
            ? response()->json($users)
            : response()->json([], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}
