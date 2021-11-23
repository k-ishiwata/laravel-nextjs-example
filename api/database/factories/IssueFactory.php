<?php

namespace Database\Factories;

use App\Models\Issue;
use Illuminate\Database\Eloquent\Factories\Factory;

class IssueFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Issue::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $randomDate = $this->faker->dateTimeBetween('-1year', '-1day');
        return [
            'title' => $this->faker->realText(rand(20,50)),
            'body' => $this->faker->realText(rand(100,200)),
            'status_id' => $this->faker->numberBetween(1,3),
            'user_id' => $this->faker->numberBetween(1,3),
            'created_at' => $randomDate,
            'updated_at' => $randomDate
        ];
    }
}
