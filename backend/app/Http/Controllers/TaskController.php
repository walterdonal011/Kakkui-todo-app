<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Get all tasks for the authenticated user

        $user = Auth::user();

        $tasks = Task::where('user_id', $user->id)->get();
        return response()->json($tasks, Response::HTTP_OK);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'task' => ['required', 'string', 'min:2', 'max:25'],
        ]);

        if ($validator->fails()) {
            return response()->json(
                data: $validator->errors(),
                status: Response::HTTP_FORBIDDEN, //403
            );
        }

        // Create task
        $task = Task::create([
            'user_id' => $request->user()->id,
            'task' => $request->task
        ]);

        return response()->json(
            data: $task,
            status: Response::HTTP_CREATED // 201
        ); 
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        $validator = Validator::make($request->all(),  [
            'is_done' => ['required', 'boolean']
        ]);

        if ($validator->fails()) {
            return response()->json(
                data: $validator->errors(),
                status: Response::HTTP_FORBIDDEN // 403
            );
        }

        $userId = Auth::user()->id;
        // Update the content
        if ($userId != $task->user_id) {
            return response()->json(
                data: [
                    'status' => false,
                    'message'=> "You are not allowed to update this task"
                ],
                status: Response::HTTP_FORBIDDEN // 403
            );
        }

        // Update the task
        $task->update($validator->validated());

        return response()->json(
            data: [
                'status' => true,
                'message' => "Task updated successfully"
            ],
            status: Response::HTTP_OK // 200
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $userId = Auth::user()->id;

        // Update the content
        if ($userId != $task->user_id) {
            return response()->json(
                data: [
                    'status' => false,
                    'message' => "You are not allowed to delete this task"
                ],
                status: Response::HTTP_FORBIDDEN // 403
            );
        }

        $result = $task->delete();

        return response()->json(
            data: [
                'status' => true,
                'message' => "Task is deleted successfully",
                'result' => $result
            ],
            status: Response::HTTP_OK // 200
        );
    }
}
