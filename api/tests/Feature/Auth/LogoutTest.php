<?php /** @noinspection NonAsciiCharacters */

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class LogoutTest extends TestCase
{
    use RefreshDatabase;

    /** @var \App\Models\User $user */
    private $user;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
    }

    /**
     * @test
     */
    public function ログアウトできる()
    {
        $response = $this->actingAs($this->user)
            ->post('/api/logout');

        $response
            ->assertStatus(200)
            ->assertJson(['message' => 'ログアウトしました。']);
    }
}
