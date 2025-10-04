<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    // Register User
    public function register(Request $request)
    {
        // Validate the users input
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'min:2', 'max:60'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:100', 'unique:'.User::class],
            'password' => ['required', 'min:8', 'max:50'],
        ]);

        // Return the errors if there is an error in validation
        if($validator->fails()) {
            return response()->json(
                data: $validator->errors(),
                status: Response::HTTP_FORBIDDEN // 403
            );
        }

        // Create account
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        return response()->json(
            data: $user,
            status: Response::HTTP_CREATED // 201
        );
    } 

    //Login Function
    public function login(Request $request)
    {
        //Validates user input
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'string', 'lowercase', 'email', 'max:100'],
            'password' => ['required', 'max:50'],
        ]);
        
        //validator error if fails
        if ($validator->fails()) {
            return response()->json(
                data: $validator->errors(),
                status: Response::HTTP_FORBIDDEN //403
            );
        }

        //Validate
        if ( ! Auth::attempt($request->all(), true)) {
            return response()->json(
                data: [
                    "status" => false,
                    "message" => "Invalid Credentials"
                ],
                status: Response::HTTP_UNAUTHORIZED //401
            );
        }

        //Get user info and generate token

        $user = Auth::user();
        $token = $user->createToken($user)->plainTextToken;

        return response()->json(
            data: [
                "status" => true,
                "token" => $token,
                "data" => $user
            ],
            status: Response::HTTP_OK //200
        );
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(
            data: [
                "status" => true,
                "message" => "Logged out successfully!"
            ],
            status: Response::HTTP_OK // 200
        );
    }
}
