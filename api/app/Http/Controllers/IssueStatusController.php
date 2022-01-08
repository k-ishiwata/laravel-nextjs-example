<?php

namespace App\Http\Controllers;

use App\Models\IssueStatus;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IssueStatusController extends Controller
{
    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $issuesStatus = IssueStatus::all();

        return $issuesStatus
            ? response()->json($issuesStatus)
            : response()->json([], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $issueStatus = IssueStatus::create($request->all());

        return $issueStatus
            ? response()->json($issueStatus, Response::HTTP_CREATED)
            : response()->json([], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    /**
     * @param IssueStatus $issueStatus
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(IssueStatus $issueStatus)
    {
        return response()->json($issueStatus);
    }

    /**
     * @param Request $request
     * @param IssueStatus $issueStatus
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, IssueStatus $issueStatus)
    {
        return $issueStatus->update($request->all())
            ? response()->json($issueStatus)
            : response()->json([], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    /**
     * @param IssueStatus $issueStatus
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(IssueStatus $issueStatus)
    {
        return $issueStatus->delete()
            ? response()->json($issueStatus)
            : response()->json([], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function list()
    {
        $issuesStatus = IssueStatus::select('id', 'label', 'color')->get()->keyBy('id');

        return $issuesStatus
            ? response()->json($issuesStatus)
            : response()->json([], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}
