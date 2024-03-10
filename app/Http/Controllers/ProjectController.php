<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;
use App\Mail\ProjectModified;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $projects = Project::with("contacts")
        ->when($request->has('status'), function ($query, $status) {
            return $query->where('status', $status);
        })
        ->paginate(10);

    $statuses = Project::getStatuses();

    return Inertia::render('Projects/Index', [
        'projects' => $projects,
        'statuses' => $statuses,
    ]);
    }

    public function create()
    {
        return Inertia::render('Projects/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'description' => 'required',
            'status' => 'required|in:Fejlesztésre vár,Folyamatban,Kész'
        ]);

        $project = Project::create($validated);

        foreach ($request->contacts as $contact) {
            $project->contacts()->create([
                'name' => $contact['name'],
                'email' => $contact['email'],
                'project_id' => $project->id
            ]);
        }
         
        return redirect()->route('projects.index');
    }

    public function edit(Project $project)
    {
        $project->load('contacts');

        return Inertia::render('Projects/Edit', [
            'project' => $project
        ]);
    }

    public function update(Request $request, Project $project)
{
    $project->update($request->validate([
        'name' => 'required',
        'description' => 'required',
        'status' => 'required|in:Fejlesztésre vár,Folyamatban,Kész'
    ]));

    $project->contacts()->delete();

    foreach ($request->contacts as $contact) {
        $project->contacts()->create($contact);
    }

    $this->sendModifiedNotification($project);

    return redirect()->route('projects.index')->with('success', 'Projekt módosítva és értesítés küldve a kapcsolattartóknak.');
}

    public function destroy(Project $project)
    {
        $project->delete();

        return redirect()->route('projects.index')->with('success', 'Projekt törölve');
    }

    public function sendModifiedNotification(Project $project)
{
    $contacts = $project->contacts;

    foreach ($contacts as $contact) {
        Mail::to($contact->email)->send(new ProjectModified($project));
    }

    return redirect()->route('projects.index')->with('success', 'Projekt módosítva és értesítés küldve a kapcsolattartóknak.');
}
}
