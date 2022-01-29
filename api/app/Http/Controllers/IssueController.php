<?php

namespace App\Http\Controllers;

use App\Models\Issue;
use App\Http\Requests\IssueRequest;
use Symfony\Component\HttpFoundation\Response;

class IssueController extends Controller
{
    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $issues = Issue::with([
                'user' => fn($q) => $q->select('id', 'name')
            ])
            ->select('id','title','status_id','user_id','created_at','updated_at')
            ->orderByDesc('id')
            ->paginate(10);

        return response()->json($issues);
    }

    /**
     * @param IssueRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(IssueRequest $request)
    {
        $issue = Issue::create($request->all());
        return response()->json($issue, Response::HTTP_CREATED);
    }

    /**
     * @param Issue $issue
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Issue $issue)
    {
        $issue->load([
            'user' => fn($q) => $q->select('id', 'name')
        ]);
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
            : response()->json([], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    /**
     * @param Issue $issue
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Issue $issue)
    {
        return $issue->delete()
            ? response()->json($issue)
            : response()->json([], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}
