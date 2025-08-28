<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserDetails;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(UserDetails::all(), 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            'name' => 'required|string',
            'contact' => 'required|string',
            'address' => 'required|string',
        ]);

        $users = UserDetails::create($validated);

        return response()->json($users, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //

        $userDetail = UserDetails::findOrFail($id);

        return response()->json($userDetail, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $userDetail = UserDetails::findOrFail($id);

        $validated = $request->validate([
            'name' => 'string|nullable',
            'contact' => 'string|nullable',
            'address' => 'string|nullable',
        ]);

    
        $updateData = array_filter($validated, function($value) {
            return !is_null($value);
        });

        if (!empty($updateData)) {
            $userDetail->update($updateData);
        }

        $userDetail->refresh();

        return response()->json($userDetail, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $userDetail = UserDetails::findOrFail($id);

        $userDetail->delete();

        return response()->json(['message' => 'User Deleted Successfully'], 200);
    }
}
