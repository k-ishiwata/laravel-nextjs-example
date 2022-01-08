<?php /** @noinspection NonAsciiCharacters */

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\IssueStatus;
use App\Models\User;

class IssueStatusTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();

        $this->seed('IssueStatusSeeder');

        /** @var \App\Models\User $user */
        $user = User::factory()->create();
        $this->actingAs($user);
    }

    /**
     * @test
     */
    public function 一覧を取得できる()
    {
        $response = $this->getJson('api/issue-statuses');
        $response
            ->assertOk()
            ->assertJsonCount(3);
    }

    /**
     * @test
     */
    public function 登録することができる()
    {
        $data = [
            'label' => 'テスト',
            'color' => 'test'
        ];

        $response = $this->postJson('api/issue-statuses', $data);
        $response
            ->assertCreated()
            ->assertJsonFragment($data);
    }

    /**
     * @test
     */
    public function 更新することができる()
    {
        $issue = IssueStatus::firstWhere('id', 1);

        $issue->label = '書き換え';

        $response = $this->putJson("api/issue-statuses/{$issue->id}", $issue->toArray());

        $response
            ->assertOk()
            ->assertJsonFragment(['label' => $issue->label]);
    }

    /**
     * @test
     */
    public function 削除することができる()
    {
        $issueStatuses = IssueStatus::all();

        $response = $this->deleteJson('api/issue-statuses/1');
        $response->assertOk();

        $response = $this->getJson('api/issue-statuses');

        $response
            ->assertOk()
            ->assertJsonCount($issueStatuses->count() -1);
    }
}
