<?php


namespace App\Repository;


use App\Category;
use Illuminate\Database\Eloquent\Collection;

class CategoryRepository
{
    public function getAllCategories(): Collection
    {
        return Category::all()->where('parent_id', 0);
    }
}
