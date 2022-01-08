<?php /** @noinspection NonAsciiCharacters */

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Issue;
use App\Models\User;

class IssueTest extends TestCase
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
    public function 一覧を取得できる()
    {
        $issues = Issue::factory()->count(10)->create();
        $response = $this->getJson('api/issues');
        $response
            ->assertOk()
            ->assertJsonCount($issues->count(), 'data');
    }

    /**
     * @test
     */
    public function ひとつだけ取得できる()
    {
        $issues = Issue::factory()->count(10)->create();
        $response = $this->getJson('api/issues/1');
        $response
            ->assertOk()
            ->assertJson($issues[0]->toArray());
    }

    /**
     * @test
     */
    public function レコードがない場合404エラー()
    {
        $response = $this->getJson('api/issues/1');
        $response
            ->assertStatus(404)
            ->assertJson([
                'message' => 'そのリクエストはありません。'
            ]);
    }

    /**
     * @test
     */
    public function 登録することができる()
    {
        $data = [
            'title' => 'テスト課題',
            'body' => 'テスト内容',
            'status_id' => 1,
        ];

        $response = $this->postJson('api/issues', $data);
        $response
            ->assertCreated()
            ->assertJsonFragment($data);
    }

    /**
     * @test
     */
    public function タイトルが空の場合は登録できない()
    {
        $data = [
            'title' => '',
            'status' => 1,
        ];

        $response = $this->postJson('api/issues', $data);
        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors([
                'title' => 'タイトルは、必ず指定してください。'
            ]);
    }

    /**
     * @test
     */
    public function タイトルが255文字の場合は登録できない()
    {
        $data = [
            'title' => str_repeat('あ', 256),
            'status_id' => 1,
        ];

        $response = $this->postJson('api/issues', $data);
        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors([
                'title' => 'タイトルは、255文字以下にしてください。'
            ]);
    }

    /**
     * @test
     */
    public function 内容が1001文字以上は登録できない()
    {
        $data = [
            'title' => 'テスト課題',
            'body' => str_repeat('あ', 1001),
            'status_id' => 1,
        ];

        $response = $this->postJson('api/issues', $data);
        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors([
                'body' => '内容は、1000文字以下にしてください。'
            ]);
    }

    /**
     * @test
     */
    public function 更新することができる()
    {
        $issue = Issue::factory()->create();

        $issue->title = '書き換え';

        $response = $this->putJson("api/issues/{$issue->id}", $issue->toArray());
        $response
            ->assertOk()
            ->assertJsonFragment(['title' => $issue->title]);
    }

    /**
     * @test
     */
    public function 削除することができる()
    {
        $issues = Issue::factory()->count(10)->create();

        $response = $this->deleteJson('api/issues/1');
        $response->assertOk();

        $response = $this->getJson('api/issues');
        $response
            ->assertOk()
            ->assertJsonCount($issues->count() -1, 'data');
    }
}
