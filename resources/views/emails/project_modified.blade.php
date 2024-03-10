<!DOCTYPE html>
<html>
<head>
    <title>Projekt módosult</title>
</head>
<body>
    <h1>Projekt módosult</h1>
    <p>A {{ $project->name }} projekt módosult.</p>
    <p>Az új állapota: {{ $project->status }}</p>
    <p>További információk:</p>
    <ul>
        <li>Név: {{ $project->name }}</li>
        <li>Leírás: {{ $project->description }}</li>
        <li>Státusz: {{ $project->status }}</li>
    </ul>
</body>
</html>