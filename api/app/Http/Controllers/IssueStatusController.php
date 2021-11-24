<?php

namespace App\Http\Controllers;

use App\Models\IssueStatus;
use Illuminate\Http\Request;

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
            : response()->json([], 500);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $issueStatus = IssueStatus::create($request->all());

        return $issueStatus
            ? response()->json($issueStatus, 201)
            : response()->json([], 500);
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
            : response()->json([], 500);
    }

    /**
     * @param IssueStatus $issueStatus
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(IssueStatus $issueStatus)
    {
        return $issueStatus->delete()
            ? response()->json($issueStatus)
            : response()->json([], 500);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function list()
    {
        $issuesStatus = IssueStatus::select('id', 'label', 'color')->get()->keyBy('id');

        return $issuesStatus
            ? response()->json($issuesStatus)
            : response()->json([], 500);
    }
}
