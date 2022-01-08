<?php /** @noinspection NonAsciiCharacters */

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class LoginTest extends TestCase
{
    use RefreshDatabase;

    private $user;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
    }

    /**
     * @test
     */
    public function ログインすることができる()
    {
        $data = [
            'email' => $this->user->email,
            'password' => 'password',
        ];

        $response = $this->postJson('/api/login', $data);

        $response->assertOk();
        $this->assertAuthenticated();
    }

    /**
     * @test
     */
    public function ユーザー情報が違う場合はログイン失敗()
    {
        $data = [
            'email' => $this->user->email,
            'password' => 'aaaaaaaa',
        ];

        $this->postJson('/api/login', $data)
            ->assertStatus(422)
            ->assertJson([
                'errors' => [
                    'email' => [
                        '認証に失敗しました。'
                    ]
                ]
            ]);
    }

    /**
     * @test
     */
    public function ログインに指定回数失敗するとロックされる()
    {
        $data = [
            'email' => $this->user->email,
            'password' => 'aaaaaaaa',
        ];

        foreach (range(1, 5) as $item) {
            $this->postJson('/api/login', $data)->assertStatus(422);
        }

        $this->postJson('/api/login', $data)
            ->assertStatus(422)
            ->assertJson([
                'errors' => [
                    'email' => [
                        'ログインの試行回数が多すぎます。60 秒後にお試しください。'
                    ]
                ]
            ]);
    }
}
