<?php /** @noinspection NonAsciiCharacters */

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;
use App\Models\User;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();

        /** @var \App\Models\User $user */
        $user = User::factory()->create();
        $this->actingAs($user);
    }

    /**
     * @test
     */
    public function ログインユーザーの情報を取得することができる()
    {
        $response = $this->getJson('api/me');
        $user = Auth::user();
        $response
            ->assertOk()
            ->assertExactJson([
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ]);
    }

    /**
     * @test
     */
    public function リストを取得できる()
    {
        $users = User::factory()->count(10)->create();
        $list = collect($users)->pluck('name', 'id')->toArray();

        $response = $this->getJson('api/users/list');
        $response
            ->assertOk()
            ->assertJson($list);
    }
}
