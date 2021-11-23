<?php

namespace App\Http\Controllers;

use App\Models\Issue;
use App\Http\Requests\IssueRequest;

class IssueController extends Controller
{
    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $issues = Issue::with(['user' => function ($q) {
                $q->select('id', 'name');
            }])
            ->select('id','title','status_id','user_id','created_at','updated_at')
            ->orderByDesc('id')
            ->paginate(10);

        return $issues
            ? response()->json($issues)
            : response()->json([], 500);
    }

    /**
     * @param IssueRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(IssueRequest $request)
    {
        $issue = Issue::create($request->all());
        return $issue
            ? response()->json($issue, 201)
            : response()->json([], 500);
    }

    /**
     * @param Issue $issue
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Issue $issue)
    {
        $issue->load(['user' => function ($q) {
            $q->select('id', 'name');
        }]);
        return response()->json($issue);
    }

    /**
     * @param IssueRequest $request
     * @param Issue $issue
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(IssueRequest $request, Issue $issue)
    {
        return $issue->update($request->all())
            ? response()->json($issue)
            : response()->json([], 500);
    }

    /**
     * @param Issue $issue
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Issue $issue)
    {
        return $issue->delete()
            ? response()->json($issue)
            : response()->json([], 500);
    }
}
