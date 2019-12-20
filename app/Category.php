<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $with = ['children'];

    public function products ()
    {
        return $this->belongsToMany(Product::class);
    }
    public function children ()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
    public function parentId ()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }
}
