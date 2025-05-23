<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::truncate();

        Category::insert([
            [
                'name' => 'Historical Books',
                'description' => 'Books that explore ancient civilizations and historical events.',
            ],
            [
                'name' => 'Scientific Books',
                'description' => 'Books covering various scientific fields.',
            ],
            [
                'name' => 'Novels',
                'description' => 'Arabic and foreign literary novels.',
            ],
        ]);
    }
}
