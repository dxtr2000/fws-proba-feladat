<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Contact;


class Project extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'status'];

    public function contacts()
    {
        return $this->hasMany(Contact::class);
    }

    public static function getStatuses()
    {
        return static::select('status')->groupBy('status')->pluck('status')->toArray();
    }
}
