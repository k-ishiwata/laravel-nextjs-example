<?php

namespace App\Http\Controllers;

use App\Models\Issue;
use Illuminate\Http\Request;

class IssueController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Issue::select('id','title','status','created_at','updated_at')
            ->orderByDesc('id')
            ->paginate(10);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
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
        return response()->json($issue);
    }

    /**
     * @param Request $request
     * @param Issue $issue
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Issue $issue)
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
