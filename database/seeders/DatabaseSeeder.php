<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\Contact;
use Faker\Factory as Faker;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $projects = [];
        $statuses = ['fejlesztésre vár', 'folyamatban', 'kész'];
    
        // Create random projects
        for ($i = 0; $i < 20; $i++) {
            $projects[] = Project::create([
                'name' => fake()->sentence(),
                'description' => fake()->paragraph(),
                'status' => $statuses[array_rand($statuses)],
            ]);
        }
    
        // Create random contacts
        for ($i = 0; $i < 50; $i++) {
            $contact = Contact::create([
                'name' => fake()->name,
                'email' => fake()->unique()->safeEmail,
                'project_id' => fake()->numberBetween(1, count($projects)),
            ]);
    
            // Associate random contact with random project
            $contact->project_id = fake()->numberBetween(1, count($projects));
            $contact->save();
        }
    }
}
