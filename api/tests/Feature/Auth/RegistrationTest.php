<?php /** @noinspection NonAsciiCharacters */

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @test
     */
    public function ユーザーを登録することができる()
    {
        $data = [
            'name' => 'test',
            'email' => 'test@example.com',
            'password' => '123456789',
        ];

        $response = $this->postJson('api/register', $data);

        // 認証済み
        $this->assertAuthenticated();
        $response->assertStatus(201);
    }
}
